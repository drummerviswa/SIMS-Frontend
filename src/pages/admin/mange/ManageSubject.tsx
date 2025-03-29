import { useState } from 'react'
import { Modal } from '../../../components/ui/modal'

// Interface for Faculty
interface Faculty {
  id: number
  SubjectName: string
  SubjectCode: string
  regulation: number
  Category: string
  internals: number
  Credits: number
}

export default function ManageDepartment() {
  const [subject, setSubject] = useState<Faculty[]>([
    {
      id: 1,
      SubjectName: 'DOM',
      SubjectCode: 'DOM101',
      regulation: 2021,
      Category: 'Core',
      internals: 30,
      Credits: 4,
    },
  ])

  const [formData, setFormData] = useState<Faculty>({
    id: 0,
    SubjectName: '',
    SubjectCode: '',
    regulation: 0,
    Category: '',
    internals: 0,
    Credits: 0,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]:
        name === 'internals' || name === 'Credits' || name === 'regulation'
          ? Number(value)
          : value,
    })
  }

  // Open Modal for Adding
  const handleAddClick = () => {
    setFormData({
      id: 0,
      SubjectName: '',
      SubjectCode: '',
      regulation: 0,
      Category: '',
      internals: 0,
      Credits: 0,
    })
    setIsEditing(false)
    setIsModalOpen(true)
  }

  // Open Modal for Editing
  const handleEditClick = (facultyMember: Faculty) => {
    setFormData(facultyMember)
    setIsEditing(true)
    setIsModalOpen(true)
  }

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Add or Update Faculty
  const handleSave = () => {
    if (isEditing) {
      setSubject(
        subject.map((member) => (member.id === formData.id ? formData : member))
      )
    } else {
      setSubject([...subject, { ...formData, id: Date.now() }])
    }
    setIsModalOpen(false)
  }

  // Delete Faculty
  const handleDelete = (id: number) => {
    setSubject(subject.filter((member) => member.id !== id))
  }

  // Filtered Data
  const filteredFaculty = subject.filter(
    (member) =>
      member.SubjectName.toLowerCase().includes(search.toLowerCase()) ||
      member.SubjectCode.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className='dark:bg-gray-dark bg-white px-4 py-2 rounded-xl'>
        {/* Controls */}
        <div className='flex justify-between items-center mb-4'>
          <input
            type='text'
            placeholder='Search subject...'
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
                <th className='px-6 py-3'>Subject Code</th>
                <th className='px-6 py-3'>Category</th>
                <th className='px-6 py-3'>Regulation</th>
                <th className='px-6 py-3'>Credits</th>
                <th className='px-6 py-3'>Internals</th>
                <th className='px-6 py-3'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.length === 0 ? (
                <tr>
                  <td colSpan={8} className='text-center p-4'>
                    No subjects found
                  </td>
                </tr>
              ) : (
                filteredFaculty.map((member, index) => (
                  <tr
                    key={member.id}
                    className='bg-white border-b dark:bg-gray-800 hover:bg-gray-50'
                  >
                    <td className='px-6 py-4'>{index + 1}</td>
                    <td className='px-6 py-4'>{member.SubjectName}</td>
                    <td className='px-6 py-4'>{member.SubjectCode}</td>
                    <td className='px-6 py-4'>{member.Category}</td>
                    <td className='px-6 py-4'>{member.regulation}</td>
                    <td className='px-6 py-4'>{member.Credits}</td>
                    <td className='px-6 py-4'>{member.internals}</td>
                    <td className='px-6 py-4 flex gap-x-2'>
                      <button
                        onClick={() => handleEditClick(member)}
                        className='text-blue-600 hover:underline'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className='text-red-600 hover:underline'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          className='max-w-[500px] m-4'
        >
          <div className='relative w-full p-4 overflow-y-auto bg-white rounded-3xl dark:bg-gray-900 lg:p-8'>
            <h2 className='text-lg font-bold mb-4 text-gray-800 dark:text-white'>
              {isEditing ? 'Edit Subject' : 'Add Subject'}
            </h2>

            <div>
              {Object.keys(formData).map(
                (key) =>
                  key !== 'id' && (
                    <div key={key} className='mb-4'>
                      <label className='block mb-2 text-sm text-gray-600 dark:text-gray-400 capitalize'>
                        {key}
                      </label>
                      <input
                        type={
                          typeof formData[key as keyof Faculty] === 'number'
                            ? 'number'
                            : 'text'
                        }
                        name={key}
                        className='block w-full p-2 border rounded'
                        value={formData[key as keyof Faculty]}
                        onChange={handleChange}
                      />
                    </div>
                  )
              )}
            </div>

            <div className='flex justify-end gap-2'>
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
