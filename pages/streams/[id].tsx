import type { NextPage } from "next";
import Layout from "../components/layout";
import Message from "../components/message";

const Stream: NextPage = () => {
  return (
    <Layout title="Stream" canGoBack>
      <div className="py-10 px-4  space-y-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">Galaxy S50</h1>
          <span className="text-2xl block mt-3 text-gray-900">$140</span>
          <p className=" my-6 text-gray-700">
            My money&apos;s in that office, right? If she start giving me some
            bullshit about it ain&apos;t there, and we got to go someplace else
            and get it, I&apos;m gonna shoot you in the head then and there.
            Then I&apos;m gonna shoot that bitch in the kneecaps, find out where
            my goddamn money is. She gonna tell me too. Hey, look at me when
            I&apos;m talking to you, motherfucker. You listen: we go in there,
            and that ni**a Winston or anybody else is in there, you the first
            motherfucker to get shot. You understand?
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4 mt-3">
            <Message message="왼쪽이 말하고있습니다."></Message>
            <Message message="오른쪽이 말하고있습니다." reversed></Message>
            <Message message="왼쪽이 말하고있습니다."></Message>
            <Message message="오른쪽이 말하고있습니다." reversed></Message>
            <Message message="왼쪽이 말하고있습니다."></Message>
            <Message message="오른쪽이 말하고있습니다." reversed></Message>
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
      </div>
    </Layout>
  );
};

export default Stream;
