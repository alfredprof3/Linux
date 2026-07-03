# Vimrc

" URL https://vim.wikia.com/wiki/Example_vimrc
" Authors https://vim.wikia.com/wiki/Vim_on_Libera_Chat
" Description A minimal, but feature rich, example .vimrc. If you are a
"              newbie, basing your first .vimrc on this file is a good choice.
"              If you're a more advanced user, building your own .vimrc based
"              on this file is still a good idea.

" ------------------------------------------
" Features {{{1
"
" These options and commands enable some very useful features in Vim, that
" no user should have to live without.

" Set 'nocompatible' to ward off unexpected things that your distro might
" have made, as well as sanely reset options when re-sourcing .vimrc
set nocompatible

" Attempt to determine the type of a file based on its name and possibly its
" contents. Use this to allow intelligent auto-indenting for each filetype,
" and for plugins that are filetype specific.
filetype plugin indent on

" Enable syntax highlighting
syntax on

" ------------------------------------------
" Must have options {{{1
"
" These are highly recommended options.

" Vim with default settings does not allow easy switching between multiple files
" in the same editor window. Users can use multiple split windows or multiple
" tab pages to edit multiple files, but it is still best to enable an option to
" allow easier switching between files.
"
" One such option is the 'hidden' option, which allows you to re-use the same
" window and switch from an unsaved buffer without saving it first. Also allows
" you to keep an undo history for multiple files when re-using the same window
" in this way. Note that using persistent undo also lets you undo in multiple
" files even in the same window, but is less efficient and is actually designed
" for keeping undo history after closing Vim entirely. Vim will complain if you
" try to quit without saving, and swap files will keep you safe if your computer
" crashes.
set hidden

" Note that not everyone likes working this way (with the hidden option).
" Alternatives include using tabs or split windows instead of re-using the same
" window as mentioned above, and/or either of the following options:
" set confirm
" set autowriteall

" Better command-line completion
set wildmenu

" Show partial commands in the last line of the screen
set showcmd

" Highlight searches (use <C-L> to temporarily turn off highlighting; see the
" mapping of <C-L> below)
set hlsearch

" Modelines have historically been a source of security vulnerabilities. As
" such, it may be a good idea to disable them and use the securemodelines
" script, <http://www.vim.org/scripts/script.php?script_id=1876>.
" set nomodeline


" ------------------------------------------
" Usability options {{{1
"
" These are options that users frequently set in their .vimrc. Some of them
" change Vim's behaviour in ways which deviate from the true Vi way, but
" which are considered to add usability. Which, if any, of these options to
" use is very much a personal preference, but they are harmless.

" Use case insensitive search, except when using capital letters
set ignorecase
set smartcase

" Allow backspacing over autoindent, line breaks and start of insert action
set backspace=indent,eol,start

" When opening a new line and no filetype-specific indenting is enabled, keep
" the same indent as the line you're currently on. Useful for READMEs, etc.
set autoindent

" Stop certain movements from always going to the first character of a line.
" While this behaviour deviates from that of Vi, it does what most users
" coming from other editors would expect.
set nostartofline

" Display the cursor position on the last line of the screen or in the status
" line of a window
set ruler

" Always display the status line, even if only one window is displayed
set laststatus=2

" Instead of failing a command because of unsaved changes, instead raise a
" dialogue asking if you wish to save changed files.
set confirm

" Use visual bell instead of beeping when doing something wrong
set visualbell

" And reset the terminal code for the visual bell. If visualbell is set, and
" this line is also included, vim will neither flash nor beep. If visualbell
" is unset, this does nothing.
set t_vb=

" Enable use of the mouse for all modes
set mouse=a

" Set the command window height to 2 lines, to avoid many cases of having to
" press <Enter> to continue
set cmdheight=2

" Display line numbers on the left
set number

" Quickly time out on keycodes, but never time out on mappings
set notimeout ttimeout ttimeoutlen=200

" Use <F11> to toggle between 'paste' and 'nopaste'
set pastetoggle=<F11>


" ------------------------------------------
" Indentation options {{{1
"
" Indentation settings according to personal preference.

" Indentation settings for using 4 spaces instead of tabs.
" Do not change 'tabstop' from its default value of 8 with this setup.
set shiftwidth=4
set softtabstop=4
set expandtab

