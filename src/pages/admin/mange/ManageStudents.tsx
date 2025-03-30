import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageStudents() {
  return (
    <ManageEntity
      entityName="Students"
      apiEndpoint="students"
      columns={[
        { key: "sid", label: "id" },
        { key: "registerNo", label: "Register No" },
        { key: "email", label: "Email" },
        { key: "department", label: "Department" },
        { key: "name", label: "Name" },
        { key: "phone", label: "Phone" },
        { key: "dob", label: "Date of Birth" },
      ]}
      initialState={{
        id: 0,
        sid: 0, 
        registerNo: "2022242001",
        email: "drummerviswa@gmail.com",
        department: "Mathematics",
        name: "Viswanathan P",
        phone: "9003136720",
        dob: "30-10-2004",
      }}
      inputOptions={[
        { key: "name", label: "Name", type: "text" },
        { key: "registerNo", label: "Register No", type: "text" },
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
    />
  );
}
