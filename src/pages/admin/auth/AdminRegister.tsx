export default function AdminRegister() {
  return (
    <>
      <div >
        <h1 className="text-3xl text-center mt-20 mb-15">Admin Register</h1>
        <form className='max-w-sm mx-auto flex flex-col justify-center  '>

          {/* for username */}
          <div className='mb-5'>
            <label
              for='email'
              class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Username
            </label>
            <input
              type='email'
              id='email'
              className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
              // placeholder='name@flowbite.com'
              required
            />
          </div>

{/* for mail */}
          <div className='mb-5'>
            <label
              for='email'
              class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Your email
            </label>
            <input
              type='email'
              id='email'
              className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
              placeholder='email@gmail.com'
              required
            />
          </div>


{/* for password */}
          <div className='mb-5'>
            <label
              for='password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Your password
            </label>
            <input
              type='password'
              id='password'
              className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
              required
            />
          </div>

          {/* for confirm password */}
          <div className='mb-5'>
            <label
              for='repeat-password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Repeat password
            </label>
            <input
              type='password'
              id='repeat-password'
              className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
              required
            />
          </div>

{/* for button */}
          <div className='flex items-start mb-5'></div>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Register new account
          </button>
        </form>
      </div>
    </>
  )
}
