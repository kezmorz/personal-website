import { createSvgIcon } from "@mui/material/utils";

const VercelSvgIcon = createSvgIcon(
  <path d="M24 22.525H0l12-21.05 12 21.05z" />,
  "Vercel"
);

const Vercel = (props) => <VercelSvgIcon viewBox="0 0 24 24" {...props} />;

export default Vercel;
