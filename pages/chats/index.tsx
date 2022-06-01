import { NextPage } from "next";
import Layout from "../components/layout";
const Chats: NextPage = () => {
  return (
    <Layout title="Chats" hasTabBar>
      <div className="divide-y-[1px]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index, i) => (
          <div key={index} className="px-4 py-5 space-y-5">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full" />
              <div>
                <span className="text-sm block font-medium text-gray-700">
                  Steve Jebs
                </span>
                <span className="text-xs text-gray-500 block ">2시간 전</span>
                <p className="text-gray-700 mt-2">
                  The best mandu restaurant is the one next to my house.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
