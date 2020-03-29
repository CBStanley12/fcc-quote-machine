const QUOTE_BOX = document.querySelector(`#quote-box`);
const AUTHOR = document.querySelector(`#author`);
const QUOTE = document.querySelector(`#text`);
const BG_IMG = document.querySelector(`.bg-img`);
const LOADER = document.querySelector(`.loader`);
const BTN_NEW_QUOTE = document.querySelector(`#new-quote`);


window.onload = () => {
	displayLoader(true);
	getData();
};

BTN_NEW_QUOTE.addEventListener('click', () => {
	displayLoader(true);
	getData();
});

async function getData() {
	let quote = fetch(`https://programming-quotes-api.herokuapp.com/quotes/random`);
	let image = fetch(`https://picsum.photos/1920/1080`);

	await quote;
	await image;

	displayLoader(false);

	image.then(data => displayImage(data))

	quote.then(response => response.json())
		.then(data => displayQuote(data))
}

function displayLoader(state) {
	if (state) {
		QUOTE_BOX.style.display = `none`;
		BG_IMG.style.display = `none`;
		LOADER.style.display = `block`;
	} else {
		QUOTE_BOX.style.display = `block`;
		BG_IMG.style.display = `block`;
		LOADER.style.display = `none`;
	}
}

function displayQuote(quote) {
	QUOTE_BOX.style.display = `block`;

	AUTHOR.innerText = quote.author;
	QUOTE.innerText = quote.en;
}

function displayImage(image) {
	BG_IMG.style.backgroundImage = `url(${image.url})`;
}