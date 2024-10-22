"use client";
import { deleteDocument, deleteImageFromStorage, fetchDocuments, updateDocument } from "@/app/lib/utils/firestoreUtils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DeleteConfirmation } from "../components/DeleteConfirmation";

interface App {
  id: string;
  is_deleted: boolean;
  app_title: string;
  screenshots: string[];
  app_description: string;
  web_link: string;
  ios_app_link: string;
  android_app_link: string;
}

export default function Apps() {
  const [apps, setApps] = useState<App[]>([]);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<{ show: boolean, id: string, type: string }>({ show: false, id: "", type: "" });

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    const appsList = await fetchDocuments('apps');

    const mappedApps = appsList.map(app => ({
      id: app.id,
      is_deleted: app.is_deleted || false,
      app_title: app.app_title || "",
      screenshots: app.screenshots || [],
      app_description: app.app_description || "",
      web_link: app.web_link || "",
      ios_app_link: app.ios_app_link || "",
      android_app_link: app.android_app_link || "",
    }));

    setApps(mappedApps as App[]);
  };

  const handleDelete = async () => {
    if (showModal.type === 'permanently_delete') {
      const appData = apps?.find((f) => f.id === showModal.id);
      if (appData) {
        await deleteImageFromStorage(`apps/${showModal.id}/`);
        await deleteDocument('apps', showModal.id);
        fetchApps();
        setShowModal({ show: false, id: "", type: "" });
        toast.success("App deleted permanently!");
      }
    } else {
      const updatedData = { is_deleted: !isDeleted };
      await updateDocument('apps', showModal.id, updatedData);
      fetchApps();
      setShowModal({ show: false, id: "", type: "" });
      toast.success(`App ${showModal?.type} successfully!`);
    }
  }

  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300">
            Apps
          </h1>
          <div>
            <button className={`${isDeleted ? 'bg-[#e76259]' : 'border border-[#e76259]'} hover:bg-[#e76259] text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all`} onClick={() => setIsDeleted(!isDeleted)}>
              Deleted Apps
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all ms-3">
              <Link href="/admin/apps/add">
                Add App
              </Link>
            </button>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Images
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              apps?.filter((f) => isDeleted ? f.is_deleted : !f.is_deleted)?.length > 0 ? (
                apps?.filter((f) => isDeleted ? f.is_deleted : !f.is_deleted)?.map((app, index) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={app.id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4 max-w-8 text-center">
                        {app.screenshots && app.screenshots.length > 0 && (
                          <Image
                            src={app.screenshots[0]}
                            width={100}
                            height={100}
                            alt={app.app_title}
                          />
                        )}
                      </td>
                      <td className="px-6 py-4">{app.app_title}</td>
                      <td className="px-6 py-4 truncate max-w-3xl"><div dangerouslySetInnerHTML={{ __html: app.app_description }} /></td>
                      <td className="px-6 py-4 text-center">
                        {isDeleted ?
                          <>
                            <span onClick={() => setShowModal({ show: true, id: app.id, type: "restore" })} title="Restore">
                              <i className="fa-solid fa-rotate-left px-2 cursor-pointer"></i>
                            </span>
                            <span onClick={() => setShowModal({ show: true, id: app.id, type: "permanently_delete" })} title="Permanently delete">
                              <i className="fa-solid fa-trash px-1 cursor-pointer"></i>
                            </span>
                          </> :
                          <>
                            <Link href={`/admin/apps/${app.id}`}>
                              <i className="fa-regular fa-pen-to-square px-2 cursor-pointer"></i>
                            </Link>
                            <span onClick={() => setShowModal({ show: true, id: app.id, type: "delete" })}>
                              <i className="fa-solid fa-trash px-1 cursor-pointer"></i>
                            </span>
                          </>
                        }
                      </td>
                    </tr>
                  );
                })) : (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td colSpan={5} className="py-10 text-center"><h3>No Data</h3></td>
                </tr>
              )}
          </tbody>
        </table>
      </div>

      {showModal.show && <DeleteConfirmation showModal={showModal} onSubmit={handleDelete} Close={setShowModal} type={'app'} />}
    </>
  );
}
