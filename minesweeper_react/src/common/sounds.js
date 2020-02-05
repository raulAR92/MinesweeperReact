import clickSound from "../resources/click.mp3";
import mineSound from "../resources/mine.mp3";
import zoneSound from "../resources/show_zone.mp3";
const sounds = {
  click: {
    route: clickSound,
    filename: "click.mp3"
  },
  revealArea: {
    route: mineSound,
    filename: "show_zone.mp3"
  },
  mine: {
    route: zoneSound,
    filename: "mine.mp3"
  }
};

export default sounds;
