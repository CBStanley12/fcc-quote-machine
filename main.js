const AUTHOR = document.querySelector(`#author`);
const QUOTE = document.querySelector(`#text`);
const BG_IMG = document.querySelector(`.bgImg`);


window.onload = () => {
	getData();
};

async function getData() {
	let quote = fetch(`https://programming-quotes-api.herokuapp.com/quotes/random`);
	let image = fetch(`https://picsum.photos/1920/1080`);

	await quote;
	await image;

	quote.then(response => response.json())
		.then(data => displayQuote(data))

	image.then(data => displayImage(data))
}

function displayQuote(quote) {
	AUTHOR.innerText = quote.author;
	QUOTE.innerText = quote.en;
}

function displayImage(image) {
	BG_IMG.src = image.url;
}