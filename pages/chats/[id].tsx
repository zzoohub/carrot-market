import type { NextPage } from "next";
import Layout from "../components/layout";

const ChatDetail: NextPage = () => {
  return (
    <Layout title="Chat" canGoBack>
      <div className="px-4 py-10 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="h-7 w-7 rounded-full bg-slate-500" />
          <div className="border py-2 px-3 rounded-xl text-sm">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse space-x-reverse items-center space-x-2">
          <div className="h-7 w-7 rounded-full bg-slate-500" />
          <div className="border py-2 px-3 rounded-xl text-sm">
            <p>I want ￦20,000</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-7 w-7 rounded-full bg-slate-500" />
          <div className="border py-2 px-3 rounded-xl text-sm">
            <p>미쳤어</p>
          </div>
        </div>
        <div className="fixed w-full max-w-md mx-auto inset-x-0 bottom-3">
          <div className="relative">
            <input
              type="text"
              className="w-full border rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-none px-3 py-1 text-sm shadow-sm"
            />
            <div className="absolute inset-y-0 my-auto right-1 h-6 aspect-square bg-orange-500 rounded-full text-center leading-[22px] text-white font-semibold -rotate-90 cursor-pointer hover:scale-105 hover:bg-orange-600">
              <span>&rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
