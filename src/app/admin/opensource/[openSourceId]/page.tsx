"use client";

import { errorContainer, formAttr } from "@/app/helpers/FuncHelper";
import TipTapEditor from "../../components/TipTapEditor";
import { Formik, FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { storage } from "@/firebase/firebase";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDocument, getDocumentById, updateDocument } from "@/firebase/firestoreUtils";

interface FormData {
  open_source_title: string;
  icon_link: File | string | null;
  open_source_description: string;
  web_link: string;
  github_link: string;
}

export default function OpenSourceDetails() {
  const { openSourceId } = useParams();
  const router = useRouter();
  const runforms = useRef<FormikProps<FormData>>(null);

  const [type, setType] = useState<string>("add");
  const [initialValues, setInitialValues] = useState({
    open_source_title: "",
    icon_link: "",
    open_source_description: "",
    web_link: "",
    github_link: "",
  });

  useEffect(() => {
    const fetchOpenSourcesData = async () => {
      if (openSourceId && openSourceId !== "add") {
        if (typeof openSourceId !== "string") {
          throw new Error("Invalid open sources ID");
        }

        const fetchedOpenSource = await getDocumentById('open_sources', openSourceId);
        if (fetchedOpenSource) {
          setType('edit');
          setInitialValues({
            open_source_title: fetchedOpenSource.open_source_title as string || "",
            icon_link: fetchedOpenSource.icon_link as string || "",
            open_source_description: fetchedOpenSource.open_source_description as string || "",
            web_link: fetchedOpenSource.web_link as string || "",
            github_link: fetchedOpenSource.github_link as string || "",
          });
        }
      }
    };

    fetchOpenSourcesData();
  }, [openSourceId]);

  const handleEditorContent = (content: string) => {
    if (content && runforms.current) {
      runforms.current.setFieldValue("open_source_description", content);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && runforms.current) {
      runforms.current.setFieldValue("icon_link", file);
    }
  };

  const removeImage = () => {
    if (runforms.current) runforms.current.setFieldValue("icon_link", "");
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      let iconURL = null;

      if (type === "edit") {
        if (typeof openSourceId !== "string") {
          throw new Error("Invalid open source ID");
        }

        if (formData.icon_link && formData.icon_link !== "") {
          const file = formData.icon_link as File;
          const storageRef = ref(storage, `open_sources/${openSourceId}/${file.name}`);
          await uploadBytes(storageRef, file);
          iconURL = await getDownloadURL(storageRef);
        }

        const updatedData = {
          open_source_title: formData.open_source_title,
          icon_link: iconURL || initialValues.icon_link,
          open_source_description: formData.open_source_description,
          web_link: formData.web_link || "",
          github_link: formData.github_link || "",
        };

        await updateDocument('open_sources', openSourceId, updatedData);
        toast.success("Open source updated successfully!");
      } else {
        const newItem = {
          open_source_title: formData.open_source_title,
          icon_link: null,
          open_source_description: formData.open_source_description,
          web_link: formData.web_link || "",
          github_link: formData.github_link || "",
        };

        const docRef = await addDocument('open_sources', newItem);

        if (formData.icon_link && formData.icon_link !== "") {
          const file = formData.icon_link as File;
          const storageRef = ref(storage, `open_sources/${docRef}/${file.name}`);
          await uploadBytes(storageRef, file);
          iconURL = await getDownloadURL(storageRef);

          await updateDocument("open_sources", docRef, { icon_link: iconURL });
        }

        toast.success("Open source added successfully!");
      }
      router.push("/admin/opensource");
    } catch (e) {
      console.error("Error saving document: ", e);
      toast.error("Failed to save document.");
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-300 capitalize">
        {type} Open Source
      </h1>
      <Formik
        innerRef={runforms}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          open_source_title: Yup.string().required("Please enter title"),
          icon_link: Yup.string().required("Please add icon link"),
          open_source_description: Yup.string().required(
            "Please enter description"
          ),
          web_link: Yup.string().url('Please enter valid url'),
          github_link: Yup.string().url('Please enter valid url'),
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
                className="bg-transparent w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500 dark:text-gray-300"
                placeholder="Enter Open Source Title..."
                name="open_source_title"
                {...formAttr(runform, "open_source_title")}
              />
              {errorContainer(runform, "open_source_title")}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2 dark:text-white">
                Add Icon
              </label>
              <label
                htmlFor="img"
                className="dark:text-indigo-700 bg-indigo-100 text-indigo-700 file:mr-4 py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-200 text-sm font-semibold inline-block"
              >
                Select Icon
              </label>
              <input
                type="file"
                id="img"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {errorContainer(runform, "icon_link")}
              {runform.values.icon_link && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="relative max-w-max">
                    <Image
                      width={100}
                      height={100}
                      src={(typeof runform.values.icon_link !== "string") ? URL.createObjectURL(runform.values.icon_link as File) : runform.values.icon_link as string}
                      alt="Selected screenshot"
                      className="w-full h-32 object-cover rounded-lg shadow-lg"
                    />
                    <button
                      onClick={() => removeImage()}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 rounded-full"
                      type="button"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-white"
                htmlFor="description"
              >
                Description
              </label>
              <TipTapEditor
                getEditorContent={handleEditorContent}
                content={initialValues.open_source_description}
              />
              {errorContainer(runform, "open_source_description")}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2 dark:text-white">
                Web URL
              </label>
              <input
                type="url"
                className="bg-transparent w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500 dark:text-gray-300"
                placeholder="Enter Web URL..."
                name="web_link"
                {...formAttr(runform, "web_link")}
              />
              {errorContainer(runform, "web_link")}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2 dark:text-white">
                Git URL
              </label>
              <input
                type="url"
                className="bg-transparent w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500 dark:text-gray-300"
                placeholder="Enter Git URL..."
                name="github_link"
                {...formAttr(runform, "github_link")}
              />
              {errorContainer(runform, "github_link")}
            </div>

            <div className="text-right">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
