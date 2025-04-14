import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageFacSubjects() {
  const department = localStorage.getItem("department");
  const departmentData = department ? JSON.parse(department) : null;
  const departmentId = departmentData ? departmentData.deptid : null;
  return (
    <div className="max-w-[74rem] no-scrollbar">
      <ManageEntity
        entityName="Subject Mapping"
        apiEndpoint={`/department/manage/subjectAssign/${departmentId}`}
        columns={[
          { key: "assignid", label: "Subject ID" },
          { key: "subName", label: "Subject Name" },
          { key: "facid", label: "Faculty ID" },
          { key: "facName", label: "Faculty Name" },
          { key: "subCode", label: "Subject Code" },
          { key: "batchName", label: "Batch Name" },
          { key: "degName", label: "Degree Name" },
          { key: "branchName", label: "Branch Name" },
          { key: "semester", label: "Semester" },
        ]}
        initialState={{}}
        inputOptions={[
          {
            key: "subject",
            label: "Subject",
            type: "select",
            fetchEndpoint: "/admin/manage/subject",
            fetchKey: "subid",
            selectLabel: ["subCode", "subName"],
          },
          {
            key: "faculty",
            label: "Faculty",
            type: "select",
            fetchEndpoint: "/admin/manage/faculty",
            fetchKey: "facid",
            selectLabel: ["facid", "facName"],
          },
          {
            key: "batch",
            label: "Batch",
            type: "select",
            fetchEndpoint: "/admin/manage/batch",
            fetchKey: "batchid",
            selectLabel: ["batchid", "batchName", "regName"],
          },
          {
            key: "degree",
            label: "Degree",
            type: "select",
            fetchEndpoint: "/admin/manage/degree",
            fetchKey: "degid",
            selectLabel: ["degid", "degName"],
          },
          {
            key: "branch",
            label: "Branch",
            type: "select",
            fetchEndpoint: "/admin/manage/branch",
            fetchKey: "bid",
            selectLabel: ["bid", "degName", "branchName"],
          },
          {
            key: "semester",
            label: "Semester",
            type: "select",
            static: true,
            options: [
              { key: "", label: "Select Semester" },
              { key: 1, label: 1 },
              { key: 2, label: 2 },
              { key: 3, label: 3 },
              { key: 4, label: 4 },
              { key: 5, label: 5 },
              { key: 6, label: 6 },
              { key: 7, label: 7 },
              { key: 8, label: 8 },
              { key: 9, label: 9 },
              { key: 10, label: 10 },
            ],
          },
        ]}
        uniqueKey={"assignid"}
      />
    </div>
  );
}
