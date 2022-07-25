import { Post, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import useCoords from "../../libs/client/useCoords";
import FloatingButton from "../components/floating-button";
import Layout from "../components/layout";
import Loading from "../components/loading";

interface PostWithUser extends Post {
  user: User;
  _count: {
    Wonderings: number;
    Answers: number;
  };
}
interface PostsResponse {
  ok: boolean;
  posts: PostWithUser[];
}

const Community: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const { data } = useSWR<PostsResponse>(
    latitude && longitude
      ? `/api/posts?latitude=${latitude}&longitude=${longitude}`
      : null
  );
  const router = useRouter();

  return (
    <Layout seoTitle="Comunity" title="Comunity" hasTabBar>
      {data?.posts ? (
        <div className="px-4 py-10 relativ max-w-lg">
          {data?.posts?.map((post) => (
            <Link href={`/comunity/${post?.id}`} key={post?.id}>
              <a className="mb-5 block">
                <span className="bg-gray-200 px-2 py-1 text-xs rounded-full">
                  동네질문
                </span>
                <div className="mt-2 text-sm">
                  <span className="text-orange-500 font-medium mr-2">Q.</span>
                  {post?.question}
                </div>
                <div className="flex justify-between text-xs py-2 border-b border-dashed mt-3">
                  <span>{post?.user?.name}</span>
                  <span>{String(post?.createdAt)}</span>
                </div>
                <div className="flex py-2 border-b-2">
                  <span className="flex items-center text-xs mr-5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span className="ml-1">
                      궁금해요 {post?._count?.Wonderings}
                    </span>
                  </span>
                  <span className="flex items-center text-xs">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      ></path>
                    </svg>
                    <span className="ml-1">답변 {post?._count?.Answers}</span>
                  </span>
                </div>
              </a>
            </Link>
          ))}
          <FloatingButton href={`/comunity/write`}>
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </FloatingButton>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </Layout>
  );
};

export default Community;
