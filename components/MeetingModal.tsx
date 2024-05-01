import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'


interface MeetingModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    className?: string
    buttonText?: string
    handleClick?: () => void
    children?: ReactNode
    image?: string
    buttonIcon?: string
}
function MeetingModal({ isOpen, onClose, title,
    className, buttonText, handleClick, children, image, buttonIcon }: MeetingModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='flex w-full flex-col gap-6 max-w-[520px] 
            border-none bg-dark-1 px-6 py-9 text-white'>
                <div className='flex flex-col gap-6'>
                    {image && (
                        <div className='flex justify-center'>
                            <Image src={image} width={72} height={72} alt='Meeting' />
                        </div>
                        )}
                        <h1 className={cn('text-3xl text-bold leading-[42px')}>{title}</h1>
                        {children}
                        <Button className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0' onClick={handleClick}>
                            {buttonIcon && (
                                <Image src={buttonIcon} width={13} height={13} alt='Button icon' />
                            )} &nbsp;
                            {buttonText || 'Schedule Meeting'}
                        </Button>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default MeetingModal