"use client"
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

function EndCallButton() {
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const router = useRouter();

  const localParticipant = useLocalParticipant();

  const isMeetingOwner = localParticipant && call?.state.createdBy && 
  localParticipant.userId === call.state.createdBy.id;

  if(!isMeetingOwner) return null;
  return (
    <Button
      className='bg-red-500'
      onClick={async () =>{
        await call.endCall();
        router.push('/');
      }}
    >
      End Call
    </Button>
  )
}

export default EndCallButton