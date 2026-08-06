# Second Github account using SSH

# Generate a new SSH key for the second user
1. Run the command to generate the key, replacing the email address with the one for your second account.
```bash
ssh-keygen -t ed25519 -C "second_github@account.com"
```

Important! When prompted to enter the file in which to save the key, do not press Enter. Enter a different path and filename so you don't overwrite your current key.
- Type your current path `/home/$USER/.ssh/id_ed25519_github_2`

2. Copy the contents of the new public key
```bash
cat /home/$USER/.ssh/id_ed25519_github_2
```

3. Go to GitHub using your second account.
4. Go to Settings > SSH and GPG keys > New SSH key.
5. Paste the content and give it a name (e.g., "Work Laptop").

6. Create the SSH configuration file. You must tell SSH when to use each key by using aliases.
```bash
nano ~/.ssh/config
```

7. Add the following structure (replace id_ed25519 with the actual names of your files if they change)
```bash
# Cuenta Principal (Personal)
Host github-alfredprof3
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519

# Segunda Cuenta (Trabajo / Secundaria)
Host github-alfredxuser
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github_user2
```

8. Clone and use repositories with the second account. From now the way you clone repositories will determine which account is used

- For your main account.
```bash
git clone git@github-alfredprof3:alfredprof3/repositorio.git
```

- For your second account.
```bash
git clone git@github-alfredxuser:alfredxuser/repositorio.git
```

9. Set the Correct Author for Each Repository. Even if SSH uses the correct key, Git will still sign your commits with your machine's global user. To ensure the correct author appears for your second account, navigate to the folder containing that cloned repository and run:
```bash
git config user.name "Your user name"
git config user.email "second_github@account.com"
```
