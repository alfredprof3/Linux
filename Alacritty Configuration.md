# Alacritty Config

```toml
# Alacritty Configuration @ MacBook Air M4.

# The configuration applies and fits perfect on a macOS system,
# some features are pre-configured to work in a macOS environment.
# by AlfredXuser 2026

# Alacritty use TOML syntax.

# Place this configuration in the following path:
# $HOME/.config/alacritty/alacritty.toml

# 1. If you want to see your changes in real-time, set this property to true.
general.live_config_reload = true

# 2. Import modules such as themes, keybindings, etc
general.import = [
    "~/.config/alacritty/themes/cyberpunk-neon.toml"
]

[env]
TERM = "xterm-256color"

[window]

# Blur feature works great if opacity is < 1.0 For example, set the opacity to 0.70 and then enable the blur you will see the effect.

# blur = true


# Modify the window decoration, you can see
# changes at the top of the window, options are:

# decorations = "Full" | "None" | "Transparent" | "Buttonless"

# Full: Borders and title bar.
# None: Neither borders nor title bar.
# Transparent (macOS only): Title bar, transparent background and title bar buttons.
# Buttonless (macOS only): Title bar, transparent background and no title bar buttons.

decorations = "Buttonless"


# Number of columns and lines in the terminal.
# 87 for columns and 52 lines.

dimensions = { columns = 87, lines = 52 }


# Add an extra padding to the padding.

dynamic_padding = true


# Allow terminal applications to change Alacritty's window title.

dynamic_title = true


# Set the background opacity of Alacritty's terminal.

opacity = 0.75


# Change the initial behave of the window terminal.

# startup_mode = "Windowed" | "Maximized" | "Fullscreen" | "SimpleFullscreen"

# Windowed: Regular window.
# Maximized: The window will be maximized on startup.
# Fullscreen: The window will be fullscreened on startup.
# SimpleFullscreen (macOS only): Same as Fullscreen, but you can stack windows on top.

startup_mode = "SimpleFullscreen"


[window.padding]

# Set the padding for the window.

x = 21
y = 18


[window.position]

# Set the window startup position.

x = 0
y = 0


[font]

# Choose your favorite font to display in the terminal. Most used fonts are:

# FiraCode | JetBrains | Inconsolata | AdwaitaMono | DejaVu
# Hack | Noto | Roboto | Ubuntu

# Download your favorite at Nerd fonts https://www.nerdfonts.com

normal = { family = "FiraCode Nerd Font Mono", style = "Regular" }
bold = { family = "FiraCode Nerd Font Mono", style = "Bold" }
italic = { family = "FiraCode Nerd Font Mono", style = "Light" }

# Specify the font-size.

size = 16.0


[font.offset]

# Is the extra spaced around each character. Use the a value in x to modify
# the letter spacing. Use the value in y to modify the line spacing.

x = 0
y = 1


[scrolling]

# Maximum number of lines in the scrollback buffer.

history = 10000
multiplier = 5


[selection]

# Set a true value to copy the selected text to the primary clipboard.

save_to_clipboard = true


[cursor.style]

# You can set the cursor in different modes as follows:

# shape = "Block" | "Underline" | "Beam"

shape = "Block"

# blinking = "Never" | "Off" | "On" | "Always"

# Never: Prevent the cursor from ever blinking
# Off: Disable blinking by default
# On: Enable blinking by default
# Always: Force the cursor to always blink

blinking = "Always"
```
