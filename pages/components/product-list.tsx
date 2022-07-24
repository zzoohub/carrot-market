import { Product, Sale } from "@prisma/client";
import useSWR from "swr";
import Item from "./item";

interface ProductListProps {
  kind: "sales" | "purchases" | "favorites" | "onSails";
}

export default function ProductList({ kind }: ProductListProps) {
  interface ProductWithCount extends Product {
    _count: {
      Favorites: number;
    };
  }
  interface SaleWithProduct extends Sale {
    product: ProductWithCount;
  }
  interface RecordResponse {
    [key: string]: SaleWithProduct[];
  }
  const { data } = useSWR<RecordResponse>(`/api/users/me/${kind}`);

  console.log(data);

  return data ? (
    <>
      {data[kind].map((record) => (
        <Item
          key={record?.product?.id}
          id={record?.product?.id}
          title={record?.product?.name}
          price={record?.product?.price}
          desc={record?.product?.description}
          hearts={record?.product?._count.Favorites}
          image={record?.product?.image!}
        ></Item>
      ))}
    </>
  ) : null;
}
