"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';

function MeetingTypeList() {
    const router = useRouter();
    const [MeetingState, setMeetingState] = useState<'isScheduleMetting' | 'isJoiningMetting' | 'isInstantMetting' | 'undefined'>();


    // Model Functions 
    const createMeeting = () =>{

    }
    return (
        <section
            className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'
        >
        <HomeCard
            img="/icons/add-meeting.svg"
            title="New Meeting"
            desc="Start Instant Discussion"
            handleClick={() => setMeetingState('isInstantMetting')}
            className='bg-orange-1'
        />
        <HomeCard 
            img="/icons/schedule.svg"
            title="Schedule Meeting"
            desc="Schedule Discussion"
            handleClick={() => setMeetingState('isScheduleMetting')}
            className='bg-blue-1'
        />
        <HomeCard
            img="/icons/join-meeting.svg"
            title="Join a Meeting"
            desc="Don't have a meeting? Join one"
            handleClick={() => setMeetingState('isJoiningMetting')}
            className='bg-purple-1'
        />
        <HomeCard
            img="/icons/recordings.svg"
            title="View your recordings"
            desc="Look through your recordings"
            handleClick={() => router.push('/recordings')}
            className='bg-yellow-1'
        />

        <MeetingModal
            isOpen={MeetingState === 'isInstantMetting'}
            onClose={() => setMeetingState('undefined')}
            title='start an Instant Meeting'
            className='text-center'
            buttonText='Start Meeting'
            handleClick={createMeeting}
        />
        </section>
    )
}

export default MeetingTypeList