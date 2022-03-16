import { getAlbumPhotos } from "@/lib/flickr";

const randomPhoto = async (req, res) => {
  const { method } = req;

  if (method === "GET") {
    const response = await getAlbumPhotos();
    const data = await response.json();

    const photo =
      data.photoset.photo[
        Math.floor(Math.random() * data.photoset.photo.length)
      ];

    res.status(200);
    res.json({
      id: photo.id,
      secret: photo.secret,
      server: photo.server,
      title: photo.title,
      owner: data.photoset.owner,
    });
    res.end();
  } else {
    res.status(405);
    res.setHeader("Allow", ["GET"]);
    res.end(`Method ${method} not allowed.`);
  }
};

export default randomPhoto;
