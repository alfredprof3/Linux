# Installing a clean and simply desktop environment

`$ sudo apt install gnome-session gnome-shell gnome-backgrounds gnome-applets gnome-control-center mutter gjs gnome-terminal` 

This will perform a very lightweight desktop system and environment.

# Gnome Terminal

Terminal emulator for Gnome desktop environment. Terminal customization colors and fonts placed in `.dconf` ![[Dconf file Gnome Terminal]]

# List manually installed packages

The command listed below show us the installed packages performed by the user.

`$ comm -23 <(apt-mark showmanual | sort -u) <(gzip -dc /var/log/installer/initial-status.gz | sed -n 's/^Package: //p' | sort -u)`

# Enable / Disable feedback password from terminal

## Enable feedback

### Option 1

To enable the feedback password and see the asterisk when typing your root or sudo passkey, you need to make a few changes.

1. Type the following command. It will depends it which user you're in
	
	**Normal User**
	```bash
	$ sudo visudo
	```

	**Root User**
	```bash
	# visudo
	```

2. Add `pwfeedback` at line 9. It should look like this your `sudoers` file.

	**Option 1**
	```bash
	Defaults   env_reset,pwfeedback
	```

	**Option 2**
	```bash
	Defaults   env_reset
	Defaults   pwfeedback
	```

3. Save the file and now you can type, you will see an asterisks while typing your password.

### Additional 

You can create a file called `pwfeedback` and write `Defaults   pwfeedback` inside.

## Disable feedback password from terminal

To disable the feedback just erase the `pwdfeedback` file located in `/etc/sudoers.d/pwfeedback` or change the name. 

Also you can comment the line wrote in the `sudoers` file.