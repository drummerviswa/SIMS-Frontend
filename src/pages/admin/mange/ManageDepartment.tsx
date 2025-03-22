import { useModal } from '../../../hooks/useModal'

export default function ManageDepartment() {
  const { openModal } = useModal()
  return (
    <div>
      <div className='dark:bg-gray-dark bg-white px-4 py-2 rounded-xl'>
        {/* Controls */}
        <div className='flex justify-between items-center mb-4'>
          <button
            type='button'
            onClick={openModal}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          >
            Add Department
          </button>
        </div>

        {/* Tables */}
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='p-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-all-search'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label htmlFor='checkbox-all-search' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope='col' className='px-6 py-3'>
                  S.No
                </th>
                <th scope='col' className='px-6 py-3'>
                  Department name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Username
                </th>
                <th scope='col' className='px-6 py-3'>
                  Password
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
                  1
                </th>
                <th className='px-6 py-4 whitespace-nowrap dark:text-white'>
                  Department of Mathematics
                </th>
                <td className='px-6 py-4'>dom</td>
                <td className='px-6 py-4'>domlab.local</td>
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
    </div>
  )
}
