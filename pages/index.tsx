import type { NextPage } from "next";
import Item from "./components/item";
import Layout from "./components/layout";
import useUser from "../libs/client/useUser";
import Head from "next/head";
import useSWR from "swr";
import { Product } from "@prisma/client";
import FloatingButton from "./components/floating-button";

interface ProductWithCount extends Product {
  _count: {
    Favorites: number;
  };
}
interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
}
const Home: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<ProductsResponse>("/api/products");

  return (
    <Layout title="Home" hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className="divide-y-[1px]">
        {data?.products?.map((product) => (
          <Item
            image={product.image!}
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            desc={product.description}
            hearts={product._count.Favorites}
          ></Item>
        ))}
      </div>

      <FloatingButton href="/products/upload">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </FloatingButton>
    </Layout>
  );
};

export default Home;
