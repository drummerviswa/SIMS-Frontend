/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import ManageEntity from "./ManageEntity";

interface Entity {
  [key: string]: any;
}

export default function GrievanceEntity({
  apiEndpoint,
  initialState,
  columns,
  entityName,
  inputOptions,
  uniqueKey,
}) {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [formData, setFormData] = React.useState<Entity>(initialState);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await API.get(apiEndpoint);
        setEntities(response.data);
      } catch (error) {
        if (error?.response?.status === 404) {
          setEntities([]);
        } else {
          console.error(`Error fetching grievances:`, error);
        }
      }
    };
    fetchEntities();
  }, [apiEndpoint]);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    try {
      const formattedData: Entity = { ...formData };
      await API.post(apiEndpoint, formattedData);
    } catch (error) {
      console.error(`Error adding ${entityName}:`, error);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="dark:bg-gray-dark bg-white px-4 py-2 rounded-xl  flex-1">
        <form>
          <div className="flex flex-col gap-4">
            <label className="text-lg font-semibold dark:text-gray-25">
              {entityName}
            </label>
            <textarea
              name="gMessage"
              onChange={handleChange}
              className="border border-gray-600 rounded p-2 dark:text-gray-25"
              placeholder="Type your message here..."
              rows={8}
            ></textarea>
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex-2">
        <ManageEntity
          apiEndpoint={apiEndpoint}
          columns={columns}
          entityName={entityName}
          initialState={initialState}
          inputOptions={inputOptions}
          uniqueKey={uniqueKey}
        />
      </div>
    </div>
  );
}
