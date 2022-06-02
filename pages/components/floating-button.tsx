import React from "react";
import Link from "next/link";

interface FloatBtnPorps{
 href: string;
 children: React.ReactNode;
}
export default function FloatingButton({href, children}:FloatBtnPorps){
  return (
    <Link href={href}>
      <a className="fixed bottom-16 right-5 bg-orange-500 p-2 rounded-full text-white shadow-lg hover:bg-orange-600 transition-color z-10">
        {children}
      </a>
    </Link>
  )
}