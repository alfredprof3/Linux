# Syncline - notes & tasks

Build Installer
-----

```bash
#!/usr/bin/env bash
# build_installer.sh - Generates a standalone install.sh

set -ex

if [ ! -f "syncline.sh" ]; then
    echo "✗ ERROR: syncline.sh not found in the current directory."
    echo "  You must have syncline.sh in the same folder as this script."
    exit 1
fi

cat << 'HEADER' > install.sh
#!/usr/bin/env bash
set -e

echo "Installing syncline..."

# Determine installation directory
if [ "$(uname)" = "Darwin" ]; then
    INSTALL_DIR="/usr/local/bin"
    if [ ! -w "$INSTALL_DIR" ]; then
        echo "macOS detected. Installing to $INSTALL_DIR requires sudo."
        sudo mkdir -p "$INSTALL_DIR"
        SUDO="sudo"
    else
        SUDO=""
    fi
else
    INSTALL_DIR="${HOME}/.local/bin"
    mkdir -p "$INSTALL_DIR"
    SUDO=""
fi

# Extract the payload
echo "Extracting syncline payload..."
PAYLOAD_LINE=$(awk '/^__PAYLOAD_BELOW__/ {print NR + 1; exit 0; }' "$0")
tail -n +$PAYLOAD_LINE "$0" | base64 -d > /tmp/syncline.sh

$SUDO cp /tmp/syncline.sh "$INSTALL_DIR/syncline"
$SUDO chmod +x "$INSTALL_DIR/syncline"
rm -f /tmp/syncline.sh

echo "✓ syncline installed successfully to $INSTALL_DIR/syncline"

if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
    echo "⚠ Note: $INSTALL_DIR is not in your PATH."
    echo "  Add this to your ~/.bashrc or ~/.zshrc:"
    echo "  export PATH=\"\$PATH:$INSTALL_DIR\""
fi

exit 0
__PAYLOAD_BELOW__
HEADER

# Append the base64 encoded payload
base64 syncline.sh >> install.sh

chmod +x install.sh
echo "✓ Standalone install.sh generated successfully!"
```

Code
-----

```bash
#!/usr/bin/env bash
# syncline - Git-synced terminal notes & tasks (Inspired by nb & taskline)

set -e

DATA_DIR="$HOME/.syncline"
REPO_DIR="$DATA_DIR/repo"
DATA_FILE="$REPO_DIR/notes.json"
CONFIG_FILE="$DATA_DIR/config.json"

# --- THEMING ENGINE ---
CONFIG_FILE="$DATA_DIR/config.json"

get_ansi_color() {
    case "$1" in
        black) echo "\033[30m" ;; red) echo "\033[31m" ;; green) echo "\033[32m" ;;
        yellow) echo "\033[33m" ;; blue) echo "\033[34m" ;; magenta) echo "\033[35m" ;;
        cyan) echo "\033[36m" ;; white) echo "\033[37m" ;; gray|grey) echo "\033[90m" ;;
        *) echo "\033[0m" ;;
    esac
}

load_theme() {
    if [ ! -f "$CONFIG_FILE" ]; then
        mkdir -p "$DATA_DIR"
        cat <<EOF > "$CONFIG_FILE"
{
  "theme": {
    "board": "blue",
    "task_pending": "gray",
    "task_completed": "green",
    "task_progress": "cyan",
    "task_canceled": "red",
    "note": "blue",
    "star": "yellow",
    "due_date": "gray",
    "prompt": "cyan"
  }
}
EOF
    fi
    
    COLOR_RESET="\033[0m"
    COLOR_BOLD="\033[1m"
    COLOR_BLUE=$(get_ansi_color "$(jq -r '.theme.board // "blue"' "$CONFIG_FILE")")
    COLOR_GRAY=$(get_ansi_color "$(jq -r '.theme.task_pending // "gray"' "$CONFIG_FILE")")
    COLOR_GREEN=$(get_ansi_color "$(jq -r '.theme.task_completed // "green"' "$CONFIG_FILE")")
    COLOR_CYAN=$(get_ansi_color "$(jq -r '.theme.task_progress // "cyan"' "$CONFIG_FILE")")
    COLOR_RED=$(get_ansi_color "$(jq -r '.theme.task_canceled // "red"' "$CONFIG_FILE")")
    COLOR_YELLOW=$(get_ansi_color "$(jq -r '.theme.star // "yellow"' "$CONFIG_FILE")")
    COLOR_PROMPT=$(get_ansi_color "$(jq -r '.theme.prompt // "cyan"' "$CONFIG_FILE")")
    COLOR_DUE=$(get_ansi_color "$(jq -r '.theme.due_date // "gray"' "$CONFIG_FILE")")
    COLOR_NOTE=$(get_ansi_color "$(jq -r '.theme.note // "blue"' "$CONFIG_FILE")")
}

check_dependencies() {
    if ! command -v jq >/dev/null 2>&1; then
        echo -e "${COLOR_RED}✗ 'jq' is required but not installed.${COLOR_RESET}"
        exit 1
    fi
    if ! command -v git >/dev/null 2>&1; then
        echo -e "${COLOR_RED}✗ 'git' is required but not installed.${COLOR_RESET}"
        exit 1
    fi
}

init_data() {
    if [ ! -d "$REPO_DIR" ]; then
        mkdir -p "$REPO_DIR"
        cd "$REPO_DIR"
        git init -q
        git config user.name "syncline" 2>/dev/null || true
        git config user.email "syncline@local" 2>/dev/null || true
        echo "[]" > "$DATA_FILE"
        git add notes.json
        git commit -q -m "chore: initial syncline setup"
        echo -e "${COLOR_GREEN}✓ Initialized syncline repository at $REPO_DIR${COLOR_RESET}"
    fi
}

ensure_data() {
    check_dependencies
    init_data
    load_theme
}

get_next_id() {
    local max_id
    max_id=$(jq '[.[].id] | max // 0' "$DATA_FILE")
    echo $((max_id + 1))
}

expand_ids() {
    local input="$1"
    local result=()
    IFS=',' read -ra parts <<< "$input"
    for part in "${parts[@]}"; do
        part="${part// /}"
        if [[ "$part" =~ ^([0-9]+)-([0-9]+)$ ]]; then
            local start="${BASH_REMATCH[1]}"
            local end="${BASH_REMATCH[2]}"
            for ((i=start; i<=end; i++)); do result+=("$i"); done
        elif [[ "$part" =~ ^[0-9]+$ ]]; then
            result+=("$part")
        fi
    done
    local json="["
    local first=true
    for id in "${result[@]}"; do
        if $first; then json+="$id"; first=false; else json+=",$id"; fi
    done
    json+="]"
    echo "$json"
}

copy_to_clipboard() {
    local text="$1"
    if command -v pbcopy >/dev/null 2>&1; then echo -n "$text" | pbcopy
    elif command -v xclip >/dev/null 2>&1; then echo -n "$text" | xclip -selection clipboard
    elif command -v xsel >/dev/null 2>&1; then echo -n "$text" | xsel --clipboard --input
    elif command -v wl-copy >/dev/null 2>&1; then echo -n "$text" | wl-copy
    else echo -e "${COLOR_RED}✗ No clipboard utility found.${COLOR_RESET}"; return 1; fi
}

# --- CORE RENDERING ENGINE ---
render_list() {
    local data="$1"
    
    local total_items=$(echo "$data" | jq 'length')
    if [ "$total_items" -eq 0 ]; then
        echo -e "${COLOR_GRAY}No items found.${COLOR_RESET}"
        return
    fi

    local pending_items=$(echo "$data" | jq '[.[] | select(.type == "task" and .completed == false and (.status == "pending" or .status == null))] | length')
    local done_items=$(echo "$data" | jq '[.[] | select(.completed == true)] | length')

    echo "$data" | jq -r '.[].board' | sort -u | while IFS= read -r board; do
        echo -e "${COLOR_BOLD}${COLOR_BLUE} $board ${COLOR_RESET}"
        
        echo "$data" | jq -r --arg board "$board" '
          .[] | select(.board == $board) |
          (if .completed then "completed" elif .status then .status else "pending" end) as $stat |
          (if .type == "task" then
              (if $stat == "completed" then "✓"
               elif $stat == "in_progress" then "▶"
               elif $stat == "canceled" then "×"
               else "☐" end)
           else "📝" end) as $icon |
          "\(.id)|\($icon)|\(.description)|\(.starred)|\(.due_date)"
        ' | while IFS='|' read -r id icon desc starred due; do
            
            # Apply colors to icons
	    local icon_colored="$icon"
            case "$icon" in
                "✓") icon_colored="${COLOR_GREEN}$icon${COLOR_RESET}" ;;
                "▶") icon_colored="${COLOR_CYAN}$icon${COLOR_RESET}" ;;
                "×") icon_colored="${COLOR_RED}$icon${COLOR_RESET}" ;;
                "☐") icon_colored="${COLOR_GRAY}$icon${COLOR_RESET}" ;;
                "📝") icon_colored="${COLOR_NOTE}$icon${COLOR_RESET}" ;;
            esac

            local star_txt=""
            [ "$starred" = "true" ] && star_txt=" ${COLOR_YELLOW}★${COLOR_RESET}"
            
            local due_txt=""
            [ -n "$due" ] && [ "$due" != "null" ] && due_txt=" ${COLOR_DUE}(Due: $due)${COLOR_RESET}"
            
            echo -e "  ${COLOR_PROMPT}❯${COLOR_RESET} $icon_colored ${COLOR_BOLD}$id.${COLOR_RESET} $desc$star_txt$due_txt"
        done
        echo ""
    done
    
    echo -e " ${COLOR_BOLD}$total_items${COLOR_RESET} items · ${COLOR_YELLOW}$pending_items${COLOR_RESET} pending · ${COLOR_GREEN}$done_items${COLOR_RESET} done"
}

# --- DATA MANIPULATION ---
add_item() {
    local type="$1" desc="$2" board="${3:-My Board}" priority="${4:-1}"
    ensure_data
    local next_id=$(get_next_id)
    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    
    jq --arg id "$next_id" --arg type "$type" --arg desc "$desc" \
       --arg board "$board" --arg priority "$priority" --arg ts "$timestamp" \
       '. += [{
         "id": ($id | tonumber), "type": $type, "description": $desc,
         "board": $board, "priority": ($priority | tonumber),
         "completed": false, "starred": false, "archived": false, 
         "status": "pending", "due_date": null, "created_at": $ts
       }]' "$DATA_FILE" > "$DATA_FILE.tmp" && mv "$DATA_FILE.tmp" "$DATA_FILE"
    
    cd "$REPO_DIR" && git add notes.json && git commit -q -m "chore: add $type #$next_id"
    echo -e "${COLOR_GREEN}✓ Added $type #$next_id${COLOR_RESET}"
}

list_items() {
    ensure_data; cd "$REPO_DIR"
    local active_data=$(jq 'map(select(.archived != true))' "$DATA_FILE")
    render_list "$active_data"
}

list_archived() {
    ensure_data; cd "$REPO_DIR"
    local archived_data=$(jq 'map(select(.archived == true))' "$DATA_FILE")
    local count=$(echo "$archived_data" | jq 'length')
    if [ "$count" -eq 0 ]; then echo -e "${COLOR_GRAY}No archived items found.${COLOR_RESET}"; return; fi
    echo -e "${COLOR_BOLD}${COLOR_BLUE} Archived Items ${COLOR_RESET}"
    echo "$archived_data" | jq -r '.[] | "\(.id)|\(.type)|\(.description)"' | while IFS='|' read -r id type desc; do
        echo -e "  ${COLOR_PROMPT}❯${COLOR_RESET} ${COLOR_BOLD}$id.${COLOR_RESET} $desc ${COLOR_GRAY}($type)${COLOR_RESET}"
    done
    echo -e " ${COLOR_BOLD}$count${COLOR_RESET} archived items"
}

toggle_status() {
    local ids_json=$(expand_ids "$1")
    ensure_data; cd "$REPO_DIR"
    jq --argjson ids "$ids_json" 'map(if .id as $i | $ids | index($i) then (if .completed then .completed = false | .status = "pending" else .completed = true | .status = "completed" end) else . end)' "$DATA_FILE" > "$DATA_FILE.tmp" && mv "$DATA_FILE.tmp" "$DATA_FILE"
    git add notes.json && git commit -q -m "chore: check/uncheck items $1"
    echo -e "${COLOR_GREEN}✓ Toggled completion for items: $1${COLOR_RESET}"
}

start_items() {
    local ids_json=$(expand_ids "$1")
    ensure_data; cd "$REPO_DIR"
    jq --argjson ids "$ids_json" 'map(if .id as $i | $ids | index($i) then (if .status == "in_progress" then .status = "pending" else .status = "in_progress" end) else . end)' "$DATA_FILE" > "$DATA_FILE.tmp" && mv "$DATA_FILE.tmp" "$DATA_FILE"
    git add notes.json && git commit -q -m "chore: start/pause items $1"
    echo -e "${COLOR_GREEN}✓ Toggled start/pause for items: $1${COLOR_RESET}"
}

cancel_items() {
    local ids_json=$(expand_ids "$1")
    ensure_data; cd "$REPO_DIR"
    jq --argjson ids "$ids_json" 'map(if .id as $i | $ids | index($i) then (if .status == "canceled" then .status = "pending" else .status = "canceled" end) else . end)' "$DATA_FILE" > "$DATA_FILE.tmp" && mv "$DATA_FILE.tmp" "$DATA_FILE"
    git add notes.json && git commit -q -m "chore: cancel/reactivate items $1"
    echo -e "${COLOR_GREEN}✓ Toggled cancel/reactivate for items: $1${COLOR_RESET}"
}

clear_completed() {
    ensure_data; cd "$REPO_DIR"
    local count=$(jq '[.[] | select(.completed == true)] | length' "$DATA_FILE")
    if [ "$count" -eq 0 ]; then echo -e "${COLOR_GRAY}No completed items to clear.${COLOR_RESET}"; return; fi
    jq 'map(select(.completed != true))' "$DATA_FILE" > "$DATA_FILE.tmp" && mv "$DATA_FILE.tmp" "$DATA_FILE"
    git add notes.json && git commit -q -m "chore: clear completed items"
    echo -e "${COLOR_GREEN}✓ Cleared $count completed items${COLOR_RESET}"
}

# NEW: Clear canceled tasks
clear_canceled() {
    ensure_data; cd "$REPO_DIR"
    local count=$(jq '[.[] | select(.status == "canceled")] | length' "$DATA_FILE")
    if [ "$count" -eq 0 ]; then echo -e "${COLOR_GRAY}No canceled items to clear.${COLOR_RESET}"; return; fi
    jq 'map(select(.status != "canceled"))' "$DATA_FILE" > "$DATA_FILE.tmp" && mv "$DATA_FILE.tmp" "$DATA_FILE"
    git add notes.json && git commit -q -m "chore: clear canceled items"
    echo -e "${COLOR_GREEN}✓ Cleared $count canceled items${COLOR_RESET}"
}

# NEW: Set priority on existing tasks
set_priority() {
    local ids_json=$(expand_ids "$1")
    local priority="$2"
    
    if [[ ! "$priority" =~ ^[1-3]$ ]]; then
        echo -e "${COLOR_RED}✗ Invalid priority. Use 1 (normal), 2 (medium), or 3 (high).${COLOR_RESET}"
        return 1
    fi
    
    ensure_data; cd "$REPO_DIR"
    jq --argjson ids "$ids_json" --argjson priority "$priority" \
       'map(if .id as $i | $ids | index($i) then .priority = $priority else . end)' \
       "$DATA_FILE" > "$DATA_FILE.tmp" && mv "$DATA_FILE.tmp" "$DATA_FILE"
    git add notes.json && git commit -q -m "chore: set priority for items $1"
    echo -e "${COLOR_GREEN}✓ Set priority $priority for items: $1${COLOR_RESET}"
}

set_due() {
    local id="$1" date="$2"
    if [[ ! "$date" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
        echo -e "${COLOR_RED}✗ Invalid date format. Please use YYYY-MM-DD.${COLOR_RESET}"; return 1
    fi
    ensure_data; cd "$REPO_DIR"
    jq --arg id "$id" --arg date "$date" 'map(if .id == ($id | tonumber) then .due_date = $date else . end)' "$DATA_FILE" > "$DATA_FILE.tmp" && mv "$DATA_FILE.tmp" "$DATA_FILE"
    git add notes.json && git commit -q -m "chore: set due date for #$id"
    echo -e "${COLOR_GREEN}✓ Set due date for item #$id to $date${COLOR_RESET}"
}

find_items() {
    local term="$1"
    ensure_data; cd "$REPO_DIR"
    local filtered_data=$(jq --arg term "$term" 'map(select(.archived != true and (.description | test($term; "i"))))' "$DATA_FILE")
    render_list "$filtered_data"
}

filter_items() {
    local attr="$1"
    ensure_data; cd "$REPO_DIR"
    local filtered_data
    case "$attr" in
        starred)   filtered_data=$(jq 'map(select(.archived != true and .starred == true))' "$DATA_FILE") ;;
        pending)   filtered_data=$(jq 'map(select(.archived != true and .completed != true and (.status == "pending" or .status == null)))' "$DATA_FILE") ;;
        completed) filtered_data=$(jq 'map(select(.archived != true and .completed == true))' "$DATA_FILE") ;;
        progress|in_progress) filtered_data=$(jq 'map(select(.archived != true and .status == "in_progress"))' "$DATA_FILE") ;;
        canceled)  filtered_data=$(jq 'map(select(.archived != true and .status == "canceled"))' "$DATA_FILE") ;;
        tasks)     filtered_data=$(jq 'map(select(.archived != true and .type == "task"))' "$DATA_FILE") ;;
        notes)     filtered_data=$(jq 'map(select(.archived != true and .type == "note"))' "$DATA_FILE") ;;
        *) echo -e "${COLOR_RED}✗ Unknown filter: $attr${COLOR_RESET}"; echo "Available: starred, pending, completed, progress, canceled, tasks, notes"; return 1 ;;
    esac
    render_list "$filtered_data"
}

# --- UTILITIES ---
# UPDATED: Now supports batch deletion
delete_items() {
    local ids_json=$(expand_ids "$1")
    ensure_data; cd "$REPO_DIR"
    jq --argjson ids "$ids_json" 'map(select(.id as $i | $ids | index($i) | not))' "$DATA_FILE" > "$DATA_FILE.tmp" && mv "$DATA_FILE.tmp" "$DATA_FILE"
    git add notes.json && git commit -q -m "chore: delete items $1"
    echo -e "${COLOR_GREEN}✓ Deleted items: $1${COLOR_RESET}"
}

archive_items() {
    local ids_json=$(expand_ids "$1"); ensure_data; cd "$REPO_DIR"
    jq --argjson ids "$ids_json" 'map(if .id as $i | $ids | index($i) then .archived = true else . end)' "$DATA_FILE" > "$DATA_FILE.tmp" && mv "$DATA_FILE.tmp" "$DATA_FILE"
    git add notes.json && git commit -q -m "chore: archive items $1"
    echo -e "${COLOR_GREEN}✓ Archived items: $1${COLOR_RESET}"
}

unarchive_items() {
    local ids_json=$(expand_ids "$1"); ensure_data; cd "$REPO_DIR"
    jq --argjson ids "$ids_json" 'map(if .id as $i | $ids | index($i) then .archived = false else . end)' "$DATA_FILE" > "$DATA_FILE.tmp" && mv "$DATA_FILE.tmp" "$DATA_FILE"
    git add notes.json && git commit -q -m "chore: unarchive items $1"
    echo -e "${COLOR_GREEN}✓ Unarchived items: $1${COLOR_RESET}"
}

edit_item() {
    local id="$1" desc="$2"; ensure_data; cd "$REPO_DIR"
    jq --arg id "$id" --arg desc "$desc" 'map(if .id == ($id | tonumber) then .description = $desc else . end)' "$DATA_FILE" > "$DATA_FILE.tmp" && mv "$DATA_FILE.tmp" "$DATA_FILE"
    git add notes.json && git commit -q -m "chore: edit item #$id"
    echo -e "${COLOR_GREEN}✓ Edited item #$id${COLOR_RESET}"
}

move_items() {
    local ids_json=$(expand_ids "$1") board="$2"; ensure_data; cd "$REPO_DIR"
    jq --argjson ids "$ids_json" --arg board "$board" 'map(if .id as $i | $ids | index($i) then .board = $board else . end)' "$DATA_FILE" > "$DATA_FILE.tmp" && mv "$DATA_FILE.tmp" "$DATA_FILE"
    git add notes.json && git commit -q -m "chore: move items $1 to $board"
    echo -e "${COLOR_GREEN}✓ Moved items $1 to board '$board'${COLOR_RESET}"
}

copy_items() {
    local ids_json=$(expand_ids "$1"); ensure_data; cd "$REPO_DIR"
    local text=$(jq -r --argjson ids "$ids_json" '[.[] | select(.id as $i | $ids | index($i)) | .description] | join("\n")' "$DATA_FILE")
    if [ -z "$text" ]; then echo -e "${COLOR_RED}✗ No matching items found for IDs: $1${COLOR_RESET}"; return 1; fi
    if copy_to_clipboard "$text"; then echo -e "${COLOR_GREEN}✓ Copied descriptions to clipboard${COLOR_RESET}"; fi
}

toggle_star() {
    local ids_json=$(expand_ids "$1"); ensure_data; cd "$REPO_DIR"
    jq --argjson ids "$ids_json" 'map(if .id as $i | $ids | index($i) then .starred = (if .starred then false else true end) else . end)' "$DATA_FILE" > "$DATA_FILE.tmp" && mv "$DATA_FILE.tmp" "$DATA_FILE"
    git add notes.json && git commit -q -m "chore: toggle star for items $1"
    echo -e "${COLOR_GREEN}✓ Toggled star for items: $1${COLOR_RESET}"
}

sync_items() {
    ensure_data; cd "$REPO_DIR"
    if ! git remote | grep -q origin; then echo -e "${COLOR_RED}✗ No remote configured.${COLOR_RESET}"; return 1; fi
    echo -e "${COLOR_CYAN}⟳ Syncing with remote...${COLOR_RESET}"
    git fetch origin
    if git rev-parse --verify origin/main >/dev/null 2>&1; then git pull --rebase origin main && git push origin main
    else git pull --rebase origin master && git push origin master; fi
    echo -e "${COLOR_GREEN}✓ Sync complete${COLOR_RESET}"
}

set_remote() {
    local url="$1"; ensure_data; cd "$REPO_DIR"
    if [[ "$url" == git@github.com:* ]]; then url="https://github.com/${url#git@github.com:}"; url="${url%.git}"; fi
    git remote add origin "$url" 2>/dev/null || git remote set-url origin "$url"
    local helper_path=$(command -v syncline-git-credential 2>/dev/null || echo "$(dirname "$(command -v syncline)")/syncline-git-credential")
    git config credential.helper "!$helper_path"
    if git rev-parse --verify main >/dev/null 2>&1; then git push -u origin main; else git push -u origin master; fi
    echo -e "${COLOR_GREEN}✓ Remote set and initial push complete.${COLOR_RESET}"
}

update_token() {
    if ! command -v secret-tool >/dev/null 2>&1; then echo -e "${COLOR_RED}✗ 'secret-tool' required.${COLOR_RESET}"; exit 1; fi
    echo -e "${COLOR_CYAN}Enter your new GitHub Personal Access Token (PAT):${COLOR_RESET}"
    read -s NEW_TOKEN; echo ""
    if [ -z "$NEW_TOKEN" ]; then echo -e "${COLOR_RED}✗ Token cannot be empty.${COLOR_RESET}"; exit 1; fi
    echo -n "$NEW_TOKEN" | secret-tool store --label="Syncline GitHub PAT" application syncline service github
    echo -e "${COLOR_GREEN}✓ PAT successfully updated in GNOME Keyring.${COLOR_RESET}"
}

# --- COMMAND ROUTER ---
case "${1:-list}" in
    note|n)      [ -z "$2" ] && echo "Usage: syncline note \"desc\" [board] [priority]" || add_item "note" "$2" "${3:-My Board}" "${4:-1}" ;;
    task|t)      [ -z "$2" ] && echo "Usage: syncline task \"desc\" [board] [priority]" || add_item "task" "$2" "${3:-My Board}" "${4:-1}" ;;
    list|l|"")   list_items ;;
    archived)    list_archived ;;
    check|c)     [ -z "$2" ] && echo "Usage: syncline check <ids>" || toggle_status "$2" ;;
    start|begin|b) [ -z "$2" ] && echo "Usage: syncline start <ids>" || start_items "$2" ;;
    cancel)      [ -z "$2" ] && echo "Usage: syncline cancel <ids>" || cancel_items "$2" ;;
    clear)       clear_completed ;;
    clear-canceled) clear_canceled ;;
    priority|p)  [ -z "$3" ] && echo "Usage: syncline priority <ids> <1|2|3>" || set_priority "$2" "$3" ;;
    due)         [ -z "$3" ] && echo "Usage: syncline due <id> <YYYY-MM-DD>" || set_due "$2" "$3" ;;
    find|f)      [ -z "$2" ] && echo "Usage: syncline find <term>" || find_items "$2" ;;
    filter)      [ -z "$2" ] && echo "Usage: syncline filter <attribute>" || filter_items "$2" ;;
    star|s)      [ -z "$2" ] && echo "Usage: syncline star <ids>" || toggle_star "$2" ;;
    delete|d)    [ -z "$2" ] && echo "Usage: syncline delete <ids>" || delete_items "$2" ;;
    archive)     [ -z "$2" ] && echo "Usage: syncline archive <ids>" || archive_items "$2" ;;
    unarchive)   [ -z "$2" ] && echo "Usage: syncline unarchive <ids>" || unarchive_items "$2" ;;
    edit|e)      [ -z "$3" ] && echo "Usage: syncline edit <id> \"desc\"" || edit_item "$2" "$3" ;;
    move|m)      [ -z "$3" ] && echo "Usage: syncline move <ids> <board>" || move_items "$2" "$3" ;;
    copy|y)      [ -z "$2" ] && echo "Usage: syncline copy <ids>" || copy_items "$2" ;;
    sync)        sync_items ;;
    remote)      [ "$2" = "add" ] && [ -n "$3" ] && set_remote "$3" || echo "Usage: syncline remote add <https-url>" ;;
    token)       [ "$2" = "update" ] || [ "$2" = "set" ] && update_token || echo "Usage: syncline token update" ;;
    help|--help|-h)
        echo "syncline - Git-synced terminal notes & tasks"
        echo "Usage:"
        echo "  syncline task \"desc\" [board] [priority]  Add a task"
        echo "  syncline note \"desc\" [board] [priority]  Add a note"
        echo "  syncline list                              Display active items"
        echo "  syncline archived                          Display archived items"
        echo "  syncline check <ids>                       Toggle task completion"
        echo "  syncline start <ids>                       Start/pause task"
        echo "  syncline cancel <ids>                      Cancel/reactivate task"
        echo "  syncline clear                             Delete all completed tasks"
        echo "  syncline clear-canceled                    Delete all canceled tasks"
        echo "  syncline priority <ids> <1|2|3>            Set priority (1=normal, 2=medium, 3=high)"
        echo "  syncline due <id> <YYYY-MM-DD>             Set due date"
        echo "  syncline find <term>                       Search descriptions"
        echo "  syncline filter <attr>                     Filter (starred, pending, completed, progress, canceled, tasks, notes)"
        echo "  syncline star <ids>                        Toggle star/favorite"
        echo "  syncline delete <ids>                      Delete items (supports 1,2,3 or 1-3)"
        echo "  syncline archive <ids>                     Archive items"
        echo "  syncline unarchive <ids>                   Restore archived items"
        echo "  syncline edit <id> \"desc\"                Edit item description"
        echo "  syncline move <ids> <board>                Move items to another board"
        echo "  syncline copy <ids>                        Copy descriptions to clipboard"
        echo "  syncline sync                              Pull and push to Git remote"
        echo "  syncline remote add <url>                  Set GitHub remote URL"
        echo "  syncline token update                      Update GitHub PAT in gnome-keyring"
        ;;
    *) echo "Unknown command: $1. Run 'syncline help' for usage." ; exit 1 ;;
esac
```

Uninstaller
-----

```bash
#!/usr/bin/env bash
set -e

PATHS_TO_CHECK=("/usr/local/bin" "${HOME}/.local/bin")

for path in "${PATHS_TO_CHECK[@]}"; do
    if [ -f "$path/syncline" ]; then
        echo "Found syncline at $path. Removing..."
        if [ -w "$path/syncline" ]; then 
            rm "$path/syncline" "$path/syncline-git-credential"
        else 
            sudo rm "$path/syncline" "$path/syncline-git-credential"
        fi
        echo "✓ syncline executables uninstalled."
        echo ""
        echo "→ To completely remove all local notes, Git history, and the saved PAT, run:"
        echo "   rm -rf ~/.syncline"
        echo "   secret-tool clear application syncline service github"
        exit 0
    fi
done

echo "✗ syncline not found in standard paths. Already uninstalled?"
```
