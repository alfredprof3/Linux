# Outlined Callout Claude - CSS Snippet

/*
  BOX CALLOUT - Floating title on border
  Inspired by Kepano / sailKite (Minimal Theme)
  No frontmatter required.

  INSTALL:
  1. Place in: YourVault/.obsidian/snippets/
  2. Settings > Appearance > CSS Snippets > toggle ON

  USAGE:
  > [!box] My Title
  > Content goes here.

  The title floats on the top border of the box.
  Works in both Reading View and Live Preview.

  ICON VARIANTS:
  Obsidian lets you attach "metadata" to a callout type with a pipe:
  > [!box|bug] My Title
  This keeps the box layout (floating title, outlined border) but
  swaps in the icon + accent color of one of the built-in callout
  types, borrowed from the icon set shown in Settings > Appearance.

  Supported keywords (aliases in parentheses also work):
  note, abstract (summary, tldr), info, todo, tip (hint, important),
  success (check, done), question (help, faq), warning (caution,
  attention), failure (fail, missing), danger (error), bug, example,
  quote (cite)

  Examples:
  > [!box|bug] Known issue
  > [!box|warning] Careful here
  > [!box|success] All tests passing
*/


/* ---- Main callout box ---- */

.callout[data-callout="box"] {
    overflow:         visible !important;
    background-color: transparent !important;
    border:           1px solid rgba(var(--callout-color), 0.5) !important;
    border-radius:    6px !important;
    box-shadow:       none !important;
    margin-top:       1.5rem !important;
    --callout-blend-mode: normal;
    /* Defaults used when no icon variant (see bottom of file) is given */
    --callout-color:  100, 140, 220;
    --callout-icon:   lucide-pencil;
}


/* ---- Title: floats up to sit on the top border ---- */

.callout[data-callout="box"] > .callout-title {
    background-color:  var(--background-primary);
    position:          relative;
    margin-top:        -24px;
    z-index:           200;
    width:             fit-content;
    padding:           0 0.6em 0 0.5em;
    /* padding:           0 0.5em;     # Previous padding */
    margin-left:       0.5em;
    letter-spacing:    0.05em;
    font-variant-caps: all-petite-caps;
    font-size:         0.9em;
    color:             rgba(var(--callout-color), 0.9) !important;
}


/* ---- Content area ---- */

.callout[data-callout="box"] > .callout-content {
    background: transparent !important;
    padding: 0.1rem 1.5rem 0 0.5rem !important;
}


/* ---- Editor (Live Preview): space above for the floating title ---- */

.cm-embed-block.cm-callout:has([data-callout="box"]) {
    padding-top: 0.15rem !important;
    /* padding-top: 1.5rem !important;     # Previous padding */
    overflow:    visible !important;
}

/* ---- Nested callout inside box: add spacing ---- */

.callout[data-callout="box"] .callout-content .callout {
    margin-top: 18px;
}


/* ---- Icon variants: > [!box|type] borrows another callout's icon + color ---- */

.callout[data-callout="box"][data-callout-metadata~="note" i] {
    --callout-icon:  lucide-pencil;
    --callout-color: 100, 140, 220;
}

.callout[data-callout="box"][data-callout-metadata~="abstract" i],
.callout[data-callout="box"][data-callout-metadata~="summary" i],
.callout[data-callout="box"][data-callout-metadata~="tldr" i] {
    --callout-icon:  lucide-clipboard-list;
    --callout-color: var(--color-cyan-rgb);
}

.callout[data-callout="box"][data-callout-metadata~="info" i] {
    --callout-icon:  lucide-info;
    --callout-color: var(--color-blue-rgb);
}

.callout[data-callout="box"][data-callout-metadata~="todo" i] {
    --callout-icon:  lucide-check-circle-2;
    --callout-color: var(--color-blue-rgb);
}

.callout[data-callout="box"][data-callout-metadata~="tip" i],
.callout[data-callout="box"][data-callout-metadata~="hint" i],
.callout[data-callout="box"][data-callout-metadata~="important" i] {
    --callout-icon:  lucide-flame;
    --callout-color: var(--color-cyan-rgb);
}

.callout[data-callout="box"][data-callout-metadata~="success" i],
.callout[data-callout="box"][data-callout-metadata~="check" i],
.callout[data-callout="box"][data-callout-metadata~="done" i] {
    --callout-icon:  lucide-check;
    --callout-color: var(--color-green-rgb);
}

.callout[data-callout="box"][data-callout-metadata~="question" i],
.callout[data-callout="box"][data-callout-metadata~="help" i],
.callout[data-callout="box"][data-callout-metadata~="faq" i] {
    --callout-icon:  lucide-help-circle;
    --callout-color: var(--color-yellow-rgb);
}

.callout[data-callout="box"][data-callout-metadata~="warning" i],
.callout[data-callout="box"][data-callout-metadata~="caution" i],
.callout[data-callout="box"][data-callout-metadata~="attention" i] {
    --callout-icon:  lucide-alert-triangle;
    --callout-color: var(--color-orange-rgb);
}

.callout[data-callout="box"][data-callout-metadata~="failure" i],
.callout[data-callout="box"][data-callout-metadata~="fail" i],
.callout[data-callout="box"][data-callout-metadata~="missing" i] {
    --callout-icon:  lucide-x;
    --callout-color: var(--color-red-rgb);
}

.callout[data-callout="box"][data-callout-metadata~="danger" i],
.callout[data-callout="box"][data-callout-metadata~="error" i] {
    --callout-icon:  lucide-zap;
    --callout-color: var(--color-red-rgb);
}

.callout[data-callout="box"][data-callout-metadata~="bug" i] {
    --callout-icon:  lucide-bug;
    --callout-color: var(--color-red-rgb);
}

.callout[data-callout="box"][data-callout-metadata~="example" i] {
    --callout-icon:  lucide-list;
    --callout-color: var(--color-purple-rgb);
}

.callout[data-callout="box"][data-callout-metadata~="quote" i],
.callout[data-callout="box"][data-callout-metadata~="cite" i] {
    --callout-icon:  lucide-quote;
    --callout-color: var(--mono-rgb-100);
}
