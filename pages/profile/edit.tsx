import type { NextPage } from "next";
import Button from "../components/button";
import Input from "../components/input";
import Layout from "../components/layout";

const EditProfile: NextPage = () => {
  return (
    <Layout title="Edit profile" canGoBack>
      <div className="py-10 px-4 space-y-5">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input name="email" label="Email address" kind="text"></Input>
        <Input name="phone" label="Phone number" kind="phone"></Input>
       <Button text="Update profile"></Button>
      </div>
    </Layout>
  );
};

export default EditProfile;
