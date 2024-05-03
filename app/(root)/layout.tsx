import StreamVideoProvider from '@/Providers/StreamProvider'
import { Metadata } from 'next';
import React, {ReactNode} from 'react'

export const metadata: Metadata = {
  title: "YM App",
  description: "Covering all your needs",
  icons: {
    icon : '/icons/logo.svg'
  }
};

function RootLayout({children}: {children: ReactNode}) {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout