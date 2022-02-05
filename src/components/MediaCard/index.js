import PropTypes from "prop-types";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const MediaCard = ({ title, description, href, image, alt, sx = [] }) => {
  return (
    <Card
      component="article"
      raised
      sx={[
        { height: 120, display: "flex" },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <CardActionArea
        href={href}
        target="_blank"
        rel="noopener"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "stretch",
        }}
      >
        <CardMedia component="img" image={image} alt={alt} sx={{ width: 96 }} />
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body1"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

MediaCard.propType = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  href: PropTypes.any,
  image: PropTypes.any.isRequired,
  alt: PropTypes.string,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default MediaCard;
