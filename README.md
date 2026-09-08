# Strawberry Scrapbook

A private-feeling, mobile-first romantic website built to ask someone special to be your girlfriend.

## Personalize it

Edit the `CONTENT` object near the top of `src/Prototype.tsx`:

- `passcode`: the four-digit unlock code
- `herName`: the name used throughout the experience
- `yourName`: the signature on the letter
- `letter`: your personal message
- `songs`: titles, artists, and links

Replace `public/assets/memory-collage.png` with your own square collage before sharing.

## Run locally

```bash
npm install
npm run dev
```

## Publish

The included GitHub Actions workflow builds the app and deploys `dist/client` to GitHub Pages whenever `main` is updated.
