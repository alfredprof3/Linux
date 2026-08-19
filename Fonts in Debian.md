# Fonts in Debian

/usr/share/fonts
/usr/share/X11/fonts
/usr/local/share/fonts
$HOME/.local/share/fonts
$hOME/.fonts

- Download fonts from Nerd Fonts via curl
`curl -L -O https://github.com/ryanoasis/nerd-fonts/releases/download/v3.5.0/AdwaitaMono.zip`

To refer the download website see `https://www.nerdfonts.com/font-downloads`

- Extract the font in `$HOME/.local/share/fonts` If the directory doesn't exist, create it.
`unzip AdwaitaMono.zip`

- Refresh the font cache
`fc-cache -f -v`

- Verify the installation
`fc-list | grep -i Adwaita`

- Cleanup, the archive file and unpacked directory are no longer necessary
`rm -rfv AdwaitaMono.zip`
