module.exports = {
  //   '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
  '*.{js,jsx,ts,tsx}': ['prettier --write'],
  '*.{ts,tsx}': () => 'tsc --noEmit',
};
