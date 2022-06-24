import type { NextPage } from "next";
import Layout from "../components/layout";
import ProductList from "../components/product-list";

const Liked: NextPage = () => {
  return (
    <Layout title="Liked items" canGoBack>
      <div className="flex flex-col divide-y-[1px]">
        <ProductList kind="favorites"></ProductList>
      </div>
    </Layout>
  );
};

export default Liked;
