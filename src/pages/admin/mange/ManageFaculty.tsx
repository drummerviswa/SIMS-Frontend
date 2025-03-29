import { useState } from 'react'
import { Modal } from '../../../components/ui/modal'

// Interface for Faculty
interface Faculty {
  id: number
  primaryDept: number
  username: string
  password: string
  name: string
  designation: string
}

export default function ManageDepartment() {
  const [faculty, setFaculty] = useState<Faculty[]>([
    {
      id: 1,
      primaryDept: 2,
      username: 'dom',
      password: 'domlab.local',
      name: 'Ksb',
      designation: 'HOD',
    },
  ])

  const [formData, setFormData] = useState<Faculty>({
    id: 0,
    primaryDept: 0, // Changed from "" to 0 to match type
    username: '',
    password: '',
    name: '',
    designation: '',
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
    setFormData({
      id: 0,
      primaryDept: 0, // Changed from "" to 0
      username: '',
      password: '',
      name: '',
      designation: '',
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
      setFaculty(
        faculty.map((member) => (member.id === formData.id ? formData : member))
      )
    } else {
      setFaculty([...faculty, { ...formData, id: Date.now() }])
    }
    setIsModalOpen(false)
  }

  // Delete Faculty
  const handleDelete = (id: number) => {
    setFaculty(faculty.filter((member) => member.id !== id))
  }

  // Filtered Data
  const filteredFaculty = faculty.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.username.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className='dark:bg-gray-dark bg-white px-4 py-2 rounded-xl'>
        {/* Controls */}
        <div className='flex justify-between items-center mb-4'>
          <input
            type='text'
            placeholder='Search faculty...'
            className='border p-2 rounded'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type='button'
            onClick={handleAddClick}
            className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5'
          >
            Add Faculty
          </button>
        </div>

        {/* Table */}
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700'>
              <tr>
                <th className='px-6 py-3'>S.No</th>
                <th className='px-6 py-3'>Primary Dept</th>
                <th className='px-6 py-3'>Username</th>
                <th className='px-6 py-3'>Password</th>
                <th className='px-6 py-3'>Faculty Name</th>
                <th className='px-6 py-3'>Designation</th>
                <th className='px-6 py-3'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.length === 0 ? (
                <tr>
                  <td colSpan={7} className='text-center p-4'>
                    No faculty found
                  </td>
                </tr>
              ) : (
                filteredFaculty.map((member, index) => (
                  <tr
                    key={member.id}
                    className='bg-white border-b dark:bg-gray-800 hover:bg-gray-50'
                  >
                    <td className='px-6 py-4'>{index + 1}</td>
                    <td className='px-6 py-4'>{member.primaryDept}</td>
                    <td className='px-6 py-4'>{member.username}</td>
                    <td className='px-6 py-4'>{member.password}</td>
                    <td className='px-6 py-4'>{member.name}</td>
                    <td className='px-6 py-4'>{member.designation}</td>
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
          <div className='relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-8'>
            <h2 className='text-lg font-bold mb-4 p-4 text-gray-800 dark:text-white'>
              {isEditing ? 'Edit Faculty' : 'Add Faculty'}
            </h2>

            <div className='px-4'>
              <label className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                Primary Dept
              </label>
              <input
                type='number'
                name='primaryDept'
                className='block w-full p-2 border rounded mb-3'
                value={formData.primaryDept}
                onChange={handleChange}
              />

              <label className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                Username
              </label>
              <input
                type='text'
                name='username'
                className='block w-full p-2 border rounded mb-3'
                value={formData.username}
                onChange={handleChange}
              />

              <label className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                Password
              </label>
              <input
                type='text'
                name='password'
                className='block w-full p-2 border rounded mb-4'
                value={formData.password}
                onChange={handleChange}
              />

              <label className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                Faculty Name
              </label>
              <input
                type='text'
                name='name'
                className='block w-full p-2 border rounded mb-4'
                value={formData.name}
                onChange={handleChange}
              />

              <label className='mb-2 text-sm text-gray-600 dark:text-gray-400'>
                Designation
              </label>
              <input
                type='text'
                name='designation'
                className='block w-full p-2 border rounded mb-4'
                value={formData.designation}
                onChange={handleChange}
              />
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
