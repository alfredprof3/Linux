# Steps Timeline Claude - CSS Snippet

/*
  STEPS TIMELINE as Callout
  Mimics Gemini-style numbered steps with circles and dotted vertical line.

  INSTALL:
  Place in: YourVault/.obsidian/snippets/
  Enable in: Settings > Appearance > CSS Snippets

  USAGE in a note (Reading View to render):

  > [!steps]
  > 1. **First step title**
  >
  >    *Optional subtitle or context*
  >
  >    Body text, explanation, or any content here.
  >    Code blocks work too.
  >
  > 2. **Second step title**
  >
  >    Body text for the second step.
  >
  > 3. **Third step title**
  >
  >    More content.
*/


/* ---- Reset callout chrome ---- */

.callout[data-callout="steps"] {
    background:  transparent !important;
    border:      none !important;
    box-shadow:  none !important;
    padding:     0 !important;
    margin:      0 !important;
}

/* Hide the default "Steps" title bar */
.callout[data-callout="steps"] > .callout-title {
    display: none !important;
}

.callout[data-callout="steps"] > .callout-content {
    padding: 0.5rem 0 !important;
}


/* ---- The ordered list ---- */

.callout[data-callout="steps"] ol {
    list-style:    none !important;
    padding:       0 !important;
    margin:        0 !important;
    counter-reset: step-counter;
}


/* ---- Each step item ---- */

.callout[data-callout="steps"] ol > li {
    counter-increment: step-counter;
    position:    relative;
    padding-left: 3.4rem !important;
    padding-bottom: 2rem !important;
    margin:      0 !important;
    list-style:  none !important;
}

/* No bottom padding on the last item */
.callout[data-callout="steps"] ol > li:last-child {
    padding-bottom: 0.5rem !important;
}


/* ---- Numbered circle (the bullet) ---- */

.callout[data-callout="steps"] ol > li::before {
    content:       counter(step-counter);
    position:      absolute;
    left:          0;
    top:           0.1rem;
    width:         1.8rem;
    height:        1.8rem;
    border-radius: 50%;
    border:        1.5px solid var(--text-muted);
    text-align:    center;
    line-height:   1.7rem;
    font-size:     0.82rem;
    font-weight:   600;
    color:         var(--text-muted);
    background:    var(--background-primary);
    box-sizing:    border-box;
    z-index:       1;
}


/* ---- Dotted vertical line between steps ---- */

.callout[data-callout="steps"] ol > li:not(:last-child)::after {
    content:     "";
    position:    absolute;
    left:        0.84rem;
    top:         1.95rem;
    bottom:      0;
    border-left: 1.5px dotted var(--text-muted);
    opacity:     0.45;
}


/* ---- Step title: bold text displays as its own line ---- */

.callout[data-callout="steps"] ol > li > p:first-child > strong {
    display:     block;
    font-size:   1.05em;
    font-weight: 700;
    color:       var(--text-normal);
    margin-bottom: 0.15rem;
}


/* ---- Step subtitle: italic text below the title ---- */

.callout[data-callout="steps"] ol > li em {
    display:    block;
    color:      var(--text-muted);
    font-style: italic;
    font-size:  0.9em;
    margin-bottom: 0.25rem;
}


/* ---- Body paragraphs ---- */

.callout[data-callout="steps"] ol > li p {
    color:       var(--text-normal);
    font-size:   var(--font-text-size);
    line-height: var(--line-height-normal);
    margin:      0.4rem 0 0 0;
}

.callout[data-callout="steps"] ol > li p:first-child {
    margin-top: 0;
}


/* ---- Code blocks inside steps ---- */

.callout[data-callout="steps"] ol > li pre {
    margin: 0.75rem 0;
}


/* ---- CUSTOMIZATION ----

   To change circle color (default: --text-muted):
   .callout[data-callout="steps"] ol > li::before {
       border-color: var(--interactive-accent);
       color:        var(--interactive-accent);
   }

   To use accent color for the dotted line:
   .callout[data-callout="steps"] ol > li:not(:last-child)::after {
       border-color: var(--interactive-accent);
   }

   To make circles filled instead of outlined:
   .callout[data-callout="steps"] ol > li::before {
       background: var(--interactive-accent);
       color:      var(--text-on-accent);
       border-color: var(--interactive-accent);
   }

   To show the "Steps" title bar again (hidden by default):
   .callout[data-callout="steps"] > .callout-title {
       display: flex !important;
   }

   ---- */
