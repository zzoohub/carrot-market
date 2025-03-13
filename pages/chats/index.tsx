import { ChatRoom, PrivateChat, Product, User } from "@prisma/client"
import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"
import useUser from "../../libs/client/useUser"
import { cls, imgUrl } from "../../libs/client/utils"
import Layout from "../components/layout"

interface ChatWithUser extends ChatRoom {
  seller: User
  buyer: User
  PrivateChats: PrivateChat[]
}
interface ChatListResponse {
  ok: boolean
  chatList: ChatWithUser[]
}

const Chats: NextPage = () => {
  const { data } = useSWR<ChatListResponse>("/api/chatList")
  const { user } = useUser()

  return (
    <Layout seoTitle="Chats" title="대화중인 메세지" hasTabBar>
      <div className="divide-y-[1px]">
        {data?.chatList.map(chatRoom => (
          <Link
            href={{
              pathname: `/products/${chatRoom.productId}/chatRoom`,
              query: { buyerId: chatRoom.buyerId },
            }}
            key={chatRoom.id}
          >
            <div className="px-4 py-5 space-y-5 cursor-pointer hover:bg-slate-50">
              <div className="flex items-start space-x-3">
                <div
                  className={cls(
                    "w-8 h-8 relative rounded-full overflow-hidden aspect-square",
                    !chatRoom?.seller?.avatar ? "bg-slate-300" : "",
                  )}
                >
                  <Image src={imgUrl(chatRoom?.seller?.avatar, "avatar")} layout="fill" className="object-cover" />
                </div>

                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <span className="text-xs font-bold block text-gray-700">{chatRoom.seller.name}</span>
                    <span
                      className={cls(
                        "text-[10px]  text-white rounded-sm px-1 py-0.5",
                        chatRoom?.seller?.id === user?.id ? "bg-blue-300" : "bg-orange-400",
                      )}
                    >
                      {chatRoom?.seller?.id == user?.id ? "판매중인 상품" : "구매문의"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700 mt-1 block text-sm">
                      {chatRoom.PrivateChats ? chatRoom.PrivateChats.at(-1)?.chat : null}
                    </p>
                    <span className="text-[12px] text-slate-500">
                      {Number(getDateRemainder(new Date(chatRoom.createdAt.toString().slice(0, 10)).getTime())) < 1
                        ? getHourRemainder(new Date(chatRoom.createdAt.toString().slice(0, 10)).getTime()) + "시간 전"
                        : getDateRemainder(new Date(chatRoom.createdAt.toString().slice(0, 10)).getTime()) +
                          "일" +
                          " " +
                          getHourRemainder(new Date(chatRoom.createdAt.toString().slice(0, 10)).getTime()) +
                          "시간 전"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

function getHourRemainder(time: any): any {
  return Math.floor(((Date.now() - time) / 1000 / 60 / 60) % 24)
}
function getDateRemainder(time: any): any {
  return Math.floor((Date.now() - time) / 1000 / 60 / 60 / 24)
}

export default Chats
