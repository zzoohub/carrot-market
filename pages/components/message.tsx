import { cls } from "../../libs/utils";


interface MessageProps{
  reversed?: boolean;
  avartarUrl?: string;
  message: string;
}

export default function Message({reversed, avartarUrl, message}:MessageProps){
  return (
    <div className={cls("flex items-center space-x-2", reversed ? "flex-row-reverse space-x-reverse" : "")}>
      <div className="h-7 w-7 rounded-full bg-slate-500" />
      <div className="border py-2 px-3 rounded-xl text-sm">
       <p>{message}</p>
      </div>
    </div>
  )
}