// src/components/hero/BackgroundVideo.jsx

const BackgroundVideo = ({ videoId }) => {
  const videoSrc = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&background=1`;

  return (
    <div className="background-video">
      <iframe
        src={videoSrc}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        title="Background Video"
      />
    </div>
  );
};

export default BackgroundVideo;
