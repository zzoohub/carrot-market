import { Stream, LiveChat } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useMutation from "../../libs/client/useMutation";
import useUser from "../../libs/client/useUser";
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
  if (data?.ok === false) {
    router.push("/streams");
  }
  console.log(data);

  const { register, handleSubmit, reset } = useForm<MessageType>();
  const [createMessage, { loading, data: messageData }] =
    useMutation<CreateMessageResponse>(
      `/api/streams/${router.query.id}/liveChats`
    );
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

  return (
    <Layout title="Stream" canGoBack>
      <div className="py-10 px-4">
        {data?.stream?.streamId ? (
          <iframe
            src={`https://iframe.videodelivery.net/${data?.stream?.streamId}`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen={true}
            className="w-full rounded-md shadow-sm  aspect-video"
          ></iframe>
        ) : null}
        <div className="mt-5">
          <h1 className="text-2xl font-bold text-gray-900">
            {data?.stream?.name}
          </h1>
          <span className="text-xl block mt-2 text-gray-600 font-bold">
            ${data?.stream?.price}
          </span>
          <p className=" my-2 text-gray-700">{data?.stream?.description}</p>
          {data?.stream?.streamKey !== "xxx" ? (
            <div className="flex flex-col bg-orange-100 p-2 rounded-md mt-4">
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
          <h2 className="text-2xl font-bold text-gray-900 mt-14">Live Chat</h2>
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
    </Layout>
  );
};

export default DetailStream;
