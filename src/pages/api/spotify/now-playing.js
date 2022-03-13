import { getNowPlaying } from "@/lib/spotify";

const nowPlaying = async (req, res) => {
  const { method } = req;

  if (method === "GET") {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      res.status(200);
      res.json({ isPlaying: false });
    } else {
      const { is_playing, item } = await response.json();
      res.status(200);
      res.json({
        isPlaying: is_playing,
        title: item.name,
        artist: item.artists.map((_artist) => _artist.name).join(", "),
        album: item.album_name,
        albumImageUrl: item.album.images[0].url,
        songUrl: item.external_urls.spotify,
      });
    }
  } else {
    res.status(405);
    res.setHeader("Allow", ["GET"]);
    res.end(`Method ${method} not allowed.`);
  }
};

export default nowPlaying;
