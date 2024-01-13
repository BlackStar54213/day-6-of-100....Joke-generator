const joke = document.getElementById("joke");
const btn = document.getElementById("genbtn");
const category = document.getElementById("category");
const formEl = document.querySelector("form");
const aside = document.querySelector("aside");
const menu = document.getElementById("menu");
var numid = 0;


formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const categoryValue = category.value;

    generateJoke(categoryValue);
})


async function generateJoke(categoryValue) {
    try {
        const response = await fetch(`https://v2.jokeapi.dev/joke/${categoryValue}`);
        if (!response.ok) {
            throw new error("error in response")
        }

        const data = await response.json();
        console.log(data);
        switch (data.type) {
            case "single":
                joke.innerHTML = data.joke;
                break;

            case "twopart":
                joke.innerHTML = `<strong>Setup</strong>: ${data.setup} <br> <strong>Delivery</strong>: ${data.delivery}`;
                break;
            default:
                joke.innerHTML = "Sorry that isn't part of the specified categories";
                break;
        }
    } catch (error) {

    }
}


menu.addEventListener("click", () => {
    switch (numid) {
        case 0:
            aside.style.height = "380px";
            menu.setAttribute("src", "icon-close.svg")
            numid = 1;
            break;

        default:
            aside.style.height = "0px";
            menu.setAttribute("src", "icon-hamburger.svg")
            numid = 0;
            break;
    }
})