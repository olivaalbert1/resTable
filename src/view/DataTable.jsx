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
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
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

                </tbody>
            </table>
        </div>
    )
}

