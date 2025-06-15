/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

type RawMarkEntry = {
  regNo: number;
  isLocked: number;
  enteredMark: number | null;
  studentName: string;
  subCriteria: string;
  subSplitupId: number;
  subWeightage: number;
};

type RawCriteriaGroup = {
  criteriaName: string;
  StudentMarksBreakdown: RawMarkEntry[];
  mainWeightage: number;
};

type Subsplitup = {
  subCriteria: string;
  subWeightage: number;
  enteredMark?: number;
};

type Person = {
  regNo: number;
  sName: string;
  SubCriteriaBreakdown: Subsplitup[];
  total: number;
};

interface ViewAssessmentMarksTableProps {
  rawData: RawCriteriaGroup[];
}

const ViewAssessmentMarksTable: React.FC<ViewAssessmentMarksTableProps> = ({
  rawData,
}) => {
  const studentMap = new Map<number, Person>();

  rawData.forEach((criteria) => {
    criteria.StudentMarksBreakdown.forEach((entry) => {
      const sub: Subsplitup = {
        subCriteria: entry.subCriteria,
        subWeightage: entry.subWeightage,
        enteredMark: entry.enteredMark ?? undefined,
      };

      if (studentMap.has(entry.regNo)) {
        const student = studentMap.get(entry.regNo)!;
        student.SubCriteriaBreakdown.push(sub);
        student.total += entry.enteredMark ?? 0;
      } else {
        studentMap.set(entry.regNo, {
          regNo: entry.regNo,
          sName: entry.studentName,
          SubCriteriaBreakdown: [sub],
          total: entry.enteredMark ?? 0,
        });
      }
    });
  });

  const tableData = Array.from(studentMap.values());

  const allSubCriteria = Array.from(
    new Set(
      rawData.flatMap((c) => c.StudentMarksBreakdown.map((s) => s.subCriteria))
    )
  );

  const columns: ColumnDef<Person>[] = [
    {
      accessorKey: "regNo",
      header: "Reg No",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "sName",
      header: "Student Name",
      cell: (info) => info.getValue(),
    },
    ...allSubCriteria.map((sub) => ({
      accessorKey: sub,
      header: sub,
      cell: ({ row }) => {
        const subMark = row.original.SubCriteriaBreakdown.find(
          (s) => s.subCriteria === sub
        );
        return subMark?.enteredMark ?? "-";
      },
    })),
    {
      accessorKey: "total",
      header: "Total",
      cell: (info) => info.getValue(),
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">
      {/* Splitup */}
      <div className="-mt-6">
        <h2 className="flex gap-4">
          {rawData.map((crit) => (
            <h3>
              {crit.criteriaName} - {crit.mainWeightage}
            </h3>
          ))}
        </h2>
      </div>
      <div className="overflow-x-auto rounded-xl shadow ring-1 ring-gray-300 dark:ring-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 font-medium whitespace-nowrap text-left"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 whitespace-nowrap text-gray-800 dark:text-gray-100"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAssessmentMarksTable;
