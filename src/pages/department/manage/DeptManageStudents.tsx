import ManageEntity from "../../../components/common/ManageEntity";

export default function DeptManageStudents() {
  return (
    <ManageEntity
      entityName="Students"
      apiEndpoint={`/department/manage/student/department/${1}`}
      columns={[
        { key: "regNo", label: "Register No" },
        { key: "sName", label: "Name" },
        { key: "degree", label: "Degree", fetchKey: "degName" },
        { key: "branch", label: "Branch", fetchKey: "branchName" },
        { key: "batch", label: "batch", fetchKey: "batchName" },
      ]}
      initialState={{}}
      inputOptions={[
        { key: "regNo", label: "Register No", type: "number" },
        { key: "sName", label: "Name", type: "text" },
        {
          key: "degree",
          label: "Degree",
          type: "select",
          fetchEndpoint: "/admin/manage/degree",
          selectMultiple: false,
          selectLabel: ["degid", "degName"],
          fetchKey: "degid",
        },
        {
          key: "branch",
          label: "Branch",
          type: "select",
          fetchEndpoint: "/admin/manage/branch",
          selectMultiple: false,
          selectLabel: ["bid", "branchName"],
          fetchKey: "bid",
        },
        {
          key: "batch",
          label: "Batch",
          type: "select",
          fetchEndpoint: "/admin/manage/batch",
          selectMultiple: false,
          selectLabel: ["batchid", "batchName"],
          fetchKey: "batchid",
        },
      ]}
      uniqueKey="regNo"
    />
  );
}
