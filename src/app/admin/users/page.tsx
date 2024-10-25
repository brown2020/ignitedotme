"use client";
import { Context } from "@/app/context/Context";
import { fetchDocuments, updateDocument } from "@/firebase/firestoreUtils";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
    id: string,
    display_name: string,
    email: string,
    photo_url: string,
    created_at: { seconds: number; nanoseconds: number },
    is_admin: boolean
}

function Users() {
    const { userLogin } = Context();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const usersList = await fetchDocuments('users');

        const mappedUsers = usersList.map(user => ({
            id: user.id,
            display_name: user.display_name,
            email: user.email,
            photo_url: user.photo_url,
            created_at: user.created_at,
            is_admin: user.is_admin
        }));

        setUsers(mappedUsers as User[]);
    };

    const handleChangeChecked = async (event: React.ChangeEvent<HTMLInputElement>, user: User, index: number) => {
        const updatedData = { is_admin: event.target.checked };
        try {
            await updateDocument('users', user.id, updatedData);

            const updatedUsers = [...users];
            updatedUsers.splice(index, 1, { ...user, ...updatedData });
            userLogin({ ...user, ...updatedData });

            setUsers(updatedUsers);
            toast.success('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user.');
        }
    }

    function formatDate(firestoreDate: { seconds: number; nanoseconds: number }) {
        const date = new Date(firestoreDate.seconds * 1000);

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };

        return date.toLocaleDateString(undefined, options);
    }

    return (
        // <AuthGuard>
            <div className="relative overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300">
                        Users
                    </h1>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Photo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Display name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Is Admin?
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.length > 0 ? (
                            users?.map((user, index) => {
                                return (
                                    <tr
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        key={user.id}
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {index + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            <Image src={user.photo_url} alt={user.display_name} width={50} height={50} className="rounded-full" />
                                        </td>
                                        <td className="px-6 py-4">{user.display_name}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked={user.is_admin} onChange={(e) => handleChangeChecked(e, user, index)} />
                                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            </label>
                                        </td>
                                        <td className="px-6 py-4">{formatDate(user.created_at)}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={6} className="py-10 text-center"><h3>No Data</h3></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        // </AuthGuard>
    );
}

export default Users;