# Micael Freitas — Cybersecurity Portfolio

A responsive, dark cybersecurity-inspired portfolio built with HTML, CSS, and vanilla JavaScript. Designed for GitHub Pages.

## File structure

```text
FreMi185.github.io/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    ├── favicon.svg
    └── profile.jpg   # add your own photo here (optional)
```

## Publish on GitHub Pages

1. Open your `FreMi185.github.io` repository.
2. Add `index.html` at the repository root.
3. Create `css` and `js` folders and upload their files into the matching folders.
4. Create `assets` and upload `favicon.svg` plus your own portrait named `profile.jpg` (optional).
5. Commit the changes to the `main` branch.
6. In Settings → Pages, select Deploy from a branch, `main`, and `/(root)`.
7. Visit `https://fremi185.github.io/`.

## Personalise it

- Change your introduction and skills in `index.html`.
- Add a project only when you have actually completed it. Link to its repository and explain what you built, what you learned, and what you would improve.
- To use a PNG portrait instead, change `src="assets/profile.jpg"` to `src="assets/profile.png"`.
- Change colours, spacing, fonts, and responsive layout in `css/style.css`.
- Edit the mobile navigation and scroll reveal behavior in `js/main.js`.

## Security and privacy notes

- This is a static portfolio; it does not have a login, database, backend, or contact form. Never add passwords, API keys, tokens, or private information to the repository.
- Only publish information and screenshots you are comfortable making public.
- External links use `rel="noopener noreferrer"` when opened in a new tab.
- The JavaScript uses browser APIs locally and sends no form data or personal data to a server.
- Keep project claims accurate. Practice security testing only on systems you own or have explicit permission to test.
- The Google Fonts import loads fonts from Google. If you prefer not to contact that third party, remove the `@import` line from the CSS and the page will use system fonts.
- GitHub Pages provides static hosting over HTTPS, but this site does not make your device or other systems “secure” by itself.
