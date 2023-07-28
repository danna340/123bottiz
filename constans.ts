import { MessageSquareIcon, ImageIcon, VideoIcon, MusicIcon, CodeIcon } from "lucide-react";

export const MAX_FREE_COUNT = 10;

export const tools = [
    {
      label: 'Conversation',
      href: '/conversation',
      icon: MessageSquareIcon,
      color: 'text-violet-500',
      bgColor: 'bg-violet-500/10'
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: '/image',
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10'
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: '/video',
        color: 'text-orange-700',
        bgColor: 'bg-orange-500/10'
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        href: '/music',
        color: 'text-pink-700',
        bgColor: 'bg-pink-700/10'
    },
    {
        label: "Code Generation",
        icon: CodeIcon,
        href: '/code',
        color: 'text-purple-700',
        bgColor: 'bg-purple-700/20'
    },
  ]