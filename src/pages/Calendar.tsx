import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { Modal } from "../components/ui/modal";
import { useModal } from "../hooks/useModal";
import PageMeta from "../components/common/PageMeta";
import API from "../utils/API"; // Your Axios wrapper

interface CalendarEvent extends EventInput {
  id: string;
  extendedProps: {
    calendar: string;
  };
}

const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const calendarsEvents = {
    Danger: "danger",
    Success: "success",
    Primary: "primary",
    Warning: "warning",
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/admin/academicPeriod");
      const formatted = res.data.map((ev: any) => ({
        id: ev.id.toString(),
        title: ev.title,
        start: ev.start,
        end: ev.end,
        extendedProps: { calendar: ev.level },
      }));
      setEvents(formatted);
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setEventStartDate(selectInfo.startStr);
    setEventEndDate(selectInfo.endStr || selectInfo.startStr);
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event as any;
    setSelectedEvent({
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      extendedProps: { calendar: event.extendedProps.calendar },
    });
    setEventTitle(event.title);
    setEventStartDate(event.startStr);
    setEventEndDate(event.endStr || event.startStr);
    setEventLevel(event.extendedProps.calendar);
    openModal();
  };

  const handleAddOrUpdateEvent = async () => {
    const payload = {
      title: eventTitle,
      start: eventStartDate,
      end: eventEndDate,
      level: eventLevel,
    };

    try {
      if (selectedEvent) {
        await API.put(`/admin/academicPeriod/${selectedEvent.id}`, payload);
      } else {
        await API.post("/admin/academicPeriod", payload);
      }
      fetchEvents();
      closeModal();
      resetModalFields();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    try {
      await API.delete(`/admin/academicPeriod/${selectedEvent.id}`);
      fetchEvents();
      closeModal();
      resetModalFields();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
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
      <PageMeta title="Academic Calendar" description="Manage academic events" />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="custom-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            selectable={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
          />
        </div>

        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
          <div className="flex flex-col px-2 overflow-y-auto">
            <h5 className="mb-2 text-xl font-semibold">{selectedEvent ? "Edit Event" : "Add Event"}</h5>

            <label className="block mt-4">Title</label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="input input-bordered w-full"
            />

            <label className="block mt-4">Color</label>
            <div className="flex gap-4">
              {Object.entries(calendarsEvents).map(([key]) => (
                <label key={key} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="color"
                    value={key}
                    checked={eventLevel === key}
                    onChange={() => setEventLevel(key)}
                  />
                  {key}
                </label>
              ))}
            </div>

            <label className="block mt-4">Start Date</label>
            <input
              type="date"
              value={eventStartDate}
              onChange={(e) => setEventStartDate(e.target.value)}
              className="input input-bordered w-full"
            />

            <label className="block mt-4">End Date</label>
            <input
              type="date"
              value={eventEndDate}
              onChange={(e) => setEventEndDate(e.target.value)}
              className="input input-bordered w-full"
            />

            <div className="flex justify-end gap-3 mt-6">
              {selectedEvent && (
                <button onClick={handleDeleteEvent} className="btn btn-error">
                  Delete
                </button>
              )}
              <button onClick={handleAddOrUpdateEvent} className="btn btn-primary">
                {selectedEvent ? "Update" : "Add"}
              </button>
              <button onClick={closeModal} className="btn btn-ghost">
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

const colorMap: Record<string, { bg: string; text: string }> = {
  danger: { bg: "bg-red-100", text: "text-red-800" },
  success: { bg: "bg-green-100", text: "text-green-800" },
  primary: { bg: "bg-blue-100", text: "text-blue-800" },
  warning: { bg: "bg-yellow-100", text: "text-yellow-800" },
};


const renderEventContent = (eventInfo: any) => {
  const level = eventInfo.event.extendedProps.calendar?.toLowerCase();
  const colors = colorMap[level] || { bg: "bg-gray-100", text: "text-gray-800" };

  return (
    <div className={`p-1 rounded ${colors.bg} ${colors.text}`}>
      {/* <strong>{eventInfo.timeText}</strong> */}
      <div>{eventInfo.event.title}</div>
    </div>
  );
};

export default Calendar;
