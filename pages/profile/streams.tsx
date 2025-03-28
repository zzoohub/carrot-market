import { Product, Stream } from "@prisma/client"
import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"
import useUser from "../../libs/client/useUser"
import Item from "../components/item"
import Layout from "../components/layout"

interface Streams {
  ok: boolean
  streams: Stream[]
}

const Sold: NextPage = () => {
  const { user } = useUser()
  const { data } = useSWR<Streams>(`/api/streams/streamList/${user?.id}`)

  console.log(data)

  return (
    <Layout seoTitle="On Sails" title="스트리밍 내역" canGoBack>
      <div className="flex flex-col divide-y-[1px]">
        {data?.streams?.map(stream => (
          <Link href={`/streams/${stream.id}`} key={stream.id}>
            <div className="h-[120px] p-3 flex cursor-pointer hover:bg-slate-50 relative">
              <div className="relative h-full aspect-square rounded-md overflow-hidden mr-2">
                <Image
                  className="object-cover"
                  layout="fill"
                  src={`https://videodelivery.net/${stream.streamId}/thumbnails/thumbnail.jpg?time=68s&height=270`}
                ></Image>
              </div>
              <div className="flex flex-col w-[75%] justify-between py-1 text-slate-700">
                <h2 className="font-bold text-sm">{stream.name}</h2>
                <span className="text-md font-bold text-slate-800">{stream.price}원</span>
                <p className="text-xs">{stream.description}</p>
              </div>

              {stream.live ? (
                <div className="absolute right-2 top-2 bg-red-500 px-1 text-sm rounded-sm text-white">LIVE</div>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default Sold
