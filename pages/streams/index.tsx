import type { NextPage } from "next";

const Streams: NextPage = () => {
 return(
   <div className="space-y-2 divide-y-2">
     {[1,2,3,4,5,6,7,8,].map((index, i) =>
      <div key={index} className="px-4 pt-5">
        <div className="w-full aspect-video bg-slate-400 rounded-md shadow-md"></div>
        <h3 className="mt-2 mb-10 text-md font-semibold">live streaming</h3>
      </div>
     )}
    <button className="fixed bottom-7 right-7 bg-orange-500 p-2 rounded-full text-white shadow-lg hover:bg-orange-600 transition-color border-transparent">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
      </svg>
    </button>
   </div>
 )
}

export default Streams