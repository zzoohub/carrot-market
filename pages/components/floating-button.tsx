import React from "react"
import Link from "next/link"

interface FloatBtnPorps {
  href: string
  children: React.ReactNode
}
export default function FloatingButton({ href = "/", children }: FloatBtnPorps) {
  return (
    <Link href={href}>
      <a className="fixed bottom-16 right-[calc(50%-220px)] bg-orange-500 w-10 h-10 flex justify-center items-center rounded-full text-white shadow-lg hover:bg-orange-600 transition-color z-10">
        {children}
      </a>
    </Link>
  )
}
