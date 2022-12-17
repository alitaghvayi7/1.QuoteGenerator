
let arrayQuotes;
let generatingQuote;
let activeQuote;
let requestCount = 0;

const quoteParagraph = document.querySelector('.quote-content>p');
const quoteAuthor = document.querySelector('.quote-author');
const loader = document.querySelector('.loader-container');
const newQuoteButton = document.querySelector('.new-quote');
const twitterQuoteSendButton = document.querySelector('.qutoe-twitt');

function createRandomNumber(number) {
    return Math.floor(Math.random() * number + 1);
}

async function getQuotes() {
    try {
        const response = await fetch('https://type.fit/api/quotes');
        const result = await response.json();
        return result;
    }
    catch (error) {
        throw new Error('Could Not Send Request.....!');
    }
}

function updateDom(quote) {
    quoteParagraph.textContent = quote.text;
    quoteAuthor.textContent = quote.author;
}

function toggleLoader() {
    if (generatingQuote) {
        loader.style.display = "flex";
    }
    else {
        loader.style.display = "none";
    }
}


async function GenerateQuote() {
    generatingQuote = true;
    toggleLoader();
    if (requestCount < 1) {
        arrayQuotes = await getQuotes();
    }
    activeQuote = arrayQuotes[createRandomNumber(arrayQuotes.length)];
    generatingQuote = false;
    toggleLoader();
    updateDom(activeQuote);
    requestCount++;
}

function tweetSend() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${activeQuote.text}`;
    window.open(twitterURL, '_blank');
}


window.addEventListener('load', () => {
    newQuoteButton.click();
});

newQuoteButton.addEventListener('click', GenerateQuote)
twitterQuoteSendButton.addEventListener('click', tweetSend)

