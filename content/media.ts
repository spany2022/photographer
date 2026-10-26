/**
 * Temporary media helpers. All sample footage and stills are free-license
 * stock (Pexels, Mixkit, Unsplash) used for demonstration only.
 * Replace with the filmmaker's own work — see README "Replacing media".
 */

export const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const pexelsPoster = (id: string, file = `pexels-photo-${id}.jpeg`) =>
  `https://images.pexels.com/videos/${id}/${file}?auto=compress&cs=tinysrgb&w=1920`;

export const pexelsVideo = (id: string, file: string) =>
  `https://videos.pexels.com/video-files/${id}/${file}`;

export const mixkitVideo = (id: string, quality: 360 | 720 | 1080 | 2160) =>
  `https://assets.mixkit.co/videos/${id}/${id}-${quality}.mp4`;

export const mixkitPoster = (id: string) =>
  `https://assets.mixkit.co/videos/${id}/${id}-thumb-720-0.jpg`;

export const heroMedia = {
  video: pexelsVideo("40424847", "17275011_2730_1440_25fps.mp4"),
  poster: pexelsPoster("40424847"),
};

export const closingImage = unsplash("photo-1615966650071-855b15f29ad1", 2400);
