import { Answer, Post, User } from "@prisma/client";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR, { SWRConfig } from "swr";
import useMutation from "../../libs/client/useMutation";
import { cls, imgUrl } from "../../libs/client/utils";
import Button from "../components/button";
import Layout from "../components/layout";
import Textarea from "../components/Textarea";
import client from "../../libs/server/client";
import useUser from "../../libs/client/useUser";

interface AnswerWithUser extends Answer {
  user: User;
}
interface PostWithUser extends Post {
  user: User;
  Answers: AnswerWithUser[];
  _count: {
    Answers: number;
    Wonderings: number;
  };
}
interface PostDetailResponse {
  ok: boolean;
  post: PostWithUser;
  isWondering: boolean;
}
interface AnswerForm {
  answer: string;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { data: postData, mutate } = useSWR<PostDetailResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );
  const [wonder, { loading, data: wonderData }] = useMutation(
    `/api/posts/${router.query.id}/wonder`
  );
  const [sendAnswer, { loading: answerLoading, data: answerData }] =
    useMutation(`/api/posts/${router.query.id}/answers`);
  const toggleWondering = () => {
    if (!postData) return;
    mutate(
      {
        ...postData,
        post: {
          ...postData?.post,
          _count: {
            ...postData?.post._count,
            Wonderings: postData?.isWondering
              ? postData.post._count.Wonderings - 1
              : postData.post._count.Wonderings + 1,
          },
        },
        isWondering: !postData.isWondering,
      },
      false
    );
    if (!loading) {
      wonder({});
    }
  };
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  const onAnswerValid = (answerForm: AnswerForm) => {
    sendAnswer(answerForm);
  };
  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
      mutate();
    }
  }, [answerData, reset, mutate]);

  return (
    <Layout seoTitle="Post" title="Post" canGoBack>
      <div>
        {/* <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          동네질문
        </span> */}
        <div className="flex my-4 px-4 cursor-pointer pb-3  border-b items-center space-x-3">
          <div className="relative w-10 h-10 rounded-full bg-slate-300 overflow-hidden">
            <Image
              layout="fill"
              className="object-cover"
              src={imgUrl(postData?.post?.user?.avatar, "avatar")}
            />
          </div>
          <div>
            <Link href={`/users/${postData?.post?.user.id}`}>
              <a>
                <p className="text-sm font-medium text-gray-700">
                  {postData?.post?.user.name}
                </p>
                <p className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </p>
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="text-orange-500 font-medium mr-2">Q.</span>
            <span className="text-sm">{postData?.post?.question}</span>
          </div>
          <div className="flex px-4 space-x-6 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
            <button
              onClick={toggleWondering}
              className={cls(
                "flex space-x-1 items-center text-sm",
                postData?.isWondering ? "text-green-500" : ""
              )}
            >
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
              <span className="font-semibold">
                궁금해요 {postData?.post?._count.Wonderings}
              </span>
            </button>
            <span className="flex space-x-1 items-center text-sm">
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
              <span>답변 {postData?.post?._count.Answers}</span>
            </span>
          </div>
        </div>
        <div className="px-4 my-5 space-y-5">
          {postData?.post?.Answers.map((answer) => (
            <div key={answer?.id} className="flex items-start space-x-3">
              <div className="relative w-8 h-8 rounded-full bg-slate-300 overflow-hidden">
                <Image
                  layout="fill"
                  className="object-cover"
                  src={imgUrl(answer.user.avatar, "avatar")}
                />
              </div>
              <div>
                <div className="flex justify-between items-center w-[400px]">
                  <span className="text-xs block font-medium text-gray-700">
                    {answer?.user?.name}
                  </span>
                  <span className="text-xs text-gray-500 block ">
                    {String(answer?.createdAt)}
                  </span>
                </div>

                <p className="text-gray-700 text-sm mt-2">{answer?.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onAnswerValid)} className="px-4">
          <Textarea
            register={register("answer", { maxLength: 300 })}
            className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-sm border-gray-300  border px-3 py-2 focus:border-orange-500 focus:outline-none text-sm"
            rows={4}
            placeholder="답글을 작성해 보아요"
          />
          <Button text={answerLoading ? "Loading..." : "답글달기"}></Button>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
