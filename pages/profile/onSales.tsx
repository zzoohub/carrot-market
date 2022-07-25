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
interface OnSalesResponse {
  ok: boolean;
  onSales: ProductWithCount[];
}

const Sold: NextPage = () => {
  const { data } = useSWR<OnSalesResponse>(`/api/users/me/onSales`);
  return (
    <Layout seoTitle="On Sales" title="판매중인 상품" canGoBack>
      <div className="flex flex-col divide-y-[1px]">
        {data?.onSales.map((product) => (
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
