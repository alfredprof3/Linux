Sync vault to personal GitHub.

For first time you need some Git configurations before pushing the commits and changes made in the repository. Following the steps we need before setup your Git credentials, a basic configuration.

# Git setup

1. Setup your user name and email for your commits in Git.

	**Global**
	```sh
	git config --global user.name "username"
	git config --global user.email "user@email.com"
	```

	**Local**
	```sh
	git config --local user.name "username"
	git config --local user.email "user@email.com"
	```
	
	To user the `--local` method, you need to get inside the directory cloned.

2. Clone the repository wherever you want. File location doesn't matter.
	```sh
	git clone https://github.com/username/repo-name.git
	```

3. Go inside the directory and be sure you are working in the remote branch, type the next command.

	```sh
	git remote show origin
	# or
	git remote -v
	```

4. Setup the credential store with `credential.helper store` typing the command

	```sh
	git config --local credential.helper store
	# or
	git config --global credential.helper store
	```
	
	You can set locally or global, just replace the flag `--local` for `--global` if you want to set it up globally.

5. Make changes to the repository and manually push them with `git push` this will bring you up the advice for credentials. After that the user and token will be stored in `.git-credentials` file
