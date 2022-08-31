// eslint-disable-next-line import/prefer-default-export
export function msToTime(ms?: number) {
  if (!ms) return '0:00'

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0')
  }

  const minutes = Math.floor(ms / 60000)
  const seconds = Math.round((ms % 60000) / 1000)

  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${padTo2Digits(seconds)}`
}

export function numberFormat(number: number) {
  if (!number) return ''
  const formatted = new Intl.NumberFormat('en-US').format(number)

  return formatted
}
