import { Stream, Message } from "@prisma/client";
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
  message: string;
  id: number;
  user: {
    avatar?: string;
    id: number;
  };
}
interface StreamWithMessages extends Stream {
  messages: StreamMessage[];
}
interface GetStreamResponse {
  ok: boolean;
  stream: StreamWithMessages;
}
interface MessageType {
  message: string;
}
interface CreateMessageResponse {
  ok: boolean;
  newMessage: Message;
}

const DetailStream: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<GetStreamResponse>(
    router.query.id ? `/api/streams/${router?.query?.id}` : null
  );
  if (data?.ok === false) {
    router.push("/streams");
  }

  const { register, handleSubmit, reset } = useForm<MessageType>();
  const [createMessage, { loading, data: messageData }] =
    useMutation<CreateMessageResponse>(
      `/api/streams/${router.query.id}/messages`
    );
  const onValid = (chat: MessageType) => {
    if (loading) return;
    createMessage(chat);
    reset();
  };
  useEffect(() => {
    if (messageData && messageData.ok) {
      mutate();
    }
  }, [messageData]);

  return (
    <Layout title="Stream" canGoBack>
      <div className="py-10 px-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="mt-5">
          <h1 className="text-2xl font-bold text-gray-900">
            {data?.stream?.name}
          </h1>
          <span className="text-xl block mt-2 text-gray-600 font-bold">
            ${data?.stream?.price}
          </span>
          <p className=" my-2 text-gray-700">{data?.stream?.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mt-14">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4 mt-3">
            {data?.stream.messages.map((message) => (
              <UserMessage
                key={message.id}
                message={message.message}
                reversed={message.user.id === user?.id}
              ></UserMessage>
            ))}
          </div>
          <div className="fixed w-full max-w-md mx-auto inset-x-0 bottom-3">
            <form onSubmit={handleSubmit(onValid)} className="relative">
              <input
                {...register("message")}
                type="text"
                className="w-full border rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-none px-3 py-1 text-sm shadow-sm"
              />
              <div className="absolute inset-y-0 my-auto right-1 h-6 aspect-square bg-orange-500 rounded-full text-center leading-[22px] text-white font-semibold -rotate-90 cursor-pointer hover:scale-105 hover:bg-orange-600">
                <span>&rarr;</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailStream;
