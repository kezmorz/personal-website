import PropTypes from "prop-types";
import { Container } from "@mui/material";

const Section = ({
  maxWidth,
  extendTopPadding,
  extendBottomPadding,
  sx = [],
  children,
}) => {
  return (
    <Container
      component="section"
      maxWidth={maxWidth}
      sx={[
        {
          pt: { xs: 6, sm: 12 },
          pb: { xs: 6, sm: 12 },
          ...(extendTopPadding && { pt: { xs: 12, sm: 24 } }),
          ...(extendBottomPadding && { pb: { xs: 12, sm: 24 } }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Container>
  );
};

Section.propTypes = {
  maxWidth: PropTypes.oneOfType([
    PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", false]),
    PropTypes.string,
  ]),
  extendTopPadding: PropTypes.bool,
  extendBottomPadding: PropTypes.bool,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
