import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";

const Snippet = defineDocumentType(() => ({
  name: "Snippet",
  filePathPattern: "snippets/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/(\.cy)?\.mdx$/, ""),
    },
    locale: {
      type: "string",
      resolve: (doc) => {
        const filenameArray = doc._raw.sourceFileName.split(".");
        return filenameArray.length > 2 ? filenameArray.slice(-2)[0] : "en";
      },
    },
  },
}));

const contentlayerConfig = makeSource({
  contentDirPath: "src/content",
  documentTypes: [Snippet],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
});

export default contentlayerConfig;
