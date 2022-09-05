import type { NextPage } from "next";
import Layout from "../components/layout";
import ProductList from "../components/product-list";

const Bought: NextPage = () => {
  return (
    <Layout seoTitle="Bought Items" title="구매내역" canGoBack>
      <div className="flex flex-col divide-y-[1px] ">
        <ProductList kind="purchases"></ProductList>
      </div>
    </Layout>
  );
};

export default Bought;
