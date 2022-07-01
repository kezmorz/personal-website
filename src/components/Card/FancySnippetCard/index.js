import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Paper, Typography, Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { CalendarMonthOutlined as CalendarMonthOutlinedIcon } from "@mui/icons-material";
import { formatDate } from "@/utils/date";
import Link from "@/components/Link";

const FancySnippetCardRoot = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: 16,
  boxShadow: `${alpha(theme.palette.primary.main, 0.8)} 0px 0px 5px 5px`,
}));

const FancySnippetCard = ({ heading, date, href, sx = [] }) => {
  const { locale } = useRouter();

  return (
    <FancySnippetCardRoot
      component={Link}
      square
      href={href}
      underline="none"
      sx={[
        (theme) => ({
          "&.Mui-focusVisible, &:hover": {
            boxShadow: `${alpha(
              theme.palette.primary.main,
              0.8
            )} 0px 0px 8px 8px`,
            outline: 0,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography variant="h6" gutterBottom>
        {heading}
      </Typography>
      <Box sx={{ display: "inline-flex" }}>
        <Box component="span" sx={{ display: "inline-flex", ml: -1, p: 1 }}>
          <CalendarMonthOutlinedIcon />
        </Box>
        <Typography
          component="time"
          variant="body1"
          dateTime={date}
          sx={{ pt: 1, pl: 1 }}
        >
          {formatDate(new Date(date), "PPP", locale)}
        </Typography>
      </Box>
    </FancySnippetCardRoot>
  );
};

FancySnippetCard.propTypes = {
  heading: PropTypes.string.isRequired,
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

export default FancySnippetCard;
