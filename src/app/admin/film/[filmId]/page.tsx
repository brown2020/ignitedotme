"use client";

import { errorContainer, formAttr } from "@/app/helpers/FuncHelper";
import TipTapEditor from "../../components/TipTapEditor";
import { Formik, FormikProps } from 'formik';
import { useEffect, useRef, useState } from "react";
import * as Yup from 'yup';
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addDocument, fetchDocuments, getDocumentById, updateDocument } from "@/firebase/firestoreUtils";
import AuthGuard from "@/app/auth/AuthGuard";

interface FormData {
  film_title: string;
  video_link: string;
  film_description: string
}

function FilmDetails() {
  const { filmId } = useParams();
  const router = useRouter();
  const runforms = useRef<FormikProps<FormData>>(null);

  const [type, setType] = useState<string>("add");
  const [initialValues, setInitialValues] = useState({
    film_title: "",
    video_link: "",
    film_description: ""
  });

  useEffect(() => {
    const fetchFilmData = async () => {
      if (filmId && filmId !== "add") {
        if (typeof filmId !== 'string') {
          throw new Error("Invalid film ID");
        }

        const fetchedFilm = await getDocumentById('films', filmId);
        if (fetchedFilm) {
          setType('edit');
          setInitialValues({
            film_title: fetchedFilm.film_title as string || "",
            video_link: fetchedFilm.video_link as string || "",
            film_description: fetchedFilm.film_description as string || ""
          });
        }
      }
    };

    fetchFilmData();
  }, [filmId]);

  const handleEditorContent = (content: string) => {
    if (content && runforms.current) {
      runforms.current.setFieldValue('film_description', content);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      if (type === 'edit') {
        if (typeof filmId !== 'string') {
          throw new Error("Invalid film ID");
        }

        const updatedData = {
          film_title: formData.film_title,
          video_link: formData.video_link,
          film_description: formData.film_description,
        };
        await updateDocument('films', filmId, updatedData);
        toast.success("Film updated successfully!");
      } else {
        const filmsList = await fetchDocuments('films');
        const highestOrderNumber = filmsList.reduce((max, film) => Math.max(max, Number(film.order_number || 0)), 0);

        const newItem = {
          film_title: formData.film_title,
          video_link: formData.video_link,
          film_description: formData.film_description,
          order_number: highestOrderNumber + 1
        };
        await addDocument('films', newItem);
        toast.success("Film added successfully!");
      }
      router.push("/admin/film");
    } catch (e) {
      console.error("Error document: ", e);
    }
  };

  return (
    // <AuthGuard>
      <div className="w-full mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg ">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-300 capitalize">{type} Film</h1>
        <Formik
          innerRef={runforms}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object({
            film_title: Yup.string().required('Please enter title'),
            video_link: Yup.string().url('Please enter valid url').required('Please add video link'),
            film_description: Yup.string().required('Please enter description'),
          })}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {(runform) => (
            <form onSubmit={runform.handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2 dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  className="bg-transparent	w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500 dark:text-gray-300"
                  placeholder="Enter film Title..."
                  name="film_title"
                  {...formAttr(runform, 'film_title')}
                />
                {errorContainer(runform, 'film_title')}
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2 dark:text-white"
                  htmlFor="video"
                >
                  Add Video Link
                </label>
                <input
                  type="url"
                  className="bg-transparent w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500 dark:text-gray-300"
                  placeholder="Enter Video URL..."
                  name="video_link"
                  {...formAttr(runform, 'video_link')}
                />
                {errorContainer(runform, 'video_link')}
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2 dark:text-white"
                  htmlFor="description"
                >
                  Description
                </label>
                <TipTapEditor getEditorContent={handleEditorContent} content={initialValues.film_description} />
                {errorContainer(runform, 'film_description')}
              </div>

              <div className="text-right">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all" type="submit">
                  Save
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    // </AuthGuard>
  );
}

export default FilmDetails;