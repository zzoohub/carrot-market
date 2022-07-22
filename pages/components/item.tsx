import Image from "next/image";
import Link from "next/link";
import { imgUrl } from "../../libs/client/utils";

interface ItemProps {
  title: string;
  id: number;
  desc: string;
  price: number;
  hearts: number;
  image: string;
}
export default function Item({
  title,
  id,
  desc,
  price,
  hearts,
  image,
}: ItemProps) {
  return (
    <Link href={`/products/${id}`}>
      <a className="flex justify-between px-4 py-10 select-none hover:bg-slate-50">
        <div className="flex items-center">
          <div className="relative w-20 h-20 bg-gray-500 mr-3 cursor-pointer shadow-md">
            <Image
              layout="fill"
              src={imgUrl(image, "avatar")}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-around h-full">
            <h3 className="font-semibold text-gray-600 text-[16px]  cursor-pointer">
              {title}
            </h3>
            <span className="font-medium text-[12px] text-gray-500 truncate w-[300px]">
              {desc}
            </span>
            <span className="font-bold text-lg text-orange-500 cursor-pointer">
              {`${price} ￦`}
            </span>
          </div>
        </div>
        <div className="flex items-end">
          <div className="flex items-center mr-3 text-sm">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span>{hearts}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
