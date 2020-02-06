import clickSound from "../resources/click.mp3";
import mineSound from "../resources/mine.mp3";
import zoneSound from "../resources/show_zone.mp3";
import flagSound from "../resources/flag.mp3";
import loopSound from "../resources/modal_score.mp3";
import mineShowSound from "../resources/mine_show.mp3";
const sounds = {
  click: {
    route: clickSound,
    filename: "click.mp3"
  },
  revealArea: {
    route: zoneSound,
    filename: "show_zone.mp3"
  },
  mine: {
    route: mineSound,
    filename: "mine.mp3"
  },
  flag: {
    route: flagSound,
    filename: "flag.mp3"
  },
  loop: {
    route: loopSound,
    filename: "modal_score.mp3"
  },
  mineShow: {
    route: mineShowSound,
    filename: "mine_show.mp3"
  }
};

export default sounds;
