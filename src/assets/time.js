const timer = function (timeNum) {
  const time = new Date(timeNum)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const date = time.getDate()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}

export { timer }
