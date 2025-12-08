import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"

import HoverAvatar from "./hover-avatar"

/**

@author Nick Brunet
@coauthers ...
@description Component header for website

@date_created December 2nd, 2025

@modified December 8th, 2025
          - Added comments + Untracked ui changes

*/

export default function Header(){
  return (
    <Card className="flex flex-row px-12 justify-center">

      {/* Header information */}
      <CardTitle className="text-lg">My Project Tracker</CardTitle>
      <CardDescription className="text-lg">An Application by</CardDescription>
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">

        {/* Website developer avatars */}
        <HoverAvatar githubUserName="NickJBrunet" />
        <HoverAvatar githubUserName="AhmadAl79" />
        <HoverAvatar githubUserName="Firaol-A" />
      </div>
    </Card>
  )
}