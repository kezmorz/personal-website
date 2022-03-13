import { getNowPlaying } from "@/lib/spotify";

const nowPlaying = async (req, res) => {
  const { method } = req;

  if (method === "GET") {
    const response = await getNowPlaying();
    const data = await response.json();

    console.log({ data });

    const isPlaying = data.is_playing;
    const title = data.item.name;
    const artist = data.item.artists.map((_artist) => _artist.name).join(", ");
    const album = data.item.album.name;
    const albumImageUrl = data.item.album.images[0].url;
    const songUrl = data.item.external_urls.spotify;

    console.log({ isPlaying, title, artist, album, albumImageUrl, songUrl });

    res.status(200);
    res.json({ isPlaying, title, artist, album, albumImageUrl, songUrl });
  } else {
    res.status(405);
    res.setHeader("Allow", ["GET"]);
    res.end(`Method ${method} not allowed.`);
  }
};

export default nowPlaying;
