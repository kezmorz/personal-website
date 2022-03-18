import PropTypes from "prop-types";
import AppBar from "@/components/AppBar";
import Footer from "@/components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      {children}
      <Footer />
    </>
  );
};

Layout.messages = [...AppBar.messages, ...Footer.messages];

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Layout;
