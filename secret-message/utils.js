const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

const Emos = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️',
  '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈',
  '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥',
  '🦆', '🦇', '🦉', '🦋', '🐛', '🐝', '🦖', '🐙', '🦑',
  '🐍', '🐳', '🐋', '🐅', '🐆', '🦧', '🐘', '😖', '😫',
  '🤯', '🥳', '😈', '👻', '💀', '☠️', '👽', '👹', '😸',
  '🤖', '🎃', '😽', '🙀', '😿', '😼', '😺', '🥷', '🤷‍♀️', '🙅'
]

const base64ToEmoji = {}
const emojiToBase64 = {}

for (let i = 0; i < base64Chars.length; i++) {
  base64ToEmoji[base64Chars[i]] = Emos[i]
  emojiToBase64[Emos[i]] = base64Chars[i]
}

function fixBase64Padding(base64) {
  const padLength = (4 - (base64.length % 4)) % 4
  return base64 + '='.repeat(padLength)
}

export function wordToEmo(word) {
  const base64 = btoa(unescape(encodeURIComponent(word)))
  return [...base64].map(c => base64ToEmoji[c]).join('')
}

function splitEmojis(str) {
  const regex = new RegExp(
    Emos.map(e => e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
    'gu'
  )
  return str.match(regex) || []
}

export function emoToWord(emojiStr) {
  const emojis = splitEmojis(emojiStr)
  const base64 = emojis.map(e => emojiToBase64[e]).join('')
  const padded = fixBase64Padding(base64)
  return decodeURIComponent(escape(atob(padded)))
}

export function stringToEmo(text) {
  return text.replace(/\p{L}+/gu, word => wordToEmo(word))
}

const emojiRegex = new RegExp(
  `(${Emos.map(e => e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})+`,
  'gu'
)

export function emoToString(text) {
  return text.replace(emojiRegex, emo => emoToWord(emo))
}
