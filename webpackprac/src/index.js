import generateJoke from "./generateJoke"
import "./styles/main.scss"
import laugh from "./assets/laugh.png"

const laughImg = document.getElementById('laughImg')
laughImg.src = laugh

const jokeBtn = document.getElementById('jokeBtn')
jokeBtn.addEventListener('click', generateJoke)


generateJoke()