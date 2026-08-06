# Git Credential Manager GCM - How to configure
# 1. Download `git-credential-manager` from the official Github repository
Go to the [Git Credential Manager Github Repository](https://github.com/git-ecosystem/git-credential-manager/releases/download/v2.9.1/gcm-linux-x64-2.9.1.deb) and download the `.deb` file for Debian Linux distribution.

You can use `curl` to download via the command line.
```bash
curl -L -O https://github.com/git-ecosystem/git-credential-manager/releases/download/v2.9.1/gcm-linux-x64-2.9.1.deb
```

Or use `wget` instead.
```bash
wget https://github.com/git-ecosystem/git-credential-manager/releases/download/v2.9.1/gcm-linux-x64-2.9.1.deb
```

# 2. Configure the Git Credential Manager (GCM)
The GCM needs to know exactly where to securely store your passwords on your system (usually Linux). You can use a graphical interface using `secretservice` and the GNOME Keyring or KWallet or using only the command line (without GUI).

## Option 1. Using `secretservice` and GNOME Keyring.
1. Install the keychain to store the Github PAT
```bash
sudo apt install gnome-keyring
```

2. Configure the GCM for global use.
```bash
git config --global credential.credentialStore secretservice
```
    - IMPORTANT: If you don't have installed `secretservice` install it by typing `sudo apt install libsecret-1-0`

3. Apply the changes.
```bash
git-credential-manager configure
```

## Option 2. Using `gpg` and `pass` (No GUI).
1. Install `pass` and `gnupg2` in your system.
```
sudo apt install pass gnupg2
```

2. Generate your keys with `gnupg2`
```bash
gpg --full-generate-key
```

A prompt should appears asking to select what kind of key you want. Follow the instructions.

- Key type: Choose 1 for RSA and RSA.
- Key size: Type 4096 (for strong security).
- Key expiration: Set it as you prefer (0 means it never expires).
- Name and email: Provide your name and email (this can be any identity).
    Can use your Git identity (git config user.name, git config user.email).
- Passphrase: Set a secure passphrase to protect the key.

Alternatively you can use the ECC keys for better security, smaller key sizes, and faster performance.
```bash
gpg --expert --full-generate-key
```

Follow the interactive prompts:

- Select (9) ECC and ECC for key types.
- Choose (1) Curve25519 for encryption and Ed25519 for signing (it may be the default).
- Enter a key expiration (e.g., 2y for 2 years, or 0 for no expiration).
- Provide your user ID: real name, email, and optional comment.
- Enter a strong passphrase to secure your private key.

3. List your private keys.
```bash
gpg --list-secret-keys --keyid-format=long
```

Or only list the secret key
```bash
gpg --list-secret-keys
```

If you choose the ECC key format, look for your key ID user info, and ECC indicators (e.g., ed25519 or cv25519).

4. Initialize the password vault using `pass`
```bash
pass init KEY-ID
```

5. Apply the changes
```bash
git-credential-manager configure
```

# How to change from `pass` and `gpg` to `secretservice` and GNOME Keyring and viceversa.
If you want to change from one configuration to another, follow these simple steps.

## Option 1.
1. Change the configuration to `secretservice` and GNOME Keyring.
```bash
git config --global credential.credentialStore secretservice
```

2. Apply the changes to GCM.
```bash
git-credential-manager configure
```

3. Remove `pass` files.
```bash
rm -rfv ~/.password-store
```

## Option 2.
1. Change the configuration to `pass` and `gpg`.
```bash
git config --global credential.credentialStore gpg
```

2. Apply the changes to GCM.
```bash
git-credential-manager configure
```

IMPORTANT
If you are using `pass` and `gpg` you will need to update your PAT (Personal Access Token) every time it expires. To do so, follow these steps.
```bash
pass edit git/https/github.com/GITHUB_ACCOUNT
```

Finally you can ask Git directly to delete a specific user's record.
```bash
echo "url=https://github.com" | git credential-manager erase
```
