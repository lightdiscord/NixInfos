export const matches = (state) => {
  return state.options.filter(state.filter);
};

export const slice = (state, getters) => (pointer) => {
  return getters.matches.slice(pointer * 15, (pointer + 1) * 15);
};

export const size = (state, getters) => ({
  total: state.options.length,
  matches: getters.matches.length,
});
