import Link from "next/link";

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
      <a className="flex justify-between px-4 py-10 select-none">
        <div className="flex items-center">
          <img
            src={`https://imagedelivery.net/DREC0JqkZ64KUl7_6yEP3g/${image}/avatar`}
            className="w-20 h-20 bg-gray-500 mr-3 cursor-pointer shadow-md"
          />
          <div className="flex flex-col justify-around h-full">
            <h3 className="font-semibold text-gray-600 text-[16px]  cursor-pointer">
              {title}
            </h3>
            <span className="font-medium text-[12px] text-gray-500 truncate w-[300px]">
              {desc}
            </span>
            <span className="font-bold text-lg text-orange-500 cursor-pointer">
              {`${price}$`}
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
          {/* <div className="flex items-center text-sm">
            <svg
              className="w-4 h-4  mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <span>{comments}</span>
          </div> */}
        </div>
      </a>
    </Link>
  );
}
