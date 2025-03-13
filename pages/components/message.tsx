import Image from "next/image"
import { cls, imgUrl } from "../../libs/client/utils"

interface MessageProps {
  reversed?: boolean
  imgId?: string
  message: string
}

export default function UserMessage({ reversed, message, imgId }: MessageProps) {
  return (
    <div className={cls("flex items-center space-x-2 my-1", reversed ? "flex-row-reverse space-x-reverse" : "")}>
      <div className="relative h-7 w-7 rounded-full bg-slate-500 overflow-hidden">
        <Image src={imgUrl(imgId, "avatar")} layout="fill" className="object-cover"></Image>
      </div>

      <div className="py-2 px-3 rounded-xl text-sm bg-white border border-slate-300">
        <p>{message}</p>
      </div>
    </div>
  )
}
