import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Paper, Chip, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from "@mui/lab";
import { WorkOutlineOutlined as WorkOutlineOutlinedIcon } from "@mui/icons-material";
import { formatDate } from "@/utils/date";

const variants = {
  work: {
    tag: "work",
    Icon: WorkOutlineOutlinedIcon,
  },
};

const TimelineEventRoot = styled(TimelineItem)(({ position }) => ({
  ...(position === "right" && {
    "&:before": {
      display: "none",
    },
  }),
  ...(position === "left" && {
    "& > .MuiPaper-root > .MuiBox-root > .MuiBox-root": {
      flexDirection: "row-reverse",
    },
    "&:before": {
      display: "none",
    },
  }),
  ...(position === "alternate" && {
    "&:nth-of-type(even) > .MuiPaper-root > .MuiBox-root > .MuiBox-root": {
      flexDirection: "row-reverse",
    },
  }),
}));

const TimelineEvent = ({ variant, position, description, date, sx = [] }) => {
  const { locale } = useRouter();
  const { tag, Icon } = variants[variant];

  return (
    <TimelineEventRoot
      position={position}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot>
          <Icon />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent component={Paper} square sx={{ p: 0, mx: 2, my: 1 }}>
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
          <Typography variant="body1">{description}</Typography>
        </Box>
      </TimelineContent>
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
