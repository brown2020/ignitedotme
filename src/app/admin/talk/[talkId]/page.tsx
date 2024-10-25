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
  talk_title: string;
  video_link: string;
  talk_description: string
}

function TalkDetails() {
  const { talkId } = useParams();
  const router = useRouter();
  const runforms = useRef<FormikProps<FormData>>(null);

  const [type, setType] = useState<string>("add");
  const [initialValues, setInitialValues] = useState({
    talk_title: "",
    video_link: "",
    talk_description: ""
  });

  useEffect(() => {
    const fetchTalkData = async () => {
      if (talkId && talkId !== "add") {
        if (typeof talkId !== 'string') {
          throw new Error("Invalid talk ID");
        }

        const fetchedTalk = await getDocumentById('talks', talkId);
        if (fetchedTalk) {
          setType('edit');
          setInitialValues({
            talk_title: fetchedTalk.talk_title as string,
            video_link: fetchedTalk.video_link as string,
            talk_description: fetchedTalk.talk_description as string
          });
        }
      }
    };

    fetchTalkData();
  }, [talkId]);

  const handleEditorContent = (content: string) => {
    if (content && runforms.current) {
      runforms.current.setFieldValue('talk_description', content);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      if (type === 'edit') {
        if (typeof talkId !== 'string') {
          throw new Error("Invalid talk ID");
        }

        const updatedData = {
          talk_title: formData.talk_title,
          video_link: formData.video_link,
          talk_description: formData.talk_description,
        };
        await updateDocument('talks', talkId, updatedData);
        toast.success("Talk updated successfully!");
      } else {
        const talksList = await fetchDocuments('talks');
        const highestOrderNumber = talksList.reduce((max, talk) => Math.max(max, Number(talk.order_number || 0)), 0);

        const newItem = {
          talk_title: formData.talk_title,
          video_link: formData.video_link,
          talk_description: formData.talk_description,
          order_number: highestOrderNumber + 1
        };
        await addDocument('talks', newItem);
        toast.success("Talk added successfully!");
      }
      router.push("/admin/talk");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    // <AuthGuard>
      <div className="w-full mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg ">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-300 capitalize">{type} Talk</h1>
        <Formik
          innerRef={runforms}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object({
            talk_title: Yup.string().required('Please enter title'),
            video_link: Yup.string().url('Please enter valid url').required('Please add video link'),
            talk_description: Yup.string().required('Please enter description'),
          })}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {(runform) => (
            <form onSubmit={runform.handleSubmit}>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="bg-transparent	w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500 dark:text-gray-300"
                  placeholder="Enter talk Title..."
                  name="talk_title"
                  {...formAttr(runform, 'talk_title')}
                />
                {errorContainer(runform, 'talk_title')}
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2 dark:text-white"
                  htmlFor="video"
                >
                  Browse Video
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
                <TipTapEditor getEditorContent={handleEditorContent} content={initialValues.talk_description} />
                {errorContainer(runform, 'talk_description')}
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
    //</AuthGuard>
  );
}

export default TalkDetails;