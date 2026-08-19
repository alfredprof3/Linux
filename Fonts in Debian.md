# Fonts in Debian

/usr/share/fonts
/usr/share/X11/fonts
/usr/local/share/fonts
$HOME/.local/share/fonts
$hOME/.fonts

Install the fonts
====

1. Download fonts from Nerd Fonts via curl:
`curl -L -O https://github.com/ryanoasis/nerd-fonts/releases/download/v3.5.0/AdwaitaMono.zip`

- To refer the download website see `https://www.nerdfonts.com/font-downloads`

2. Extract the font in `$HOME/.local/share/fonts` If the directory doesn't exist, create it:
`unzip AdwaitaMono.zip`

3. Refresh the font cache:
`fc-cache -f -v`

4. Verify the installation:
`fc-list | grep -i Adwaita`

5. Cleanup, the unpacked directory are no longer necessary:
`rm -rfv AdwaitaMono.zip`

Reconfigure Fonts
====

This may be needed to support bitmap fonts:
`dpkg-reconfigure fontconfig-config`

Or
`dpkg-reconfigure fontconfig`

Uninstall the fonts
====

1. Select the font you want to remove:
`fc-list | grep -i Adwaita`

2. Delete the entire `ttf` files:
`rm -rfv $HOME/.local/share/fonts/Adwaita-*.ttf`

Or
`rm -rfv $HOME/.local/share/fonts/Adwaita-*.otf`

3. Refresh the font cache:
`fc-cache -f -v`

Sources
====

1. https://jeffmcneill.com/debian-fonts/
2. https://medium.com/source-words/how-to-manually-install-update-and-uninstall-fonts-on-linux-a8d09a3853b0
3. https://www.riksoft.it/wikiriks/linux/remove-foreign-fonts-from-debian-ubuntu
