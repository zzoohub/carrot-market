import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../../libs/client/useMutation";
import useUser from "../../libs/client/useUser";
import { imgUrl } from "../../libs/client/utils";
import Button from "../components/button";
import Input from "../components/input";
import Layout from "../components/layout";
import Loading from "../components/loading";

const EditProfile: NextPage = () => {
  interface EditFormType {
    email?: string;
    phone?: string;
    name?: string;
    avatar?: FileList;
    formErrors?: string;
  }
  interface EditProfileResponse {
    ok: boolean;
    error?: string;
  }
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<EditFormType>();
  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.avatar) setAvatarPreview(imgUrl(user.avatar, "avatar"));
  }, [user, setValue]);

  const [setProfile, { loading, data }] =
    useMutation<EditProfileResponse>(`/api/users/me`);

  const onValid = async ({ name, email, phone, avatar }: EditFormType) => {
    if (loading) return;
    if (email === "" && phone === "") {
      return setError("formErrors", {
        message: "Email or Phone are requierd..",
      });
    }
    if (avatar && avatar.length > 0 && user) {
      setCustomLoading(true);
      const { uploadURL } = await (await fetch("/api/files")).json();
      const form = new FormData();
      form.append("file", avatar[0], user?.id + "");
      const {
        result: { id },
      } = await (await fetch(uploadURL, { method: "POST", body: form })).json();
      setProfile({ name, email, phone, avatarId: id });
      setCustomLoading(false);
    } else {
      setProfile({ name, email, phone });
    }
  };

  useEffect(() => {
    if (data && !data.ok && data.error)
      setError("formErrors", { message: data.error });
    setAvatarPreview(imgUrl(user?.avatar!, "avatar"));
  }, [data, setError]);

  const watchingAvatar = watch("avatar");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [customLoading, setCustomLoading] = useState(false);

  useEffect(() => {
    if (watchingAvatar && watchingAvatar.length > 0) {
      const file = watchingAvatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [watchingAvatar]);

  return (
    <Layout seoTitle="Edit Profile" title="프로필 수정" canGoBack>
      {customLoading ? <Loading /> : null}
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-5">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <div className="relative w-14 h-14 rounded-full bg-slate-500 overflow-hidden">
              <Image
                layout="fill"
                src={avatarPreview}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          )}

          <label
            htmlFor="picture"
            className="bg-gray-100 cursor-pointer border border-gray-300 shadow-sm text-sm py-1 px-2 rounded-md font-medium hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            변경
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          name="name"
          type="text"
          label="닉네임"
          kind="text"
        ></Input>
        <Input
          register={register("email")}
          name="email"
          type="text"
          label="이메일"
          kind="text"
        ></Input>
        <Input
          register={register("phone")}
          type="number"
          name="phone"
          label="전화번호"
          kind="phone"
        ></Input>
        {errors.formErrors ? (
          <em className="text-red-600 font-bold mt-3 block">
            {errors.formErrors.message}
          </em>
        ) : null}
        <Button
          onClick={() => clearErrors()}
          text={loading ? "Loading..." : "엄데이트"}
        ></Button>
      </form>
    </Layout>
  );
};

export default EditProfile;
