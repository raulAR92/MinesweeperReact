import React from "react";
import sounds from "../common/sounds";

const SoundComponent = () => {
  let soundArray = [];
  soundArray.push(sounds.click);
  soundArray.push(sounds.revealArea);
  soundArray.push(sounds.mine);
  soundArray.push(sounds.flag);
  soundArray.push(sounds.loop);
  soundArray.push(sounds.mineShow);
  return (
    <div>
      {soundArray.map((s, i) => (
        <audio
          id={s.filename}
          key={i}
          preload="auto"
          controls="none"
          style={{ display: "none" }}
        >
          <source src={s.route} type="audio/mp3"></source>
        </audio>
      ))}
    </div>
  );
};

export default SoundComponent;
