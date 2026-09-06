# Scrcpy - How to install and use

Display and control your Android device


Prerequisites
-----

1. The Android device requires at least API 21 (Android 5.0).
2. Audio forwarding is supported for API >= 30 (Android 11+).
3. Make sure you enabled USB debugging on your device(s).
4. On some devices (especially Xiaomi), you might get the following error:

```bash
Injecting input events requires the caller (or the source of the instrumentation, if any) to have the INJECT_EVENTS permission.
```

In that case, you need to enable an additional option `USB debugging (Security Settings)` (this is an item different from `USB debugging`) to control it using a keyboard and mouse. Rebooting the device is necessary once this option is set.


Linux Installation
-----

→ OPTION 1. From a official release

Download a static build of the latest release:

```bash
curl -L -O https://github.com/Genymobile/scrcpy/releases/download/v4.1/scrcpy-linux-x86_64-v4.1.tar.gz
```

```bash
wget https://github.com/Genymobile/scrcpy/releases/download/v4.1/scrcpy-linux-x86_64-v4.1.tar.gz
```

→ OPTION 2. From an install script

1. To install the latest release from master, follow this simplified process. First, you need to install the required packages:

```bash
sudo apt install ffmpeg libsdl3-0 libusb-1.0-0 adb wget \
                 gcc git pkg-config meson ninja-build libsdl3-dev \
                 libavcodec-dev libavdevice-dev libavformat-dev libavutil-dev \
                 libswresample-dev libusb-1.0-0-dev libv4l-dev
```

2. Then clone the repo and execute the installation script (source):

```bash
git clone https://github.com/Genymobile/scrcpy
cd scrcpy
./install_release.sh
```

When a new release is out, update the repo and reinstall:

```bash
git pull
./install_release.sh
```

To uninstall:

```bash
sudo ninja -Cbuild-auto uninstall
```


References

1. [scrcpy - GitHub repository](https://github.com/Genymobile/scrcpy)
