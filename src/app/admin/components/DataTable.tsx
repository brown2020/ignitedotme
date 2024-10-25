"use client";

import { Fragment } from "react";

export interface Column<T> {
    title: string;
    name: keyof T;
    options?: {
        customBodyRender?: (data: T, index: number) => React.ReactNode;
        is_dragdrop_row?: boolean;
    }
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    options?: {
        isDragDropRow?: boolean;
        field_name?: string
    }
    onRowDrop?: (newData: T[]) => void;
}

const DataTable = <T,>({ columns, data, onRowDrop, options }: DataTableProps<T>) => {

    const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
        e.dataTransfer.setData("rowIndex", index.toString());
    };

    const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, data: T[], targetIndex: number) => {
        const sourceIndex = Number(e.dataTransfer.getData("rowIndex"));

        const updatedData = [...data];
        const [removed] = updatedData.splice(sourceIndex, 1);
        updatedData.splice(targetIndex, 0, removed);

        const updatedWithOrderNumbers = updatedData.map((item, index) => ({
            ...item,
            [options?.field_name || ""]: index + 1
        }));

        if (onRowDrop) {
            onRowDrop(updatedWithOrderNumbers);
        }
    };

    return (
        <Fragment>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {
                            columns?.map((col, colIndex) => {
                                return (
                                    <th scope="col" className="px-6 py-3" key={colIndex}>
                                        {col.title}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {data?.length > 0 ? (
                        data?.map((rowData, rowIndex) => {
                            return (
                                <tr
                                    className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${options?.isDragDropRow ? 'cursor-grab' : ''}`}
                                    key={rowIndex}
                                    draggable={options?.isDragDropRow}
                                    onDragStart={e => handleDragStart(e, rowIndex)}
                                    onDragOver={e => e.preventDefault()}
                                    onDrop={e => handleDrop(e, data, rowIndex)}
                                >
                                    {
                                        columns?.map((col: Column<T>, colIndex: number) => {
                                            return (
                                                <td className="px-6 py-4" key={colIndex}>
                                                    {col.options?.customBodyRender
                                                        ? col.options.customBodyRender(rowData, rowIndex)
                                                        : String(rowData[col.name])}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            );
                        })
                    ) : (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td colSpan={5} className="py-10 text-center"><h3>No Data</h3></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Fragment>
    );
}

export default DataTable;
