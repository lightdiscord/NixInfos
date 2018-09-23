# Assets

## Credits

* `icon.svg` - It comes from the [NixOS/nixos-artwork](https://github.com/NixOS/nixos-artwork/blob/master/logo/nix-snowflake.svg) repository, it's available under a [CC-BY license](https://creativecommons.org/licenses/by/4.0/). It was designed by Tim Cuthbertson (@timbertson).
* `favicon.ico` - Convertion of the `icon.svg` file into an ico format using the `svg-to-ico` command.
* `icon.png`, `favicon-16x16.png` and `favicon-32x32.png` - Convertion of the `icon.svg` file into an png format using the `svg-to-png` command.

## Commands

### svg-to-png

```console
$ inkscape -z -e $FILENAME.png -w $SIZE -h $SIZE icon.svg
```

### svg-to-ico

```console
$ convert -trim -background none icon.svg -define icon:auto-resize="48,32,16" favicon.ico
```
