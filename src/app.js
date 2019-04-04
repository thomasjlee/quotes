const QUOTES_URL = 'https://gist.githubusercontent.com/benchprep/dffc3bffa9704626aa8832a3b4de5b27/raw/quotes.json';

new Vue({
  el: '#app',
  data: {
    quotes: [],
    themes: [
      { text: 'All',    value: 'all' },
      { text: 'Movies', value: 'movies' },
      { text: 'Games',  value: 'games' }
    ],
    selectedTheme: 'all'
  },
  computed: {
    quotesByTheme: function () {
      switch (this.selectedTheme) {
        case 'movies':
          return this.quotes.filter(quote => quote.theme === 'movies');
        case 'games':
          return this.quotes.filter(quote => quote.theme === 'games');
        default:
          return this.quotes;
      }
    }
  },
  mounted: function() {
    fetch(QUOTES_URL)
      .then(response => response.json())
      .then(quotes => this.quotes = quotes)
      .catch(err => console.error(err));
  }
});