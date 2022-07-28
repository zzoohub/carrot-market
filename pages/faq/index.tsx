import { readdirSync, readFileSync } from "fs";
import Layout from "../components/layout";
import matter from "gray-matter";
import { NextPage } from "next";
import Link from "next/link";

interface FaqList {
  question: string;
  answer: string;
  slug: string;
}

const Faq: NextPage<{ faqList: FaqList[] }> = ({ faqList }) => {
  return (
    <Layout canGoBack title="FAQ" seoTitle="FAQ">
      <div className="flex flex-col w-full pt-7">
        {faqList.map((faq, i) => (
          <Link href={`/faq/${faq.slug}`} key={i}>
            <a className="block my-2 mx-7">
              <strong className="text-orange-500 mr-3 text-xl">Q</strong>
              <span className="text-md font-bold text-slate-600 hover:text-slate-900">
                {faq.question}
              </span>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const faqFiles = readdirSync("./markdown/faq").map((file) => {
    const content = readFileSync(`./markdown/faq/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug };
  });

  return {
    props: {
      faqList: faqFiles,
    },
  };
}

export default Faq;
