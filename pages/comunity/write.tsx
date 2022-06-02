import { NextPage } from "next";
import Button from "../components/button";
import Layout from "../components/layout";
import Textarea from "../components/Textarea";

const Write: NextPage = () => {
  return (
    <Layout title="Post upload" canGoBack>
      <div className="px-4 py-10">
        <Textarea rows={4} placeholder="Ask a Question!"></Textarea>
        <Button text="Reply"></Button>
      </div>
    </Layout>
  );
};
export default Write;
