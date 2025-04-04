import ManageEntity from "../../../components/common/ManageEntity";
export default function ManageRegulation() {
  return (
    <ManageEntity
      apiEndpoint="/admin/manage/regulation"
      entityName="Regulation"
      columns={[
        { key: "rid", label: "RID" },
        { key: "regName", label: "Regulation Name" },
        { key: "start", label: "Start Date" },
        { key: "end", label: "End Date" },
      ]}
      initialState={{}}
      inputOptions={[
        {
          key: "regName",
          label: "Regulation Name",
          type: "text",
        },
        {
          key: "start",
          label: "Start Date",
          type: "date",
        },
        {
          key: "end",
          label: "End Date",
          type: "date",
        },
      ]}
      uniqueKey="rid"
    />
  );
}
