import useForm from '../../admin/auth/useForm'
import Validate from '../../admin/auth/Validate'

export default function AdminLogin() {
  const { handleChange, value, handleSubmit, Errors } = useForm(Validate)

  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      <div className='absolute top-0 left-0 w-full h-1/2 bg-blue-700 z-0' />
      <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white z-0' />

      {/* Main login container */}
      <div className='bg-white rounded-2xl shadow-lg flex w-[900px] max-w-full overflow-hidden z-10'>
        <div className='w-1/2 p-10'>
          <h1 className='text-3xl font-semibold mb-8 text-center'>Admin Login</h1>

          {/* Email Field */}
          <div className='mb-5'>
            <label
              htmlFor='email'
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              Email
            </label>
            {Errors.email && (
              <p className='text-red-500 text-xs mb-1'>{Errors.email}</p>
            )}
            <input
              type='email'
              id='email'
              name='email'
              value={value.email}
              onChange={handleChange}
              placeholder='Enter email'
              className='w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Password Field */}
          <div className='mb-5 '>
            <label
              htmlFor='password'
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              Password
            </label>
            {Errors.password && (
              <p className='text-red-500 text-xs mb-1'>{Errors.password}</p>
            )}
            <input
              type='password'
              id='password'
              name='password'
              value={value.password}
              onChange={handleChange}
              placeholder='Enter password'
              className='w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500'
            />
            {/* <a
              href='#'
              className='text-xs text-blue-500 absolute right-2 top-8 hover:underline'
            >
              Forgot password?
            </a> */}
          </div>
          {/* Submit Button */}
          <button
            type='submit'
            onClick={handleSubmit}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition'
          >
            Login
          </button>

          {/* Sign Up Text */}
          <p className='text-sm text-center mt-4 text-gray-600'>
            Don't have an account?{' '}
            <a href='#' className='text-blue-500 hover:underline'>
              Sign up
            </a>
          </p>
        </div>

        {/* Right Side - Illustration and Info */}
        <div className='w-1/2 bg-gray-50 p-10 flex flex-col justify-center items-center text-center'>
          <img
            src='../../../../public/SIMS_hero.svg'
            alt='Illustration'
            className='w-64 h-auto mb-6'
          />
        </div>
      </div>
    </div>
  )
}
