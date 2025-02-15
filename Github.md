GitHub is a web-based platform that hosts Git repositories, providing developers with tools for version control and collaboration. It combines Git, a powerful version control system, with features that facilitate collaboration and project management. GitHub is designed for collaborative work, allowing multiple people to contribute to a project, review code, discuss issues, and merge changes efficiently.

# Usage

## Creating the repository

1. To create and store your files in Github, first you need to create a [Github account](https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home)
2. Once you have created your account and logged in, create a new repository from the "+▿" icon in the top-right side menu bar and choose "_New repository_".
3. Give a name, description and choose "_Public or Private_" option. Once you finished, click the "_Create repository_" green button.

## Uploading the files

If you have already initialize your local repository in your computer, you only need to upload your files into Github.

1. Rename the branch to `main`

```bash
git branch -M main
```

2. Connect your local repository to Github repository.

```bash
git remote add origin https://github.com/USER/REPOSITORY-NAME.git
```

> [!NOTE]
> Replace the `USER` to your real user name and `REPOSITORY-NAME` for your repository name created.

3. Upload (push) the files to Github.

```bash
git push -u origin main
```
