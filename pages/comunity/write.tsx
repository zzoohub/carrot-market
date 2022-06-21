import { Post, User } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionForm>();
  const [createPost, { loading, data }] =
    useMutation<PostResponse>(`/api/posts`);

  const postUpload = (data: QuestionForm) => {
    if (loading) return;
    createPost(data);
  };
  useEffect(() => {
    if (data && data.ok) {
      console.log(data);
      router.push(`/comunity/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout title="Post upload" canGoBack>
      <form onSubmit={handleSubmit(postUpload)} className="px-4 py-10">
        <span className="absolute top-6 text-red-500 font-semibold text-sm">
          {errors ? errors.question?.message : ""}
        </span>
        <Textarea
          register={register("question", {
            minLength: { value: 5, message: "minimum lenght is 5" },
          })}
          rows={4}
          placeholder="Ask a Question!"
        ></Textarea>
        <Button text={loading ? "...Loading" : "Reply"}></Button>
      </form>
    </Layout>
  );
};
export default Write;
