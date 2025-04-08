import React from 'react'
import useForm from "../../faculty/auth/useForm"
import Validate from "../../faculty/auth/Validate"

export default function FacLogin() {

  const {handleChange,value,handleSubmit,Errors} = useForm(Validate)

 
  return (
    <div>
      <div>
        <h1 className='text-3xl text-center mt-30 mb-15'>Faculty Login</h1>
        <form className='max-w-sm mx-auto flex flex-col justify-center  '>
          {/* for username */}

          {/* for mail */}
          <div className='mb-5'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Your email
            </label>
            {Errors.email && (
              <p className='block mb-2 text-sm font-medium text-red-500 dark:text-white'>
                {Errors.email}
              </p>
            )}
            <input
              type='email'
              id='email'
              className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
              placeholder='email@gmail.com'
              name='email'
              value={value.email}
              onChange={handleChange}
            />
          </div>

          {/* for password */}
          <div className='mb-5'>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Your password
            </label>
            {Errors.password && (
              <p className='block mb-2 text-sm font-medium text-red-500 dark:text-white'>
                {Errors.password}
              </p>
            )}
            <input
              type='password'
              id='password'
              className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
              name='password'
              value={value.password}
              onChange={handleChange}
            />
          </div>

          {/* for confirm password */}
          <div className='mb-5'>
            <label
              htmlFor='repeat-password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Repeat password
            </label>
            {Errors.confirmPassword && (
              <p className='block mb-2 text-sm font-medium text-red-500 dark:text-white'>
                {Errors.confirmPassword}
              </p>
            )}
            <input
              type='password'
              id='repeat-password'
              className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
              name='confirmPassword'
              value={value.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* for button */}
          <div className='flex items-center mb-5 justify-center gap-3'>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              // onClick={handleSubmit}
              onClick={handleSubmit}
            >
              Login to your account
            </button>

            <p>if you don't have an Account ? Signup</p>
          </div>
        </form>
      </div>
    </div>
  )
}