" Indentation settings for using hard tabs for indent. Display tabs as
" four characters wide.
"set shiftwidth=4
"set tabstop=4


" ------------------------------------------
" Mappings {{{1
"
" Useful mappings

" Map Y to act like D and C, i.e. to yank until EOL, rather than act as yy,
" which is the default
map Y y$

" Map <C-L> (redraw screen) to also turn off search highlighting until the
" next search
nnoremap <C-L> :nohl<CR><C-L>

" ──────── alfredxuser config ──────────────

" Map leader key
let mapleader=','

" No swapfile
set noswapfile

" Avoid <Esc> key
inoremap <leader>q <Esc>

" Relative numbers
set relativenumber

" Good scrolling
set scrolloff=10

" Clipboard; Ctrl C in visual mode to copy for Linux/PC
"vnoremap <C-c> "+y

" ──────── Clipboard Settings ──────────────
if has('macunix')
" ──────── macOS ───────────────────────────
  set clipboard=unnamed

  " vnoremap <C-c> y:call system('pbcopy', @")<CR>
  vnoremap <C-c> :w !pbcopy<CR><CR>
  nnoremap <C-v> :read !pbpaste<CR>

elseif executable('termux-clipboard-set')
" ──────── Termus (Android) ────────────────
  vnoremap <C-c> :w !termux-clipboard-set<CR><CR>
  nnoremap <C-v> :read !termux-clipboard-get<CR>

