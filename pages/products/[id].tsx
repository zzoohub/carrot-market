import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import Button from "../components/button";
import Layout from "../components/layout";

interface ProductResponse {
  ok: boolean;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  console.log(router.query.id);
  const { data, error } = useSWR(
    router.query.id ? `/api/products/${router.query.id}` : null
  );

  return (
    <Layout title="Item" canGoBack>
      <div>
        <div className="px-4 py-10">
          <div className="w-full h-96 bg-gray-500" />
          <div className="flex items-center mt-4">
            <div className="h-10 w-10 bg-gray-600 rounded-full mr-2" />
            <div>
              <p className="font-bold text-sm">{data?.product?.user.name}</p>
              <Link href={`/users/profile/${data?.product?.user.id}`}>
                <a className="text-gray-600 text-xs mt-1">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-3">
            <h1 className="text-sm text-gray-600 font-medium select-none">
              {data?.product?.name}
            </h1>
            <p className="text-[22px] font-bold select-none">
              ${data?.product?.price}
            </p>
            <p className="mt-2 text-[12px] text-justify">
              {data?.product?.description}
            </p>
            <div className="flex items-center justify-between mt-3">
              <Button text="Talk to seller"></Button>
              <button className="p-2 ml-1 text-gray-500 hover:bg-gray-100 rounded-md">
                <svg
                  className="h-5 w-5 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="p-5">
          <h2 className="text-center font-semibold text-lg">Similar items</h2>
          <div className="grid grid-cols-2 mt-2 gap-5">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i} className="select-none">
                <div className="w-full aspect-square bg-gray-500 cursor-pointer" />
                <h3 className="mt-1 text-sm cursor-pointer">Galaxy S60</h3>
                <p className="text-xl font-bold">$6</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
