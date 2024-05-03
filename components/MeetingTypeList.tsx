"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from './ui/textarea';
import ReactDatePicker from "react-datepicker";	
import { Input } from './ui/input';

function MeetingTypeList() {
    const router = useRouter();
    const [MeetingState, setMeetingState] = useState<'isScheduleMetting' | 'isJoiningMeeting' | 'isInstantMetting' | 'undefined'>();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: "",
        link: ""
    });
    const [callDetails, setCallDetails] = useState<Call>();
    const { toast } = useToast();
    // getting the logged in user
    const user = useUser();

    // initialise Strema video client
    const client = useStreamVideoClient()

    // Model Functions 
    const createMeeting = async () =>{
        if(!client || !user) return;
        try {
            // Will check when scheduling a meeting
            if(!values.dateTime){
                toast({title: "Please select date and time"});
                return;
            }
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
            toast({
                title: "Meeting Created"
              })
        } catch(error) {
            console.log(error);
            toast({
                title: "Failed to create meeting",
              })
        }

    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
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
            handleClick={() => setMeetingState('isJoiningMeeting')}
            className='bg-purple-1'
        />
        <HomeCard
            img="/icons/recordings.svg"
            title="View your recordings"
            desc="Look through your recordings"
            handleClick={() => router.push('/recordings')}
            className='bg-yellow-1'
        />

        {
            !callDetails ? (
                <MeetingModal
                    isOpen={MeetingState === 'isScheduleMetting'}
                    onClose={() => setMeetingState('undefined')}
                    title='Schedule a Meeting'
                    handleClick={createMeeting}
                >

                    <div className='flex flex-col gap-2.5'>
                        <label className='text-base text-normal leading-[22px] text-sky-2'>
                            Add Meeting Description
                        </label>
                        <Textarea 
                        className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
                            onChange={(e) => {
                                setValues({...values, description: e.target.value})
                            }}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-2.5'>
                        <label className='text-base text-normal leading-[22px] text-sky-2'>
                            Select date and Time
                        </label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) => {
                                setValues({...values, dateTime: date!})
                            }}
                            showTimeSelect
                            timeCaption='time'
                            timeIntervals={15}
                            timeFormat='HH:mm'
                            dateFormat='MMMM d, yyyy h:mm aa'
                            className='w-full rounded bg-dark-3 focus:outline-none p-2'
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={MeetingState === 'isScheduleMetting'}
                    onClose={() => setMeetingState('undefined')}
                    title='Meeting Created'
                    className='text-center'
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink)
                        toast({ title: 'Link Copied'})
                    }}
                    image='/icons/checked.svg'
                    buttonIcon='/icons/copy.svg'
                    buttonText='Copy Meeting Link'
                    
                />
            )
        }

        <MeetingModal
            isOpen={MeetingState === 'isInstantMetting'}
            onClose={() => setMeetingState('undefined')}
            title='start an Instant Meeting'
            className='text-center'
            buttonText='Start Meeting'
            handleClick={createMeeting}
        />
        <MeetingModal
            isOpen={MeetingState === 'isJoiningMeeting'}
            onClose={() => setMeetingState('undefined')}
            title='TYpe the Meeting Link'
            className='text-center'
            buttonText='Join Meeting'
            handleClick={() => router.push(values.link)}
        >
            <Input
                className='border-none bg-dark-3 focus-visible: ring-0 focus-visible: ring-offset-0'
                onChange={(e) =>setValues({...values, link: e.target.value})}
            />
        </MeetingModal>
        </section>
    )
}

export default MeetingTypeList