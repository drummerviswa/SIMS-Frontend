import ManageEntity from '../../../components/common/ManageEntity'

export default function DeptManageSubjects() {
  return (
    <div className="max-w-[74rem] no-scrollbar">
          <ManageEntity
            apiEndpoint="subjects"
            entityName="Subject"
            columns={[
              { key: "subId", label: "Subject ID" },
              { key: "subName", label: "Subject Name" },
              { key: "lectures", label: "Letures" },
              { key: "tutorials", label: "Tutorials" },
              { key: "practicals", label: "Practicals" },
              { key: "credits", label: "Credits" },
              { key: "totalHours", label: "Total Hours" },
              { key: "totalMarks", label: "Total Marks" },
              { key: "internalMarks", label: "Internal Marks" },
              { key: "externalMarks", label: "External Marks" },
              { key: "department", label: "Department" },
              { key: "degree", label: "Degree" },
              { key: "branch", label: "Branch" },
              { key: "regulation", label: "Regulation" },
              { key: "semester", label: "Semester" },
            ]}
            initialState={{}}
            inputOptions={[
              { key: "subId", label: "Subject ID", type: "text" },
              { key: "subName", label: "Subject Name", type: "text" },
              { key: "lectures", label: "Lectures", type: "text" },
              { key: "tutorials", label: "Tutorials", type: "text" },
              { key: "practicals", label: "Practicals", type: "text" },
              { key: "credits", label: "Credits", type: "text" },
              { key: "totalHours", label: "Total Hours", type: "text" },
              { key: "totalMarks", label: "Total Marks", type: "text" },
              { key: "internalMarks", label: "Internal Marks", type: "text" },
              { key: "externalMarks", label: "External Marks", type: "text" },
              {
                key: "department",
                label: "Department",
                type: "select",
                fetchEndpoint: "/departments",
                fetchKey: "deptId",
              },
              {
                key: "degree",
                label: "Degree",
                type: "select",
                fetchEndpoint: "/degrees",
                fetchKey: "degreeId",
              },
              {
                key: "branch",
                label: "Branch",
                type: "select",
                fetchEndpoint: "/branches",
                fetchKey: "branchId",
              },
              {
                key: "regulation",
                label: "Regulation",
                type: "select",
                fetchEndpoint: "/regulations",
                fetchKey: "rid",
              },
              {
                key: "semester",
                label: "Semester",
                type: "select",
                fetchEndpoint:
                  "/semesters?degree=Msc Integrated 5 Years&branch=Information Technology&regulation=R2019&department=Mathematics",
                fetchKey:
                  "/semesters?degree=Msc Integrated 5 Years&branch=Information Technology&regulation=R2019&department=Mathematics",
              },
            ]}
            uniqueKey="subId"
          />
        </div>
  )
}
