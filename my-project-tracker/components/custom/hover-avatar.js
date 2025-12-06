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

export default function HoverAvatar({ githubUserName }){

  const githubProfileURL = `https://avatars.githubusercontent.com/${githubUserName}`
  const githubURL = `https://github.com/${githubUserName}`

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar>
          <AvatarImage src={githubProfileURL} alt={githubUserName} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-4 items-center fit-content">
          <Avatar>
            <AvatarImage src={githubProfileURL} alt={githubUserName} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{githubUserName}</h4>
            <p className="text-sm">{githubURL}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}