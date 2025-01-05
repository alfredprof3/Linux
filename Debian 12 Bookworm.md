# Installing a clean and simply desktop environment

`$ sudo apt install gnome-session gnome-shell gnome-backgrounds gnome-applets gnome-control-center mutter gjs gnome-terminal` 

This will perform a very lightweight desktop system and environment.

# Gnome Terminal

Terminal emulator for Gnome desktop environment. Terminal customization colors and fonts placed in `.dconf` ![[Dconf file Gnome Terminal]]

# List manually installed packages

The command listed below show us the installed packages performed by the user.

`$ comm -23 <(apt-mark showmanual | sort -u) <(gzip -dc /var/log/installer/initial-status.gz | sed -n 's/^Package: //p' | sort -u)`

