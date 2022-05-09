import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Paper, Chip, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  WorkOutlineOutlined as WorkOutlineOutlinedIcon,
  SchoolOutlined as SchoolOutlinedIcon,
} from "@mui/icons-material";
import { formatDate } from "@/utils/date";

const variants = {
  work: {
    tag: "work",
    Icon: WorkOutlineOutlinedIcon,
  },
  education: {
    tag: "education",
    Icon: SchoolOutlinedIcon,
  },
};

const TimelineEventRoot = styled("li", {
  shouldForwardProp: (prop) => prop !== "position" && prop !== "sx",
  name: "TimelineEvent",
  slot: "Root",
})(({ position }) => ({
  listStyle: "none",
  position: "relative",
  minHeight: 80,
  display: "flex",
  ...(position === "left" && {
    flexDirection: "row-reverse",
  }),
  ...(position === "alternate" && {
    "&:before": {
      content: '""',
      flex: 1,
      padding: "8px 16px",
    },
    "&:nth-of-type(even)": {
      flexDirection: "row-reverse",
    },
    // [`${TimelineEventConnector}`]: {
    //   backgroundColor: "red"
    // },
  }),
}));

const TimelineEventConnector = styled("span", {
  name: "TimelineEvent",
  slot: "Connector",
})(({ theme }) => ({
  width: 2,
  flexGrow: 1,
  backgroundColor: theme.palette.grey[400],
}));

const TimelineEvent = ({ variant, position, description, date, sx = [] }) => {
  const { locale } = useRouter();
  const { tag, Icon } = variants[variant];

  return (
    <TimelineEventRoot
      position={position}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 0,
        }}
      >
        <TimelineEventConnector />
        <Box
          component="span"
          sx={{
            display: "flex",
            alignSelf: "baseline",
            p: 1,
            my: 1,
            borderRadius: "50%",
            color: "grey.50",
            bgcolor: "grey.400",
          }}
        >
          <Icon />
        </Box>
        <TimelineEventConnector />
      </Box>
      <Paper square sx={{ flex: 1, mx: 2, my: 1 }}>
        <Box square sx={{ px: 2, pt: 1, pb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 1,
            }}
          >
            <Typography component="time" variant="caption" dateTime={date}>
              {formatDate(new Date(date), locale)}
            </Typography>
            <Chip label={tag} />
          </Box>
          <Typography variant="body1" sx={{ maxWidth: 560 }}>
            {description}
          </Typography>
        </Box>
      </Paper>
    </TimelineEventRoot>
  );
};

TimelineEvent.propType = {
  variant: PropTypes.oneOf(["work", "award"]).isRequired,
  position: PropTypes.oneOf(["right", "left", "alternate"]),
  description: PropTypes.string,
  date: PropTypes.string,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default TimelineEvent;
