import PropTypes from "prop-types";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import Link from "@/components/Link";

const MediaCard = ({
  title,
  description,
  image,
  alt,
  href,
  target,
  sx = [],
}) => {
  return (
    <Card
      component="article"
      sx={[{ display: "flex" }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <CardActionArea
        component={Link}
        href={href}
        target={target}
        sx={{
          minHeight: 96,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={alt}
          sx={{ width: 128 }}
        />
        <Box sx={{ flex: "1 0" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="h6">{title}</Typography>
            {description && (
              <Typography variant="body1">{description}</Typography>
            )}
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

MediaCard.propType = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.any.isRequired,
  alt: PropTypes.string,
  href: PropTypes.any,
  target: PropTypes.string,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default MediaCard;
