"use client";

import { useState } from "react";
import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page(){

  // Use the useUserAuth hook to get the user object and the login and logout functions
  const { user, googleSignIn, firebaseSignOut } = useUserAuth();

  console.log(user)

  // Handler function for signing in
  async function login(){
    // Sign in to Firebase with GitHub authentication
    await googleSignIn();
  }

  async function logout(){
    // Sign out of Firebase
    await firebaseSignOut();
  }

  return (
    <main>
      <div className="w-full flex justify-center m-4">
				{user == null ? 
          <div className="flex flex-col justify-center m-4 w-fit">
            <p className="text-xl font-bold">
              You are not logged in!
            </p>
            <button className="bg-green-200 p-2 rounded-sm hover:bg-green-300" onClick={login}>Login</button> 
          </div>
          :
          <div>
            <div className="flex flex-col justify-center m-4 w-fit">
              <p className="text-xl font-bold">
                Welcome! {user.data.displayName} ({user.data.email})
              </p>
               <button className="bg-red-200 p-2 rounded-sm hover:bg-green-300" onClick={logout}>Logout</button> 
            </div>
          </div>
        }
			</div>
    </main>
  )
}