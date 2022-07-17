import PropTypes from "prop-types";

const Carousel = ({ children }) => {
  return <>{children}</>;
};

Carousel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Carousel;
