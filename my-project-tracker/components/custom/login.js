"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function Login({ handleGoogleLogin }) {

  const providerImageSize = 75

  return (
    <Card className="w-full max-w-lg justify-center">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password below
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <CardDescription>Or continue with...</CardDescription>
        <div className="flex gap-2">
          <Image
            src="/google-icon.png"
            alt="google icon"
            width={providerImageSize}
            height={providerImageSize}
            onClick={handleGoogleLogin}
            className="p-2 rounded-md hover:shadow-sm hover:border-2"
          />
          {/*<Image*/}
          {/*  src="/github-icon.png"*/}
          {/*  alt="google icon"*/}
          {/*  width={providerImageSize}*/}
          {/*  height={providerImageSize}*/}
          {/*  onClick={handleGoogleLogin}*/}
          {/*  className="border-1 p-2 rounded-md hover:shadow-sm hover:border-2"*/}
          {/*/>*/}
        </div>
      </CardFooter>
    </Card>
  )
}