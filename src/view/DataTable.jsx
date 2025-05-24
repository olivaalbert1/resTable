import React, { useEffect, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils"
// import { defaultData } from "../utils/defaultData";
import { spreadSheetData } from "../utils/getData";
import { getDistancia } from "../utils/getDistancia";
import classNames from "classnames";

const fuzzyfilter = (rows, columnId, value, addMeta) => {
    const itemRank = rankItem(rows.getValue(columnId), value);

    addMeta({ itemRank })

    return itemRank.passed
}

let defaultData = await spreadSheetData();

const DebouncedInput = ({ value: keyWord, onChange, ...props }) => {
    const [value, setValue] = useState(keyWord);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, 500);
        return () => clearTimeout(timeout);
    }, [value])

    return (
        <input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
}

export const DataTable = () => {
    const [data, setData] = React.useState(defaultData);
    const [globalFilter, setGlobalFilter] = useState('')

    const [sorting, setSorting] = useState([])

    const columns = [
        {
            accessorKey: "visited",
            header: () => <span>Visitado</span>
        },
        {
            accessorKey: "name",
            header: () => <span>Nombre</span>,
            cell: info => <span className="font-bold">{info.getValue()}</span>
        },
        {
            accessorKey: "address",
            header: () => <span>Dirección</span>
        },
        {
            accessorKey: "comments",
            header: () => <span>Comentarios</span>,
            enableSorting: false
        },
        {
            accessorKey: "maps",
            header: () => <span>Maps</span>,
            cell: info => {
                let distancia = getDistancia(info.getValue());
                return <a href={info.getValue()} target="_blank" rel="noreferrer">{distancia.latitud},{distancia.longitud}</a>
            }
        },
        {
            accessorKey: "lastUpdate",
            header: () => <span>Última actualización</span>,
            cell: info => {
                const date = new Date(info.getValue());
                return <span>{date.toLocaleDateString()} {date.toLocaleTimeString()}</span>
            }
        },
        {
            accessorKey: "hours",
            header: () => <span>Horario</span>,
            // cell: info => {
            //     const hours = info.getValue();
            //     return <div>
            //         {hours.map((hour, index) => (
            //             <div key={index}>
            //                 {hour.days}: {hour.hours}
            //             </div>
            //         ))}
            //     </div>
            // }
        }
    ]

    const getStateTable = () => {
        const totalRows = table.getFilteredRowModel().rows.length;
        const pageSize = table.getState().pagination.pageSize;
        const pageIndex = table.getState().pagination.pageIndex;
        const rowsPerPage = table.getRowModel().rows.length;

        const firstIndex = (pageIndex * pageSize) + 1;
        const lastIndex = (pageIndex * pageSize) + rowsPerPage;

        return {
            totalRows,
            firstIndex,
            lastIndex
        }
    }

    const table = useReactTable(
        {
            data,
            columns,
            state: {
                globalFilter,
                sorting
            },
            getCoreRowModel: getCoreRowModel({}),
            getPaginationRowModel: getPaginationRowModel({}),
            getFilteredRowModel: getFilteredRowModel(),
            globalFilterFn: fuzzyfilter,
            getSortedRowModel: getSortedRowModel(),
            onSortingChange: setSorting
        });
    return (
        <div className="py-6 px-4">
            <div className="my-2 text-right">
                <DebouncedInput
                    type="text"
                    value={globalFilter ?? ''}
                    className="p-2 text-gray-600 border border-gray-300 rounded outline-indigo-700"
                    onChange={value => setGlobalFilter(String(value))}
                    placeholder="Buscar..."
                />

            </div>
            <table className="bg-gray-900 table-auto w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="bg-gray-900 border-b border-gray-300 text-gray-600 bg-gray-100">
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="py-2 px-4 text-left uppercase">
                                    {
                                        header.isPlaceholder
                                            ? null
                                            :
                                            <div className={classNames({
                                                'cursor-pointer select-none': header.column.getCanSort()
                                            })}
                                                onClick={header.column.getToggleSortingHandler()
                                                }>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {header.column.getIsSorted() && (
                                                    <span className="ml-1">
                                                        {header.column.getIsSorted() ? '▼' : '▲'}
                                                    </span>
                                                )}
                                            </div>
                                    }

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
                    {getStateTable().firstIndex} - {getStateTable().lastIndex} de {getStateTable().totalRows}
                </div>
                <select className="text-gray-600 border border-gray-300 rounded outline-indigo-700"
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
    )
}

