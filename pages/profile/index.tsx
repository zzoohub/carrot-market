import { Review, User } from "@prisma/client";
import { NextPage, NextPageContext } from "next";
import Image from "next/image";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import useUser from "../../libs/client/useUser";
import { cls, imgUrl } from "../../libs/client/utils";
import { withSsrSession } from "../../libs/server/withSession";
import Layout from "../components/layout";
import client from "../../libs/server/client";
import FloatingButton from "../components/floating-button";

const Profile: NextPage = () => {
  interface ReviewWithUser extends Review {
    createdBy: User;
  }
  interface ReviewsResponse {
    ok: boolean;
    reviews: ReviewWithUser[];
  }
  const { user } = useUser();
  const { data } = useSWR<ReviewsResponse>(`/api/reviews`);

  return (
    <Layout seoTitle="Profile" title="Profile" hasTabBar>
      <div className="py-10 px-4">
        <div className="flex items-center space-x-3">
          {user?.avatar ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                layout="fill"
                src={imgUrl(user?.avatar, "avatar")}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-slate-500 rounded-full" />
          )}

          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{user?.name}</span>
            <Link href={`/profile/edit`}>
              <span className="text-sm text-gray-700 cursor-pointer">
                Edit profile &rarr;
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-y-5 justify-around">
          <Link href="/profile/onSales">
            <a>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <span className="text-sm mt-2 font-medium text-gray-700">
                  판매중
                </span>
              </div>
            </a>
          </Link>
          <Link href="/profile/streams">
            <a>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M512 448H127.1C110.3 448 96 462.3 96 479.1S110.3 512 127.1 512h384C529.7 512 544 497.7 544 480S529.7 448 512 448zM592 0h-544C21.5 0 0 21.5 0 48v320C0 394.5 21.5 416 48 416h544c26.5 0 48-21.5 48-48v-320C640 21.5 618.5 0 592 0zM576 352H64v-288h512V352z" />
                  </svg>
                </div>
                <span className="text-sm mt-2 font-medium text-gray-700">
                  스트리밍
                </span>
              </div>
            </a>
          </Link>
          <Link href="/profile/sold">
            <a>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M0 24C0 10.75 10.75 0 24 0H96C107.5 0 117.4 8.19 119.6 19.51L121.1 32H312V134.1L288.1 111C279.6 101.7 264.4 101.7 255 111C245.7 120.4 245.7 135.6 255 144.1L319 208.1C328.4 218.3 343.6 218.3 352.1 208.1L416.1 144.1C426.3 135.6 426.3 120.4 416.1 111C407.6 101.7 392.4 101.7 383 111L360 134.1V32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24V24zM224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464zM416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464z" />
                  </svg>
                </div>
                <span className="text-sm mt-2 font-medium text-gray-700">
                  판매내역
                </span>
              </div>
            </a>
          </Link>
          <Link href="/profile/bought">
            <a>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    ></path>
                  </svg>
                </div>
                <span className="text-sm mt-2 font-medium text-gray-700">
                  구매내역
                </span>
              </div>
            </a>
          </Link>
          <Link href="/profile/liked">
            <a>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </div>
                <span className="text-sm mt-2 font-medium text-gray-700">
                  관심목록
                </span>
              </div>
            </a>
          </Link>
        </div>

        {data?.reviews?.map((review) => (
          <div key={review.id} className="mt-12">
            <div className="flex space-x-4 items-center">
              <div className="w-12 h-12 rounded-full bg-slate-500" />
              <div>
                <h4 className="text-sm font-bold text-gray-800">
                  {review.createdBy.name}
                </h4>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={cls(
                        "h-5 w-5",
                        review?.score! / 2 >= star
                          ? "text-yellow-400"
                          : "text-gray-300"
                      )}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-2 text-gray-600 text-sm">
              <p>{review.review}</p>
            </div>
          </div>
        ))}
      </div>
      <FloatingButton href="/faq">
        <span className="text-sm">FAQ</span>
      </FloatingButton>
    </Layout>
  );
};

const Page: NextPage<{ profile: User }> = ({ profile }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/users/me": {
            ok: true,
            profile,
          },
        },
      }}
    >
      <Profile />
    </SWRConfig>
  );
};

export const getServerSideProps = withSsrSession(async function ({
  req,
}: NextPageContext) {
  const profile = await client?.user.findUnique({
    where: {
      id: req?.session?.user?.id,
    },
  });

  return {
    props: {
      profile: JSON.parse(JSON.stringify(profile)),
    },
  };
});

export default Page;
