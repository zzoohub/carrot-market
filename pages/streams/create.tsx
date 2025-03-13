import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Stream } from "@prisma/client"
import useMutation from "../../libs/client/useMutation"
import Button from "../components/button"
import Input from "../components/input"
import Layout from "../components/layout"
import Textarea from "../components/Textarea"

interface StreamForm {
  name: string
  price: number
  description: string
  title: string
}
interface CreateStreamResponse {
  ok: boolean
  stream: Stream
}

const Create: NextPage = () => {
  const { register, handleSubmit } = useForm<StreamForm>()
  const [createStream, { loading, data }] = useMutation<CreateStreamResponse>(`/api/streams`)
  const router = useRouter()
  const onVaild = (form: StreamForm) => {
    if (loading) return
    createStream(form)
  }
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`)
    }
  }, [data])

  return (
    <Layout seoTitle="Create Stream" title="Create stream" canGoBack>
      <form onSubmit={handleSubmit(onVaild)} className=" space-y-5 py-10 px-4">
        <Input
          register={register("title", { required: true })}
          type="text"
          name="title"
          label="Stream Title"
          kind="text"
        ></Input>
        <Input register={register("name", { required: true })} type="text" name="name" label="Name" kind="text"></Input>
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          type="number"
          name="price"
          label="Price"
          kind="price"
          required
        ></Input>
        <Textarea
          register={register("description", { required: true })}
          name="textarea"
          label="Description"
          rows={4}
        ></Textarea>
        <Button text="Go live"></Button>
      </form>
    </Layout>
  )
}

export default Create
