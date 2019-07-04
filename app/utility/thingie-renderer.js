// This functionality is from "PIXI-SEED" GitHub project
// Url: "https://github.com/edwinwebb/pixi-seed"

import Thingie from '../components/thingie/thingie';

export default function renderThingies() {
  const thingies = [];
  for (let index = 0; index < 200; index++) {
    const t = new Thingie();
    t.setInitialPoint(
      800 * Math.random(),
      900 * Math.random() - 300
    );
    const near = thingies.some(t2 => isNear(t.position, t2.position));
    if (!near) {
      thingies.push(t);
    }
  }

  return thingies;
}

const isNear = (p1, p2) => {
  const a = p1.x - p2.x;
  const b = p1.y - p2.y;
  const c = Math.sqrt(a * a + b * b);
  return c < 100;
};