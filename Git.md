Free and open source version control system designed to handle everything from small to very large projects with speed and efficiency.
# Install
Installing being normal user or root.

```bash
# Normal user
sudo apt install git
```

```bash
# Root user
apt install git
```
# Usage
To start using Git, go inside the directory or folder and perform the command below.

```bash
git init
```
# Git ignore
Sometimes we don't need to track specific files and folders, that's where `.gitignore` appears. This files ignore tracking files to the version history, allows us to avoid conflicts in some files.
## Ignore files and directories
1. Create the `.gitignore` file.

```bash
vim .gitignore
```

2. Ignore just typing the name.

```bash
Aircrack-ng.md
```

>[!info] Remember
>The `Aircrack-ng.md` file, won't be tracked.

3. Save the `.gitignore` file and commit the changes.
## Ignore files and directories including exceptions
We can ignore a bunch of files but making some exceptions. You can perform this actions with a few lines.

1. Open the `.gitignore` file.

```bash
vim .gitignore
```

2. Ignore all files except specific ones.

```bash
# Ignore all the files
*

# Except
!Catpuccin.md
```

3. Save and commit the changes.
# More about ignoring files
```embed
title: "How to Ignore Everything Except Some Files in Git"
image: "https://www.delftstack.com/img/Git/ag-feature-image---git-ignore-everything-except.webp"
description: "You can Git ignore everything except a few files."
url: "https://www.delftstack.com/howto/git/git-ignore-everything-except/"
```
```embed
title: "Make .gitignore ignore everything except a few files"
image: "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded"
description: "I understand that a .gitignore file cloaks specified files from Git’s version control. How do I tell .gitignore to ignore everything except the files I’m tracking with Git? Something like: # Ignore"
url: "https://stackoverflow.com/questions/987142/make-gitignore-ignore-everything-except-a-few-files"
```
# Git links for cheat sheet
```embed
title: "Git Cheat Sheet – 50 Git Commands You Should Know"
image: "https://www.freecodecamp.org/news/content/images/2021/02/git-cheat-sheet-cover.jpg"
description: "By Fabio Pacific Git is a distributed version control system that helps developers collaborate on projects of any scale. Linus Torvalds, the developer of the Linux kernel, created Git in 2005 to help control the Linux kernel’s development. What is…"
url: "https://www.freecodecamp.org/news/git-cheat-sheet/"
```
```embed
title: "How to Fix Git ‘remote: Repository not found’ Error? - GeeksforGeeks"
image: "https://media.geeksforgeeks.org/wp-content/uploads/20240602022405/dfhgh.jpg"
description: "A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and programming articles, quizzes and practice/competitive programming/company interview Questions."
url: "https://www.geeksforgeeks.org/how-to-fix-git-remote-repository-not-found-error/"
```
