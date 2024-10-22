"use client";

import { useEffect, useRef, useState } from "react";
import TipTapEditor from "../../components/TipTapEditor";
import Image from "next/image";
import { storage } from "@/firebase";
import { useParams, useRouter } from "next/navigation";
import { Formik, FormikProps } from "formik";
import * as Yup from 'yup';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
import { errorContainer, formAttr } from "@/app/helpers/FuncHelper";
import { addDocument, getDocumentById, updateDocument } from "@/app/lib/utils/firestoreUtils";

interface FormData {
  blog_title: string;
  blog_images: File[] | string[];
  blog_description: string;
}

export default function BlogDetails() {
  const { blogId } = useParams();
  const router = useRouter();
  const runforms = useRef<FormikProps<FormData>>(null);

  const [type, setType] = useState<string>("add");
  const [initialValues, setInitialValues] = useState({
    blog_title: "",
    blog_images: [],
    blog_description: ""
  });

  useEffect(() => {
    const fetchBlogData = async () => {
      if (blogId && blogId !== "add") {
        if (typeof blogId !== 'string') {
          throw new Error("Invalid blog ID");
        }

        const fetchedBlog = await getDocumentById('blogs', blogId);
        if (fetchedBlog) {
          setType('edit');
          setInitialValues({
            blog_title: fetchedBlog.blog_title as string || "",
            blog_images: fetchedBlog.blog_images as never[] || [],
            blog_description: fetchedBlog.blog_description as string || ""
          });
        }
      }
    };

    fetchBlogData();
  }, [blogId]);

  const handleEditorContent = (content: string) => {
    if (content && runforms.current) {
      runforms.current.setFieldValue('blog_description', content);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files as FileList);
    if (runforms.current && files) {
      runforms.current.setFieldValue('blog_images', [...runforms.current?.values?.blog_images, ...files]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    if (runforms.current) {
      runforms.current.setFieldValue('blog_images', runforms.current?.values?.blog_images.filter((_, index) => index !== indexToRemove));
    }
  };

  const uploadImagesToStorage = async (blog_images: File[]): Promise<string[]> => {
    const uploadPromises = blog_images.map(async (file) => {
      const storageRef = ref(storage, `blogs/${blogId}/${file.name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    });

    return await Promise.all(uploadPromises);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      let screenshotsURLs: string[] = [];

      const newScreenshots = formData.blog_images.filter((item) => item instanceof File) as File[];

      if (newScreenshots.length > 0) {
        screenshotsURLs = await uploadImagesToStorage(newScreenshots);
      }

      const updatedScreenshots = [
        ...formData.blog_images.filter((item) => typeof item === 'string'),
        ...screenshotsURLs,
      ];

      if (type === 'edit') {
        if (typeof blogId !== 'string') {
          throw new Error("Invalid blog ID");
        }

        const updatedData = {
          blog_title: formData.blog_title,
          blog_images: updatedScreenshots,
          blog_description: formData.blog_description,
        };
        await updateDocument('blogs', blogId, updatedData);
        toast.success("Blog updated successfully!");
      } else {
        const newItem = {
          blog_title: formData.blog_title,
          blog_images: updatedScreenshots,
          blog_description: formData.blog_description,
        };
        await addDocument('blogs', newItem);
        toast.success("Blog added successfully!");
      }

      router.push("/admin/blog");
    } catch (e) {
      console.error("Error saving document: ", e);
      toast.error("Failed to save document.");
    }
  }

  return (
    <div className="w-full mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-300">Edit Blog</h1>
      <Formik
        innerRef={runforms}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          blog_title: Yup.string().required('Please enter title'),
          blog_images: Yup.array().min(1, 'Please select Images'),
          blog_description: Yup.string().required('Please enter description'),
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
                placeholder="Enter blog title..."
                name="blog_title"
                {...formAttr(runform, 'blog_title')}
              />
              {errorContainer(runform, 'blog_title')}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2 dark:text-white">
                Add Images
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
              {errorContainer(runform, 'blog_images')}
              {runform.values.blog_images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {runform.values.blog_images.map((image, index) => (
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
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-white"
                htmlFor="description"
              >
                Description
              </label>
              <TipTapEditor getEditorContent={handleEditorContent} content={initialValues.blog_description} />
              {errorContainer(runform, 'blog_description')}
            </div>

            <div className="text-right">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all">
                Save
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
