import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageDepartment() {
  return (
    <ManageEntity
      initialState={[]}
      entityName="Department"
      apiEndpoint="/admin/manage/department"
      columns={[
        { key: "deptid", label: "Department ID" },
        { key: "deptName", label: "Department Name" },
        { key: "username", label: "Username" },
        { key: "password", label: "Password" },
      ]}
      inputOptions={[
        { key: "deptName", label: "Department Name", type: "text" },
        { key: "username", label: "Username", type: "text" },
        { key: "password", label: "Password", type: "text" },
      ]}
      uniqueKey="deptid"
    />
  );
}
