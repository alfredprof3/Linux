# Tar - xz, gz, bz, zstd, tar

Creating
====

- Create a Tar archive from files and directories such as `.zshrc` `.bashrc` `.profile/` `.config/`
`tar -cvf xuser-files.tar .zshrc .bashrc .profile/ .config/`

- Or the long-form
`tar --create --verbose --file=xuser-files.tar .zshrc .bashrc .profile/ .config/`

- Back up an entire specific folder
`tar -cvf backup.tar /home/xuser`

- Create a Tar Gz archive
`tar -czvf xuser-files.tar.gz .zshrc .bashrc .profile/ .config/`

- Create a Tar Bz2 archive
`tar -cjvf xuser-files.tar.bz2 .zshrc .bashrc .profile/ .config/`

- Create a Tar Xz archive
`tar -cJvf xuser-files.tar.xz .zshrc .bashrc .profile/ .config/`

- Create a Tar Zst archive
`tar --zstd -cvf xuser-files.tar.zst .zshrc .bashrc .profile/ .config/`

Extracting
====

- Exclude files and directories
`tar -cvf xuser-files.tar --exclude='.git' --exclude='*.log' --exclude='node_modules' .zshrc .bashrc .profile/ .config/`

- Extracting Tar archives
`tar -xvf xuser-files.tar`

- Extracting compressed archives
`tar -xvf xuser-files.tar.gz`
`tar -xvf xuser-files.tar.bz2`
`tar -xvf xuser-files.tar.xz`
`tar -xvf xuser-files.tar.zst`

- Extracting to a different directory
`tar -xvf xuser-files.tar -C /home/xuser/Downloads`

    Alternative
    `tar -xvf xuser-files.tar --directory=/home/xuser/Downloads`

Listing
====

- Listing Tar archives contents
`tar -tf xuser-files.tar`

- Listing Tar archives contents with more information
`tar -tvf xuser-files.tar`

- Listing files in compressed archives
`tar -tvf xuser-files.tar.gz`
`tar -tvf xuser-files.tar.bz2`
`tar -tvf xuser-files.tar.xz`
`tar -tvf xuser-files.tar.zst`

- Listing specific files
`tar -tvf xuser-files.tar.xz .profile`

- Listing only files in a specific directory
`tar -tf xuser-files.tar.xz '.config/'`
