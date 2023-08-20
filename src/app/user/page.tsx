"use client"
import React, { use } from "react";
import { useReadLocalStorage } from 'usehooks-ts'
import useSWR from 'swr'
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { redirect } from 'next/navigation'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



const fetcher = ([url, token]: string[]) => fetch(url, {headers:{"Authorization":`Bearer ${token}`}}).then((res) => res.json())

export default function Home() {
    
    const token: string|null = useReadLocalStorage('token')
    

const { data, error } = useSWR([`${process.env.NEXT_PUBLIC_API_URL}/api/v1/me`, token,
        ],fetcher);
    
      if (error || data?.status === 401) redirect("/")
      if (!data) return <div>Loading...</div>
      console.log(data,error)

    
    
    return(
        <div className='container flex justify-center mt-20'>
            <Card>
            <CardHeader>
                <CardTitle>Hi {data.username}</CardTitle>
                <CardDescription>
                Nice to see you again
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div>
                    <p className="text-sm font-medium leading-none">{data.username}</p>
                    <p className="text-sm text-muted-foreground">{data.email}</p>
                    </div>
                </div>
                </div>
            </CardContent>
            </Card>
        </div>
      )
    }