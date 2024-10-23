"use client";

import { errorContainer, formAttr } from "@/app/helpers/FuncHelper";
import TipTapEditor from "../../components/TipTapEditor";
import { Formik, FormikProps } from 'formik';
import { useEffect, useRef, useState } from "react";
import * as Yup from 'yup';
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { storage } from "@/firebase/firebase";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDocument, getDocumentById, updateDocument } from "@/firebase/firestoreUtils";

interface FormData {
  app_title: string;
  screenshots: File[] | string[];
  web_link: string;
  ios_app_link: string;
  android_app_link: string;
  app_description: string;
}

export default function AppsDetails() {
  const { appsId } = useParams();
  const router = useRouter();
  const runforms = useRef<FormikProps<FormData>>(null);

  const [type, setType] = useState<string>("add");
  const [initialValues, setInitialValues] = useState<FormData>({
    app_title: "",
    screenshots: [],
    web_link: "",
    ios_app_link: "",
    android_app_link: "",
    app_description: ""
  });

  useEffect(() => {
    const fetchAppData = async () => {
      if (appsId && appsId !== "add") {
        if (typeof appsId !== 'string') {
          throw new Error("Invalid app ID");
        }

        const fetchedApp = await getDocumentById('apps', appsId);
        if (fetchedApp) {
          setType('edit');
          setInitialValues({
            app_title: fetchedApp.app_title as string || "",
            screenshots: fetchedApp.screenshots as string[] || [],
            web_link: fetchedApp.web_link as string || "",
            ios_app_link: fetchedApp.ios_app_link as string || "",
            android_app_link: fetchedApp.android_app_link as string || "",
            app_description: fetchedApp.app_description as string || ""
          });
        }
      }
    };

    fetchAppData();
  }, [appsId]);

  const handleEditorContent = (content: string) => {
    if (content && runforms.current) {
      runforms.current.setFieldValue('app_description', content);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files as FileList);
    if (runforms.current && files) {
      runforms.current.setFieldValue('screenshots', [...runforms.current?.values?.screenshots, ...files]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    if (runforms.current) {
      runforms.current.setFieldValue('screenshots', runforms.current?.values?.screenshots.filter((_, index) => index !== indexToRemove));
    }
  };

  const uploadImagesToStorage = async (screenshots: File[], id: string): Promise<string[]> => {
    const uploadPromises = screenshots.map(async (file) => {
      const storageRef = ref(storage, `apps/${id}/${file.name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    });

    return await Promise.all(uploadPromises);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      let screenshotsURLs: string[] = [];
      const newScreenshots = formData.screenshots.filter((item) => item instanceof File) as File[];

      if (type === 'edit') {
        if (typeof appsId !== 'string') {
          throw new Error("Invalid app ID");
        }

        if (newScreenshots.length > 0) {
          screenshotsURLs = await uploadImagesToStorage(newScreenshots, appsId);
        }

        const updatedScreenshots = [
          ...formData.screenshots.filter((item) => typeof item === 'string'),
          ...screenshotsURLs,
        ];

        const updatedData = {
          app_title: formData.app_title,
          screenshots: updatedScreenshots,
          web_link: formData.web_link || "",
          ios_app_link: formData.ios_app_link || "",
          android_app_link: formData.android_app_link || "",
          app_description: formData.app_description,
        };

        await updateDocument('apps', appsId, updatedData);
        toast.success("App updated successfully!");
      } else {
        const newItem = {
          app_title: formData.app_title,
          screenshots: null,
          web_link: formData.web_link || "",
          ios_app_link: formData.ios_app_link || "",
          android_app_link: formData.android_app_link || "",
          app_description: formData.app_description,
        };

        const docRef = await addDocument('apps', newItem);
        if (newScreenshots.length > 0) {
          screenshotsURLs = await uploadImagesToStorage(newScreenshots, docRef);
        }

        const updatedScreenshots = [
          ...formData.screenshots.filter((item) => typeof item === 'string'),
          ...screenshotsURLs,
        ];

        await updateDocument("apps", docRef, { screenshots: updatedScreenshots });

        toast.success("App added successfully!");
      }

      router.push("/admin/apps");
    } catch (e) {
      console.error("Error saving document: ", e);
      toast.error("Failed to save document.");
    }
  }

  return (
    <div className="w-full mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-300 capitalize">
        {type} App
      </h1>
      <Formik
        innerRef={runforms}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          app_title: Yup.string().required('Please enter title'),
          screenshots: Yup.array().min(1, 'Please select Images'),
          web_link: Yup.string().url('Please enter valid url'),
          ios_app_link: Yup.string().url('Please enter valid url'),
          android_app_link: Yup.string().url('Please enter valid url'),
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
                placeholder="Enter Apps Title..."
                name="app_title"
                {...formAttr(runform, 'app_title')}
              />
              {errorContainer(runform, 'app_title')}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2 dark:text-white">
                Add Screenshots
              </label>
              <label
                htmlFor="img"
                className="dark:text-indigo-700 bg-indigo-100 text-indigo-700 file:mr-4 py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-200 text-sm font-semibold inline-block"
              >
                Select Images
              </label>
              <input
                type="file"
                id="img"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              {errorContainer(runform, 'screenshots')}
              {runform.values.screenshots.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {runform.values.screenshots.map((image, index) => (
                    <div key={index} className="relative max-w-max">
                      <Image
                        width={100}
                        height={100}
                        src={typeof image === "string" ? image : URL.createObjectURL(image)}
                        alt={`Selected screenshot ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg shadow-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white px-2 rounded-full"
                        type="button"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                {...formAttr(runform, 'web_link')}
              />
              {errorContainer(runform, 'web_link')}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2 dark:text-white">
                iOS URL
              </label>
              <input
                type="url"
                className="bg-transparent w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500 dark:text-gray-300"
                placeholder="Enter iOS App Store URL..."
                name="ios_app_link"
                {...formAttr(runform, 'ios_app_link')}
              />
              {errorContainer(runform, 'ios_app_link')}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2 dark:text-white">
                Android URL
              </label>
              <input
                type="url"
                className="bg-transparent w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500 dark:text-gray-300"
                placeholder="Enter Android Play Store URL..."
                name="android_app_link"
                {...formAttr(runform, 'android_app_link')}
              />
              {errorContainer(runform, 'android_app_link')}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2 dark:text-white">
                Description
              </label>
              <TipTapEditor getEditorContent={handleEditorContent} content={initialValues.app_description} />
              {errorContainer(runform, 'app_description')}
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
  );
}
