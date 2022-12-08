export const loader = ({ src, width, quality }) => {
  const params = [
    "f_auto",
    "c_limit",
    "w_" + width,
    "q_" + (quality || "auto"),
  ];
  const paramsString = params.join(",") + "/";
  const source = src[0] === "/" ? src.slice(1) : src;

  return `https://res.cloudinary.com/cerimorse-com/image/upload/${paramsString}${source}`;
};

// CERI

// maybe add a function here that takes parameters and produces a url
// for the social media images
// we can add text to an image so maybe have a generic social media
// image

// we could maybe use a rewrite to redirect traffic from cerimorse.com/img/social?cloudinaryparameters
// to res.cloudinary.com/cerimorse-com/cloudinaryparameters

// https://github.com/kentcdodds/kentcdodds.com/blob/420dcfa13504033c7d11ed6df6abfc8c4c434e97/server/cloudinary.ts#L77
// https://blog.logrocket.com/how-to-use-proxy-next-js/
