"use client";
import {
  deleteDocument,
  fetchDocuments,
  updateDocument,
} from "@/firebase/firestoreUtils";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import { TalkObj } from "@/app/types/models";
import AuthGuard from "@/app/auth/AuthGuard";
import DataTable, { Column } from "../components/DataTable";

function Talk() {
  const [talks, setTalks] = useState<TalkObj[]>([]);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<{
    show: boolean;
    id: string;
    type: string;
  }>({ show: false, id: "", type: "" });

  const columns: Column<TalkObj>[] = [
    {
      title: "#",
      name: "order_number",
    },
    {
      title: "Video",
      name: "video_link",
      options: {
        customBodyRender: (data: TalkObj) => {
          const separator = data?.video_link?.includes("?") ? "&" : "?";
          const finalUrl = `${data?.video_link}${separator}controls=0&autoplay=0&mute=1&background=0`;
          return (
            <div className="table-video">
              <iframe src={finalUrl} title={data?.talk_title}></iframe>
            </div>
          );
        },
      },
    },
    { title: "Title", name: "talk_title" },
    {
      title: "Description",
      name: "talk_description",
      options: {
        customBodyRender: (data: TalkObj) => {
          return (
            <div
              className="truncate max-w-3xl"
              dangerouslySetInnerHTML={{ __html: data.talk_description }}
            />
          );
        },
      },
    },
    {
      title: "actions",
      name: "id",
      options: {
        customBodyRender: (data: TalkObj) => {
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
                <Link href={`/admin/talk/${data.id}`}>
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
    fetchTalks();
  }, []);

  const fetchTalks = async () => {
    const talksList = await fetchDocuments("talks", {
      sort_by: "order_number",
      order: "asc",
    });

    const mappedTalks = talksList.map((talk, i) => ({
      id: talk.id,
      is_deleted: talk.is_deleted || false,
      talk_title: talk.talk_title,
      talk_description: talk.talk_description,
      video_link: talk.video_link,
      order_number: talk.order_number || i + 1,
    }));

    setTalks(mappedTalks as TalkObj[]);
  };

  const handleDelete = async () => {
    const index = talks.findIndex((f) => f.id === showModal.id);
    if (showModal.type === "permanently_delete") {
      await deleteDocument("talks", showModal.id);

      const talksArr = [...talks];
      talksArr.splice(index, 1);
      setTalks(talksArr);

      setShowModal({ show: false, id: "", type: "" });
      toast.success("Talk deleted permanently!");
    } else {
      const updatedData = { is_deleted: !isDeleted };
      await updateDocument("talks", showModal.id, updatedData);

      const obj = talks.find((f) => f.id === showModal.id);
      const talksArr = [...talks];
      if (obj) {
        talksArr.splice(index, 1, { ...obj, is_deleted: !isDeleted });
      }
      setTalks(talksArr);

      setShowModal({ show: false, id: "", type: "" });
      toast.success(`Talk ${showModal?.type} successfully!`);
    }
  };

  const handleRowDrop = async (updatedData: TalkObj[]) => {
    setTalks(updatedData);

    const updatedPromises = updatedData.map((item, index) => {
      return updateDocument("talks", item.id, { order_number: index + 1 });
    });

    try {
      await Promise.all(updatedPromises);
    } catch (error) {
      console.error("Error updating order in Firebase: ", error);
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300">
          Talks
        </h1>
        <div>
          <button
            className={`${
              isDeleted ? "bg-[#e76259]" : "border border-[#e76259]"
            } hover:bg-[#e76259] text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all`}
            onClick={() => setIsDeleted(!isDeleted)}
          >
            Deleted Talks
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all ms-3">
            <Link href="/admin/talk/add">Add Talk</Link>
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={talks?.filter((f) => (isDeleted ? f.is_deleted : !f.is_deleted))}
        options={{ isDragDropRow: true, field_name: "order_number" }}
        onRowDrop={handleRowDrop}
      />
      {showModal.show && (
        <DeleteConfirmation
          showModal={showModal}
          onSubmit={handleDelete}
          Close={setShowModal}
          type={"talk"}
        />
      )}
    </div>
  );
}

export default Talk;
