"use client";
import { deleteDocument, deleteImageFromStorage, fetchDocuments, updateDocument } from "@/firebase/firestoreUtils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import { OpenSourceObj } from "@/app/types/models";
import DataTable, { Column } from "../components/DataTable";

function OpenSource() {
  const [openSources, setOpenSources] = useState<OpenSourceObj[]>([]);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<{ show: boolean, id: string, type: string }>({ show: false, id: "", type: "" });

  const columns: Column<OpenSourceObj>[] = [
    {
      title: '#',
      name: 'order_number',
    },
    {
      title: 'Images',
      name: 'icon_link',
      options: {
        customBodyRender: (data: OpenSourceObj) => {
          return (
            <div className="text-center">
              {data.icon_link && <Image src={data.icon_link} width={100} height={100} className="mx-auto" alt={data.open_source_title} />}
            </div>
          )
        }
      }
    },
    { title: 'Title', name: 'open_source_title' },
    {
      title: 'Description',
      name: 'open_source_description',
      options: {
        customBodyRender: (data: OpenSourceObj) => {
          return (
            <div className="truncate max-w-3xl" dangerouslySetInnerHTML={{ __html: data.open_source_description }} />
          )
        }
      }
    },
    {
      title: 'actions',
      name: 'id',
      options: {
        customBodyRender: (data: OpenSourceObj) => {
          if (isDeleted) {
            return (
              <div className="text-center">
                <span onClick={() => setShowModal({ show: true, id: data.id, type: "restore" })} title="Restore">
                  <i className="fa-solid fa-rotate-left px-2 cursor-pointer"></i>
                </span>
                <span onClick={() => setShowModal({ show: true, id: data.id, type: "permanently_delete" })} title="Permanently delete">
                  <i className="fa-solid fa-trash px-1 cursor-pointer"></i>
                </span>
              </div>)
          } else {
            return (
              <div className="text-center">
                <Link href={`/admin/opensource/${data.id}`}>
                  <i className="fa-regular fa-pen-to-square px-2 cursor-pointer"></i>
                </Link>
                <span onClick={() => setShowModal({ show: true, id: data.id, type: "delete" })}>
                  <i className="fa-solid fa-trash px-1 cursor-pointer"></i>
                </span>
              </div>
            )
          }
        }
      }
    },
  ]

  useEffect(() => {
    fetchOpenSources();
  }, []);

  const fetchOpenSources = async () => {
    const openSourcesList = await fetchDocuments('open_sources', { sort_by: 'order_number', order: 'asc' });

    const mappedOpenSources = openSourcesList.map((openSource, i) => ({
      id: openSource.id,
      is_deleted: openSource.is_deleted || false,
      open_source_title: openSource.open_source_title,
      icon_link: openSource.icon_link,
      open_source_description: openSource.open_source_description,
      web_link: openSource.web_link || "",
      github_link: openSource.github_link || "",
      order_number: openSource.order_number || (i + 1)
    }));

    setOpenSources(mappedOpenSources as OpenSourceObj[]);
  };

  const handleDelete = async () => {
    const index = openSources.findIndex((f) => f.id === showModal.id);
    if (showModal.type === 'permanently_delete') {
      await deleteImageFromStorage(`open_sources/${showModal.id}/`);
      await deleteDocument('open_sources', showModal.id);

      const openSourcesArr = [...openSources];
      openSourcesArr.splice(index, 1);
      setOpenSources(openSourcesArr);

      setShowModal({ show: false, id: "", type: "" });
      toast.success("Open source deleted permanently!");
    } else {
      const updatedData = { is_deleted: !isDeleted };
      await updateDocument('open_sources', showModal.id, updatedData);

      const obj = openSources.find((f) => f.id === showModal.id);
      const openSourcesArr = [...openSources];
      if (obj) {
        openSourcesArr.splice(index, 1, { ...obj, is_deleted: !isDeleted });
      }
      setOpenSources(openSourcesArr);

      setShowModal({ show: false, id: "", type: "" });
      toast.success(`Open source ${showModal?.type} successfully!`);
    }
  }

  const handleRowDrop = async (updatedData: OpenSourceObj[]) => {
    setOpenSources(updatedData);

    const updatedPromises = updatedData.map((item, index) => {
      return updateDocument('open_sources', item.id, { order_number: index + 1 });
    });

    try {
      await Promise.all(updatedPromises);
    } catch (error) {
      console.error("Error updating order in Firebase: ", error);
    }
  };

  return (
    // <AuthGuard>
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

        <DataTable columns={columns} data={openSources?.filter((f) => isDeleted ? f.is_deleted : !f.is_deleted)} options={{ isDragDropRow: true, field_name: 'order_number' }} onRowDrop={handleRowDrop} />
          {showModal.show && <DeleteConfirmation showModal={showModal} onSubmit={handleDelete} Close={setShowModal} type={'open source'} />}
      </div>

    // </AuthGuard>
  );
}

export default OpenSource;
