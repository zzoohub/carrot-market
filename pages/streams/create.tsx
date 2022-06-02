import type { NextPage } from "next";

const CreateStream: NextPage = () => {
  return (
    <div className="px-4 py-10 space-y-5">

      <div className="relative text-sm">
        <label htmlFor="productName">Name</label>
        <div>
          <input
            id="productName"
            type="text"
            placeholder="product name"
            className="w-full mt-1 border rounded-md border-gray-300 focus:outline-none p-2 focus:border-orange-500"
          />
        </div>
      </div>

      <div className="relative text-sm">
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

      <div>
        <label className="text-sm">Description</label>
        <div className="mt-1">
          <textarea
            rows={4}
            className="resize-none w-full focus:outline-none focus:border-orange-500 border rounded-md p-2 text-sm"
          />
        </div>
      </div>

      <button className="w-full bg-orange-500 text-white font-medium text-md py-2 rounded-md shadow-md hover:bg-orange-600">
        Go-Live
      </button>
    </div>
  );
};

export default CreateStream;
