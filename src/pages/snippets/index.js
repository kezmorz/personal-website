import { useState } from "react";
import { useTranslations } from "use-intl";
import { allSnippets } from "contentlayer/generated";
import { Container, TextField, Typography, Box } from "@mui/material";
import { loader as cloudinaryImageLoader } from "@/lib/cloudinary";
import { pick } from "@/utils/misc";
import Header from "@/components/Header";
import SnippetCard from "@/components/SnippetCard";
import Layout from "@/components/Layout";

const Snippets = ({ snippets }) => {
  const [searchValue, setSearchValue] = useState("");
  const t = useTranslations("snippets");

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredSnippets = snippets.filter(
    ({ title, description }) =>
      title.toLowerCase().includes(searchValue.toLowerCase()) ||
      description.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Header
        heading={t("heading")}
        subheading={t("subheading")}
        imageProps={{
          src: "samples/cloudinary-icon.png",
          alt: "Something something something",
          width: 480,
          height: 350,
          layout: "responsive",
          loader: cloudinaryImageLoader,
        }}
        direction="rtl"
      />
      <Container
        component="section"
        maxWidth="md"
        sx={{ mb: { xs: 8, sm: 16 } }}
      >
        <Typography variant="h4">{t("description")}</Typography>
        <TextField
          id="snippet-search-value"
          fullWidth
          label="Search snippets"
          value={searchValue}
          onChange={handleSearchValueChange}
          sx={{ mt: { xs: 4, md: 8 } }}
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: { xs: 2, md: 4 },
            mt: { xs: 4, md: 8 },
          }}
        >
          {filteredSnippets.map(({ title, description, publishedAt, slug }) => (
            <SnippetCard
              key={slug}
              heading={title}
              description={description}
              date={publishedAt}
              href={`/snippets/${slug}`}
              sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}
            />
          ))}
        </Box>
      </Container>
    </>
  );
};

Snippets.getLayout = (page) => {
  return (
    <Layout>
      <main>{page}</main>
    </Layout>
  );
};

Snippets.messages = ["snippets", ...Layout.messages];

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      snippets: allSnippets
        .filter(({ locale: snippetLocale }) => snippetLocale === locale)
        .map(({ title, description, publishedAt, slug }) => ({
          title,
          description,
          publishedAt,
          slug,
        }))
        .sort(
          (snippetOne, snippetTwo) =>
            Number(new Date(snippetTwo.publishedAt)) -
            Number(new Date(snippetOne.publishedAt))
        ),
      messages: pick(
        await import(`../../translations/${locale}.json`),
        Snippets.messages
      ),
    },
  };
};

export default Snippets;
