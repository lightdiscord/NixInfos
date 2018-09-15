export const storeCommit = (state, commit) => {
  state.commit = commit;
};

export const storePackages = (state, packages) => {
  state.packages = packages;
};

export const storeFilter = (state, filter) => {
  state.filter = filter;
};

export const downloadStatus = (state, status) => {
  state.downloading = status;
};
