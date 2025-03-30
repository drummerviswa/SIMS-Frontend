import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageDepartment() {
  return (
    <ManageEntity
      entityName="Department"
      apiEndpoint="/departments"
      columns={[
        { key: "deptid", label: "Department ID" },
        { key: "name", label: "Department Name" },
        { key: "username", label: "Username" },
        { key: "password", label: "Password" },
      ]}
      initialState={{
        deptid: 0,
        name: "Department of Mathematics",
        username: "dom",
        password: "DOMLAB.local",
      }}
      inputOptions={[
        { key: "name", label: "Department Name", type: "text" },
        { key: "username", label: "Username", type: "text" },
        { key: "password", label: "Password", type: "text" },
      ]}
      uniqueKey="deptid"
    />
  );
}
