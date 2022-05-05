import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Paper, Chip, Typography, Box } from "@mui/material";
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

const TimelineEvent = ({ variant, description, date, sx = [] }) => {
  const { locale } = useRouter();
  const { tag, Icon } = variants[variant];

  return (
    <TimelineItem sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot>
          <Icon />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Paper square sx={{ px: 2, pt: 1, pb: 2 }}>
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
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
};

TimelineEvent.propType = {
  variant: PropTypes.oneOf(["work", "award"]).isRequired,
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
