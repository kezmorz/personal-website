import { Box, Container, Divider } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer">
      <Divider light />
      <Container maxWidth="lg"></Container>
    </Box>
  );
};

Footer.messages = ["footer"];

Footer.propTypes = {};

export default Footer;
