const delay = (data, tick) => new Promise(res => {
  setTimeout(() => {
    res(data)
  }, tick)
})

module.exports = {
  getName() {
    return delay('jerry', 2000)
  },
  getAge() {
    return 20
  }
}