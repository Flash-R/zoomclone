import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

function Home() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    "hour": "2-digit",
    "minute": "2-digit",
  });
  const date = (Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(now));
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex flex-col justify-between h-full max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] text-center text-base rounded font-normal'>Upcoming Meeting at: 12:30 PM</h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='text-xl font-medium lg:text-2xl text-sky-1'>
              {date}
            </p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home