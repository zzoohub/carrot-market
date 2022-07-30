import { Product, User } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import useMutation from "../../../libs/client/useMutation";
import useUser from "../../../libs/client/useUser";
import { cls, imgUrl } from "../../../libs/client/utils";
import Button from "../../components/button";
import Layout from "../../components/layout";

interface ProductWithUser extends Product {
  user: User;
}
interface ProductResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProduct: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { data, mutate } = useSWR<ProductResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [likeProduct] = useMutation(
    `/api/products/${router.query.id}/favorite`
  );
  const onFavClick = () => {
    if (!data) return;
    mutate({ ...data, isLiked: !data.isLiked }, false);
    likeProduct({});
  };
  return (
    <Layout seoTitle="Product" title="Product" canGoBack>
      <div>
        <div className="px-4 py-10">
          <div className="relative w-full h-96 bg-gray-500">
            <Image
              src={imgUrl(data?.product?.image, "public")}
              layout="fill"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex items-center mt-4">
            {data?.product?.user?.avatar ? (
              <div className="relative h-10 w-10 bg-gray-600 rounded-full overflow-hidden mr-2">
                <Image
                  src={imgUrl(data?.product?.user?.avatar, "avatar")}
                  layout="fill"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-10 w-10 bg-gray-600 rounded-full mr-2" />
            )}

            <div>
              <p className="font-bold text-sm">{data?.product?.user?.name}</p>
              <Link
                href={
                  user?.id === data?.product.userId
                    ? `/profile`
                    : `/users/profile/${data?.product?.user?.id}`
                }
              >
                <a className="text-gray-600 text-xs mt-1">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-3">
            <h1 className="text-sm text-slate-600 font-bold select-none">
              {data?.product?.name}
            </h1>
            <p className="text-[20px] font-bold select-none text-slate-800">
              {data?.product?.price}원
            </p>
            <p className="mt-2 text-[12px] text-justify">
              {data?.product?.description}
            </p>
            <div className="flex items-center justify-between mt-3">
              {user?.id !== data?.product.userId ? (
                <>
                  <Link href={`/products/${data?.product.id}/chatRoom`}>
                    <a className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none text-center">
                      Talk to Seller
                    </a>
                  </Link>
                  <button
                    onClick={onFavClick}
                    className={cls(
                      `p-2 ml-1 rounded-md`,
                      data?.isLiked
                        ? "hover:bg-red-100 text-red-500"
                        : "text-gray-500 hover:bg-gray-100"
                    )}
                  >
                    {data?.isLiked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
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
                    )}
                  </button>
                </>
              ) : (
                <Link href={`/products/${data?.product.id}/chatList`}>
                  <a className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none text-center">
                    받은 문의 메세지
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="p-5">
          <h2 className="text-center font-semibold text-lg">Similar items</h2>
          <div className="grid grid-cols-2 mt-2 gap-5">
            {data?.relatedProduct?.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="select-none">
                  <div className="relative w-full aspect-square cursor-pointer rounded-sm">
                    <Image
                      src={imgUrl(product?.image, "public")}
                      layout="fill"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <h3 className="mt-1 text-sm cursor-pointer">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold">{product.price}원</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
