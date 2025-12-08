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

/**

@author Nick Brunet
@coauthers ...
@description Component for handling signing up onto the website

@date_created December 2nd, 2025

@modified December 8th, 2025
          - Added comments + Untracked ui changes

*/

export default function Login({ setSigningUp, email, setEmail, password, setPassword }) {
  
  /*
    Functions
  */
  function handleLoggingIn() {
    setSigningUp(false)
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

      {/* Card header for account creation information and back to login button */}
      <CardHeader>
        <CardTitle>Create your new account</CardTitle>
        <CardDescription>
          Enter your email and password below
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={handleLoggingIn}>Back to login</Button>
        </CardAction>
      </CardHeader>

      {/* Card content for email and password inputs */}
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">

            {/* Email input container */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(event) => handleEmailChange(event)}
                required
              />
            </div>

            {/* Email input container */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(event) => handlePasswordChange(event)}
                required 
              />
            </div>
          </div>
        </form>
      </CardContent>
      
      {/* Card footer for sign up button */}
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  )
}