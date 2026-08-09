/**
 * Creates a structured text object for use in UI and TTS.
 * Handles simple markdown for bolding (**text**) and italics (_text_).
 *
 * @param {string} markdownText The intro text with optional markdown.
 * @returns {{text: string, html: string}} An object with plain text and formatted HTML.
 */
export function formatIntro(markdownText) {
  // Plain text for TTS: just remove the markdown characters.
  const text = markdownText
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/_(.*?)_/g, '$1');

  // HTML for rendering: convert markdown to <strong> and <em> tags.
  const html = `<p class="scene-intro">${markdownText
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.*?)_/g, '<em>$1</em>')}</p>`;

  return { text, html };
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Normalizes intro data from case files into plain text.
 *
 * @param {string|{text?: string}} intro
 * @returns {string}
 */
export function getIntroText(intro) {
  if (typeof intro === 'string') return intro;
  if (intro && typeof intro === 'object' && typeof intro.text === 'string') return intro.text;
  return '';
}

/**
 * Normalizes intro data from case files into safe HTML.
 *
 * @param {string|{html?: string, text?: string}} intro
 * @param {string} [fallbackText='']
 * @returns {string}
 */
export function getIntroHtml(intro, fallbackText = '') {
  if (intro && typeof intro === 'object' && typeof intro.html === 'string') return intro.html;
  const text = getIntroText(intro) || fallbackText;
  return `<p class="scene-intro">${escapeHtml(text)}</p>`;
}

export function renderIcon(icon) {
  if (!icon) return `<img src='../assets/gfx/magnifying-glass-duotone.svg' class='icon-svg' loading='lazy'>`;
  if (icon.includes('<img')) return icon;
  if (icon.includes('.svg') || icon.includes('.png') || icon.includes('.jpg') || icon.includes('.jpeg') || icon.includes('.gif')) {
    return `<img src='${icon}' class='icon-svg' loading='lazy'>`;
  }
  return icon;
}