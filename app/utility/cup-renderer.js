import Cup from '../components/cup/cup';
const config = require('../config/config');

var cupRotating;

export function renderCups() {
  return config.cups.map(cup => {
    return new Cup(cup);
  })
}

export function isRotation() {
  return cupRotating;
}

export function setRotation(value) {
  cupRotating = value;
}
