# Tar - xz, gz, bz, zstd, tar

Create a Tar archive from files and directories such as `.zshrc` `.bashrc` `.profile/` `.config/`
`tar -cvf xuser-files.tar .zshrc .bashrc .profile/ .config/`

Or the long-form
`tar --create --verbose --file=xuser-files.tar .zshrc .bashrc .profile/ .config/`

Back up an entire specific folder
`tar -cvf backup.tar /home/xuser`

Create a Tar Gz archive
`tar -czvf xuser-files.tar.gz .zshrc .bashrc .profile/ .config/`

Create a Tar Bz2 archive
`tar -cjvf xuser-files.tar.bz2 .zshrc .bashrc .profile/ .config/`

Create a Tar Xz archive
`tar -cJvf xuser-files.tar.xz .zshrc .bashrc .profile/ .config/`

Create a Tar Zst archive
`tar --zstd -cvf xuser-files.tar.zst .zshrc .bashrc .profile/ .config/`
