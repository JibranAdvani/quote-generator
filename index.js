const tweet = document.querySelector('.quote-container__buttons--tweet');
const generate = document.querySelector('.quote-container__buttons--generate');
const quote = document.querySelector('.quote-container--text');
const author = document.querySelector('.quote-container--author');
const container = document.querySelector('.quote-container');
const loader = document.querySelector('.loader');


window.addEventListener('load', getQuotes);
window.addEventListener('keydown', (e) => {
  if (e.code === "KeyR") {
    getQuotes();
    // console.log(e);
  }
});
generate.addEventListener('click', getQuotes);

function showLoader () {
  container.hidden = true;
  loader.hidden = false;
}

function hideLoader () {
  container.hidden = false;
  loader.hidden = true;
}

function tweetQuote () {
  const postQuote = quote.textContent;
  const postAuthor = author.textContent;
  const twitterAddress = `https://twitter.com/intent/tweet?text=${postQuote} ${postAuthor}`;
  window.open(twitterAddress, '_blank');
}

async function getQuotes () {
  const apiURL = 'https://type.fit/api/quotes';
  try {
    showLoader();
    const response = await fetch(apiURL);
    const data = await response.json();
    const finalQuote = data[parseInt(Math.random() * 1600)];
    if (finalQuote.text.length > 100) {
      quote.style.fontWeight = 300;
      quote.style.fontSize = 16;
    }
    quote.textContent = finalQuote.text;

    if (finalQuote.author === null) {
      author.textContent = '\u2015 unknown';  
    } else {
      author.textContent = `\u2015 ${finalQuote.author}`;
    }
    hideLoader();
    console.log(finalQuote);
  } catch (err) {
    console.log(err);
    getQuotes();
  }
}

tweet.addEventListener('click', tweetQuote);