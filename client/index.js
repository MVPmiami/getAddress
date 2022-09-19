class UserInfo {
  constructor() {
    this.timeOpened = new Date()
    this.timeZone = new Date().getTimezoneOffset() / 60
  }
  browserInfo() {
    return navigator
  }
  async position() {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    const body = {
      long: pos.coords.longitude,
      lat: pos.coords.latitude,
      accuracy: pos.coords.accuracy,
      altitude: pos.coords.altitude,
      heading: pos.coords.heading,
      speed: pos.coords.speed,
      timestamp: pos.coords.timestamp,
    }

    try {
      console.log(body)
      const response = await fetch('http://localhost:4000/getaddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      })
      const result = await response.json()
      let data = {
        ...result.data.response.GeoObjectCollection.featureMember[0].GeoObject,
        ip: result.ip,
      }
      const resultList = document.querySelector('.result-list')
      const ip = document.createElement('li')
      ip.innerHTML = `ip: ${data.ip}`
      resultList.appendChild(ip)
      const address = document.createElement('li')
      address.innerHTML = `address: ${data.description}, ${data.name}`
      resultList.appendChild(address)
    } catch (error) {
      console.error('Ошибка:', error)
    }
  }
}

let info = new UserInfo()
info.position()
