import { useEffect, useRef, useState } from "react";
import "../style/player.scss";

const Player = ({ song }) => {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!song?.url) return;

    const audio = audioRef.current;

    audio.src = song.url;
    audio.load();

    audio.play().then(() => setIsPlaying(true));
  }, [song]);

  function togglePlay() {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  }

  function handleTimeUpdate() {
    const audio = audioRef.current;
    const percent = (audio.currentTime / audio.duration) * 100;
    setProgress(percent || 0);
  }

  function handleSeek(e) {
    const audio = audioRef.current;
    const value = e.target.value;
    audio.currentTime = (value / 100) * audio.duration;
    setProgress(value);
  }

  function handleVolume(e) {
    const val = e.target.value;
    audioRef.current.volume = val;
    setVolume(val);
  }

  if (!song) return null;

  return (
    <div style={{
      width: "400px",
      padding: "20px",
      borderRadius: "20px",
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      textAlign: "center",
      color: "white"
    }}>
      <img
        src={song.posterUrl}
        style={{
          width: "150px",
          borderRadius: "12px",
          marginBottom: "10px"
        }}
      />

      <h3>{song.title}</h3>
      <p style={{ color: "#00ff99" }}>{song.mood}</p>

      <input
        type="range"
        value={progress}
        onChange={handleSeek}
        style={{ width: "100%" }}
      />

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "10px"
      }}>
        <button onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>

      <div style={{ marginTop: "10px" }}>
        🔊
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
        />
      </div>

      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
    </div>
  );
};

export default Player;