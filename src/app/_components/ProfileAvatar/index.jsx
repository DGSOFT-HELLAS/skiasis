'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu"
import { FaAngleDown } from "react-icons/fa";
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Skeleton } from "@/components/ui/skeleton"

import {Power} from 'lucide-react'



export function SkeletonDemo() {
  return (
    <div className="avatar_wrapper">
      <Skeleton className="avatar " />
      <div className="flex flex-column">
        <Skeleton className="avatar_skeleton_text_top" />
        <Skeleton className="avatar_skeleton_text_top" />
        <Skeleton className="avatar_skeleton_text_bottom" />
      </div>
    </div>
  )
}




const ProfileAvatar = () => {
  const router = useRouter();

  const handleAvatarName = (firstName) => {
    if (firstName) {
      return firstName[0].toUpperCase();
    }
  }

  const { data: session } = useSession();

  const user = session?.user;
  let initials = handleAvatarName(user?.name);
 
  return (
    <>
      {/* {initials ? ( */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <div className={styles.avatarWrapper}>
                <Button className={styles.avatar}>
                  {initials}
                </Button>
                <div >
                  <div className={styles.avatarTop}>
                    <p >{user?.name} </p>
                    <FaAngleDown className='text-muted-foreground ml-2' />
                  </div>
                  <p className={styles.avatarRole}>{user?.role}</p>
                 
                </div>
              </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" w-30" align="start" forceMount>
              <DropdownMenuItem 
              onClick={
                () => {
                signOut({ redirect: false }).then(() => {
                  router.push("/login"); 
                });
              }
              }>
                <Power size={16} className="mr-2" />
                Logout
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
       {/* ) : (
        <SkeletonDemo />
      )}  */}
    </>


  )
}

export default ProfileAvatar;