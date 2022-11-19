import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { formatDate } from "@/utils/date";
import Link from "@/components/Link";

const SnippetCardRoot = styled(Paper)(({ theme }) => ({
  padding: 16,
}));

const SnippetCard = ({ heading, description, date, href, sx = [] }) => {
  const { locale } = useRouter();

  return (
    <SnippetCardRoot
      component={Link}
      href={href}
      underline="none"
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Typography variant="caption" component="time" dateTime={date}>
        {formatDate(new Date(date), "PPP", locale)}
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
        {heading}
      </Typography>
      <Typography variant="body1" paragraph>
        {description}
      </Typography>
    </SnippetCardRoot>
  );
};

SnippetCard.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default SnippetCard;