elseif has('unix')
" ──────── Linux ───────────────────────────
  if executable('xclip')
    set clipboard=unnamedplus
    vnoremap <C-c> y:call system('xclip -selection clipboard', @")<CR>
    nnoremap <C-v> :read !xclip -selection clipboard -o<CR>
  elseif executable('xsel')
    set clipboard=unnamedplus
    vnoremap <C-c> y:call system('xsel --clipboard --input', @")<CR>
    nnoremap <C-v> :read !xsel --clipboard --output<CR>
  endif

elseif has('win32') || has('win64')
" ──────── Windows ─────────────────────────
  set clipboard=unnamed
  vnoremap <C-c> y:call system('clip', @")<CR>
  nnoremap <C-v> :read !powershell.exe -command Get-Clipboard<CR>

endif
" ──────── Clipboard Settings ──────────────

" Syntax complete
set omnifunc=syntaxcomplete#Complete

" Support 256 colors
set t_Co=256

" Better tab
vnoremap < <gv
vnoremap > >gv

" Add placeholder after close
inoremap <leader><leader> <Esc>/[)}"'\]>]<CR>:nohl<CR>a

" Term GUI colors
set termguicolors

" Encoding for display icons
set encoding=UTF-8
set termencoding=utf-8

" Disable automatic comment continuation on new lines
autocmd FileType * setlocal formatoptions-=c formatoptions-=r formatoptions-=o

" Use Tab and Shift-Tab to cycle through buffers
nnoremap <Tab> :bnext<CR>
nnoremap <S-Tab> :bprevious<CR>

" Close the current buffer but keep Vim open
nnoremap <Leader>d :bd<CR>

" GUI font (NordFont)
"set guifont=DejaVu\ Sans\ Mono\ 16

" ──────── Plugins ─────────────────────────
packloadall

" ──────── Airline Status Bar ──────────────
let g:airline_section_c = '🐶 %F 🐣'
let g:airline#extensions#tabline#enabled = 1
let g:airline_powerline_fonts = 1
if !exists('g:airline_symbols')
    let g:airline_symbols = {}
endif

" ──────── Unicode Symbols ─────────────────
let g:airline_left_sep = '»'
let g:airline_left_sep = '▶'
let g:airline_right_sep = '«'
let g:airline_right_sep = '◀'
let g:airline_symbols.linenr = '␊'
let g:airline_symbols.linenr = '␤'
let g:airline_symbols.linenr = '¶'
let g:airline_symbols.branch = '⎇'
let g:airline_symbols.paste = 'ρ'
let g:airline_symbols.paste = 'Þ'
let g:airline_symbols.paste = '∥'
let g:airline_symbols.whitespace = 'Ξ'

" ──────── Airline Symbols ─────────────────
let g:airline_left_sep = ''
let g:airline_left_alt_sep = ''
let g:airline_right_sep = ''
let g:airline_right_alt_sep = '|'
let g:airline_symbols.branch = '󰘬'
let g:airline_symbols.readonly = ''
let g:airline_symbols.linenr = ''
let g:WebDevIconsUnicodeDecorateFolderNodes = 1
let g:WebDevIconsUnicodeDecorateFolderNodeDefaultSymbol = ''
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols = {}
let g:WebDevIconsUnicodeDecorateFileNodesExtensionSymbols['nerdtree'] = ''

" ──────── NERDTree ────────────────────────
nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <leader>n :NERDTree<CR>
nnoremap <leader>n :NERDTreeToggle<CR>
nnoremap <C-f> :NERDTreeFind<CR>

" ──────── NERDCommenter ───────────────────
" Create default mappings
let g:NERDCreateDefaultMappings = 1

" Add spaces after comment delimiters by default
let g:NERDSpaceDelims = 1

" Use compact syntax for prettified multi-line comments
let g:NERDCompactSexyComs = 1

" Align line-wise comment delimiters flush left instead of following code indentation
let g:NERDDefaultAlign = 'left'

" Set a language to use its alternate delimiters by default
let g:NERDAltDelims_java = 1

" Add your own custom formats or override the defaults
let g:NERDCustomDelimiters = { 'c': { 'left': '/**','right': '*/' } }

" Allow commenting and inverting empty lines (useful when commenting a region)
let g:NERDCommentEmptyLines = 1

" Enable trimming of trailing whitespace when uncommenting
let g:NERDTrimTrailingWhitespace = 1

" Enable NERDCommenterToggle to check all selected lines is commented or not
let g:NERDToggleCheckAllLines = 1

" ──────── Emmet ───────────────────────────
imap <expr> <leader><tab> emmet#expandAbbrIntelligent("\<tab>")

" ──────── CSS Complete ────────────────────
autocmd FileType css setlocal omnifunc=csscomplete#CompleteCSS noci

" ──────── Section Header Formatter ────────
function! FormatSectionHeader()
  let l:total_width = 44

  " ── Detect comment character by filetype ──────────────
  let l:comment_map = {
    \ 'vim':        '"',
    \ 'toml':       '#',
    \ 'python':     '#',
    \ 'bash':       '#',
    \ 'sh':         '#',
    \ 'zsh':        '#',
    \ 'ruby':       '#',
    \ 'perl':       '#',
    \ 'yaml':       '#',
    \ 'dockerfile': '#',
    \ 'make':       '#',
    \ 'r':          '#',
    \ 'lua':        '--',
    \ 'sql':        '--',
    \ 'haskell':    '--',
    \ 'javascript': '//',
    \ 'typescript': '//',
    \ 'java':       '//',
    \ 'c':          '//',
    \ 'cpp':        '//',
    \ 'css':        '//',
    \ 'go':         '//',
    \ 'rust':       '//',
    \ 'kotlin':     '//',
    \ 'swift':      '//',
    \ }

  " Fallback to # if filetype not in map
  let l:ft      = &filetype
  let l:comment = get(l:comment_map, l:ft, '#')

  " ── Build prefix ───────────────────────────────────────
  let l:prefix  = l:comment . ' ──────── '
  let l:line    = getline('.')

  " ── Strip ONLY the actual comment char + dashes ─────────
  let l:esc_comment = escape(l:comment, '/\.*$^~[]')
  let l:title = substitute(l:line, '^\s*' . l:esc_comment . '\s*─*\s*', '', '')
  let l:title = substitute(l:title, '\s*─*\s*$', '', '')

  " ── Calculate and build the new header line ────────────
  let l:middle     = l:prefix . l:title . ' '
  let l:suffix_len = l:total_width - strdisplaywidth(l:middle)
  let l:suffix_len = l:suffix_len < 0 ? 0 : l:suffix_len
  let l:new_line   = l:middle . repeat('─', l:suffix_len)

  call setline('.', l:new_line)
endfunction

nnoremap <Leader>h :call FormatSectionHeader()<CR>

" ──────── Colorscheme ─────────────────────
set background=dark
" colorscheme papilio_dehaanii
colorscheme nightfly
" colorscheme omni
