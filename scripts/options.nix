{ pkgs ? import <nixpkgs> { } }:

with pkgs.lib;
with builtins;

let

  # src = fetchTarball "https://github.com/nixos/nixpkgs-channels/archive/${channel}.tar.gz";

  inherit (import <channel/nixos/release.nix> {}) options;

in pkgs.writeTextFile {
  name = "options-${channel}";

  text = readFile "${options}/share/doc/nixos/options.json";
}

