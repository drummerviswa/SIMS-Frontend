import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageStudents() {
  return (
    <ManageEntity
      entityName="Students"
      apiEndpoint="students"
      columns={[
        { key: "regNo", label: "Register No" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "department", label: "Department" },
        { key: "degree", label: "Degree" },
        { key: "branch", label: "Branch" },
      ]}
      initialState={{}}
      inputOptions={[
        { key: "name", label: "Name", type: "text" },
        { key: "regNo", label: "Register No", type: "text" },
        {
          key: "department",
          label: "Department",
          type: "select",
          fetchEndpoint: "departments",
          fetchKey: "id",
        },
        { key: "email", label: "Email", type: "email" },
        { key: "phone", label: "Phone", type: "text" },
        { key: "dob", label: "Date of Birth", type: "date" },
      ]}
      uniqueKey="regNo"
    />
  );
}
