"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

function MeetingTypeList() {
    const router = useRouter();
    const [MeetingState, setMeetingState] = useState<'isScheduleMetting' | 'isJoiningMetting' | 'isInstantMetting' | 'undefined'>();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: "",
        link: ""
    });
    const [callDetails, setCallDetails] = useState<Call>()
    // getting the logged in user
    const user = useUser();

    // initialise Strema video client
    const client = useStreamVideoClient()

    // Model Functions 
    const createMeeting = async () =>{
        if(!client || !user) return;

        try {
            const id = crypto.randomUUID(); //generating random ids
            const call = client.call('default', id);

            if(!call) throw new Error("Call not created");  

            const startsAt =  values.dateTime.toISOString() || 
            new Date(Date.now()).toISOString();
            const description = values.description || "Create Instant Meeting";	

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call);

            if(!values.description){
                router.push(`/meeting/${call.id}`)
            }
        } catch(error) {
            console.log(error)
        }

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