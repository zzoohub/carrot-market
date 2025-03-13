import { ChatRoom, PrivateChat, Product, User } from "@prisma/client"
import type { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import useSWR from "swr"
import useMutation from "../../../libs/client/useMutation"
import useUser from "../../../libs/client/useUser"
import { imgUrl } from "../../../libs/client/utils"
import Layout from "../../components/layout"
import UserMessage from "../../components/message"

interface ChatForm {
  chat: string
}
interface CreateChatResponse {
  ok: boolean
  newChat: PrivateChat
}

interface PrivateChatWithUser extends PrivateChat {
  user: User
}
interface ChatRoomDetail extends ChatRoom {
  PrivateChats: PrivateChatWithUser[]
}
interface ChatRoomResponse {
  ok: boolean
  product: Product
  chatRoom?: ChatRoomDetail
}
const PrivateChat: NextPage = () => {
  const router = useRouter()
  const { user } = useUser()
  const { register, handleSubmit, reset } = useForm<ChatForm>()
  const [createMessage, { data: newChat, loading: newChatLoading }] = useMutation<CreateChatResponse>(
    `/api/products/${router.query.id}/chatRoom/${router.query.buyerId ? router.query.buyerId : user?.id}`,
  )

  const { data, mutate } = useSWR<ChatRoomResponse>(
    router.query.id
      ? `/api/products/${router.query.id}/chatRoom/${router.query.buyerId ? router.query.buyerId : user?.id}`
      : null,
  )
  const [popup, setPopup] = useState(false)

  const confirm = async (event: React.FormEvent) => {
    event.preventDefault()
    const tradeData = await fetch(`/api/products/${router.query.id}/trade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => res.json())
    if (tradeData && tradeData.ok) {
      router.push("/")
    }
  }

  const onValid = (form: ChatForm) => {
    if (newChatLoading) return
    reset()
    if (data && data?.chatRoom?.PrivateChats !== undefined) {
      mutate(
        prev =>
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
        false,
      )
    } else if (data && data?.chatRoom?.PrivateChats === undefined) {
      mutate(
        prev =>
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
        false,
      )
    }
    createMessage(form)
  }

  return (
    <Layout seoTitle="Private Chat" title="다이렉트 메세지" canGoBack>
      <div className="relative h-max w-full px-2">
        <div className="h-[5vh] w-full flex justify-center items-center bg-zinc-900 text-zinc-200 text-xs font-bold">
          판매중인 상품
        </div>
        <div id="productInfo" className="h-[18vh] flex pt-2 bg-zinc-600 p-2 ">
          <div className="relative w-38 aspect-square rounded-md overflow-hidden mr-2 border border-zinc-400">
            <Image layout="fill" src={imgUrl(data?.product?.image, "public")} className="object-cover" priority></Image>
          </div>
          <div className="flex flex-col py-2">
            <h3 className="font-bold text-slate-100 text-sm">{data?.product?.name}</h3>
            <strong className="font-bold text-md text-orange-400 cursor-pointer">{data?.product?.price} ￦</strong>

            <p className="text-xs mt-2 text-slate-100">{data?.product?.description}</p>
          </div>
        </div>
        <div className="flex flex-col justify-end py-10 pb-16 h-[60vh] overflow-y-auto  px-4 mt-2  rounded-sm bg-slate-200">
          {data?.chatRoom?.PrivateChats[0] !== undefined
            ? data?.chatRoom?.PrivateChats?.map(chat => (
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
            <button className="absolute flex justify-center items-center inset-y-0 my-auto right-1 h-6 aspect-square bg-orange-500 rounded-full text-center cursor-pointer hover:bg-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" width="12" height="12">
                <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L277.3 424.9l-40.1 74.5c-5.2 9.7-16.3 14.6-27 11.9S192 499 192 488V392c0-5.3 1.8-10.5 5.1-14.7L362.4 164.7c2.5-7.1-6.5-14.3-13-8.4L170.4 318.2l-32 28.9 0 0c-9.2 8.3-22.3 10.6-33.8 5.8l-85-35.4C8.4 312.8 .8 302.2 .1 290s5.5-23.7 16.1-29.8l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
              </svg>
            </button>
          </form>
        </div>

        {router.query.buyerId === user?.id + "" ? (
          <span
            onClick={() => {
              setPopup(true)
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
            <button className="bg-orange-400 text-white w-20 rounded-sm hover:bg-orange-500">네</button>
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
  )
}

export default PrivateChat
