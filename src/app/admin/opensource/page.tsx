"use client";
import { deleteDocument, deleteImageFromStorage, fetchDocuments, updateDocument } from "@/firebase/firestoreUtils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import { OpenSourceObj } from "@/app/types/models";

export default function OpenSource() {
  const [openSources, setOpenSources] = useState<OpenSourceObj[]>([]);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<{ show: boolean, id: string, type: string }>({ show: false, id: "", type: "" });

  useEffect(() => {
    fetchOpenSources();
  }, []);

  const fetchOpenSources = async () => {
    const openSourcesList = await fetchDocuments('open_sources');

    const mappedOpenSources = openSourcesList.map(openSource => ({
      id: openSource.id,
      is_deleted: openSource.is_deleted || false,
      open_source_title: openSource.open_source_title,
      icon_link: openSource.icon_link,
      open_source_description: openSource.open_source_description,
      web_link: openSource.web_link || "",
      github_link: openSource.github_link || "",
    }));

    setOpenSources(mappedOpenSources as OpenSourceObj[]);
  };

  const handleDelete = async () => {
    if (showModal.type === 'permanently_delete') {
      await deleteImageFromStorage(`open_sources/${showModal.id}/`);
      await deleteDocument('open_sources', showModal.id);
      fetchOpenSources();
      setShowModal({ show: false, id: "", type: "" });
      toast.success("Open source deleted permanently!");
    } else {
      const updatedData = { is_deleted: !isDeleted };
      await updateDocument('open_sources', showModal.id, updatedData);
      fetchOpenSources();
      setShowModal({ show: false, id: "", type: "" });
      toast.success(`Open source ${showModal?.type} successfully!`);
    }
  }

  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300">
            Open Source
          </h1>
          <div>
            <button className={`${isDeleted ? 'bg-[#e76259]' : 'border border-[#e76259]'} hover:bg-[#e76259] text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all`} onClick={() => setIsDeleted(!isDeleted)}>
              Deleted Open Sources
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all ms-3">
              <Link href="/admin/opensource/add">
                Add Open Source
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
            {openSources?.filter((f) => isDeleted ? f.is_deleted : !f.is_deleted)?.length > 0 ? (
              openSources?.filter((f) => isDeleted ? f.is_deleted : !f.is_deleted)?.map((openSource, index) => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={openSource.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4 max-w-8">
                      {openSource.icon_link && <Image src={openSource.icon_link} width={100} height={100} className="mx-auto" alt={openSource.open_source_title} />}
                    </td>
                    <td className="px-6 py-4">{openSource.open_source_title}</td>
                    <td className="px-6 py-4 truncate max-w-3xl"><div dangerouslySetInnerHTML={{ __html: openSource.open_source_description }} /></td>
                    <td className="px-6 py-4 text-center">
                      {isDeleted ?
                        <>
                          <span onClick={() => setShowModal({ show: true, id: openSource.id, type: "restore" })} title="Restore">
                            <i className="fa-solid fa-rotate-left px-2 cursor-pointer"></i>
                          </span>
                          <span onClick={() => setShowModal({ show: true, id: openSource.id, type: "permanently_delete" })} title="Permanently delete">
                            <i className="fa-solid fa-trash px-1 cursor-pointer"></i>
                          </span>
                        </> :
                        <>
                          <Link href={`/admin/opensource/${openSource.id}`}>
                            <i className="fa-regular fa-pen-to-square px-2 cursor-pointer"></i>
                          </Link>
                          <span onClick={() => setShowModal({ show: true, id: openSource.id, type: "delete" })}>
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
            )
            }
          </tbody>
        </table>
      </div>

      {showModal.show && <DeleteConfirmation showModal={showModal} onSubmit={handleDelete} Close={setShowModal} type={'open source'} />}
    </>
  );
}
