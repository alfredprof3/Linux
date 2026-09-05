# Neovim

Install
-----

`sudo apt install neovim`


Usage
-----

`nvim`

Creating a new file with Vim

```bash
vim newFile.txt
```

Open an existing file

```bash
vim file.txt
```

Open a file in Normal Mode:

```vim
:open Scripts/text.sh
```

# Keyboard

Split screen vertical:
`<C-w>v`

Split screen at bottom
`<C-w>s`

Move to the left window:
`<C-w>l`

Move to the right window:
`<C-w>h`

Move up window:
`<C-w>k`

Move down window:
`<C-w>j`

Increase windows size
`<C-w> >`

Reduce windows size
`<C-w> <`

Increase height
`<C-w> +`

Reduce height
`<C-w> -`

Reset the width and height of windows:
`<C-w> =`

# Vim Plugins
- [auto pairs](https://github.com/jiangmiao/auto-pairs)
- [vim-closetag](https://github.com/alvan/vim-closetag)
- [vim Completes Me](https://github.com/vim-scripts/VimCompletesMe)
- [css complete](https://github.com/othree/csscomplete.vim)
- [emmet](https://github.com/mattn/emmet-vim)
- [nerdcommenter](https://github.com/preservim/nerdcommenter)
- [nerdtree](https://github.com/preservim/nerdtree)
- [vim airline](https://github.com/vim-airline/vim-airline)
- [vim devicons](https://github.com/ryanoasis/vim-devicons)
- [vim surround](https://github.com/tpope/vim-surround) or [vim sandwich](https://github.com/machakann/vim-sandwich)
- [vim visual multi](https://github.com/mg979/vim-visual-multi)
- [vim snippets](https://github.com/honza/vim-snippets) or [UltiSnips](https://github.com/sirver/ultisnips)
- [html5](https://github.com/othree/html5.vim)
- [vim-airline-clock](https://github.com/enricobacis/vim-airline-clock.git)

# Vim Colorschemes
- [Papilio Dehaanii](https://github.com/keiyakeiya/PapilioDehaanii.vim)
- [Nightfly](https://github.com/bluz71/vim-nightfly-colors)
- [Omni](https://github.com/yonlu/omni.vim)

# Update Vim plugins

METHOD 1. With one single command

```bash
find ~/.vim/pack/plug-ins/start/ -maxdepth 1 -mindepth 1 -type d -exec git -C {} pull \;
```

METHOD 2. A for loop bash script

```bash
for dir in ~/.vim/pack/plug-ins/start/*/; do
  echo "Updating $(basename $dir)..."
  git -C "$dir" pull
done
```
# Download plugins script

```bash
#!/bin/bash

echo "Type the Github URL"
read github

echo "Type the folder name"
read dirName

git clone --depth=1 $github ~/.vim/pack/plug-ins/start/$dirName/
```

Reference
-----

1. [Vim learning - Learn Vim in your browser](https://ridhsuki.github.io/vim-learning/#modes-intro)
