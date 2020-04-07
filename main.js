const COLOR_THIEF = new ColorThief();

const QUOTE_CARD = document.querySelector(`.card`);
const AUTHOR = document.querySelector(`#author`);
const QUOTE = document.querySelector(`#text`);
const BACKGROUND = document.querySelector(`.background`);
const LOADER = document.querySelector(`.loader`);
const BTN_NEW_QUOTE = document.querySelector(`#new-quote`);
const BTN_TWEET_QUOTE = document.querySelector(`#tweet-quote`);


window.onload = () => {
	displayLoader(true);
	getData();
};

BTN_NEW_QUOTE.addEventListener('click', () => {
	displayLoader(true);
	getData();
});

BACKGROUND.addEventListener('load', () => {
	let color = COLOR_THIEF.getColor(BACKGROUND);
	let luminance = calcLuminance(color);
	let primaryColor = `rgb(${color.join(",")})`;
	let secondaryColor = (luminance < 145) ? 'white' : 'black';

	document.documentElement.style.setProperty('--color-primary', primaryColor);
	document.documentElement.style.setProperty('--color-secondary', secondaryColor);
});

async function getData() {
	let quote = fetch(`https://programming-quotes-api.herokuapp.com/quotes/random`);
	let image = fetch(`https://picsum.photos/1920/1080`);

	await quote;
	await image;

	image.then(data => displayImage(data))

	quote.then(response => response.json())
		.then(data => displayQuote(data))

	displayLoader(false);
}

function displayLoader(state) {
	if (state) {
		QUOTE_CARD.classList.remove('is-loaded');
		BACKGROUND.classList.remove('is-loaded');
		LOADER.style.display = `block`;
	} else {
		QUOTE_CARD.classList.add('is-loaded');
		BACKGROUND.classList.add('is-loaded');
		LOADER.style.display = `none`;
	}
}

function displayQuote(quote) {
	AUTHOR.innerText = quote.author;
	QUOTE.innerText = quote.en;
}

function displayImage(image) {
	BACKGROUND.src = `${image.url}`;
}

function calcLuminance(rgb) {
	let [r, g, b] = rgb;
	return Math.sqrt((r ** 2 * .241) + (g ** 2 * .691) + (b ** 2 * .068));
}