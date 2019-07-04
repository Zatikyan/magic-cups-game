import Cup from '../components/cup/cup';
const config = require('../config/config');

export default function renderCups() {
  return config.cups.map(cup => {
    return new Cup(cup);
  })
}