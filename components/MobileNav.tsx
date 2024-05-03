"use client"
import {Sheet,SheetClose,SheetContent,SheetTrigger} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants/SidebarLinks";
import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";


function MobileNav() {
    const pathName = usePathname();
    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        alt="Humberger Icon"
                        className="cursor-pointer sm:hidden" width={32} height={32}>

                    </Image>
                </SheetTrigger>
                <SheetContent side={"left"} className="border-none bg-dark-1">
                    <Link href='/' className='flex items-centr gap-1'>
                        <Image src='/icons/logo.svg' width={32} height={32} alt='logo' />
                        <p className='text[26px] font-extrabold text-white'>YM App</p>
                    </Link>
                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <section className="flex h-full flex-col gap-6 pt-16">
                                {sidebarLinks.map((link) => {
                                    const isActive = pathName === link.route;
                                    return (
                                        <SheetClose key={link.label} asChild>
                                            <Link
                                                key={link.label}
                                                href={link.route}
                                                className={cn('flex items-center p-4 text-white rounded-lg w-full max-w-60',
                                                    { 'bg-blue-1': isActive, }
                                                )}
                                                style={{ gap: "1rem", }}
                                            >
                                                <Image
                                                    src={link.icon}
                                                    alt={link.label}
                                                    width={24}
                                                    height={24}
                                                />
                                                <p className='font-semibold'>
                                                    {link.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav