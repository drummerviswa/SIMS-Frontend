/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
} from "@tanstack/react-table";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import API from "../../utils/API";

type Subsplitup = {
  subCriteria: string;
  subWeightage: number;
  enteredMark?: number;
  subid?: string;
  msid?: string;
  subsplitid?: string;
  tenure?: string;
};

type Person = {
  regNo: string | number;
  sName: string;
  criteriaName: string;
  subject: string;
  mainCriteria: string;
  tenure: string;
  mainWeightage: number;
  SubCriteriaBreakdown: Subsplitup[];
  total?: number;
};

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

interface ViewMarksTableProps {
  data: Person[];
  submitURL: string;
}

const ViewMarksTable: React.FC<ViewMarksTableProps> = ({
  data,
  submitURL,
}) => {
  const rerender = React.useReducer(() => ({}), {})[1];
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const [isTableLocked, setIsTableLocked] = useState(true);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [tableData, setTableData] = useState<Person[]>(data);
  const [isChangesMade, setIsChangesMade] = useState(false);
  const allMarksEntered = tableData.every((student) =>
    student.SubCriteriaBreakdown.every(
      (sub) => typeof sub.enteredMark === "number"
    )
  );

  const handleSubmit = async () => {
    if (!allMarksEntered) return alert("Please enter all marks.");

    try {
      await API.post(submitURL, tableData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Marks submitted successfully.");
    } catch (error) {
      console.error("Error submitting marks:", error);
      alert("Error submitting marks. Please try again.");
    }
  };

  const handleUpdate = async () => {
    if (window.confirm("Do you want to update the marks?")) {
      setIsTableLocked(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await API.put(`${submitURL}/update`, tableData);
      alert("Marks updated successfully.");
      setIsTableLocked(true);
      setIsChangesMade(false);
    } catch (error) {
      console.error("Error updating marks:", error);
      alert("Error updating marks. Please try again.");
    }
  };

  useEffect(() => {
    const initialized = data.map((student) => {
      const hasMarks = student.SubCriteriaBreakdown.some(
        (sub) => typeof sub.enteredMark === "number"
      );
      if (hasMarks) setIsUpdateMode(true);
      return {
        ...student,
        SubCriteriaBreakdown: student.SubCriteriaBreakdown.map((sub) => ({
          ...sub,
        })),
      };
    });

    setTableData(initialized);
    console.log("Initialized data:", initialized);
    
  }, [data]);

  const columns = React.useMemo<ColumnDef<Person>[]>(() => {
    if (!data || !data[0]?.SubCriteriaBreakdown) return [];
    
    const staticColumns: ColumnDef<Person>[] = [
      {
        header: "Student Info",
        columns: [
          {
            accessorKey: "regNo",
            header: "Reg No",
            cell: ({ getValue }) => <div>{getValue()}</div>,
          },
          {
            accessorKey: "sName",
            header: "Student Name",
            cell: ({ getValue }) => <div>{getValue()}</div>,
          },
          {
            accessorKey: "criteriaName",
            header: "Main Criteria",
            cell: ({ getValue }) => <div>{getValue()}</div>,
          },
        ],
      },
    ];

    const dynamicColumns: ColumnDef<Person>[] =
      data[0].SubCriteriaBreakdown.map((sub) => ({
        accessorKey: sub.subCriteria,
        header: `${sub.subCriteria} (${sub.subWeightage})`,
        cell: ({ row, column, table }) => {
          const subItem = row.original.SubCriteriaBreakdown.find(
            (s) => s.subCriteria === column.id
          );
          const [inputValue, setInputValue] = useState(
            subItem?.enteredMark?.toString()
          );

          useEffect(() => {
            setInputValue(subItem?.enteredMark?.toString());
          }, [subItem?.enteredMark]);

          const handleBlur = () => {
            const parsed = parseFloat(inputValue);
            const validMark =
              !isNaN(parsed) &&
              parsed >= 0 &&
              parsed <= (subItem?.subWeightage || 0)
                ? parsed
                : subItem?.subWeightage;

            const updatedData = [...tableData];
            updatedData[row.index].SubCriteriaBreakdown = updatedData[
              row.index
            ].SubCriteriaBreakdown.map((sub) => {
              if (sub.subCriteria === column.id) {
                return { ...sub, enteredMark: validMark };
              }
              return sub;
            });

            updatedData[row.index].total = updatedData[
              row.index
            ].SubCriteriaBreakdown.reduce(
              (sum, sub) => sum + (sub.enteredMark || 0),
              0
            );

            setTableData(updatedData);
            setIsChangesMade(true);
            rerender();
          };

          return (
            <input
              type="number"
              value={inputValue}
              min={0}
              max={subItem?.subWeightage || 0}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleBlur}
              disabled={isTableLocked}
              className={`w-full px-2 py-1 text-sm border rounded-lg focus:outline-none ${
                isTableLocked
                  ? "bg-gray-200 cursor-not-allowed"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
            />
          );
        },
      }));

    const totalColumn: ColumnDef<Person> = {
      accessorKey: "total",
      header: `Total (${data[0].SubCriteriaBreakdown.reduce(
        (sum, sub) => sum + sub.subWeightage,
        0
      )})`,
      cell: ({ row }) => {
        const total = row.original.SubCriteriaBreakdown.reduce(
          (sum, sub) => sum + (sub.enteredMark || 0),
          0
        );
        return total;
      },
    };

    return [...staticColumns, ...dynamicColumns, totalColumn];
  }, [data, isTableLocked]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        skipAutoResetPageIndex();
        const updatedData = [...tableData];
        const subCriteria = columnId;

        const updatedBreakdown = updatedData[rowIndex].SubCriteriaBreakdown.map(
          (sub) => {
            if (sub.subCriteria === subCriteria) {
              return {
                ...sub,
                enteredMark: value as number,
              };
            }
            return sub;
          }
        );

        updatedData[rowIndex].SubCriteriaBreakdown = updatedBreakdown;

        updatedData[rowIndex].total = updatedBreakdown.reduce(
          (sum, sub) => sum + (sub.enteredMark || 0),
          0
        );

        setTableData(updatedData);
        rerender();
      },
    },
  });

  return (
    <div className="relative overflow-x-auto p-4">
      <div className="mb-4 flex gap-4">
        {!isUpdateMode && (
          <button
            onClick={() => setIsTableLocked((prev) => !prev)}
            className={`px-4 py-2 rounded text-white flex items-center gap-2 ${
              isTableLocked
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isTableLocked ? <FaLockOpen /> : <FaLock />}
            {isTableLocked ? "Unlock Table" : "Lock Table"}
          </button>
        )}

        {isTableLocked && (
          <>
            {isUpdateMode ? (
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded text-white flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
              >
                Update Marks
              </button>
            ) : (
              <button
                disabled={!allMarksEntered}
                onClick={handleSubmit}
                className={`px-4 py-2 rounded text-white flex items-center gap-2 ${
                  allMarksEntered
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Submit Marks
              </button>
            )}
          </>
        )}

        {!isTableLocked && isChangesMade && (
          <button
            onClick={handleSaveChanges}
            className="px-4 py-2 rounded text-white flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            Save Changes
          </button>
        )}
      </div>
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs uppercase bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 border-b border-gray-300"
                >
                  {header.isPlaceholder
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
          {table &&
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="bg-white border-b even:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewMarksTable;
