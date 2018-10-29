{ pkgs ? import <nixpkgs> { } }:

with pkgs.lib;
with builtins;

let

  # src = fetchTarball "https://github.com/nixos/nixpkgs-channels/archive/${channel}.tar.gz";
  override = fetchurl https://raw.githubusercontent.com/NixOS/nixos-homepage/master/discover-more-packages-config.nix;
  packages = import <channel> { config = import override; };

  details = package: let

    name = (tryEval package.name or "").value;
    description = (tryEval package.meta.description or "").value;

  in if (isBool name && !name) then null else {
    _type = "package";

    inherit name description;
  };

  recursing = value: isAttrs value
    && !(isDerivation value)
    && value ? recurseForDerivations
    && value.recurseForDerivations;

  transform = let

    process = value: if (recursing value) then (transform value)
      else if (isDerivation value) then (details value)
      else null;

  in mapAttrs (_: x: process (tryEval x).value);

  removeEmpty = filterAttrsRecursive (_: x: x != null);

  isPackage = value: value ? "_type"
    && value._type == "package";

  definePackages = mapAttrsRecursiveCond
    (value: !(isPackage value))
    (path: nameValuePair (concatStringsSep "." path));

  collectPackages = collect (x: x ? value && x ? name);

  flatten = packages: mapAttrs
    (_: filterAttrs (n: _: n != "_type"))
    (listToAttrs packages);

  chain = flatten (collectPackages (definePackages (removeEmpty (transform packages))));

  text = toJSON chain;

in pkgs.writeTextFile {
  name = "packages";

  inherit text;
}
