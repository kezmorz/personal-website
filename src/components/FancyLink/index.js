import { forwardRef } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Link from "@/components/Link";

const FancyLinkRoot = styled(Link)(({ activeClassName }) => ({
  display: "block",
  position: "relative",
  "&::after": {
    width: "100%",
    content: "''",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "0.1em",
    backgroundColor: "currentColor",
    transform: "scale(0)",
    transformOrigin: "center",
    transition: "opacity 300ms, transform 300ms",
  },
  [`&.${activeClassName}::after, &:hover::after, &:focus::after`]: {
    transform: "scale(1)",
  },
}));

const FancyLink = forwardRef(
  (
    {
      as,
      href,
      noLinkStyle,
      role,
      activeClassName = "active",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <FancyLinkRoot
        as={as}
        href={href}
        underline="none"
        noLinkStyle={noLinkStyle}
        role={role}
        activeClassName={activeClassName}
        className={className}
        ref={ref}
        {...props}
      />
    );
  }
);

FancyLink.displayName = "FancyLink";

FancyLink.propTypes = {
  as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  href: PropTypes.any,
  noLinkStyle: PropTypes.bool,
  role: PropTypes.string,
  activeClassName: PropTypes.string,
  className: PropTypes.string,
};

export default FancyLink;
