export const storeOptions = (state, options) => {
  state.options = options;
};

export const downloadStatus = (state, status) => {
  state.downloading = status;
};

export const storeFilter = (state, filter) => {
  state.filter = filter;
};
