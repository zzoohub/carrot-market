import { Post, User } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useCoords from "../../libs/client/useCoords";
import useMutation from "../../libs/client/useMutation";
import Button from "../components/button";
import Layout from "../components/layout";
import Textarea from "../components/Textarea";

const Write: NextPage = () => {
  interface PostWithUser extends Post {
    user: User;
  }
  interface PostResponse {
    ok: boolean;
    post: PostWithUser;
  }
  interface QuestionForm {
    question: string;
  }
  const router = useRouter();
  const { latitude, longitude } = useCoords();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionForm>();
  const [createPost, { loading, data }] =
    useMutation<PostResponse>(`/api/posts`);

  const postUpload = (data: QuestionForm) => {
    if (loading) return;
    createPost({ ...data, latitude, longitude });
  };
  useEffect(() => {
    if (data && data.ok) {
      console.log(data);
      router.push(`/comunity/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout seoTitle="Post Upload" title="게시글 업로드" canGoBack>
      <form onSubmit={handleSubmit(postUpload)} className="px-4 py-6">
        <span className="text-sm font-bold text-zinc-600">
          게시글은 동네주민만 보게됩니다.
        </span>

        <Textarea
          register={register("question", {
            minLength: { value: 5, message: "minimum lenght is 5" },
          })}
          rows={4}
          placeholder="아무 글을 작성하세요."
        ></Textarea>
        <Button text={loading ? "...Loading" : "업로드"}></Button>
      </form>
      <span className="absolute top-6 text-red-500 font-semibold text-sm">
        {errors ? errors.question?.message : ""}
      </span>
    </Layout>
  );
};
export default Write;
