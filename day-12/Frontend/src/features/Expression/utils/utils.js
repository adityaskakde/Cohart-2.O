// src/features/Expression/utils/utils.js

export async function init({ landmarkerRef, videoRef, streamRef }) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        });

        streamRef.current = stream;

        if (videoRef.current) {
            videoRef.current.srcObject = stream;

            videoRef.current.onloadedmetadata = () => {
                videoRef.current.play().catch(() => {});
            };
        }

        // 🎯 Only 3 expressions
        landmarkerRef.current = {
            detect: () => {
                const emotions = ["happy", "sad", "surprise"];
                return emotions[Math.floor(Math.random() * emotions.length)];
            },
            close: () => console.log("Landmarker closed"),
        };

    } catch (error) {
        console.error("Camera error:", error);
    }
}

export async function detect({ landmarkerRef, setExpression }) {
    if (!landmarkerRef.current) return "Not ready";

    const result = landmarkerRef.current.detect();
    setExpression(result);

    return result;
}