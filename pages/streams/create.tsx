import type { NextPage } from "next";
import Button from "../components/button";
import Input from "../components/input";
import Layout from "../components/layout";
import Textarea from "../components/Textarea";


const Create: NextPage = () => {
  return (
    <Layout title="Create stream" canGoBack>
      <div className=" space-y-5 py-10 px-4">
        <Input name="name" label="Name" kind="text" required></Input>
        <Input name="phone" label="Phone number" kind="phone" required></Input>
        <Textarea name="textarea" label="Description" rows={4}></Textarea>
        <Button text="Go live"></Button>
      </div>
    </Layout>
  );
};

export default Create;
