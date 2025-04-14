import ManageEntity from "../../../components/common/ManageEntity";

export default function DeptManageSubjects() {
  const department = localStorage.getItem("department");
  const departmentData = department ? JSON.parse(department) : null;
  const departmentId = departmentData ? departmentData.deptid : null;
  return (
    <div className="max-w-[74rem] no-scrollbar">
      <ManageEntity
        apiEndpoint={`/department/manage/subject/${departmentId}`}
        entityName="Subject"
        columns={[
          { key: "subid", label: "Subject ID" },
          { key: "subName", label: "Subject Name" },
          { key: "subCode", label: "Subject Code" },
          { key: "l", label: "Letures" },
          { key: "t", label: "Tutorials" },
          { key: "p", label: "Practicals" },
          { key: "c", label: "Credits" },
          { key: "assess1", label: "Assessment I" },
          { key: "assess2", label: "Assessment II" },
          { key: "endsem", label: "End Semester" },
          { key: "cperiod", label: "Hours" },
          { key: "type", label: "Type" },
          { key: "regulation", label: "Regulation" },
        ]}
        initialState={{}}
        inputOptions={[
          { key: "subName", label: "Subject Name", type: "text" },
          { key: "subCode", label: "Subject Code", type: "text" },
          {
            key: "component",
            label: "Component",
            type: "select",
            fetchEndpoint: "/admin/manage/assesscomp",
            fetchKey: "acid",
            selectLabel: [
              "regName",
              "l",
              "t",
              "p",
              "c",
              "assess1",
              "assess2",
              "endsem",
              "cperiod",
              "type",
            ],
          },
        ]}
        uniqueKey="subid"
      />
    </div>
  );
}
