# Exporting Gnome Terminal Profile

1. First check the ID profiles with the below command. Example ID [:b1dcc9dd-5262-4d8d-a863-c897e6d979b9]

	`$ dconf dump /org/gnome/terminal/legacy/profiles:/

2. We can export the profile with this commands, include the ID. Name the `.dconf` file.

	**ID profile**
	```bash
	# Option 1
	dconf dump /org/gnome/terminal/legacy/profiles:/:b1dcc9dd-5262-4d8d-a863-c897e6d979b9/ > alfredxuser.dconf
	
	# Option 2
	
	```

	


3. The Gnome Terminal Profile is exported with the name `alfredxuser.dconf` 

## Example Zorin Gnome Terminal Profile

[/]
background-color='rgb(0,12,24)'
bold-color-same-as-fg=true
cursor-colors-set=false
cursor-foreground-color='rgb(78,10,10)'
font='Hack Nerd Font 16'
foreground-color='rgb(22,186,197)'
highlight-colors-set=false
palette=['rgb(0,0,0)', 'rgb(255,153,0)', 'rgb(95,191,249)', 'rgb(255,238,187)', 'rgb(242,128,208)', 'rgb(68,203,70)', 'rgb(0,205,205)', 'rgb(229,229,229)', 'rgb(127,127,127)', 'rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(255,255,0)', 'rgb(92,92,255)', 'rgb(255,0,255)', 'rgb(0,255,255)', 'rgb(255,255,255)']
use-system-font=false
use-theme-colors=false
visible-name='AlfredXuser'

## Example Debian Gnome Terminal Profile

[:b1dcc9dd-5262-4d8d-a863-c897e6d979b9]
background-color='rgb(0,12,24)'
font='Hack Nerd Font 16'
foreground-color='rgb(22,186,197)'
palette=['rgb(23,20,33)', 'rgb(255,153,0)', 'rgb(95,191,249)', 'rgb(255,238,187)', 'rgb(242,128,208)', 'rgb(68,203,70)', 'rgb(0,205,205)', 'rgb(229,229,229)', 'rgb(94,92,100)', 'rgb(246,97,81)', 'rgb(51,209,122)', 'rgb(233,173,12)', 'rgb(42,123,222)', 'rgb(192,97,203)', 'rgb(51,199,222)', 'rgb(255,255,255)']
use-system-font=false
use-theme-colors=false
visible-name='AlfredXuser'

# Importing Gnome Terminal Profile

1. To import the gnome terminal profile we can do it with 2 options
	`$ dconf reset -f /org/gnome/terminal/legacy/profiles:/