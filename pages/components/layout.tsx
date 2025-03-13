import React from "react"
import Link from "next/link"
import { cls } from "../../libs/client/utils"
import { useRouter } from "next/router"
import Head from "next/head"

interface LayoutProps {
  title?: string
  canGoBack?: boolean
  hasTabBar?: boolean
  children: React.ReactNode
  seoTitle: string
}

export default function Layout({ title, canGoBack, hasTabBar, children, seoTitle }: LayoutProps) {
  const router = useRouter()

  function onClick() {
    router.back()
  }

  return (
    <div className="max-w-lg h-max">
      <Head>
        <title>{seoTitle} | Carrot Market</title>
      </Head>
      <header className="flex justify-center items-center w-full h-[50px] fixed top-0 border-b bg-white text-lg font-semibold max-w-lg z-10">
        {canGoBack ? (
          <div
            onClick={onClick}
            className="absolute left-3 top-[10px] hover:bg-gray-200 rounded-full p-1 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        ) : null}
        <h2 className="text-[15px]">{title}</h2>
      </header>
      <main className={cls("pt-12", hasTabBar ? "mb-16" : "")}>{children}</main>
      {hasTabBar ? (
        <nav className="flex justify-evenly items-center w-full h-[50px] fixed bottom-0 border-t bg-white text-sm font-semibold max-w-lg">
          <Link href="/">
            <a className={router.pathname === "/" ? "text-orange-500" : ""}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </a>
          </Link>
          <Link href="/comunity">
            <a className={router.pathname === "/comunity" ? "text-orange-500" : ""}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </a>
          </Link>
          <Link href="/chats">
            <a className={router.pathname === "/chats" ? "text-orange-500" : ""}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </a>
          </Link>
          <Link href="/streams">
            <a className={router.pathname === "/streams" ? "text-orange-500" : ""}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </a>
          </Link>
          <Link href="/profile">
            <a className={router.pathname === "/profile" ? "text-orange-500" : ""}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </a>
          </Link>
        </nav>
      ) : null}
    </div>
  )
}
