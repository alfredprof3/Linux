Collection of tools used to audit WiFi networks

---

#### Install
```bash
# apt install autoconf \
automake \
libtool \
shtool \
openssl \
ethtool \
usbutils \
pciutils \
libcrypt-gcrypt-perl \
libcrypto++-dev \
libcrypto++-utils \
libgcrypt20-dev \
libgcrypt20 \
libsqlcipher-dev \
libsqlcipher0 \
libssl-dev \
pkg-config \
rfkill \
zlib1g-dev \
libpcap-dev \
libsqlite3-dev \
libpcre3-dev \
libhwloc-dev \
libcmocka-dev \
hostapd \
wpasupplicant \
tcpdump \
screen \
iw \
libnl-3-dev \
libnl-genl-3-dev \
libpcap-dev \
libpcre++-dev \
libpcre++0v5 \
libpcre16-3 \
libpcre2-32-0 \
libpcre2-16-0 \
libpcre2-dev \
libpcre3 \
libpcre3-dev \
libpcre32-3 \
pcre2-utils \
pcredz \
pcregrep \
sqlite3-pcre \
sqlite3 \
sqlite \
ruby-sqlite3 \
libqt4-sql-sqlite \
libqt5sql5-sqlite \
libsqlcipher0 \
libsqlcipher-dev \
libsqlclient-dev \
libsqlclient1.8 \
libsqlite0 \
libsqlite0-dev \
libsqlite3-0 \
libsqlite3-dev \
libvsqlitepp-dev \
libvsqlitepp3v5 \
node-sqlite3 \
```

1. Download

`# wget https://download.aircrack-ng.org/aircrack-ng-1.7.tar.gz`

2. Tar

`# tar -zxvf aircrack-ng-1.7.tar.gz`

3. Directory

`# cd aircrack-ng-1.7`

4. Autoreconf

`# autoreconf -i`

5. Configure

`# ./configure --with-experimental`

6. Compile

`# make -j4`

7. Install

`# make install`

8.  Create links commands

`ldconfig`