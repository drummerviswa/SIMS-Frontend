import { useState } from 'react'
import { Modal } from '../../../components/ui/modal'

interface Subject {
  id: number
  name: string
  credits: number
  code: number
  reg: number
  internal: number
}

export default function ManageDepartment() {
  const [sub, setsub] = useState<Subject[]>([
    {
      id: 1,
      name: 'Department of Mathematics',
      credits: 21,
      code: 1,
      reg: 1,
      internal: 1,
    },
  ])

  const [formData, setFormData] = useState<Subject>({
    id: 0,
    name: '',
    credits: 0,
    code: 0,
    reg: 0,
    internal: 0,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Open Modal for Adding
  const handleAddClick = () => {
    setFormData({ id: 0, name: '', credits: 0, code: 0, reg: 0, internal: 0 })
    setIsEditing(false)
    setIsModalOpen(true)
  }

  // Open Modal for Editing
  const handleEditClick = (subject: Subject) => {
    setFormData(subject)
    setIsEditing(true)
    setIsModalOpen(true)
  }

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Add or Update Subject
  const handleSave = () => {
    if (isEditing) {
      setsub(sub.map((s) => (s.id === formData.id ? formData : s)))
    } else {
      setsub([...sub, { ...formData, id: sub.length + 1 }])
    }
    setIsModalOpen(false)
  }

  // Delete Subject
  const handleDelete = (id: number) => {
    setsub(sub.filter((s) => s.id !== id))
  }

  // Filtered Data
  const filteredSubjects = sub.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.credits.toString().toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className='dark:bg-gray-dark bg-white px-4 py-2 rounded-xl'>
        {/* Controls */}
        <div className='flex justify-between items-center mb-4'>
          <input
            type='text'
            placeholder='Search Subject...'
            className='border p-2 rounded'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type='button'
            onClick={handleAddClick}
            className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5'
          >
            Add Subject
          </button>
        </div>

        {/* Table */}
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700'>
              <tr>
                <th className='px-6 py-3'>S.No</th>
                <th className='px-6 py-3'>Subject Name</th>
                <th className='px-6 py-3'>Credits</th>
                <th className='px-6 py-3'>Subject Code</th>
                <th className='px-6 py-3'>Regulation</th>
                <th className='px-6 py-3'>Internals</th>
                <th className='px-6 py-3 '>Action</th>
              </tr>
            </thead>
            {filteredSubjects.length === 0 && (
              <tr>
                <td colSpan={7} className='text-center p-4'>
                  No subject found
                </td>
              </tr>
            )}
            <tbody>
              {filteredSubjects.map((s, index) => (
                <tr
                  key={s.id}
                  className='bg-white border-b dark:bg-gray-800 hover:bg-gray-50'
                >
                  <td className='px-6 py-4'>{index + 1}</td>
                  <td className='px-6 py-4'>{s.name}</td>
                  <td className='px-6 py-4'>{s.credits}</td>
                  <td className='px-6 py-4'>{s.code}</td>
                  <td className='px-6 py-4'>{s.reg}</td>
                  <td className='px-6 py-4'>{s.internal}</td>
                  <td className='px-6 py-4 flex gap-x-2'>
                    <button
                      onClick={() => handleEditClick(s)}
                      className='text-blue-600 hover:underline'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className='text-red-600 hover:underline'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          className='max-w-[500px] m-4'
        >
          <div className='relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-8'>
            <h2 className='text-lg font-bold mb-4 p-4 text-gray-800 dark:text-white'>
              {isEditing ? 'Edit Subject' : 'Add Subject'}
            </h2>

            <div className='px-4'>
              {['name', 'credits', 'code', 'reg', 'internal'].map((field) => (
                <div key={field}>
                  <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </p>
                  <input
                    type={field === 'name' ? 'text' : 'number'}
                    name={field}
                    className='block w-full p-2 border rounded mb-3'
                    value={formData[field as keyof Subject]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            <div className='flex justify-end gap-2 px-4 pb-4'>
              <button
                onClick={handleCloseModal}
                className='bg-gray-400 text-white px-4 py-2 rounded'
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className='bg-blue-600 text-white px-4 py-2 rounded'
              >
                {isEditing ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
