import React, { useState } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import StatusDot from './StatusDot';
import RoleBadge from './RoleBadge';
export interface Employee {
  id: string;
  avatar: string;
  name: string;
  designation: string;
  email: string;
  role: 'Employee' | 'Super Admin' | 'Human Resource' | 'Manager' | 'Team Lead';
  reportingTo: string;
  status: 'active' | 'inactive' | 'pending' | 'on-leave';
}
interface EmployeeTableProps {
  data: Employee[];
}
const columnHelper = createColumnHelper<Employee>();
const EmployeeTable: React.FC<EmployeeTableProps> = ({
  data
}) => {
  const [rowSelection, setRowSelection] = useState({});
  const columns = [columnHelper.display({
    id: 'select',
    header: ({
      table
    }) => <input type="checkbox" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500" />,
    cell: ({
      row
    }) => <input type="checkbox" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500" />,
    enableSorting: false
  }), columnHelper.accessor('name', {
    header: 'Employee',
    cell: ({
      row
    }) => <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img className="h-10 w-10 rounded-full object-cover" src={row.original.avatar} alt={row.original.name} />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{row.original.name}</div>
            <RoleBadge role={row.original.designation as any} className="mt-1" />
          </div>
        </div>
  }), columnHelper.accessor('email', {
    header: 'Email',
    cell: info => <div className="text-sm text-gray-500">{info.getValue()}</div>
  }), columnHelper.accessor('role', {
    header: 'User Role',
    cell: info => <div className="inline-flex items-center px-2.5 py-1 rounded-md text-sm bg-gray-100 text-gray-800">
          {info.getValue()}
        </div>
  }), columnHelper.accessor('reportingTo', {
    header: 'Reporting To',
    cell: info => <div className="inline-flex items-center px-2.5 py-1 rounded-md text-sm bg-gray-100 text-gray-800">
          {info.getValue()}
        </div>
  }), columnHelper.accessor('status', {
    header: 'Status',
    cell: info => <StatusDot status={info.getValue()} />
  }), columnHelper.display({
    id: 'actions',
    header: 'Action',
    cell: () => <div className="relative inline-block text-left">
          <button className="text-gray-500 hover:text-gray-700">
            <MoreHorizontal size={18} />
          </button>
        </div>
  })];
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });
  return <div className="flex flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map(headerGroup => <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => <th key={header.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>)}
                  </tr>)}
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {table.getRowModel().rows.map(row => <tr key={row.id} className={row.getIsSelected() ? 'bg-amber-50' : undefined}>
                    {row.getVisibleCells().map(cell => <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>)}
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)}
              </span>{' '}
              of <span className="font-medium">{data.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>;
};
export default EmployeeTable;