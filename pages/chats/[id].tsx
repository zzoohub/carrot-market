import type { NextPage } from "next";
import Layout from "../components/layout";
import Message from "../components/message";

const ChatDetail: NextPage = () => {
  return (
    <Layout seoTitle="Chat" title="Chat" canGoBack>
      <div className="px-4 py-10 space-y-2">
        <Message message="Hi how much are you selling them for?"></Message>
        <Message message="I want ￦20,000" reversed></Message>
        <Message message="미쳤어"></Message>
        <div
          id="searchBar"
          className="fixed w-full max-w-md mx-auto inset-x-0 bottom-3"
        >
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
