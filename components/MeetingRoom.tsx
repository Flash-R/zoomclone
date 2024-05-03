import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, User } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';


type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

function MeetingRoom() {
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [participants, setParticipants] = useState(false);

  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');

  const router = useRouter();

  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();

  // create a loader if not joined already
  if(callingState !== CallingState.JOINED) return <Loader/>
  // function to display the call layout depending on the value of the use state
  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition={'left'} />

      default:
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition={'right'} />
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex max-w-[1000px] size-full items-center'>
          <CallLayout />
        </div>
        <div className={
          cn('h-[calc(100vh-86px)] hidden ml-2',
            { 'show-block': participants }
          )}>
          <CallParticipantsList onClose={() => setParticipants(false)} />
        </div>
      </div>
      <div className='fixed bottom-0 flex w-full items-center justify-center flex-wrap gap-5'>
        <CallControls onLeave={()=> router.push('/')}/>
        <DropdownMenu >
          <div className='flex items-center'>
            <DropdownMenuTrigger className='rounded-2xl cursor-pointer bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <LayoutList size={20} className='text-white'/>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
                <DropdownMenuItem className='cursor-pointer'
                  onClick={() => {
                    setLayout('grid' as CallLayoutType)
                  }}
                >
                  grid
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'
                  onClick={() => {
                    setLayout('speaker-left' as CallLayoutType)
                  }}
                >
                  speaker left
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'
                  onClick={() => {
                    setLayout('speaker-right' as CallLayoutType)
                  }}
                >
                  speaker-right
                </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>
        <button onClick={() => {
          setParticipants((prev)=>
            !prev
          )}}
          className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'
          >
          <User size={20} className='text-white'/>
        </button>
        {!isPersonalRoom && <EndCallButton/>   }
      </div>
    </section>
  )
}

export default MeetingRoom