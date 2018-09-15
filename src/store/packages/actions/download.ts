const map = (callback) => (list) => list.map(callback);

const file = 'https://nixos.org/nixpkgs/packages.json.gz';

export const download = ({ commit }) => {
  commit('downloadStatus', true);

  return fetch(`https://cors-anywhere.herokuapp.com/${file}`)
    .then((response) => response.json())
    .then((response) => (commit('storeCommit', response.commit), response))
    .then(({ packages }) => Object.entries(packages))
    .then(map(([attribute, fields]) => ({ ...fields, attribute })))
    .then(map(Object.seal))
    .then((packages) => commit('storePackages', packages))
    .then(() => commit('downloadStatus', false))
    .then(() => console.info('Packages download done!'))
    .catch((error) => (commit('downloadStatus', false), Promise.reject(error)));
};
