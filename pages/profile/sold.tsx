import type { NextPage } from "next";
import Layout from "../components/layout";
import ProductList from "../components/product-list";

const Sold: NextPage = () => {
  return (
    <Layout title="Sold items" canGoBack>
      <div className="flex flex-col divide-y-[1px]">
        <ProductList kind="sales"></ProductList>
      </div>
    </Layout>
  );
};

export default Sold;
