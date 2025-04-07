import userForm from '../auth/useForm'
import Validate from '../auth/Validate'

export default function AdminRegister() {
  const { handleChange, value, Errors, handleSubmit } = userForm(Validate)

  return (
    <div className='min-h-screen relative'>
      {/* Background Split: Blue Top, White Bottom */}
      <div className='absolute inset-0'>
        <div className='h-1/2 bg-blue-600'></div>
        <div className='h-1/2 bg-white'></div>
      </div>

      {/* Centered Form Card */}
      <div className='relative z-10 flex items-center justify-center min-h-screen'>
        <div className='rounded-2xl shadow-lg flex w-[900px] max-w-full overflow-hidden bg-white'>
          {/* Left Side - Form Section */}
          <div className='w-1/2 p-10 bg-white text-black'>
            <h1 className='text-3xl font-semibold mb-8 text-center'>
              Admin Register
            </h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              {/* Username */}
              <div>
                <label
                  htmlFor='username'
                  className='block mb-1 text-sm font-medium'
                >
                  Username
                </label>
                {Errors.username && (
                  <p className='text-red-500 text-xs mb-1'>{Errors.username}</p>
                )}
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={value.username}
                  onChange={handleChange}
                  placeholder='Enter your username'
                  className='w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-300'
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor='email'
                  className='block mb-1 text-sm font-medium'
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
                  placeholder='Enter your email'
                  className='w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-300'
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor='password'
                  className='block mb-1 text-sm font-medium'
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
                  placeholder='Enter your password'
                  className='w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-300'
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor='confirmpassword'
                  className='block mb-1 text-sm font-medium'
                >
                  Confirm Password
                </label>
                {Errors.confirmpassword && (
                  <p className='text-red-500 text-xs mb-1'>
                    {Errors.confirmpassword}
                  </p>
                )}
                <input
                  type='password'
                  id='confirmpassword'
                  name='confirmpassword'
                  value={value.confirmpassword}
                  onChange={handleChange}
                  placeholder='Re-enter your password'
                  className='w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-300'
                />
              </div>

              {/* Register Button */}
              <button
                type='submit'
                className='w-full bg-blue-600 text-white font-semibold py-2 rounded-md transition hover:bg-blue-700'
              >
                Register New Account
              </button>

              {/* Login Link */}
              <p className='text-sm text-center mt-2'>
                Already have an account?{' '}
                <a
                  href='#'
                  className='text-blue-600 underline hover:text-blue-800'
                >
                  Login
                </a>
              </p>
            </form>
          </div>

          {/* Right Side - Illustration */}
          <div className='w-1/2 bg-white p-10 flex flex-col justify-center items-center text-center'>
            <img
              src='../../../../public/SIMS_hero.svg'
              alt='Illustration'
              className='w-64 h-auto mb-6'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
