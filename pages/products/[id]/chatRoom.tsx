import { ChatRoom, PrivateChat, Product, User } from "@prisma/client";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useMutation from "../../../libs/client/useMutation";
import useUser from "../../../libs/client/useUser";
import { imgUrl } from "../../../libs/client/utils";
import Layout from "../../components/layout";
import UserMessage from "../../components/message";

interface ChatForm {
  chat: string;
}
interface CreateChatResponse {
  ok: boolean;
  newChat: PrivateChat;
}

interface PrivateChatWithUser extends PrivateChat {
  user: User;
}
interface ChatRoomDetail extends ChatRoom {
  PrivateChats: PrivateChatWithUser[];
}
interface ChatRoomResponse {
  ok: boolean;
  product: Product;
  chatRoom?: ChatRoomDetail;
}
const PrivateChat: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<ChatForm>();
  const [createMessage, { data: newChat, loading: newChatLoading }] =
    useMutation<CreateChatResponse>(
      `/api/products/${router.query.id}/chatRoom/${
        router.query.buyerId ? router.query.buyerId : user?.id
      }`
    );

  const { data, mutate } = useSWR<ChatRoomResponse>(
    router.query.id
      ? `/api/products/${router.query.id}/chatRoom/${
          router.query.buyerId ? router.query.buyerId : user?.id
        }`
      : null
  );
  const [popup, setPopup] = useState(false);

  const confirm = async (event: React.FormEvent) => {
    event.preventDefault();
    const tradeData = await fetch(`/api/products/${router.query.id}/trade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    if (tradeData && tradeData.ok) {
      router.push("/");
    }
  };

  const onValid = (form: ChatForm) => {
    if (newChatLoading) return;
    reset();
    if (data && data?.chatRoom?.PrivateChats !== undefined) {
      mutate(
        (prev) =>
          prev &&
          ({
            ...prev,
            chatRoom: {
              ...data?.chatRoom,
              PrivateChats: [
                ...data?.chatRoom?.PrivateChats!,
                {
                  chat: form.chat,
                  user: { avatar: user?.avatar, id: user?.id },
                },
              ],
            },
          } as any),
        false
      );
    } else if (data && data?.chatRoom?.PrivateChats === undefined) {
      mutate(
        (prev) =>
          prev &&
          ({
            ...prev,
            chatRoom: {
              ...data?.chatRoom,
              PrivateChats: [
                {
                  chat: form.chat,
                  user: { avatar: user?.avatar, id: user?.id },
                },
              ],
            },
          } as any),
        false
      );
    }
    createMessage(form);
  };

  return (
    <Layout seoTitle="Private Chat" title="Private Chat" canGoBack>
      <div className="relative h-max w-full px-2">
        <div className="h-[18vh] flex pt-2">
          <div className="relative w-48 aspect-square rounded-md overflow-hidden mr-2">
            <Image
              layout="fill"
              src={imgUrl(data?.product?.image, "public")}
              className="object-cover"
              priority
            ></Image>
          </div>
          <div className="flex flex-col py-2">
            <h3 className="font-bold text-slate-800 text-md mb-1">
              {data?.product?.name}
            </h3>
            <strong className="font-bold text-xl text-orange-500 cursor-pointer text-dec">
              {data?.product?.price} ￦
            </strong>

            <p className="text-sm mt-4">{data?.product?.description}</p>
          </div>
        </div>
        <div className="flex flex-col justify-end py-10 pb-16 h-[65vh] overflow-y-auto  px-4 mt-2  rounded-md bg-slate-200">
          {data?.chatRoom?.PrivateChats[0] !== undefined
            ? data?.chatRoom?.PrivateChats?.map((chat) => (
                <div key={chat?.id}>
                  <UserMessage
                    message={chat?.chat}
                    reversed={chat?.user?.id === user?.id}
                    imgId={chat?.user?.avatar!}
                  ></UserMessage>
                </div>
              ))
            : null}
        </div>
        <div className="w-full max-w-md mx-auto inset-x-0 -mt-10">
          <form onSubmit={handleSubmit(onValid)} className="relative">
            <input
              {...register("chat")}
              type="text"
              className="w-full border rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-none px-3 py-1 text-sm shadow-sm"
            />
            <button className="absolute inset-y-0 my-auto right-1 h-6 aspect-square bg-orange-500 rounded-full text-center leading-[22px] text-white font-semibold -rotate-90 cursor-pointer hover:scale-105 hover:bg-orange-600">
              <span>&rarr;</span>
            </button>
          </form>
        </div>

        {!router.query.buyerId ? (
          <span
            onClick={() => {
              setPopup(true);
            }}
            className="w-full block py-3 bg-orange-500 rounded-md text-center leading-[22px] text-white font-semibold  cursor-pointer hover:bg-orange-600 mt-5"
          >
            구매확정
          </span>
        ) : null}
      </div>

      {popup ? (
        <form
          onSubmit={confirm}
          className="absolute inset-0 m-auto h-max bg-slate-900 rounded-md w-[300px] border flex flex-col justify-center items-center py-4"
        >
          <span className="text-white">구매를 확정지으시겠습니까?</span>
          <div className="flex justify-center items-center w-full mt-5">
            <button className="bg-orange-400 text-white w-20 rounded-sm hover:bg-orange-500">
              네
            </button>
            <div
              onClick={() => setPopup(false)}
              className="cursor-pointer ml-5 rounded-sm border border-slate-300 bg-white w-20 text-center"
            >
              아니요
            </div>
          </div>
        </form>
      ) : null}
    </Layout>
  );
};

export default PrivateChat;
