import Image from 'next/image'
import { Icons } from "@/components/ui/icons"
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
import { Label } from "@/components/ui/label"

export default function Home() {
  return (
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
            <Input id="email" type="email" placeholder="example@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}