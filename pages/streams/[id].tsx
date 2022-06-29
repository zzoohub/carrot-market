import { Stream } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../components/layout";
import Message from "../components/message";

interface GetStreamResponse {
  ok: boolean;
  stream: Stream;
}

const Stream: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<GetStreamResponse>(
    router.query.id ? `/api/streams/${router?.query?.id}` : null
  );
  if (data?.ok === false) {
    router.push("/streams");
  }

  return (
    <Layout title="Stream" canGoBack>
      <div className="py-10 px-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="mt-5">
          <h1 className="text-2xl font-bold text-gray-900">
            {data?.stream.name}
          </h1>
          <span className="text-xl block mt-2 text-gray-600 font-bold">
            ${data?.stream.price}
          </span>
          <p className=" my-2 text-gray-700">{data?.stream.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mt-14">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4 mt-3">
            <Message message="왼쪽이 말하고있습니다."></Message>
            <Message message="오른쪽이 말하고있습니다." reversed></Message>
            <Message message="왼쪽이 말하고있습니다."></Message>
            <Message message="오른쪽이 말하고있습니다." reversed></Message>
            <Message message="왼쪽이 말하고있습니다."></Message>
            <Message message="오른쪽이 말하고있습니다." reversed></Message>
          </div>
          <div className="fixed w-full max-w-md mx-auto inset-x-0 bottom-3">
            <div className="relative">
              <input
                type="text"
                className="w-full border rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-none px-3 py-1 text-sm shadow-sm"
              />
              <div className="absolute inset-y-0 my-auto right-1 h-6 aspect-square bg-orange-500 rounded-full text-center leading-[22px] text-white font-semibold -rotate-90 cursor-pointer hover:scale-105 hover:bg-orange-600">
                <span>&rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
