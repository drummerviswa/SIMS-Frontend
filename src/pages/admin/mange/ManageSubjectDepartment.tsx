import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageSubjectDepartment() {
  return (
    <div className="max-w-[74rem] no-scrollbar">
      <ManageEntity
        apiEndpoint="/admin/manage/subject_department"
        entityName="Subject Department Mapping"
        columns={[
          { key: "id", label: "ID" },
          { key: "subCode", label: "Subject Code" },
          { key: "subName", label: "Subject Name" },
          { key: "department", label: "Department", fetchKey: "deptName" },
        ]}
        initialState={{}}
        inputOptions={[
          {
            key: "subject",
            label: "Subject",
            type: "select",
            fetchEndpoint: "/admin/manage/subject",
            selectLabel: ["subCode", "subName"],
            fetchKey: "subid",
          },
          {
            key: "department",
            label: "Department",
            type: "select",
            fetchEndpoint: "/admin/manage/department",
            fetchKey: "deptid",
            selectLabel: ["deptid", "deptName"],
          },
        ]}
        uniqueKey="id"
      />
    </div>
  );
}
