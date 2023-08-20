"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLocalStorage } from 'usehooks-ts'
import { Label } from "@/components/ui/label"
import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"


export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useLocalStorage('token', null)
  const { toast } = useToast()
  const router = useRouter()
  


  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(email, password)
    e.preventDefault();
    if (!email || !password) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    let data = await res.json()
    if (res.ok){
      setToken(data.token)
      router.push("/user")
    }
    else{
      toast({
        title: "Wrong data",
        description: "User data is not corect",
      })
    }

  };

  return (
    <form
      onSubmit={onSubmit}>
      <div className='container flex justify-center mt-20'>
        <Card className='lg:w-1/2'>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="example@example.com" onChange={(e) => setEmail(e.currentTarget.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" onChange={(e) => setPassword(e.currentTarget.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Login</Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}