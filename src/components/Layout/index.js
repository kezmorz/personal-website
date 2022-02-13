import PropTypes from "prop-types";
import AppBar from "@/components/AppBar";

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
};

Layout.messages = [...AppBar.messages];

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Layout;
