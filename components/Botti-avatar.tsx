import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const BottiAvatar = () => {
    return (
        <Avatar className="w-8 h-8">                
            <AvatarImage src="/logo.png" alt="bot-image" className="p-1" sizes=""/>
        </Avatar>
    )
}