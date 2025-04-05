import ManageEntity from "../../../components/common/ManageEntity";
export default function ManageRegulation() {
  return (
    <ManageEntity
      apiEndpoint="regulations"
      entityName="Regulation"
      columns={[
        { key: "rid", label: "RID" },
        { key: "regName", label: "Regulation Name" },
        { key: "startDate", label: "Start Date" },
        { key: "endDate", label: "End Date" },
      ]}
      initialState={{}}
      inputOptions={[
        {
          key: "regName",
          label: "Regulation Name",
          type: "text",
        },
        {
          key: "startDate",
          label: "Start Date",
          type: "date",
        },
        {
          key: "endDate",
          label: "End Date",
          type: "date",
        },
      ]}
      uniqueKey="rid"
    />
  );
}
