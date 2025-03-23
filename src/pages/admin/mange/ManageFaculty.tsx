import { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import { useModal } from "../../../hooks/useModal";
import PageMeta from "../../../components/common/PageMeta";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  extendedProps: { calendar: string };
}

const ManageFaculty: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { isOpen, openModal, closeModal } = useModal();

  const calendarsEvents = {
    Fifteen: "2015",
    Nineteen: "2019",
    "Twenty three": "2023",
  };

  const handleAddOrUpdateEvent = () => {
    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: eventTitle,
                start: eventStartDate,
                end: eventEndDate,
                extendedProps: { calendar: eventLevel },
              }
            : event
        )
      );
    } else {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: eventStartDate,
        end: eventEndDate,
        allDay: true,
        extendedProps: { calendar: eventLevel },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    closeModal();
    resetModalFields();
  };

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventLevel("");
    setSelectedEvent(null);
  };

  return (
    <>
      <PageMeta
        title="React.js Calendar Dashboard | TailAdmin"
        description="This is React.js Calendar Dashboard page for TailAdmin."
      />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="dark:bg-gray-dark bg-white px-4 py-2 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={openModal}
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Add Regulation
            </button>
          </div>

          {/* Regulation List Table */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">S.No</th>
                  <th className="px-6 py-3">Regulation Name</th>
                  <th className="px-6 py-3">Start Date</th>
                  <th className="px-6 py-3">End Date</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr
                    key={event.id}
                    className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{event.title}</td>
                    <td className="px-6 py-4">{event.start}</td>
                    <td className="px-6 py-4">{event.end}</td>
                    <td className="px-6 py-4 flex gap-x-2">
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setEventTitle(event.title);
                          setEventStartDate(event.start);
                          setEventEndDate(event.end);
                          setEventLevel(event.extendedProps.calendar);
                          openModal();
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          setEvents((prev) =>
                            prev.filter((e) => e.id !== event.id)
                          )
                        }
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] p-6"
        >
          <div className="flex flex-col px-2">
            <h5 className="mb-2 font-semibold text-gray-800 text-xl dark:text-white">
              {selectedEvent ? "Edit Regulation" : "Add Regulation"}
            </h5>
            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Regulation Title
              </label>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-blue-300"
              />
            </div>
            <div className="mt-6">
              <label className="block mb-4 text-sm font-medium text-gray-700">
                Regulation Year
              </label>
              <div className="flex flex-wrap items-center gap-4">
                {Object.entries(calendarsEvents).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="radio"
                      name="event-level"
                      value={key}
                      id={`modal${key}`}
                      checked={eventLevel === key}
                      onChange={() => setEventLevel(key)}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`modal${key}`}
                      className="text-sm text-gray-700"
                    >
                      {value}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex gap-x-4">
              <button
                onClick={handleAddOrUpdateEvent}
                className="bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ManageFaculty;
