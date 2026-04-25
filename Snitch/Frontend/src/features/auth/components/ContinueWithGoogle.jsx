import React from 'react'

const ContinueWithGoogle = () => {
    return (
<a
  href="/api/auth/google"
  className=" flex items-center justify-center gap-3 
  bg-transparent border border-[#e7c446]/40  px-4 py-1 rounded-lg 
  hover:bg-gray-100 hover:text-black transition 
  font-medium text-sm"
>
  {/* Google Official Logo */}
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.9-6.9C35.82 2.3 30.4 0 24 0 14.82 0 6.7 5.4 2.98 13.22l8.04 6.24C13.08 13.12 18.12 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.5 24c0-1.64-.15-3.22-.44-4.75H24v9h12.7c-.55 2.96-2.2 5.46-4.68 7.14l7.26 5.64C43.9 36.78 46.5 30.86 46.5 24z"/>
    <path fill="#FBBC05" d="M11.02 28.46A14.5 14.5 0 019.5 24c0-1.55.27-3.04.76-4.46l-8.04-6.24A23.97 23.97 0 000 24c0 3.84.92 7.46 2.54 10.7l8.48-6.24z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.9-5.82l-7.26-5.64c-2.02 1.36-4.6 2.16-8.64 2.16-5.88 0-10.92-3.62-12.98-8.72l-8.48 6.24C6.7 42.6 14.82 48 24 48z"/>
  </svg>

  Continue with Google
</a>
    )
}

export default ContinueWithGoogle