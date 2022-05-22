import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Heading4Root = styled(Typography)(({ theme }) => ({
  marginBottom: 16,
  [theme.breakpoints.up("sm")]: {
    marginBottom: 32,
  },
}));

const Heading4 = (props) => <Heading4Root variant="h4" {...props} />;

export default Heading4;
