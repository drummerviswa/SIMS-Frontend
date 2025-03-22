import { useState, useRef, useEffect } from 'react'
import { Modal } from '../../../components/ui/modal'
import { useModal } from '../../../hooks/useModal'
import PageMeta from '../../../components/common/PageMeta'



const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [eventTitle, setEventTitle] = useState('')
  const [eventStartDate, setEventStartDate] = useState('')
  const [eventEndDate, setEventEndDate] = useState('')
  const [eventLevel, setEventLevel] = useState('')
  const [events, setEvents] = useState([])
  const { isOpen, openModal, closeModal } = useModal()

  const calendarsEvents = {
    Fifteen: '2015',
    Nineteen: '2019',
    "Twenty three": '2023',
    
  }

  useEffect(() => {
    
    setEvents([
      
    ])
  }, [])

  // const handleDateSelect = (selectInfo: DateSelectArg) => {
  //   resetModalFields()
  //   setEventStartDate(selectInfo.startStr)
  //   setEventEndDate(selectInfo.endStr || selectInfo.startStr)
  //   openModal()
  // }

  // const handleEventClick = (clickInfo: EventClickArg) => {
  //   const event = clickInfo.event
  //   setSelectedEvent(event as unknown as CalendarEvent)
  //   setEventTitle(event.title)
  //   setEventStartDate(event.start?.toISOString().split('T')[0] || '')
  //   setEventEndDate(event.end?.toISOString().split('T')[0] || '')
  //   setEventLevel(event.extendedProps.calendar)
  //   openModal()
  // }

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
      )
    } else {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: eventStartDate,
        end: eventEndDate,
        allDay: true,
        extendedProps: { calendar: eventLevel },
      }
      setEvents((prevEvents) => [...prevEvents, newEvent])
    }
    closeModal()
    resetModalFields()
  }

  // const resetModalFields = () => {
  //   setEventTitle('')
  //   setEventStartDate('')
  //   setEventEndDate('')
  //   setEventLevel('')
  //   setSelectedEvent(null)
  // }

  return (
    <>
      <PageMeta
        title='React.js Calendar Dashboard | TailAdmin - Next.js Admin Dashboard Template'
        description='This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template'
      />
      <div className='rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]'>
        {/* tables  */}

        
        <div className='dark:bg-gray-dark bg-white px-4 py-2 rounded-xl'>
          {/* Controls */}
          <div className='flex justify-between items-center mb-4'>
            <button
              type='button'
              onClick={openModal}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              Add Regulation
            </button>
          </div>

          {/* Tables */}
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='p-4'>
                    {/* <div className='flex items-center'>
                      <input
                        id='checkbox-all-search'
                        type='checkbox'
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <label htmlFor='checkbox-all-search' className='sr-only'>
                        checkbox
                      </label>
                    </div> */}
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    S.No
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Regulation name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Start Date
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    End Date
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    <span>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
                  <td className='w-4 p-4'>
                    <div className='flex items-center'>
                      <input
                        id='checkbox-table-search-1'
                        type='checkbox'
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <label
                        htmlFor='checkbox-table-search-1'
                        className='sr-only'
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    
                  </th>
                  <th className='px-6 py-4 whitespace-nowrap dark:text-white'>
                      Department of Ma
                  </th>
                  <td className='px-6 py-4'>21/02/24</td>
                  <td className='px-6 py-4'>21/03/25</td>
                  <td className='px-6 py-4 flex items-center justify-around gap-x-2'>
                    <button
                      onClick={openModal}
                      className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                    >
                      Edit
                    </button>
                    <a
                      href='#'
                      className='font-medium text-red-600 dark:text-red-500 hover:underline'
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className='max-w-[700px] p-6 lg:p-10'
        >
          <div className='flex flex-col px-2 overflow-y-auto custom-scrollbar'>
            <div>
              <h5 className='mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl'>
                {selectedEvent ? 'Edit Event' : 'Add Regulation'}
              </h5>
             
            </div>
            <div className='mt-8'>
              <div>
                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400'>
                    Department Title
                  </label>
                  <input
                    id='event-title'
                    type='text'
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className='dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800'
                  />
                </div>
              </div>
              <div className='mt-6'>
                <label className='block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400'>
                  Regulation Year
                </label>
                <div className='flex flex-wrap items-center gap-4 sm:gap-5'>
                  {Object.entries(calendarsEvents).map(([key, value]) => (
                    <div key={key} className='n-chk'>
                      <div
                        className={`form-check form-check-${value} form-check-inline`}
                      >
                        <label
                          className='flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400'
                          htmlFor={`modal${key}`}
                        >
                          <span className='relative'>
                            <input
                              className='sr-only form-check-input'
                              type='radio'
                              name='event-level'
                              value={key}
                              id={`modal${key}`}
                              checked={eventLevel === key}
                              onChange={() => setEventLevel(key)}
                            />
                            <span className='flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700'>
                              <span
                                className={`h-2 w-2 rounded-full bg-white ${
                                  eventLevel === key ? 'block' : 'hidden'
                                }`}
                              ></span>
                            </span>
                          </span>
                          {key}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mt-6'>
                <label className='mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400'>
                  Enter Start Date
                </label>
                <div className='relative'>
                  <input
                    id='event-start-date'
                    type='date'
                    value={eventStartDate}
                    onChange={(e) => setEventStartDate(e.target.value)}
                    className='dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800'
                  />
                </div>
              </div>

              <div className='mt-6'>
                <label className='mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400'>
                  Enter End Date
                </label>
                <div className='relative'>
                  <input
                    id='event-end-date'
                    type='date'
                    value={eventEndDate}
                    onChange={(e) => setEventEndDate(e.target.value)}
                    className='dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800'
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3 mt-6 modal-footer sm:justify-end'>
              <button
                onClick={closeModal}
                type='button'
                className='flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto'
              >
                Close
              </button>
              <button
                onClick={handleAddOrUpdateEvent}
                type='button'
                className='btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto'
              >
                {selectedEvent ? 'Update Changes' : 'Add Event'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

const renderEventContent = (eventInfo: any) => {
  const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`
  return (
    <div
      className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
    >
      <div className='fc-daygrid-event-dot'></div>
      <div className='fc-event-time'>{eventInfo.timeText}</div>
      <div className='fc-event-title'>{eventInfo.event.title}</div>
    </div>
  )
}

export default Calendar
