import { Product } from "@prisma/client";
import type { NextPage } from "next";
import useSWR from "swr";
import Item from "../components/item";
import Layout from "../components/layout";

interface ProductWithCount extends Product {
  _count: {
    Favorites: number;
  };
}
interface OnSailsResponse {
  ok: boolean;
  onSails: ProductWithCount[];
}

const Sold: NextPage = () => {
  const { data } = useSWR<OnSailsResponse>(`/api/users/me/onSails`);
  return (
    <Layout title="판매중인 상품" canGoBack>
      <div className="flex flex-col divide-y-[1px]">
        {data?.onSails.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            title={product.name}
            desc={product.description}
            hearts={product._count.Favorites}
            image={product.image!}
            price={product.price}
          ></Item>
        ))}
      </div>
    </Layout>
  );
};

export default Sold;
