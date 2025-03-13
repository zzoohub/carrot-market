import type { NextPage } from "next"
import Item from "./components/item"
import Layout from "./components/layout"
import Head from "next/head"
import useSWR, { SWRConfig } from "swr"
import { Product } from "@prisma/client"
import FloatingButton from "./components/floating-button"
import client from "../libs/server/client"

interface ProductWithCount extends Product {
  _count: {
    Favorites: number
  }
}
interface ProductsResponse {
  ok: boolean
  products: ProductWithCount[]
}
const Home: NextPage = () => {
  const { data } = useSWR<ProductsResponse>("/api/products")

  return (
    <Layout seoTitle="Home" title="땅근 마켓" hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className="divide-y-[1px]">
        {data?.products?.map(product => (
          <Item
            image={product.image!}
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            desc={product.description}
            hearts={product._count?.Favorites}
          ></Item>
        ))}
      </div>

      <FloatingButton href="/products/upload">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </FloatingButton>
    </Layout>
  )
}

const Page: NextPage<{ products: ProductWithCount[] }> = ({ products }) => {
  return (
    <SWRConfig value={{ fallback: { "/api/products": { ok: true, products } } }}>
      <Home></Home>
    </SWRConfig>
  )
}

export async function getServerSideProps() {
  const products = await client.product.findMany({})

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}

export default Page
