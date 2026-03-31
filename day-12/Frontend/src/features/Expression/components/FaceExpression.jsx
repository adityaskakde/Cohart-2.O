import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";

export default function FaceExpression({ onDetect }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Ready");

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  async function handleClick() {
    const result = await detect({
      landmarkerRef,
      videoRef,
      setExpression,
    });

    if (result) {
      onDetect(result.toLowerCase()); // 🔥 IMPORTANT
    }
  }

  return (
    <div style={{ textAlign: "center", marginBottom: "30px" }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "320px", borderRadius: "16px" }}
      />

      <h2>{expression}</h2>

      <button onClick={handleClick}>
        Detect Mood 🎯
      </button>
    </div>
  );
}