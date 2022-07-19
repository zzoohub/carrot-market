import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../../libs/client/useMutation";
import useUser from "../../libs/client/useUser";
import Button from "../components/button";
import Input from "../components/input";
import Layout from "../components/layout";

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
  }, [user, setValue]);

  const [setProfile, { loading, data }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  const onValid = ({ name, email, phone, avatar }: EditFormType) => {
    console.log(avatar);
    return;
    if (loading) return;
    if (email === "" && phone === "") {
      return setError("formErrors", {
        message: "Email or Phone are requierd..",
      });
    }
    setProfile({ name, email, phone });
  };
  useEffect(() => {
    if (data && !data.ok && data.error)
      setError("formErrors", { message: data.error });
  }, [data, setError]);

  const watchingAvatar = watch("avatar");
  const [avatarPreview, setAvatarPreview] = useState("");
  useEffect(() => {
    if (watchingAvatar && watchingAvatar.length > 0) {
      const file = watchingAvatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [watchingAvatar]);

  return (
    <Layout title="Edit profile" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-5">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="w-14 h-14 rounded-full bg-slate-500"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          )}

          <label
            htmlFor="picture"
            className="bg-gray-600 w-20 h-20 rounded-full cursor-pointer border border-gray-300 shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
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
          label="Name"
          kind="text"
        ></Input>
        <Input
          register={register("email")}
          name="email"
          type="text"
          label="Email address"
          kind="text"
        ></Input>
        <Input
          register={register("phone")}
          type="number"
          name="phone"
          label="Phone number"
          kind="phone"
        ></Input>
        {errors.formErrors ? (
          <em className="text-red-600 font-bold mt-3 block">
            {errors.formErrors.message}
          </em>
        ) : null}
        <Button
          onClick={() => clearErrors()}
          text={loading ? "Loading..." : "Update profile"}
        ></Button>
      </form>
    </Layout>
  );
};

export default EditProfile;
