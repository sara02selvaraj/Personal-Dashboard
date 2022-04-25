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

async function renderCoin(){
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
renderCoin()
renderPage()