import type { NextPage } from "next";
import Item from "../components/item";
import Layout from "../components/layout";

const Bought: NextPage = () => {
  return (
    <Layout title="Bought items" canGoBack>
      <div className="flex flex-col divide-y-[1px] ">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            key={i}
            id={0}
            title="Title"
            price={12345}
            etc={"black"}
            comments={5}
            hearts={5}
          ></Item>
        ))}
      </div>
    </Layout>
  );
};

export default Bought;
