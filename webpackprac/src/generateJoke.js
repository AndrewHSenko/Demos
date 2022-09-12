async function generateJoke () {
    let joke = await fetch("https://icanhazdadjoke.com", {
        headers: {'Accept' : 'application/json'}
        }
    ).then(joke => joke.json())
    document.getElementById('joke').innerHTML = joke.joke
}

export default generateJoke