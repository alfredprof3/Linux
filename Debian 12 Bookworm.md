# Minimal installation in Debian 

 Clean installation with desktop environment
# sudo apt install gnome-session gnome-shell gnome-backgrounds gnome-applets gnome-control-center mutter gjs gnome-terminal

List manually installed packages. The command listed below show us the installed packages performed by the user.
# comm -23 <(apt-mark showmanual | sort u) <(gzip -dc /var/log/installer/initial-status.gz | sed -n 's/^Package: //p' | sort -u)

DISABLE - METHOD 1. Feedback password
# sudo mv /etc/sudoers.d/pwdfeedback /etc/sudoers.d/pwdfeedback.disabled

DISABLE - METHOD 2. Feedback password

1. Open the editor.
# sudo visudo
or
# visudo

2. Search the line containing `pwdfeedback` and delete it.

- Option 1
# Defaults   env_reset~~,pwfeedback~~

- Option 2
# Defaults   env_reset
# ~~Defaults   pwfeedback~~

3. Save the file.

ENABLE. Feedback password

1. Open the editor.
# sudo visudo
or
# visudo

2. Find the line.
# Defaults   env_reset

3. Add the `pwdfeedback`

- Option 1
# Defaults   env_reset,pwfeedback

- Option 2
# Defaults   env_reset
# Defaults   pwfeedback

Change default web browser
# xdg-settings set default-web-browser microsoft-edge.desktop

---

# Window Manager vs. Minimal Desktop

Since your goal is a minimal, clean, and lightweight interface, you have two great paths:

## Option A: Tiling Window Manager (DWM / i3-wm)

- Pros: Consumes less than 150 MB of RAM; completely controlled by keyboard shortcuts; maximizes screen space.
- Cons: `dwm` requires compiling from source code in C to change configurations (like fonts or colors).
- Alternative: If you want a tiling manager that is easier to configure via a simple text file, i3-wm is highly recommended for beginners over `dwm`.

## Option B: Minimal Desktop Environment (XFCE or LXQt)

- Pros: Ready out-of-the-box; handles system trays, Wi-Fi menus, and display scaling automatically; consumes only 400–500 MB of RAM.
- Recommendation: If you decide a tiling manager is too tedious for a daily driver, choose XFCE but uncheck all extra bundled software during installation.

## Step-by-Step Debian Partitioning Layout

When running the Debian installer, choose Manual Partitioning. For a 500 GB NVMe drive optimized for KVM virtual machines, use this layout:

|Partition Name|Size|File System Type|Mount Point|Purpose|
|---|---|---|---|---|
|EFI Boot|1 GB|FAT32|`/boot/efi`|Standard system boot files|
|Root (System)|80 GB|ext4|`/`|Debian OS, Docker, and system configs|
|Swap|8 GB|`swap`|None|The memory overflow safety net|
|Home & VMs|~411 GB|ext4|`/home`|Your personal files and KVM virtual disk storage|

_Note: By default, KVM stores virtual machines in `/var/lib/libvirt/images`. Because we put most of our space into `/home`, you will just need to tell `virt-manager` to store your VM files in a folder inside your `/home/username/` directory instead._

## How to Achieve the Ultra-Minimal Installation

To get that completely clean, bloat-free system, follow these steps during the Debian installation wizard:

1. Proceed through the installer until you reach the Software Selection screen (where it asks what to install).
2. Uncheck "Debian desktop environment" and uncheck "GNOME" (or any other desktop listed).
3. Check only "SSH server" (for remote access) and "Standard system utilities".
4. Finish the installation and reboot. You will be greeted by a purely black text console.

## Installing your Tiling Interface

Log into your black text screen and run these commands to install a minimal graphical system with the i3 tiling window manager (as a friendlier alternative to DWM), your virtualization tools, and light components:

```bash
# Update system repositories
sudo apt update

# Install the core graphical engine, window manager, and terminal
sudo apt install xorg i3-wm alacritty lightdm

# Install your virtualization tools
sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients virt-manager

# Enable the login screen
sudo systemctl enable lightdm
sudo reboot
```

Upon reboot, you will have a beautiful, lightning-fast login screen that boots into a completely clean, keyboard-driven environment using less than 1% of your total RAM.
