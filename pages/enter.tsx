import { useEffect, useState } from "react"
import { cls } from "../libs/client/utils"
import Button from "./components/button"
import Input from "./components/input"
import { FieldError, useForm } from "react-hook-form"
import useMutation from "../libs/client/useMutation"
import { useRouter } from "next/router"
import { Token } from "@prisma/client"

export default function Enter() {
  interface LoginForm {
    email: string
    phone: number
  }
  interface TokenForm {
    token: number
  }
  interface ConfirmResponse {
    ok: boolean
    token: Token
  }

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>()
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } = useForm<TokenForm>()

  const [enter, { data, loading }] = useMutation<ConfirmResponse>(`/api/users/enter`)
  const [tokenConfirm, { loading: tokenLoading, data: tokenData }] = useMutation(`/api/users/confirm`)

  const [method, setMethod] = useState<"email" | "phone">("email")

  const onEmailClick = () => {
    reset()
    setMethod("email")
  }
  const onPhoneClick = () => {
    reset()
    setMethod("phone")
  }

  const onValid = (LoginInput: LoginForm) => {
    enter(LoginInput)
  }
  const onTokenValid = (TokenInput: TokenForm) => {
    tokenConfirm(TokenInput)
  }
  const router = useRouter()
  useEffect(() => {
    if (tokenData?.ok) {
      router.push("/")
    }
  }, [tokenData, router])
  return (
    <div>
      <h3 className="text-orange-500 font-bold text-2xl text-center pt-6">땅근마켓</h3>
      <div className="px-4">
        {data?.ok ? (
          <form onSubmit={tokenHandleSubmit(onTokenValid)} className="mt-5 flex flex-col space-y-8 relative">
            <Input
              register={tokenRegister("token", {
                required: "Confirm your token.",
                maxLength: {
                  value: 10,
                  message: "its too long",
                },
              })}
              name="token"
              kind="text"
              label="Token confirm"
              type="number"
              placeholder={data?.token?.payload}
            ></Input>

            <span
              id="errorMessage"
              className="absolute top-10 left-1/2 -translate-x-1/2 text-sm text-red-500 font-bold"
            >
              {errors.phone?.message}
            </span>
            <Button text={tokenLoading ? "Loading" : "Confirm"}></Button>
          </form>
        ) : (
          <>
            <div>
              <h5 className="text-center mt-5 text-gray-500 font-light text-sm">Enter using:</h5>

              <div className="flex justify-between">
                <button
                  onClick={onEmailClick}
                  className={cls(
                    "text-center w-full text-m border-b-2 transition focus:outline-none font-bold",
                    method === "email"
                      ? "border-b-orange-400 py-2 text-orange-500"
                      : "border-b-transparent text-gray-600",
                  )}
                >
                  Email
                </button>
                <button
                  onClick={onPhoneClick}
                  className={cls(
                    "text-center w-full text-m border-b-2 transition focus:outline-none font-semibold",
                    method === "phone"
                      ? "border-b-orange-500 py-2 text-orange-500"
                      : "border-b-transparent text-gray-600",
                  )}
                >
                  Phone
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onValid)} className="mt-5 flex flex-col space-y-4 relative">
              {method === "email" ? (
                <Input
                  register={register("email", {
                    required: "Write your email.",
                    maxLength: {
                      value: 30,
                      message: "its too long email address",
                    },
                  })}
                  name="email"
                  kind="text"
                  label="Email address"
                  type="email"
                ></Input>
              ) : null}
              {method === "phone" ? (
                <Input
                  register={register("phone", {
                    required: "Write your phone number.",
                    minLength: {
                      value: 8,
                      message: "The minimum lenght is 8",
                    },
                    maxLength: {
                      value: 11,
                      message: "The maximun lenght is 11",
                    },
                  })}
                  name="phone"
                  kind="phone"
                  label="Phone number"
                  type="number"
                ></Input>
              ) : null}
              <span
                id="errorMessage"
                className="absolute top-10 left-1/2 -translate-x-1/2 text-sm text-red-500 font-bold"
              >
                {errors.phone?.message}
                {errors.email?.message}
              </span>
              <Button
                text={loading ? "Loading..." : method === "email" ? "Get login link" : "Get one-time password"}
              ></Button>
            </form>
          </>
        )}

        {/* <div>
          <div className="relative">
            <div className="border border-gray-100 mt-8" />
            <div className="absolute text-center w-full top-[-14px] text-gray-500">
              <span className="bg-white px-2 select-none text-xs">
                Or enter with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-5">
            <button
              onClick={() => {
                alert("직접 가입해주세요.");
              }}
              className="flex justify-center items-center py-3 w-full bg-gray-100 rounded-md gap-2 text-gray-600 hover:bg-gray-200 shadow-md"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button
              onClick={() => {
                alert("직접 가입해주세요.");
              }}
              className="flex justify-center items-center py-3 w-full bg-gray-100 rounded-md gap-2 text-gray-600 hover:bg-gray-200 shadow-md"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}
