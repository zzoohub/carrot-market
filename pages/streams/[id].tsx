import { Stream, LiveChat, User } from "@prisma/client";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useMutation from "../../libs/client/useMutation";
import useUser from "../../libs/client/useUser";
import { imgUrl } from "../../libs/client/utils";
import Layout from "../components/layout";
import UserMessage from "../components/message";

interface StreamMessage {
  liveMessage: string;
  id: number;
  user: {
    avatar?: string;
    id: number;
  };
}
interface StreamWithMessages extends Stream {
  LiveChats: StreamMessage[];
  user: User;
}
interface GetStreamResponse {
  ok: boolean;
  stream: StreamWithMessages;
}
interface MessageType {
  liveMessage: string;
}
interface CreateMessageResponse {
  ok: boolean;
  newMessage: LiveChat;
}

const DetailStream: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<GetStreamResponse>(
    router.query.id ? `/api/streams/${router?.query?.id}` : null,
    {
      refreshInterval: 1000,
    }
  );
  const { data: recordedData } = useSWR(
    `https://dash.cloudflare.com/api/v4/accounts/${process.env.CF_ID}/stream/live_inputs/${data?.stream?.streamId}/videos`
  );

  const { register, handleSubmit, reset } = useForm<MessageType>();
  const [createMessage, { loading, data: messageData }] =
    useMutation<CreateMessageResponse>(
      `/api/streams/${router.query.id}/liveChats`
    );
  const [endStream, { data: endStreamData }] = useMutation(
    `/api/streams/${data?.stream?.id}`
  );
  const [popup, setPopup] = useState(false);
  const onValid = (chat: MessageType) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            LiveChats: [
              ...prev.stream.LiveChats,
              {
                id: Date.now(),
                liveMessage: chat.liveMessage,
                user: {
                  ...user,
                },
              },
            ],
          },
        } as any),
      false
    );
    createMessage(chat);
  };

  useEffect(() => {
    if (endStreamData && endStreamData.ok) {
      router.push("/streams");
    }
  }, [endStreamData]);

  if (data?.ok === false) {
    router.push("/streams");
  }

  console.log(recordedData);
  return (
    <Layout title="Stream" canGoBack>
      <div className="py-10 px-4">
        {data?.stream?.streamId ? (
          <iframe
            src={
              data?.stream?.live
                ? `https://iframe.videodelivery.net/${data?.stream?.streamId}`
                : ``
            }
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen={true}
            className="w-full rounded-md shadow-sm  aspect-video"
          ></iframe>
        ) : null}
        <div className="mt-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image
                  className="object-cover"
                  layout="fill"
                  src={imgUrl(data?.stream?.user?.avatar, "avatar")}
                ></Image>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight truncate w-[100%]">
                  {data?.stream?.title}
                </h1>
                <Link href={`/streams/streamList/${data?.stream?.userId}`}>
                  <span className="cursor-pointer text-xs hover:underline">
                    {data?.stream?.user?.name}
                  </span>
                </Link>
              </div>
            </div>

            {user?.id === data?.stream?.userId && data?.stream.live ? (
              <button
                className="justify-items-end bg-red-500 text-xs rounded-md text-slate-800 py-1 px-2 font-bold"
                onClick={() => setPopup(true)}
              >
                종료하기
              </button>
            ) : null}
          </div>
          <span className="text-xs block mt-4 text-gray-600 font-bold">
            이름: {data?.stream?.name}
          </span>
          <span className="text-xs block mt-1 text-gray-600 font-bold">
            책정가: {data?.stream?.price}원
          </span>
          <p className="text-xs block mt-1 text-gray-600 font-bold">
            제품설명: {data?.stream?.description}
          </p>

          {data?.stream?.streamKey !== "xxx" ? (
            <div className="flex flex-col bg-orange-100 p-2 rounded-md mt-5">
              <span className="font-bold">Stream Key (scret)</span>
              <span className="flex flex-col mt-2">
                <span className="uppercase text-orange-700 text-sm font-bold">
                  Key
                </span>
                <em className="text-xs">{data?.stream?.streamKey}</em>
              </span>
              <span className="flex flex-col mt-2">
                <span className="uppercase text-orange-700 text-sm font-bold">
                  Url
                </span>
                <em className="text-xs">{data?.stream?.streamUrl}</em>
              </span>
            </div>
          ) : null}
        </div>
        <div className="relative h-max w-full">
          <h2 className="text-2xl font-bold text-gray-900 mt-10">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] overflow-y-auto  px-4 space-y-4 mt-3 border rounded-md">
            {data?.stream?.LiveChats?.map((chat) => (
              <UserMessage
                key={chat.id}
                message={chat.liveMessage}
                reversed={chat.user.id === user?.id}
                imgId={chat.user.avatar}
              ></UserMessage>
            ))}
          </div>
          <div className="w-full max-w-md mx-auto inset-x-0 bottom-3 -mt-10">
            <form onSubmit={handleSubmit(onValid)} className="relative">
              <input
                {...register("liveMessage")}
                type="text"
                className="w-full border rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-none px-3 py-1 text-sm shadow-sm"
              />
              <button className="absolute inset-y-0 my-auto right-1 h-6 aspect-square bg-orange-500 rounded-full text-center leading-[22px] text-white font-semibold -rotate-90 cursor-pointer hover:scale-105 hover:bg-orange-600">
                <span>&rarr;</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {popup ? (
        <form
          onSubmit={() => {
            endStream({});
          }}
          className="absolute inset-0 m-auto h-max bg-slate-900 rounded-md w-[300px] border flex flex-col justify-center items-center py-4"
        >
          <span className="text-white">스트리밍을 종료하시겠습니까?</span>
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

export default DetailStream;
