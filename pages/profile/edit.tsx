import type { NextPage } from "next";

const EditProfile: NextPage = () => {
  return (
    <div className="py-10 px-4 space-y-5">
      <div className="flex items-center space-x-2">
        <div className="w-12 h-12 bg-stone-500 rounded-full" />
        <label htmlFor="picture" className="text-xs py-[5px] px-4 bg-gray-100 border rounded-md text-gray-800 cursor-pointer shadow-sm hover:bg-gray-200">
          Change
          <input id="picture" type="file" accept="image/*" className="hidden"/>
        </label>
      </div>
      <div>
        <label htmlFor="phone" className="text-sm">Phone number</label>
        <div className="flex mt-1">
          <span className="border rounded-l-md border-r-0 p-2 border-gray-300 text-sm bg-gray-100 select-none">
            +82
          </span>
          <input id="phone" className="p-2 border border-gray-300 rounded-l-none rounded-md w-full focus:outline-none focus:ring-orange-500 focus:border-orange-500" type="number" required />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="text-sm">Email address</label>
        <input id="email" type="email" required className="w-full mt-1 border rounded-md border-gray-300 focus:outline-none p-2 focus:border-orange-500"/>
      </div>
      <button className="w-full bg-orange-500 text-white font-medium text-md py-2 rounded-md shadow-md">
        edit profile
      </button>
    </div>
  );
};

export default EditProfile;