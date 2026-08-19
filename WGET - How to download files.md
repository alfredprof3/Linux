# WGET - How to download files

-> Download a file in $PWD:
`wget https://releases.ubuntu.com/noble/ubuntu-24.04.4-live-server-amd64.iso`

-> To save the downloaded file with a specific name, use the `-O` option:
`wget -O latest-hugo.zip https://github.com/gohugoio/hugo/archive/refs/heads/master.zip`

-> To save to a different location, use the -P option:
`wget -P /mnt/iso https://releases.ubuntu.com/noble/ubuntu-24.04.4-live-server-amd64.iso`

-> To download multiple files at once, create a text file with one URL per line and pass it to wget with the -i option:
```bash
https://ftp.gnu.org/gnu/wget/wget-1.25.0.tar.gz
https://ftp.gnu.org/gnu/hello/hello-2.12.2.tar.gz
https://ftp.gnu.org/gnu/make/make-4.4.1.tar.gz
```
Then:
`wget -i urls.txt`

References
====

1. https://linuxize.com/post/wget-command-examples/
2. https://www.hostinger.com/tutorials/wget-command-examples/
3. https://linuxcapable.com/wget-command-examples/
