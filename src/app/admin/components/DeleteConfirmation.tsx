import React, { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
    showModal: { show: boolean, id: string, type: string };
    onSubmit: () => void;
    Close: Dispatch<SetStateAction<{ show: boolean, id: string, type: string }>>;
    type: string;
}

export const DeleteConfirmation: React.FC<Props> = ({ showModal, onSubmit, Close, type }) => {
    useEffect(() => {
        if (showModal?.show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal?.show]);

    return (
        <div id="default-modal" className="relative z-[9999]">
            <div className="fixed inset-0 bg-black/75 z-40 transition-opacity"></div>
            <div className="fixed inset-0 z-50 top-1/3">
                <div className="relative p-4 w-full max-w-sm max-h-full mx-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="p-4 md:p-5 space-y-4 text-center">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Are you sure
                            </h3>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                You want to {showModal?.type?.replace('_', " ")} this {type}?
                            </p>
                        </div>
                        <div className="flex items-center justify-center p-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onSubmit}>Yes</button>
                            <button className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => Close({ show: false, id: "", type: "" })}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
