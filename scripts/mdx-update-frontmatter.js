const { writeFile } = require("fs/promises");
const { parse, resolve } = require("path");
const { add, getStagedFiles } = require("git-jiggy");
const { read, stringify } = require("gray-matter");

const getMdxFilesFromCommit = async () => {
  const files = (await getStagedFiles()).map((file) => {
    return resolve(process.cwd(), file);
  });

  return files.filter(
    (file) => parse(file).ext === ".mdx" && file.includes("src/content/en") // CERI - fix this (shouldn't have /en but breaks if a .md is deleted and committed)
  );
};

const updateFrontmatter = async (paths) => {
  paths.forEach(async (path) => {
    const file = read(path);
    const { data: currentFrontmatter } = file;
    const updatedFrontmatter = {
      ...currentFrontmatter,
      updatedAt: new Date().toISOString(),
    };
    file.data = updatedFrontmatter;

    const updatedFileContent = stringify(file);
    writeFile(path, updatedFileContent);
  });
};

const updateModifiedFiles = async () => {
  const paths = await getMdxFilesFromCommit();

  if (paths.length) {
    await updateFrontmatter(paths);
    await add(paths);
  }
};

updateModifiedFiles();
