'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { ArrowRight, CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, MessageSquareIcon, MusicIcon, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const tools = [
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

const DashboardPage = (props: Props) => {
  const router = useRouter();

  return (
    <div>
      {/* header */}
      <div className='mb-8 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>Explore the power of AI</h2>
        <p className='text-muted-foreground p-4 text-sm md:text-lg text-center'>chat with smartest ai there is out right now!</p>
      </div>
      {/* tools array */}
      <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {
          tools.map((tool, index) => (
            <Card key={`cardkey-${index}`}
              className="p-4 border-black/5 flex items-center 
              justify-between hover:shadow-md transition cursor-pointer"
              onClick={() => {router.push(tool.href)}}
           >
              <div className="flex items-center gap-x-4">
                <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                  <tool.icon className={cn('w-8 h-8')} />
                </div>
                <div className="font-semibold">
                  {tool.label}
                </div>
              </div>
              <ArrowRight  className="h-5 w-5"/>
              {/* <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter> */}
            </Card>
          ))
        }
      </div>
    </div>
  )
}

export default DashboardPage
