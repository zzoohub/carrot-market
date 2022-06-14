import type { NextPage } from "next";
import Item from "./components/item";
import Layout from "./components/layout";
import useUser from "../libs/client/useUser";
import Head from "next/head";
import useSWR from "swr";
import { Product } from "@prisma/client";

interface ProductsResponse {
  ok: boolean;
  products: Product[];
}
const Home: NextPage = () => {
  const user = useUser();
  const { data } = useSWR<ProductsResponse>("/api/products");

  return (
    <Layout title="Home" hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className="divide-y-[1px]">
        {data?.products.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            desc={product.description}
            comments={5}
            hearts={5}
          ></Item>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
