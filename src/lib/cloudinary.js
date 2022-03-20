import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "cerimorse-com",
  },
  url: {
    secure: true,
  },
});

export const createImageUrl = ({ src, width, height }) => {
  const image = cloudinary.image(src);
  image.resize(fill().width(width).height(height));
  const imageUrl = image.toURL();
  return imageUrl;
};
