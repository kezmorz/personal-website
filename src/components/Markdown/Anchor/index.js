import Link from "@/components/Link";

const Anchor = ({ href, ...props }) => {
  const isExternal =
    typeof href === "string" &&
    (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

  if (isExternal) {
    return <Link href={href} target="_blank" rel="noopener" {...props} />;
  }

  return <Link href={href} {...props} />;
};

export default Anchor;
