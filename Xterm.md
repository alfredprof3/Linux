Is a Terminal emulator for the X window system.

# Install

`$ sudo apt install xterm`

# Customize

1. Create **.Xresources** file at home user

`$ vim $HOME/.Xresources`

2. Adding this lines:

- Option #1
```bash
! Font and font size
xterm*faceName: Hack
xterm*faceSize: 16

! Double click to select URLs
xterm*charClass: 33:48,36-47:48,58-59:48,61:48,63-64:48,95:48,126:48

! Colors
xterm*foreground: rgb:00/ff/00
xterm*background: rgb:00/00/00
```

- Option #2
```bash
XTerm.termName: xterm-256color

! Font and font size
!xterm*faceName: DejaVu Sans Mono
xterm*faceName: Hack
xterm*faceSize: 16

! Every shell is a login shell by default (for inclusion of all necessary environment variables)
xterm*loginshell: true

! I like a LOT of scrollback...
xterm*savelines: 100000

! Double-click to select whole URLs :D
xterm*charClass: 33:48,36-47:48,58-59:48,61:48,63-64:48,95:48,126:48

! DOS-box colours...
xterm*foreground: rgb:2e/c4/b6
xterm*background: rgb:1a/20/22
xterm*color0: rgb:00/00/00
xterm*color1: rgb:a8/00/00
xterm*color2: rgb:00/a8/00
xterm*color3: rgb:a8/54/00
xterm*color4: rgb:00/00/a8
xterm*color5: rgb:a8/00/a8
xterm*color6: rgb:00/a8/a8
xterm*color7: rgb:a8/a8/a8
xterm*color8: rgb:54/54/54
xterm*color9: rgb:fc/54/54
xterm*color10: rgb:54/fc/54
xterm*color11: rgb:fc/fc/54
xterm*color12: rgb:54/54/fc
xterm*color13: rgb:fc/54/fc
xterm*color14: rgb:54/fc/fc
xterm*color15: rgb:fc/fc/fc

! Stop output to terminal from jumping down to bottom of scroll again
xterm*scrollTtyOutput: true

! Keybindings
xterm*vt100.translations: #override \
    Ctrl Shift <Key>C: copy-selection(CLIPBOARD)\n\
    Ctrl Shift <Key>V: insert-selection(CLIPBOARD)

! Locale is set up for UTF-8
XTerm.vt100.locale: false
XTerm.vt100.utf: true

URxvt.font: xft:Input Mono:size=13:style=Regular, \
              xft:Font Awesome 6 Free:style=Solid,  \
              xft:Segoe UI Symbol:style=Regular,    \
              xft:Noto Emoji:style=Regular
```

3. Restart xinit or startx
