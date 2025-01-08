# Installation plugins

This is a manual installation plugins for Vim 8 +

## 1. Update .vimrc

First add `packloadall` to the `.vimrc` file

## 2. Create the plugins directory

Create the next path directory `~/.vim/pack/plug-ins/start/` 

```bash
mkdir -p ~/.vim/pack/plug-ins/start/
```

## 3. Clone a plugin (any plugin)

Clone the plugin repo  into the start folder

```bash
git clone --depth=1 https://github.com/ryanoasis/vim-devicons.git ~/.vim/pack/plug-ins/start/devicons/
```

# Update plugins

```bash
ls ~/.vim/pack/plug-ins/start/ | xargs -I{} git pull {}
```

# My Vim Plugins

auto pairs
close-tag
css complete
emmet
nerdcommenter
nerdtree
vim airline
vim devicons
vim surround or vim sandwich
vim visual multi
[[Abyss Color Theme]]