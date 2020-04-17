const COLOR_THIEF = new ColorThief();

const QUOTE_CARD = document.querySelector(`.card`);
const AUTHOR = document.querySelector(`#author`);
const QUOTE = document.querySelector(`#text`);
const BACKGROUND = document.querySelector(`.background`);
const LOADER = document.querySelector(`.loader`);
const BTN_NEW_QUOTE = document.querySelector(`#new-quote`);
const BTN_TWEET_QUOTE = document.querySelector(`#tweet-quote`);


window.onload = () => getNewQuote();
BTN_NEW_QUOTE.addEventListener('click', getNewQuote);
BACKGROUND.addEventListener('load', getColor);

async function getNewQuote() {
	displayLoader(true);

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
	QUOTE.innerText = `"${quote.en}"`;
}

function displayImage(image) {
	BACKGROUND.src = `${image.url}`;
}

function getColor() {
	let colorPalette = COLOR_THIEF.getPalette(BACKGROUND);
	let primaryColor, secondaryColor;

	for (let i = 0; i < colorPalette.length; i++) {
		let luminance = parseInt(calcLuminance(colorPalette[i]));
		let contrastRatio = calcContrastRatio(luminance);

		if (contrastRatio >= 5) {
			primaryColor = `rgb(${colorPalette[i].join(",")})`;
			secondaryColor = `rgba(${colorPalette[i].join(",") + ",0.9"})`
			break;
		} else {
			primaryColor = `rgb(0,0,0)`;
			secondaryColor = `rgba(0,0,0,0.9)`;
		}
	}

	console.log(primaryColor, secondaryColor);
	document.documentElement.style.setProperty('--color-primary', primaryColor);
	document.documentElement.style.setProperty('--color-secondary', secondaryColor);
}

function calcLuminance(rgb) {
	let [r, g, b] = rgb;
	let luminance = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);

	return luminance.toFixed(2);
}

function calcContrastRatio(luminance) {
	return ((255 + 0.05) / (luminance + 0.05)).toFixed(2);
}