import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";
import PageMeta from "../components/common/PageMeta";
import API from "../utils/API";

interface CalendarEvent extends EventInput {
  id: string;
  extendedProps: {
    calendar: string;
  };
}

const CalView: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);

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

  return (
    <>
      <PageMeta title="Academic Calendar" description="View academic events" />
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
            selectable={false}
            eventClick={() => {}} // disables edit modal
            eventContent={renderEventContent}
          />
        </div>
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
  

export default CalView;
