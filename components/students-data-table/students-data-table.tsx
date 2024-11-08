"use client";

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
    ColumnDef, SortingState, ColumnFiltersState, flexRender, getCoreRowModel, getFacetedRowModel,
    getFacetedUniqueValues, getFilteredRowModel, getSortedRowModel, useReactTable,
    RowData
} from '@tanstack/react-table';

interface StudentsDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  withViewBtn?: boolean;
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    deleteRow: (rowIndex: number) => void
  }
}

export function StudentsDataTable<TData, TValue>({
  columns,
  data,
  withViewBtn = false
}: StudentsDataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([])
  const [tableData, setTableData] = useState(data)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting
    },
    meta: {
      deleteRow: rowIndex => {
        setTableData(prev => prev.filter((_, index) => index !== rowIndex))
      }
    },
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <>
      <div className="flex items-center py-4 space-x-4">
        <Input
          placeholder="Filter Student ID..."
          value={(table.getColumn("studentId")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("studentId")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter Semester ID..."
          value={(table.getColumn("semesterId")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("semesterId")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='h-10'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={withViewBtn ? 'py-1' : 'py-2'}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
