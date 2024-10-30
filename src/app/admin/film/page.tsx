"use client";
import { deleteDocument, fetchDocuments, updateDocument } from "@/firebase/firestoreUtils";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import { FilmObj } from "@/app/types/models";
import DataTable, { Column } from "../components/DataTable";
import Loader from "../components/ui/Loaders/Loader";

function Film() {
  const [films, setFilms] = useState<FilmObj[]>([]);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<{ show: boolean, id: string, type: string }>({ show: false, id: "", type: "" });

  const columns: Column<FilmObj>[] = [
    {
      title: '#',
      name: 'order_number',
    },
    {
      title: 'Video',
      name: 'video_link',
      options: {
        customBodyRender: (data: FilmObj) => {
          const separator = data?.video_link?.includes('?') ? '&' : '?';
          const finalUrl = `${data?.video_link}${separator}controls=0&autoplay=0&mute=1&background=0`;
          return (
            <div className="table-video">
              <iframe
                src={finalUrl}
                title={data?.film_title}
              ></iframe>
            </div>
          )
        }
      }
    },
    { title: 'Title', name: 'film_title' },
    {
      title: 'Description',
      name: 'film_description',
      options: {
        customBodyRender: (data: FilmObj) => {
          return (
            <div className="max-w-3xl" dangerouslySetInnerHTML={{ __html: `${data.film_description?.length > 500 ? data.film_description?.slice(0, 500) : data.film_description}...` }} />
          )
        }
      }
    },
    {
      title: 'actions',
      name: 'id',
      options: {
        customBodyRender: (data: FilmObj) => {
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
                <Link href={`/admin/film/${data.id}`}>
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
        }
      }
    },
  ]

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const filmsList = await fetchDocuments('films', { sort_by: 'order_number', order: 'asc' });

      const mappedFilms = filmsList.map((film, i) => ({
        id: film.id,
        is_deleted: film.is_deleted || false,
        film_title: film.film_title,
        film_description: film.film_description,
        video_link: film.video_link,
        order_number: film.order_number || (i + 1)
      }));

      setFilms(mappedFilms as FilmObj[]);
    } catch (error) {
      console.error("Error fetching films:", error);
      toast.error("Failed to fetch films. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const index = films.findIndex((f) => f.id === showModal.id);
    if (showModal.type === 'permanently_delete') {
      await deleteDocument('films', showModal.id);

      const filmsArr = [...films];
      filmsArr.splice(index, 1);
      setFilms(filmsArr);

      setShowModal({ show: false, id: "", type: "" });
      toast.success("Film deleted permanently!");
    } else {
      const updatedData = { is_deleted: !isDeleted };
      await updateDocument('films', showModal.id, updatedData);

      const obj = films.find((f) => f.id === showModal.id);
      const filmsArr = [...films];
      if (obj) {
        filmsArr.splice(index, 1, { ...obj, is_deleted: !isDeleted });
      }
      setFilms(filmsArr);

      setShowModal({ show: false, id: "", type: "" });
      toast.success(`Film ${showModal?.type} successfully!`);
    }
  }

  const handleRowDrop = async (updatedData: FilmObj[]) => {
    setFilms(updatedData);

    const updatedPromises = updatedData.map((item, index) => {
      return updateDocument('films', item.id, { order_number: index + 1 });
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
            Films
          </h1>
          <div>
            <button className={`${isDeleted ? 'bg-[#e76259]' : 'border border-[#e76259]'} hover:bg-[#e76259] hover:text-white text-gray-900 dark:text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all`} onClick={() => setIsDeleted(!isDeleted)}>
              Deleted Films
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all ms-3">
              <Link href="/admin/film/add">
                Add Film
              </Link>
            </button>
          </div>
        </div>

        {
          isLoading ? (
            <Loader />
          ) : (
            <DataTable columns={columns} data={films?.filter((f) => isDeleted ? f.is_deleted : !f.is_deleted)} options={{ isDragDropRow: true, field_name: 'order_number' }} onRowDrop={handleRowDrop} />
          )}

      </div>

      {showModal.show && <DeleteConfirmation showModal={showModal} onSubmit={handleDelete} Close={setShowModal} type={'film'} />}
    </>
  );
}

export default Film;