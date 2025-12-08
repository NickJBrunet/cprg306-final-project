import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

/**

@author Nick Brunet
@coauthers ...
@description Component hover avatar for website header developer avatars

@date_created December 2nd, 2025

@modified December 8th, 2025
          - Added comments + Untracked ui changes

*/

export default function HoverAvatar({ githubUserName }){

  const githubProfileURL = `https://avatars.githubusercontent.com/${githubUserName}`
  const githubURL = `https://github.com/${githubUserName}`

  return (
    <HoverCard>

      {/* Hover card trigger action */}
      <HoverCardTrigger asChild>

        {/* Avatar component for website header avatar */}
        <Avatar>
          <AvatarImage src={githubProfileURL} alt={githubUserName} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>

      {/* Hover card content for website header avatar */}
      <HoverCardContent className="w-80">
        <div className="flex gap-4 items-center fit-content">
          
          {/* Hover card avatar in hover card content */}
          <Avatar>
            <AvatarImage src={githubProfileURL} alt={githubUserName} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {/* Hover card content of Github information of avatar */}
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{githubUserName}</h4>
            <p className="text-sm">{githubURL}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}