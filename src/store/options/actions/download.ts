const file = 'https://nixos.org/nixos/options.json.gz';

const map = (callback) => (list) => list.map(callback);

export const download = ({ commit }) => {
  const store = (options) => commit('storeOptions', options);
  const downloading = (status) => commit('downloadStatus', status);

  downloading(true);

  return fetch(`https://cors-anywhere.herokuapp.com/${file}`)
    .then((response) => response.json())
    .then(Object.entries)
    .then(map(([name, fields]) => ({ ...fields, name })))
    .then(map(Object.seal))
    .then(store)
    .then(() => downloading(false))
    .then(() => console.info('Options download done!'))
    .catch((error) => (downloading(false), Promise.reject(error)));
};
