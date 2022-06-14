import type { NextPage } from "next";
import Item from "./components/item";
import Layout from "./components/layout";
import useUser from "../libs/client/useUser";
import Head from "next/head";

const Home: NextPage = () => {
  const user = useUser();
  console.log(user);
  return (
    <Layout title="Home" hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className="divide-y-[1px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index, i) => (
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

export default Home;
