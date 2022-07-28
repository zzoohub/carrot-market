import { ChatRoom, User } from "@prisma/client";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { imgUrl } from "../../../libs/client/utils";
import Layout from "../../components/layout";

interface ChatRoomWithDetail extends ChatRoom {
  buyer: User;
  PrivateChats: any;
}
interface ChatListResponse {
  ok: boolean;
  chatList: ChatRoomWithDetail[];
}

const ChatList: NextPage = () => {
  const router = useRouter();

  const { data } = useSWR<ChatListResponse>(
    router.query.id ? `/api/products/${router.query.id}/chatList` : null
  );

  return (
    <Layout seoTitle="Received Message" title="받은 메세지" canGoBack>
      <div className="divide-y">
        {data?.chatList.map((chatRoom) => (
          <Link
            href={{
              pathname: `/products/${router.query.id}/chatRoom`,
              query: { buyerId: chatRoom.buyerId },
            }}
            key={chatRoom.id}
          >
            <div className="flex justify-between px-4 py-5 hover:bg-slate-50 cursor-pointer">
              <div className="flex">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                  <Image
                    layout="fill"
                    src={imgUrl(chatRoom.buyer.avatar, "avatar")}
                    className="object-cover"
                  ></Image>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold">{chatRoom.buyer.name}</h3>
                  <span className="text-sm mt-1">
                    {chatRoom.PrivateChats[0] !== undefined
                      ? chatRoom.PrivateChats[chatRoom.PrivateChats.length - 1]
                          .chat
                      : "null"}
                  </span>
                </div>
              </div>
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
                    getHourRemainder(
                      new Date(
                        chatRoom.createdAt.toString().slice(0, 10)
                      ).getTime()
                    ) +
                    "시간 전"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

function getHourRemainder(time: any): any {
  return (((Date.now() - time) / 1000 / 60 / 60) % 24).toFixed();
}
function getDateRemainder(time: any): any {
  return Math.floor((Date.now() - time) / 1000 / 60 / 60 / 24);
}

export default ChatList;
