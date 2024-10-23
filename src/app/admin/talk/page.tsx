"use client";
import { deleteDocument, fetchDocuments, updateDocument } from "@/firebase/firestoreUtils";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import { TalkObj } from "@/app/types/models";

export default function Talk() {
  const [talks, setTalks] = useState<TalkObj[]>([]);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<{ show: boolean, id: string, type: string }>({ show: false, id: "", type: "" });

  useEffect(() => {
    fetchTalks();
  }, []);

  const fetchTalks = async () => {
    const talksList = await fetchDocuments('talks');

    const mappedTalks = talksList.map(talk => ({
      id: talk.id,
      is_deleted: talk.is_deleted || false,
      talk_title: talk.talk_title,
      talk_description: talk.talk_description,
      video_link: talk.video_link,
    }));

    setTalks(mappedTalks as TalkObj[]);
  };

  const handleDelete = async () => {
    if (showModal.type === 'permanently_delete') {
      await deleteDocument('talks', showModal.id);
      fetchTalks();
      setShowModal({ show: false, id: "", type: "" });
      toast.success("Talk deleted permanently!");
    } else {
      const updatedData = { is_deleted: !isDeleted };
      await updateDocument('talks', showModal.id, updatedData);
      fetchTalks();
      setShowModal({ show: false, id: "", type: "" });
      toast.success(`Talk ${showModal?.type} successfully!`);
    }
  }

  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300">
            Talks
          </h1>
          <div>
            <button className={`${isDeleted ? 'bg-[#e76259]' : 'border border-[#e76259]'} hover:bg-[#e76259] text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all`} onClick={() => setIsDeleted(!isDeleted)}>
              Deleted Talks
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all ms-3">
              <Link href="/admin/talk/add">
                Add Talk
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
                Video
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
              talks?.filter((f) => isDeleted ? f.is_deleted : !f.is_deleted)?.length ? (
                talks?.filter((f) => isDeleted ? f.is_deleted : !f.is_deleted)?.map((talk, index) => {
                  const separator = talk.video_link.includes('?') ? '&' : '?';
                  const finalUrl = `${talk.video_link}${separator}controls=0&autoplay=0&mute=1&background=0`;

                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={talk.id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4 table-video">
                        <iframe
                          width={100}
                          height={100}
                          src={finalUrl}
                          title={talk.talk_title}
                        ></iframe>
                      </td>
                      <td className="px-6 py-4">{talk.talk_title}</td>
                      <td className="px-6 py-4 truncate max-w-3xl	"><div dangerouslySetInnerHTML={{ __html: talk.talk_description }} /></td>
                      <td className="px-6 py-4 text-center">
                        {isDeleted ?
                          <>
                            <span onClick={() => setShowModal({ show: true, id: talk.id, type: "restore" })} title="Restore">
                              <i className="fa-solid fa-rotate-left px-2 cursor-pointer"></i>
                            </span>
                            <span onClick={() => setShowModal({ show: true, id: talk.id, type: "permanently_delete" })} title="Permanently delete">
                              <i className="fa-solid fa-trash px-1 cursor-pointer"></i>
                            </span>
                          </> :
                          <>
                            <Link href={`/admin/talk/${talk.id}`}>
                              <i className="fa-regular fa-pen-to-square px-2 cursor-pointer"></i>
                            </Link>
                            <span onClick={() => setShowModal({ show: true, id: talk.id, type: "delete" })}>
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

      {showModal.show && <DeleteConfirmation showModal={showModal} onSubmit={handleDelete} Close={setShowModal} type={'talk'} />}
    </>
  );
}
