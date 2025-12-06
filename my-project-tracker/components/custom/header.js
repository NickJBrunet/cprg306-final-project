import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"

import HoverAvatar from "./hover-avatar"

export default function Header(){
  return (
    <Card className="flex flex-row px-12 justify-center">
      <CardTitle className="text-lg">My Project Tracker</CardTitle>
      <CardDescription className="text-lg">An Application by</CardDescription>
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
        <HoverAvatar githubUserName="NickJBrunet" />
        <HoverAvatar githubUserName="AhmadAl79" />
        <HoverAvatar githubUserName="Firaol-A" />
      </div>
    </Card>
  )
}