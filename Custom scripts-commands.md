Create customs scripts to execute as commands keeping them in a custom directory

### Create the directory

1. Create a directory to store scripts and commands

```bash
mkdir Scripts
```

2. Open the `.bashrc` file

```bash
vim .bashrc
```

3. Add the following code

```bash
export PATH=$PATH":$HOME/Scripts"
```

3. Reload .bashrc

`$ source .bashrc`

---

### Creating scripts

1. Create the sh file

`$ vim Scripts/file.sh`

2. Write the script

```bash
#!/bin/bash
apt update
```

3. Give permissions

`$ chmod 755 file`

---

### Creating a soft link to execute as a normal command

`$ sudo ln -s /home/xuser/Scripts/file /usr/bin/file`
