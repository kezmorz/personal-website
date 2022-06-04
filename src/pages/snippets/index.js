import { useState } from "react";
import { useTranslations } from "use-intl";
import { allSnippets } from "contentlayer/generated";
import { Container, TextField, Chip, Typography, Box } from "@mui/material";
import { loader as cloudinaryImageLoader } from "@/lib/cloudinary";
import { pick } from "@/utils/misc";
import Meta from "@/components/Meta";
import Header from "@/components/Header";
import { SnippetCard } from "@/components/Card";
import Layout from "@/components/Layout";

const Snippets = ({ snippets }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const t = useTranslations("snippets");

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleTagToggle = (tag) => () => {
    setSelectedTags((prevSelectedTags) => {
      const tagIndex = prevSelectedTags.findIndex((prevTag) => prevTag === tag);
      return tagIndex === -1
        ? [...prevSelectedTags, tag]
        : prevSelectedTags.filter((prevTag) => prevTag !== tag);
    });
  };

  const tags = [...new Set(snippets.flatMap(({ tags }) => tags))];

  const filteredSnippets = snippets.filter(
    ({ title, description, tags }) =>
      (title.toLowerCase().includes(searchValue.toLowerCase()) ||
        description.toLowerCase().includes(searchValue.toLowerCase())) &&
      (!selectedTags.length || selectedTags.every((tag) => tags.includes(tag)))
  );

  const availableTags = [
    ...new Set(filteredSnippets.flatMap(({ tags }) => tags)),
  ];

  return (
    <>
      <Meta
        title={t("metadata.title")}
        description={t("metadata.description")}
        type="website"
        image=""
      />
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
        direction="ltr"
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
          label={t("search")}
          value={searchValue}
          onChange={handleSearchValueChange}
          sx={{ mt: { xs: 4, md: 8 } }}
        />
        <Box sx={{ mt: { xs: 2, md: 4 } }}>
          <Typography variant="body1" marginBottom>
            {t("filter")}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                color="primary"
                variant={selectedTags.includes(tag) ? "filled" : "outlined"}
                disabled={!availableTags.includes(tag)}
                onClick={handleTagToggle(tag)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        </Box>
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
        .map(({ title, description, tags, publishedAt, slug }) => ({
          title,
          description,
          tags,
          publishedAt,
          slug,
        }))
        .sort(
          (
            { publishedAt: snippetOnePublishedAt },
            { publishedAt: snippetTwoPublishedAt }
          ) =>
            Number(new Date(snippetTwoPublishedAt)) -
            Number(new Date(snippetOnePublishedAt))
        ),
      messages: pick(
        await import(`../../translations/${locale}.json`),
        Snippets.messages
      ),
    },
  };
};

export default Snippets;
