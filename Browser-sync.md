A command line tool use for web development. Refresh your browser after save it.

# Install

`$ npm install -g browser-sync`

# Usage

Start a server with on a specify directory, port, browser and watch files changes.

`$ browser-sync start --server /home/xuser/Web --watch /home/xuser/Web/* --browser firefox --port 3000`

Run a simple local server (use your cwd as the web root)

`$ browser-sync start --server`