import type { NextPage } from "next";

const Upload: NextPage = () => {
  return (
    <div className="px-4 py-10">
      <div>
        <label className="flex justify-center items-center border-2 h-52 text-gray-400 border-dashed rounded-md hover:text-orange-500 hover:border-orange-500 cursor-pointer">
          <svg
            className="h-10 w-10"
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

          <input type="file" className="hidden" />
        </label>
      </div>
      <div className="relative mt-5 text-sm">
        <label htmlFor="input">Price</label>
        <div>
          <div className="absolute top-[33px] left-0 pl-2 text-gray-500 text-sm">
            <span>$</span>
          </div>
          <input
            id="input"
            type="text"
            placeholder="0.00"
            className="w-full mt-1 pl-5 border rounded-md border-gray-300 focus:outline-none p-2 focus:border-orange-500"
          />
          <div className="absolute right-2 top-[34px] text-gray-500 text-xs">
            <span>USD</span>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <label className="text-sm">Description</label>
        <div className="mt-1">
          <textarea
            rows={4}
            className="resize-none w-full focus:outline-none focus:border-orange-500 border rounded-md p-2 text-sm"
          />
        </div>
      </div>
      <button className="w-full mt-3 bg-orange-500 text-white font-medium text-md py-2 rounded-md shadow-md hover:bg-orange-600">
        upload
      </button>
    </div>
  );
};

export default Upload;
