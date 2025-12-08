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

/**

@author Nick Brunet
@coauthers ...
@description Component card for user profile information, logout and new project creation

@date_created December 2nd, 2025

@modified December 8th, 2025
          - Added comments + Untracked ui changes

*/

export default function Login({ googleLogin, githubLogin, setSigningUp, email, setEmail, password, setPassword }) {

  /*
    Constants
  */
  const providerImageSize = 75

  /*
    Functions
  */
  function handleSigningUp() {
    setSigningUp(true)
  }

  function handleGoogleLogin(){
    googleLogin()
  }

  function handleGithubLogin(){
    githubLogin()
  }

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  /*
    Main component
  */
  return (
    <Card className="w-full max-w-lg justify-center">

      {/* Card header login information and signup button */}
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password below
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={handleSigningUp}>Sign Up</Button>
        </CardAction>
      </CardHeader>

      {/* Card content for email and password login */}
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">

            {/* Email container */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            {/* Password container */}
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
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={handlePasswordChange}
                required 
              />
            </div>
          </div>
        </form>
      </CardContent>

      {/* Card footer login button and options to continue with gmail or github account */}
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <CardDescription>Or continue with...</CardDescription>
        <div className="flex gap-2">
            
          {/* Gmail login image/button */}
          <Image
            src="/google-icon.png"
            alt="google icon"
            width={providerImageSize}
            height={providerImageSize}
            onClick={handleGoogleLogin}
            className="border-1 p-2 rounded-md hover:shadow-sm hover:border-2"
          />

          {/* Github login image/button */}
          <Image
            src="/github-icon.png"
            alt="google icon"
            width={providerImageSize}
            height={providerImageSize}
            onClick={handleGithubLogin}
            className="border-1 p-2 rounded-md hover:shadow-sm hover:border-2"
          />
        </div>
      </CardFooter>
    </Card>
  )
}