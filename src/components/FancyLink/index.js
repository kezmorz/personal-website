import { forwardRef } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Link from "@/components/Link";

const FancyLinkRoot = styled(Link)(({ activeClassName, theme }) => ({
  position: "relative",
  display: "block",
  color: theme.palette.text.primary,
  outline: 0,
  "&::after": {
    position: "absolute",
    width: "100%",
    content: "''",
    bottom: 0,
    left: 0,
    height: "0.1em",
    backgroundColor: "currentColor",
    transform: "scale(0)",
    transformOrigin: "center",
    transition: "opacity 300ms, transform 300ms",
  },
  [`&.${activeClassName}, &:hover, &.Mui-focusVisible`]: {
    color: theme.palette.text.primary,
  },
  [`&.${activeClassName}::after, &:hover::after, &.Mui-focusVisible::after`]: {
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
