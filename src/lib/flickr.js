const apiKey = process.env.FLICKR_API_KEY;

const sizeSuffix = {
  75: "s",
  100: "t",
  150: "q",
  240: "m",
  320: "n",
  400: "w",
  500: "",
  640: "z",
  800: "c",
  1024: "b",
};

export const getAlbumPhotos = async () => {
  const response = await fetch(
    `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=72177720297374250&format=json&nojsoncallback=1`
  );

  return response;
};

export const photoLoader = ({ src, width }) => {
  console.log({ width });
  return `https://live.staticflickr.com/${src}`;
};
