'use client'
import './styles.css'

import { Moon, Sun, Menu as MenuIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ProfileAvatar from "../ProfileAvatar"
import { sidebarStore } from "@/store"
import Image from "next/image"

 export function Nav() {
    const { setOpenSidebar } = sidebarStore()

    return (
        <nav className="nav_container">
            <div className="nav_logo">
                <Image 
                    src="/newlogo.png" 
                    alt="logo" 
                    fill 
                    sizes={'130px 60px'}
                    priority
                />
            </div>
            <div className="nav_buttons">
              
                <Button className="nav_burger" variant="ghost" size="icon">
                    <MenuIcon className="h-[1rem] w-[1rem]"  />
                </Button> 
                <ProfileAvatar />
            </div>

        </nav>
    )
}








