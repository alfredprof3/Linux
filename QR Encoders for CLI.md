# QR Codes for the Command Line

1. QR Encode
`sudo apt install qrencode`

2. QtQr
`sudo apt install qtqr`

3. qr-cli.dev
`npx github:asharahmed/qr-cli "https://example.com"`

`npm i -g github:asharahmed/qr-cli`

```bash
curl -fsSL -o qr-linux-universal.sh https://github.com/asharahmed/qr-cli/releases/latest/download/qr-linux-universal.sh
bash qr-linux-universal.sh
```

4. Zint (CLI + GUI)
`sudo apt install zint`
`sudo apt install zint-qt`

5. Python-qrcode (CLI + Scripting)
`pip install qrcode[pil]`


References
-----

1. [How to Create QR Codes from the Linux Command Line](https://www.howtogeek.com/devops/how-to-create-qr-codes-from-the-linux-command-line/)
2. [QR Generator on Linux: A Comprehensive Guide](https://linuxvox.com/blog/qr-generator-linux/)
3. [Generate QR Code Terminal](https://qr-cli.dev/) [GitHub Repository](https://github.com/asharahmed/qr-cli)
4. [List of QR Codes Generators on Linux](https://www.thelinuxvault.net/blog/list-of-qr-code-generators-on-linux/)
