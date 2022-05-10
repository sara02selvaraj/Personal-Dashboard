async function renderPage() {
    try{
        let response = await fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`)
        let data = await response.json()
        console.log(data)
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById('author').textContent = `By: ${data.user.name}`
    }catch(error){
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTA4NTIzMjY&ixlib=rb-1.2.1&q=80&w=1080")`
    }
}

async function renderCoinData(){
    try{
        let response = await fetch(`https://api.coingecko.com/api/v3/coins/dogecoin`)
        if(!response.ok) {
            throw Error("Something went wrong")
        }
        let data = await response.json()
        console.log(data)
        const currencyEl = document.getElementById('crypto-title')
        const img = document.createElement('img')
        img.src = `${data.image.small}`
        const span = document.createElement('span')
        span.textContent = `${data.name}`
        currencyEl.append(img, span )
        const cryptoEl = document.getElementById('crypto')
        cryptoEl.innerHTML += `<p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👆: $${data.market_data.high_24h.usd}</p>
        <p>👇: $${data.market_data.low_24h.usd}</p>`
    }catch(error){
        console.error(error)
    }
}
renderCoinData()

renderPage()

function getcurrentTime() {
    const date = new Date().toLocaleTimeString('en-US', {timeStyle: 'short'})
    document.getElementById('time').textContent = date
}
setInterval(getcurrentTime, 1000)

navigator.geolocation.getCurrentPosition((position) => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
    .then((res) => {
        if(!res.ok) {
            throw Error('Weather data not available')
        }
        return res.json()
    }).then(data => {
        console.log(data)
        const img = document.createElement('img')
        img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        const temp = document.createElement('p')
        temp.textContent = `${Math.round(data.main.temp)}º`
        const weatherEl = document.getElementById('weather')
        weatherEl.append(img, temp)
    }).catch((err) => console.error(err))
});

async function renderQuote() {
    let response = await fetch(`https://api.quotable.io/random`)
    let data = await response.json()
    document.getElementById('quote-container').textContent = data.content
}

const todoEl = document.getElementById('todo-El')
const addBtn = document.getElementById('add-btn')
const deleteBtn = document.getElementById('delete-btn')

const todoList = []

addBtn.addEventListener('click', () => {
     todoList.push(todoEl.value)
    localStorage.setItem('todo', JSON.stringify(todoList))
    render()
})

function render(){
    let todoList = JSON.parse(localStorage.getItem('todo'))
    let html = todoList.map((item) => `<ul><li>${item}</li></ul>`).join('')
    document.getElementById('list').innerHTML = html
}

deleteBtn.addEventListener('click', () => {
    localStorage.removeItem('todo')
    document.getElementById('list').innerHTML = ''
})

todoEl.value
renderQuote()