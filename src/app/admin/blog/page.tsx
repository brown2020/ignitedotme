"use client";
import { deleteDocument, deleteImageFromStorage, fetchDocuments, updateDocument } from "@/firebase/firestoreUtils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import { BlogObj } from "@/app/types/models";
import DataTable, { Column } from "../components/DataTable";
import { formatDate } from "@/app/helpers/FuncHelper";
import Loader from "../components/ui/Loaders/Loader";

function Blog() {
  const [blogs, setBlogs] = useState<BlogObj[]>([]);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<{ show: boolean, id: string, type: string }>({ show: false, id: "", type: "" });

  const columns: Column<BlogObj>[] = [
    {
      title: '#',
      name: 'id',
      options: {
        customBodyRender: (data: BlogObj, i: number) => {
          return (
            <span>{i + 1}</span>
          )
        }
      }
    },
    {
      title: 'Images',
      name: 'blog_images',
      options: {
        customBodyRender: (data: BlogObj) => {
          return (
            <div className="table-video">
              {data.blog_images && data.blog_images.length > 0 && (
                <Image
                  src={data.blog_images[0]}
                  width={100}
                  height={100}
                  alt={data.blog_title}
                />
              )}
            </div>
          )
        }
      }
    },
    { title: 'Title', name: 'blog_title' },
    {
      title: 'Description',
      name: 'blog_description',
      options: {
        customBodyRender: (data: BlogObj) => {
          return (
            <div className="max-w-3xl" dangerouslySetInnerHTML={{ __html: `${data.blog_description?.length > 500 ? data.blog_description?.slice(0, 500) : data.blog_description}...` }} />
          )
        }
      }
    },
    {
      title: 'Description',
      name: 'blog_description',
      options: {
        customBodyRender: (data: BlogObj) => {
          return (
            <div>
              {data?.published_on && formatDate(data?.published_on)}
            </div>
          )
        }
      }
    },
    {
      title: 'actions',
      name: 'id',
      options: {
        customBodyRender: (data: BlogObj) => {
          if (isDeleted) {
            return (
              <div className="">
                <span onClick={() => setShowModal({ show: true, id: data.id, type: "restore" })} title="Restore">
                  <i className="fa-solid fa-rotate-left px-2 cursor-pointer"></i>
                </span>
                <span onClick={() => setShowModal({ show: true, id: data.id, type: "permanently_delete" })} title="Permanently delete">
                  <i className="fa-solid fa-trash px-1 cursor-pointer"></i>
                </span>
              </div>)
          } else {
            return (
              <div className="">
                <Link href={`/admin/blog/${data.id}`}>
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
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const blogsList = await fetchDocuments('blogs', {
        sort_by: "published_on",
        order: "desc",
      });

      const mappedBlogs = blogsList.map(blog => ({
        id: blog.id,
        is_deleted: blog.is_deleted || false,
        blog_title: blog.blog_title,
        blog_images: blog.blog_images,
        blog_description: blog.blog_description,
        published_on: blog.published_on || new Date()
      }));

      setBlogs(mappedBlogs as BlogObj[]);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const index = blogs.findIndex((f) => f.id === showModal.id);
    if (showModal.type === 'permanently_delete') {
      await deleteImageFromStorage(`blogs/${showModal.id}/`);
      await deleteDocument('blogs', showModal.id);

      const blogsArr = [...blogs];
      blogsArr.splice(index, 1);
      setBlogs(blogsArr);

      setShowModal({ show: false, id: "", type: "" });
      toast.success("Blog deleted permanently!");
    } else {
      const updatedData = { is_deleted: !isDeleted };
      await updateDocument('blogs', showModal.id, updatedData);

      const obj = blogs.find((f) => f.id === showModal.id);
      const blogsArr = [...blogs];
      if (obj) {
        blogsArr.splice(index, 1, { ...obj, is_deleted: !isDeleted });
      }
      setBlogs(blogsArr);

      setShowModal({ show: false, id: "", type: "" });
      toast.success(`Blog ${showModal?.type} successfully!`);
    }
  }

  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300">
          Blogs
        </h1>
        <div>
          <button className={`${isDeleted ? 'bg-[#e76259]' : 'border border-[#e76259]'} hover:bg-[#e76259] hover:text-white text-gray-900 dark:text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all`} onClick={() => setIsDeleted(!isDeleted)}>
            Deleted Blogs
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all ms-3">
            <Link href="/admin/blog/add">
              Add Blog
            </Link>
          </button>
        </div>
      </div>

      {
        isLoading ? (
          <Loader />
        ) : (
          <DataTable columns={columns} data={blogs?.filter((f) => isDeleted ? f.is_deleted : !f.is_deleted)} />
        )}

      {showModal.show && <DeleteConfirmation showModal={showModal} onSubmit={handleDelete} Close={setShowModal} type={'blog'} />}
    </div>
  );
}

export default Blog;