import { useState } from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import { getSong } from "../service/song.api";

const Home = () => {
  const [song, setSong] = useState(null);

  async function handleDetect(mood) {
    try {
      const res = await getSong({ mood });

      if (res.songs?.length > 0) {
        setSong(res.songs[0]);
      } else {
        console.log("No songs found");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
    }}>
      <FaceExpression onDetect={handleDetect} />
      <Player song={song} />
    </div>
  );
};

export default Home;