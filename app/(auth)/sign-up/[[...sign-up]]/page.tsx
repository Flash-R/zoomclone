import React from 'react'
import { SignUp } from '@clerk/nextjs'

function SignUpPage() {
  return (
    <main className='flex h-screen w-full justify-center items-center'>
        <SignUp/>
    </main>
  )
}

export default SignUpPage