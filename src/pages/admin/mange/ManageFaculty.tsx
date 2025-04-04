import ManageEntity from "../../../components/common/ManageEntity";

const ManageFaculty = () => {
  return (
    <ManageEntity
      apiEndpoint="/admin/manage/faculty"
      entityName="Faculty"
      columns={[
        { key: "facid", label: "FID" },
        { key: "facName", label: "Name" },
        { key: "username", label: "Username" },
        { key: "password", label: "Password" },
        { key: "primaryDept", label: "Department", fetchKey: "deptName" },
        { key: "designation", label: "Designation" },
      ]}
      initialState={{}}
      inputOptions={[
        {
          key: "facName",
          label: "Name",
          type: "text",
        },
        {
          key: "username",
          label: "username",
          type: "email",
        },
        {
          key: "password",
          label: "Password",
          type: "text",
        },
        {
          key: "designation",
          label: "Designation",
          type: "select",
          static: true,
          options: [
            { key: "", label: "Select" },
            { key: "Professor", label: "Professor" },
            { key: "Assistant Professor", label: "Assistant Professor" },
            { key: "Associate Professor", label: "Associate Professor" },
            { key: "Teaching Fellow", label: "Teaching Fellow" },
          ],
        },
        {
          key: "primaryDept",
          label: "Department",
          type: "select",
          fetchEndpoint: "/admin/manage/department",
          selectMultiple: true,
          selectLabel: ["deptid", "deptName"],
          fetchKey: "deptid",
        },
      ]}
      uniqueKey="facid"
    />
  );
};

export default ManageFaculty;
