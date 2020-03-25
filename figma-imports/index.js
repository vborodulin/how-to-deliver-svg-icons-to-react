require('dotenv').config();

const importIcons = require('./icons');

const main = async () => {
  await importIcons();
};

main().catch((err) => {
  console.error('Unhandled rejection', err)
});
