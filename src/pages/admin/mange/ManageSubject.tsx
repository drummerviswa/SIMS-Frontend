import { useState } from 'react'
import { Modal } from '../../../components/ui/modal'
import { useModal } from '../../../hooks/useModal'
import PageMeta from '../../../components/common/PageMeta'
import { EventInput } from '@fullcalendar/core/index.js'

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string
  }
}

const Calendar: React.FC = () => {
  const [subinfo, setSubinfo] = useState({
    name: '',
    code: '',
    credit: '',
  })

  const handleInput = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target
    setSubinfo((currentInfo) => ({
      ...currentInfo,
      [name]: value,
    }))
  }

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <PageMeta
        title='React.js Calendar Dashboard'
        description='Calendar Dashboard page for event and subject management'
      />

      <div className='rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]'>
        <div className='dark:bg-gray-dark bg-white px-4 py-2 rounded-xl'>
          <div className='flex justify-between items-center mb-4'>
            <button
              type='button'
              onClick={openModal}
              className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5'
            >
              Add Subject
            </button>
          </div>

          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th className='px-6 py-3'>S.No</th>
                  <th className='px-6 py-3'>Subject Name</th>
                  <th className='px-6 py-3'>Credits</th>
                  <th className='px-6 py-3'>Subject Code</th>
                  <th className='px-6 py-3'>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className='bg-white border-b dark:bg-gray-800 hover:bg-gray-50'>
                  <td className='px-6 py-4'>1</td>
                  <td className='px-6 py-4'>Mathematics</td>
                  <td className='px-6 py-4'>3</td>
                  <td className='px-6 py-4'>MATH101</td>
                  <td className='px-6 py-4 flex items-center gap-x-2'>
                    <button
                      onClick={openModal}
                      className='text-blue-600 hover:underline'
                    >
                      Edit
                    </button>
                    <button className='text-red-600 hover:underline'>
                      Delete
                    </button>
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
          <div className='flex flex-col px-2 overflow-y-auto'>
            <h5 className='mb-2 font-semibold text-gray-800 text-xl'>
              {selectedEvent ? 'Edit Subject' : 'Add Subject'}
            </h5>
            <div className='mt-8'>
              <label className='block text-sm font-medium'>Subject Name</label>
              <input
                type='text'
                name='name'
                value={subinfo.name}
                onChange={handleInput}
                className='w-full border rounded px-4 py-2'
              />

              <label className='block text-sm font-medium mt-4'>
                Subject Code
              </label>
              <input
                type='text'
                name='code'
                value={subinfo.code}
                onChange={handleInput}
                className='w-full border rounded px-4 py-2'
              />

              <label className='block text-sm font-medium mt-4'>Credits</label>
              <input
                type='number'
                name='credit'
                value={subinfo.credit}
                onChange={handleInput}
                className='w-full border rounded px-4 py-2'
              />
            </div>
            <div className='flex items-center gap-3 mt-6 sm:justify-end'>
              <button onClick={closeModal} className='border px-4 py-2 rounded'>
                Cancel
              </button>
              <button className='bg-blue-600 text-white px-4 py-2 rounded'>
                {selectedEvent ? 'Update Changes' : 'Add Subject'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Calendar
