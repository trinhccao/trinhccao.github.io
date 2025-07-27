import {stringToEmo, emoToString} from './utils.js'

const message = document.querySelector('#message')
const result = document.querySelector('#result')
const encodeButton = document.querySelector('#encode')
const decodeButton = document.querySelector('#decode')
const copyButton = document.querySelector('#copy')

message.addEventListener('focus', () => {
  message.select()
})

encodeButton.addEventListener('click', () => {
  const value = message.value.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
  result.textContent = stringToEmo(value)
})

decodeButton.addEventListener('click', () => {
  result.textContent = emoToString(message.value)
})

copyButton.addEventListener('click', async () => {
  await navigator.clipboard.writeText(result.textContent)
  copyButton.textContent = 'Đã sao chép!'
  setTimeout(() => copyButton.textContent = 'Sao chép', 1500)
})
