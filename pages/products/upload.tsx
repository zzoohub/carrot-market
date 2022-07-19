import { NextPage } from "next";
import Button from "../components/button";
import Layout from "../components/layout";
import Textarea from "../components/Textarea";
import Input from "../components/input";
import { FormProvider, useForm } from "react-hook-form";
import useMutation from "../../libs/client/useMutation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "@prisma/client";
import useUser from "../../libs/client/useUser";
import Loading from "../components/loading";

interface ProductType {
  name: string;
  price: string;
  description: string;
  photo: FileList;
}
interface UploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const { user } = useUser();
  const [customLoading, setCustomLoading] = useState(false);
  const { register, handleSubmit, watch } = useForm<ProductType>();
  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>("/api/products");
  const [photoPreview, setPhotoPreview] = useState("");
  const router = useRouter();
  const photoWatch = watch("photo");
  const onSubmit = async ({ name, price, description, photo }: ProductType) => {
    if (loading) return;
    if (photo && photo.length > 0 && user) {
      setCustomLoading(true);
      const { uploadURL } = await (await fetch("/api/files")).json();
      const form = new FormData();
      form.append("file", photo[0], user?.id + "");
      const {
        result: { id },
      } = await (await fetch(uploadURL, { method: "POST", body: form })).json();
      uploadProduct({ name, price, description, photoId: id });
      setCustomLoading(false);
    } else {
      uploadProduct({ name, price, description });
    }
  };

  useEffect(() => {
    if (photoWatch && photoWatch.length > 0) {
      const file = photoWatch[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photoWatch, user]);
  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.product.id}`);
    }
  }, [data]);
  return (
    <Layout title="Upload product" canGoBack>
      {customLoading ? <Loading /> : null}
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 space-y-5 py-10">
        <div id="uploadImg" className="relative">
          {photoPreview ? (
            <>
              <label className="w-full cursor-pointer h-64 rounded-md absolute z-10">
                <input {...register("photo")} className="hidden" type="file" />
              </label>
              <img
                src={photoPreview}
                className="w-full h-[400px] rounded-md object-contain"
              ></img>
            </>
          ) : (
            <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input {...register("photo")} className="hidden" type="file" />
            </label>
          )}
        </div>
        <Input
          register={register("name", { required: true, maxLength: 50 })}
          type="text"
          name="name"
          kind="text"
          label="Name"
        ></Input>
        <Input
          register={register("price", { required: true, maxLength: 20 })}
          type="number"
          name="price"
          kind="price"
          label="Price"
        ></Input>
        <Textarea
          rows={4}
          label="Description"
          name="desc"
          register={register("description", { required: true, maxLength: 300 })}
        ></Textarea>
        <Button text={loading ? "Loading..." : "Upload item"}></Button>
      </form>
    </Layout>
  );
};
export default Upload;
