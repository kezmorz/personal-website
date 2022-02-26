import * as React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Link as MuiLink } from "@mui/material";
import { styled } from "@mui/material/styles";
import clsx from "clsx";

const Anchor = styled("a")({});

const NextLinkComposed = React.forwardRef(
  (
    { to, linkAs, href, replace, scroll, shallow, prefetch, locale, ...props },
    ref
  ) => {
    return (
      <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref
        locale={locale}
      >
        <Anchor ref={ref} {...props} />
      </NextLink>
    );
  }
);

NextLinkComposed.displayName = "NextLinkComposed";

NextLinkComposed.propTypes = {
  to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  linkAs: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  href: PropTypes.any,
  replace: PropTypes.bool,
  scroll: PropTypes.bool,
  shallow: PropTypes.bool,
  prefetch: PropTypes.bool,
  locale: PropTypes.string,
  passHref: PropTypes.bool,
};

const Link = React.forwardRef(
  (
    {
      as: linkAs,
      href,
      noLinkStyle,
      role,
      activeClassName = "active",
      className: classNameProps,
      ...props
    },
    ref
  ) => {
    const router = useRouter();
    const pathname = typeof href === "string" ? href : href.pathname;
    const className = clsx(classNameProps, {
      [activeClassName]: router.pathname === pathname && activeClassName,
    });

    const isExternal =
      typeof href === "string" &&
      (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

    if (isExternal) {
      if (noLinkStyle) {
        return (
          <Anchor href={href} className={className} ref={ref} {...props} />
        );
      }

      return <MuiLink href={href} className={className} ref={ref} {...props} />;
    }

    if (noLinkStyle) {
      return (
        <NextLinkComposed
          to={href}
          className={className}
          ref={ref}
          {...props}
        />
      );
    }

    return (
      <MuiLink
        component={NextLinkComposed}
        linkAs={linkAs}
        to={href}
        className={className}
        ref={ref}
        {...props}
      />
    );
  }
);

Link.displayName = "Link";

Link.propTypes = {
  as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  href: PropTypes.any,
  noLinkStyle: PropTypes.bool,
  role: PropTypes.string,
  activeClassName: PropTypes.string,
  className: PropTypes.string,
};

export default Link;
