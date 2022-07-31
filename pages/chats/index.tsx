import { ChatRoom, PrivateChat, Product, User } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
import Layout from "../components/layout";

interface ChatWithUser extends ChatRoom {
  seller: User;
  buyer: User;
  PrivateChats: PrivateChat[];
}
interface ChatListResponse {
  ok: boolean;
  chatList: ChatWithUser[];
}

const Chats: NextPage = () => {
  const { data } = useSWR<ChatListResponse>("/api/chatList");
  console.log(data);
  return (
    <Layout seoTitle="Chats" title="Chats" hasTabBar>
      <div className="divide-y-[1px]">
        {data?.chatList.map((chatRoom) => (
          <Link
            href={{
              pathname: `/products/${chatRoom.productId}/chatRoom`,
              query: { buyerId: chatRoom.buyerId },
            }}
            key={chatRoom.id}
          >
            <div className="px-4 py-5 space-y-5 cursor-pointer hover:bg-slate-50">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-slate-200 rounded-full" />
                <div>
                  <span className="text-sm block font-medium text-gray-700">
                    {chatRoom.seller.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    {Number(
                      getDateRemainder(
                        new Date(
                          chatRoom.createdAt.toString().slice(0, 10)
                        ).getTime()
                      )
                    ) < 1
                      ? getHourRemainder(
                          new Date(
                            chatRoom.createdAt.toString().slice(0, 10)
                          ).getTime()
                        ) + "시간 전"
                      : getDateRemainder(
                          new Date(
                            chatRoom.createdAt.toString().slice(0, 10)
                          ).getTime()
                        ) +
                        "일" +
                        "_" +
                        getHourRemainder(
                          new Date(
                            chatRoom.createdAt.toString().slice(0, 10)
                          ).getTime()
                        ) +
                        "시간 전"}
                  </span>
                  <p className="text-gray-700 mt-2">
                    {chatRoom.PrivateChats
                      ? chatRoom.PrivateChats.at(-1)?.chat
                      : null}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

function getHourRemainder(time: any): any {
  return Math.floor(((Date.now() - time) / 1000 / 60 / 60) % 24);
}
function getDateRemainder(time: any): any {
  return Math.floor((Date.now() - time) / 1000 / 60 / 60 / 24);
}

export default Chats;
