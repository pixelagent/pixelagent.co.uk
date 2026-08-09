// Minimal shim of the game's real utils.js — only formatIntro is
// imported by the case files, and the cheat sheet doesn't need the
// game's actual rich-text renderer, just something that returns a string.
export function formatIntro(str) {
  return String(str);
}
