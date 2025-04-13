//	acid	l	t	p	c	assess1	assess2	endsem	cperiod	type	regulation
import ManageEntity from "../../../components/common/ManageEntity";

export default function ManageAssessComp() {
  return (
    <div className="max-w-[74rem] no-scrollbar">
      <ManageEntity
        apiEndpoint="/admin/manage/assesscomp"
        entityName="Assess Components"
        columns={[
          { key: "acid", label: "ACID" },
          { key: "l", label: "Lecture" },
          { key: "t", label: "Tutorial" },
          { key: "p", label: "Practical" },
          { key: "c", label: "Credits" },
          { key: "assess1", label: "Assessment 1" },
          { key: "assess2", label: "Assessment 2" },
          { key: "endsem", label: "End Semester" },
          { key: "cperiod", label: "Contact Period" },
          { key: "cperiod", label: "C Period" },
          { key: "type", label: "Type" },
          { key: "written", label: "Written" },
          { key: "assignment", label: "Assignment" },
          { key: "regulation", label: "Regulation", fetchKey: "regName" },
        ]}
        initialState={{}}
        inputOptions={[
          { key: "l", label: "Lecture", type: "number" },
          { key: "t", label: "Tutorial", type: "number" },
          { key: "p", label: "Practical", type: "number" },
          { key: "c", label: "Credits", type: "number" },
          { key: "assess1", label: "Assessment 1", type: "number" },
          { key: "assess2", label: "Assessment 2", type: "number" },
          { key: "endsem", label: "End Semester", type: "number" },
          { key: "cperiod", label: "Contact Period", type: "number" },
          { key: "assignment", label: "Assignment", type: "number" },
          { key: "written", label: "Written", type: "number" },
          {
            key: "type",
            label: "Type",
            type: "select",
            static: true,
            options: [
              { label: "Select the Type", key: "" },
              { label: "Theory", key: "theory" },
              { label: "Laboratory", key: "lab" },
              { label: "Theory Cum Lab", key: "theoryCumLab" },
              { label: "Internal only", key: "internal" },
            ],
          },
          {
            key: "regulation",
            label: "Regulation",
            type: "select",
            fetchEndpoint: "/admin/manage/regulation",
            fetchKey: "rid",
            selectLabel: ["rid", "regName"],
          },
        ]}
        uniqueKey="acid"
      />
    </div>
  );
}
