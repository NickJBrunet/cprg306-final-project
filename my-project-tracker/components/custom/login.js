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
    <Card className="text-center w-full max-w-md justify-center">

      {/* Card header login information and signup button */}
      <CardHeader>
        <CardTitle>Login/Create account</CardTitle>
      </CardHeader>

      {/* Card footer login button and options to continue with gmail or github account */}
      <CardFooter className="flex-col gap-2">
        <CardDescription>Via Service Supported Provider</CardDescription>
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