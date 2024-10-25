"use client";
import {
  deleteDocument,
  deleteImageFromStorage,
  fetchDocuments,
  updateDocument,
} from "@/firebase/firestoreUtils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import { AppObj } from "@/app/types/models";
import DataTable, { Column } from "../components/DataTable";

function Apps() {
  const [apps, setApps] = useState<AppObj[]>([]);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<{
    show: boolean;
    id: string;
    type: string;
  }>({ show: false, id: "", type: "" });

  const columns: Column<AppObj>[] = [
    {
      title: "#",
      name: "order_number",
    },
    {
      title: "Images",
      name: "screenshots",
      options: {
        customBodyRender: (data: AppObj) => {
          return (
            <div className="text-center">
              {data.screenshots && data.screenshots.length > 0 && (
                <Image
                  src={data.screenshots[0] as string}
                  width={100}
                  height={100}
                  alt={data.app_title}
                />
              )}
            </div>
          );
        },
      },
    },
    { title: "Title", name: "app_title" },
    {
      title: "Description",
      name: "app_description",
      options: {
        customBodyRender: (data: AppObj) => {
          return (
            <div
              className="truncate max-w-3xl"
              dangerouslySetInnerHTML={{ __html: data.app_description }}
            />
          );
        },
      },
    },
    {
      title: "actions",
      name: "id",
      options: {
        customBodyRender: (data: AppObj) => {
          if (isDeleted) {
            return (
              <div className="text-center">
                <span
                  onClick={() =>
                    setShowModal({ show: true, id: data.id, type: "restore" })
                  }
                  title="Restore"
                >
                  <i className="fa-solid fa-rotate-left px-2 cursor-pointer"></i>
                </span>
                <span
                  onClick={() =>
                    setShowModal({
                      show: true,
                      id: data.id,
                      type: "permanently_delete",
                    })
                  }
                  title="Permanently delete"
                >
                  <i className="fa-solid fa-trash px-1 cursor-pointer"></i>
                </span>
              </div>
            );
          } else {
            return (
              <div className="text-center">
                <Link href={`/admin/apps/${data.id}`}>
                  <i className="fa-regular fa-pen-to-square p-3 cursor-pointer"></i>
                </Link>
                <span
                  onClick={() =>
                    setShowModal({ show: true, id: data.id, type: "delete" })
                  }
                >
                  <i className="fa-solid fa-trash p-3 cursor-pointer"></i>
                </span>
              </div>
            );
          }
        },
      },
    },
  ];

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    const appsList = await fetchDocuments("apps", {
      sort_by: "order_number",
      order: "asc",
    });

    const mappedApps = appsList.map((app, i) => ({
      id: app.id,
      is_deleted: app.is_deleted || false,
      app_title: app.app_title || "",
      screenshots: (app.screenshots as string[]) || [],
      app_description: app.app_description || "",
      web_link: app.web_link || "",
      ios_app_link: app.ios_app_link || "",
      android_app_link: app.android_app_link || "",
      order_number: app.order_number || i + 1,
    }));

    setApps(mappedApps as AppObj[]);
  };

  const handleDelete = async () => {
    const index = apps.findIndex((f) => f.id === showModal.id);
    if (showModal.type === "permanently_delete") {
      const appData = apps?.find((f) => f.id === showModal.id);
      if (appData) {
        await deleteImageFromStorage(`apps/${showModal.id}/`);
        await deleteDocument("apps", showModal.id);

        const appsArr = [...apps];
        appsArr.splice(index, 1);
        setApps(appsArr);

        setShowModal({ show: false, id: "", type: "" });
        toast.success("App deleted permanently!");
      }
    } else {
      const updatedData = { is_deleted: !isDeleted };
      await updateDocument("apps", showModal.id, updatedData);

      const obj = apps.find((f) => f.id === showModal.id);
      const appsArr = [...apps];
      if (obj) {
        appsArr.splice(index, 1, { ...obj, is_deleted: !isDeleted });
      }
      setApps(appsArr);

      setShowModal({ show: false, id: "", type: "" });
      toast.success(`App ${showModal?.type} successfully!`);
    }
  };

  const handleRowDrop = async (updatedData: AppObj[]) => {
    setApps(updatedData);

    const updatedPromises = updatedData.map((item, index) => {
      return updateDocument("apps", item.id, { order_number: index + 1 });
    });

    try {
      await Promise.all(updatedPromises);
    } catch (error) {
      console.error("Error updating order in Firebase: ", error);
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300">
            Apps
          </h1>
          <div>
            <button
              className={`${
                isDeleted ? "bg-[#e76259]" : "border border-[#e76259]"
              } hover:bg-[#e76259] text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all`}
              onClick={() => setIsDeleted(!isDeleted)}
            >
              Deleted Apps
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all ms-3">
              <Link href="/admin/apps/add">Add App</Link>
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={apps?.filter((f) => (isDeleted ? f.is_deleted : !f.is_deleted))}
          options={{ isDragDropRow: true, field_name: "order_number" }}
          onRowDrop={handleRowDrop}
        />
      </div>

      {showModal.show && (
        <DeleteConfirmation
          showModal={showModal}
          onSubmit={handleDelete}
          Close={setShowModal}
          type={"app"}
        />
      )}
    </>
  );
}

export default Apps;
