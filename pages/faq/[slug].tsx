import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse/lib";
import { unified } from "unified";
import Layout from "../components/layout";

interface FaqDetailInterface {
  data: {
    question: string;
    answer: string;
  };
  content: string;
  slug: string;
}

const FaqDetail: NextPage<FaqDetailInterface> = ({ data, content, slug }) => {
  return (
    <Layout canGoBack seoTitle={`FAQ-${slug}`} title={`FAQ - ${slug}`}>
      <div className="p-5">
        <div className="flex items-center mt-5">
          <strong className="text-orange-500 mr-3 text-xl">Q</strong>
          <h1>{data.question}</h1>
        </div>
        <div className="flex items-center mt-2">
          <strong className="text-teal-500 mr-3 text-xl">A</strong>
          <h2>{data.answer}</h2>
        </div>

        <h3 className="mt-7 text-slate-700 font-bold">Detailed Answer</h3>
        <div
          className="faq-detail-content w-full h-[70vh] bg-slate-100 rounded-sm p-2 mt-1"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </Layout>
  );
};

export function getStaticPaths() {
  const files = readdirSync("./markdown/faq").map((file) => {
    const [name, extension] = file.split(".");
    return { params: { slug: name } };
  });
  return {
    paths: files,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data, content } = matter.read(
    `./markdown/faq/${ctx.params?.slug}.md`
  );
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);

  return {
    props: {
      slug: ctx?.params?.slug,
      data,
      content: value,
    },
  };
};

export default FaqDetail;
