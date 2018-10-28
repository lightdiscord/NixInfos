{ pkgs ? import <nixpkgs> { }, channel }:

with pkgs.lib;
with builtins;

let

  src = fetchTarball "https://github.com/nixos/nixpkgs-channels/archive/${channel}.tar.gz";
  inherit (import "${src}/nixos/release.nix" {}) options;

in pkgs.writeTextFile {
  name = "options-${channel}";

  text = readFile "${options}/share/doc/nixos/options.json";
}

