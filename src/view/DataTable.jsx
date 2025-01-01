import React from "react";
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from "@tanstack/react-table";
import { defaultData } from "../utils/defaultData";

export const DataTable = () => {
    const [data, setData] = React.useState(defaultData);

    const columns = [
        { accessorKey: "visited" },
        { accessorKey: "name" },
        { accessorKey: "address" },
        { accessorKey: "comments" },
        { accessorKey: "maps" },
        { accessorKey: "lastUpdate" }
    ]

    const table = useReactTable(
        {
            data,
            columns,
            getCoreRowModel: getCoreRowModel({}),
            getPaginationRowModel: getPaginationRowModel({})
        });
    return (
        <div className="py-6 px-4">
            <table className="table-auto w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="border-b border-gray-300 text-gray-600 bg-gray-100">
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="py-2 px-4 text-left uppercase">
                                    {
                                        header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}

                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((rows) => (
                        <tr key={rows.id} className="text-gray-600 hover:bg-slate-100">
                            {rows.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="py-2 px-4">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    )
                    )}
                </tbody>
            </table>

            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        className="text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300 disabled:opacity-50"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300 disabled:opacity-50"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    {table.getPageOptions().map((page) => (
                        <button
                            key={page}
                            className={`text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300 ${table.pageIndex === page ? 'bg-gray-400' : ''}`}
                            onClick={() => table.setPageIndex(page)}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button
                        className="text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300 disabled:opacity-50"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                    <button
                        className="text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300 disabled:opacity-50"
                        onClick={() => table.gotoPage(table.pageCount)}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </button>
                </div>
                <div className="text-gray-600 font-semibold">
                    {Number(table.getRowModel().rows[0].id) + 1} - {Number(table.getRowModel().rows[table.getRowModel().rows.length - 1].id) + 1} de {Number(defaultData.length)}
                </div>
                <select className="text-gray-600 border border-gray-300 rounded outline-indigo-700"
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
            </div>
        </div>
    )
}

