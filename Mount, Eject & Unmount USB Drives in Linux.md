# Mount, Eject & Umount USB Drives in Linux

Umount
-----

First identify the device name of your USB drive by running the `lsblk` command, which will list all block devices attached/connected to your system.

→ `lsblk`

Look for your USB drive in the list which is usually labeled as `/dev/sdX` (e.g., `/dev/sda` `/dev/sdb` `/dev/sdc`). Unmount the USB drive by running the `umount` command.

→ `sudo umount /dev/sda`

Be sure the USB drive was successfully removed.

→ `lsblk`

Safely remove the USB drive from your computer.

→ `sudo eject /dev/sda`

Alternatively you can use `udisks2` tool to unmount and eject the USB drive.

```bash
sudo udisksctl umount -b /dev/sda
sudo udisksctl power-off -b /dev/sda
```


References
-----

1. [How to Eject a USB Drive](https://linuxvox.com/blog/linux-how-to-eject-usb-drive/)
2. [Eject Command Linux with Examples](https://www.geeksforgeeks.org/linux-unix/eject-command-in-linux-with-examples/)
