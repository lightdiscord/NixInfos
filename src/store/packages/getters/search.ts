export const matches = (state) => {
  return state.packages.filter(state.filter);
};

export const slice = (state, getters) => (pointer) => {
  return getters.matches.slice(pointer * 15, (pointer + 1) * 15);
};

export const size = (state, getters) => ({
  total: state.packages.length,
  matches: getters.matches.length,
});
