import { Stream } from "@prisma/client"
import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import useSWR from "swr"
import FloatingButton from "../components/floating-button"
import Layout from "../components/layout"

interface GetStreamsResponse {
  id: boolean
  streams: Stream[]
}

const Live: NextPage = () => {
  // const { data } = useSWR<GetStreamsResponse>(`/api/streams?page=${pageNum}`);

  return (
    <Layout seoTitle="Streams" title="라이브 스트리밍" hasTabBar>
      <h3 className="text-center mt-10 text-orange-500 font-bold text-[28px]">Comming Soon~</h3>
      <p className="text-center text-sm font-bold text-zinc-800 mt-4">
        스트리밍 서비스는 비용 문제로 개발이 잠시 중단되었습니다.
        <br />더 좋은 서비스로 보답하겠습니다.
      </p>
      {/* <div className="py-6 divide-y-[1px] space-y-4">
        {data?.streams?.map((stream) => (
          <div className="pt-4  px-4" key={stream.id}>
            <Link href={`/streams/${stream.id}`}>
              <a>
                <div className="relative w-full rounded-md shadow-sm aspect-video overflow-hidden">
                  <Image
                    layout="fill"
                    className="object-cover"
                    src={`https://videodelivery.net/${stream.streamId}/thumbnails/thumbnail.jpg`}
                  />
                  <div className="bg-red-500 absolute right-3 top-3 px-2 text-white rounded-sm text-sm">
                    LIVE
                  </div>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-xs mt-1 font-bold text-slate-800 w-[70%] truncate">
                    {stream.title}
                  </h1>
                  <h2 className="text-xs mt-1 font-bold text-slate-800 w-max max-w-[25%] truncate">
                    {stream.name}
                  </h2>
                </div>
              </a>
            </Link>
          </div>
        ))}

        <FloatingButton href={`/streams/create`}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            ></path>
          </svg>
        </FloatingButton>
      </div> */}
    </Layout>
  )
}
export default Live
