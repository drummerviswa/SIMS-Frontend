import ManageEntity from "../../../components/common/ManageEntity";

const ManageFaculty = () => {
  return (
    <ManageEntity
      apiEndpoint="faculties"
      entityName="Faculty"
      columns={[
        { key: "fid", label: "FID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "password", label: "Password" },
        { key: "phone", label: "Phone" },
        { key: "department", label: "Department" },
      ]}
      initialState={{
        fid: 0,
        name: "Kamala Kannan",
        email: "kingpinkamal@gmail.com",
        password: "kamal@123",
        phone: "1234567890",
        department: "Mathematics",

      }}
      inputOptions={[
        {
          key: "name",
          label: "Name",
          type: "text",
        },
        {
          key: "email",
          label: "Email",
          type: "email",
        },
        {
          key: "password",
          label: "Password",
          type: "text",
        },
        {
          key: "phone",
          label: "Phone",
          type: "text",
        },
        {
          key: "department",
          label: "Department",
          type: "select",
          fetchEndpoint: "/departments",
          fetchKey: "deptId",
        },
      ]}
      uniqueKey="fid"
    />
  );
};

export default ManageFaculty;
