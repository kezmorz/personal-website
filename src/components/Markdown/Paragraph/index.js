import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const ParagraphRoot = styled(Typography)(({ theme }) => ({
  marginBottom: 8,
  [theme.breakpoints.up("sm")]: {
    marginBottom: 16,
  },
}));

const Paragraph = (props) => <ParagraphRoot variant="body1" {...props} />;

export default Paragraph;
