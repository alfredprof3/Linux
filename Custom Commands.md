# How to create customs commands

And execute as commands keeping them in a custom directory

Define the folder or directory where the scripts commands are going to alocate.

1. Create a directory to store scripts and commands

```bash
mkdir Scripts
```

2. Open the `.bashrc` file

vim .bashrc

3. Add the following code

- macOS (.zshrc)

```bash
export PATH="$HOME/Public/scripts:$PATH"
```
- Linux (.bashrc)

```bash
export PATH=$PATH":$HOME/Scripts"
```

4. Reload the configuration

- macOS (.zshrc)

```bash
source ~/.zshrc
```
- Linux (.bashrc)

```bash
source ~/.bashrc
```

Create the file with you preferred editor and save it with a custom file name.

1. Create the sh file

vim Scripts/file.sh

2. Write the script and save it

#!/bin/bash
apt update

3. Give permissions

chmod 755 file

## Creating a soft link
This will give us the posibility to execute as a normal command.

sudo ln -s /home/$USER/Scripts/file /usr/bin/file
