"use client"
import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, {useState, useEffect} from 'react'
import { Button } from './ui/button';

function MeetingSetup({setIsSetupComplete}: {setIsSetupComplete: (value: boolean) => void}) {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false)
  
  const call = useCall();

  if(!call) {
    throw new Error('No call object available, It must be called within the StreamCall Component')
  }

  useEffect(() => {
    if(isMicCamToggledOn){
      call?.camera.disable()
      call?.microphone.disable()
    }else{
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]) 
  
  
  return (
    <div
      className='flex h-screen w-full flex-col items-center
      justify-center gap-3 text-white'
    >
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview/>
      <div className='flex h-16 items-center justify-center gap-3'>
         <label className='flex justify-center text-white font-medium items-center gap-2'>
            <input
            type='checkbox'
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
            />
            Join with Mic and Camera disabled
         </label>
         <DeviceSettings/>
      </div>
      <Button 
        className='rounded-md bg-green-500 px-4'
        onClick={() => {call.join();
          setIsSetupComplete(true);
        }}
      >
          Join meeting
      </Button>
    </div>
  )
}

export default MeetingSetup