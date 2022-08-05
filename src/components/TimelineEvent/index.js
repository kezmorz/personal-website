import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useTranslations } from "use-intl";
import { Paper, Chip, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  WorkOutlineOutlined as WorkOutlineOutlinedIcon,
  SchoolOutlined as SchoolOutlinedIcon,
  LocalLibraryOutlined as LocalLibraryOutlinedIcon,
  ConnectWithoutContactOutlined as ConnectWithoutContactOutlinedIcon,
  EmojiEventsOutlined as EmojiEventsOutlinedIcon,
} from "@mui/icons-material";
import { formatDate } from "@/utils/date";

const variants = {
  work: {
    label: "work",
    Icon: WorkOutlineOutlinedIcon,
  },
  education: {
    label: "education",
    Icon: SchoolOutlinedIcon,
  },
  training: {
    label: "training",
    Icon: LocalLibraryOutlinedIcon,
  },
  mentor: {
    label: "mentor",
    Icon: ConnectWithoutContactOutlinedIcon,
  },
  award: {
    label: "award",
    Icon: EmojiEventsOutlinedIcon,
  },
};

const TimelineEventRoot = styled("li", {
  shouldForwardProp: (prop) => prop !== "position" && prop !== "sx",
})(({ position }) => ({
  listStyle: "none",
  position: "relative",
  minHeight: 80,
  display: "flex",
  ...(position === "left" && {
    flexDirection: "row-reverse",
    "& .MuiPaper-root > .MuiBox-root": {
      "& > .MuiBox-root": {
        flexDirection: "row-reverse",
      },
      "& > .MuiTypography-root": {
        marginLeft: "auto",
        textAlign: "right",
      },
    },
  }),
  ...(position === "alternate" && {
    "&:before": {
      content: '""',
      flex: 1,
      padding: "8px 16px",
    },
    "&:nth-of-type(even)": {
      flexDirection: "row-reverse",
      "& .MuiPaper-root > .MuiBox-root": {
        "& > .MuiBox-root": {
          flexDirection: "row-reverse",
        },
        "& > .MuiTypography-root": {
          marginLeft: "auto",
          textAlign: "right",
        },
      },
    },
  }),
}));

const TimelineEventConnector = styled("span")(({ theme }) => ({
  width: 2,
  flexGrow: 1,
  backgroundColor: theme.palette.grey[400],
}));

const TimelineEvent = ({ variant, position, description, date, sx = [] }) => {
  const { locale } = useRouter();
  const t = useTranslations("timelineevent");

  const { label, Icon } = variants[variant];

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
      <Paper sx={{ flex: 1, mx: 2, my: 1 }}>
        <Box sx={{ px: 2, pt: 1, pb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 1,
            }}
          >
            <Typography component="time" variant="caption" dateTime={date}>
              {formatDate(new Date(date), "PPP", locale)}
            </Typography>
            <Chip label={t(label)} sx={{ transition: "none" }} />
          </Box>
          <Typography variant="body1" sx={{ maxWidth: 560 }}>
            {description}
          </Typography>
        </Box>
      </Paper>
    </TimelineEventRoot>
  );
};

TimelineEvent.messages = ["timelineevent"];

TimelineEvent.propTypes = {
  variant: PropTypes.oneOf(["work", "education", "training", "mentor", "award"])
    .isRequired,
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
