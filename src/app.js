const QUOTES_URL = 'https://gist.githubusercontent.com/benchprep/dffc3bffa9704626aa8832a3b4de5b27/raw/quotes.json';

new Vue({
  el: '#app',
  data: {
    quotes: [],
    selectedTheme: 'all',
    themes: [
      { text: 'All',    value: 'all' },
      { text: 'Movies', value: 'movies' },
      { text: 'Games',  value: 'games' }
    ],
    currentPage: 1,
    quotesPerPage: 15,
  },
  computed: {
    quotesByTheme: function() {
      switch (this.selectedTheme) {
        case 'all':
          return this.quotes;
        case 'movies':
          return this.quotes.filter(quote => quote.theme === 'movies');
        case 'games':
          return this.quotes.filter(quote => quote.theme === 'games');
      }
    },
    numPages: function() {
      return Math.ceil(this.quotesByTheme.length / this.quotesPerPage);
    },
  },
  methods: {
    updateSelectedTheme: function(theme) {
      this.selectedTheme = theme;
      this.currentPage = 1;
    },
    paginate: function(quotes) {
      const start = (this.currentPage - 1) * this.quotesPerPage;
      return quotes.slice(start, start + this.quotesPerPage);
    },
    prevPage: function() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage: function() {
      if (this.currentPage < this.numPages) {
        this.currentPage++;
      }
    },
  },
  mounted: function() {
    fetch(QUOTES_URL)
      .then(response => response.json())
      .then(quotes => this.quotes = quotes)
      .catch(err => console.error(err));
  },
});