const QUOTES_URL = 'https://gist.githubusercontent.com/benchprep/dffc3bffa9704626aa8832a3b4de5b27/raw/quotes.json';

new Vue({
  el: '#app',
  data: {
    allQuotes: [],
    selectedTheme: 'all',
    themes: [
      { text: 'All',    value: 'all' },
      { text: 'Movies', value: 'movies' },
      { text: 'Games',  value: 'games' }
    ],
    currentPage: 1,
    quotesPerPage: 15,
    searchInput: '',
  },
  computed: {
    quotes: function() {
      if (this.searchActive) {
        return this.searchResults;
      } else {
        return this.quotesByTheme;
      }
    },
    quotesByTheme: function() {
      switch (this.selectedTheme) {
        case 'all':
          return this.allQuotes;
        case 'movies':
          return this.allQuotes.filter(quote => quote.theme === 'movies');
        case 'games':
          return this.allQuotes.filter(quote => quote.theme === 'games');
      }
    },
    numPages: function() {
      return Math.ceil(this.quotes.length / this.quotesPerPage);
    },
    searchActive: function() {
      return Boolean(this.searchInput.length);
    },
    searchResults: function() {
      // TODO: Escape any characters that may not be valid in RegExp
      return this.quotesByTheme.filter(quote => {
        return new RegExp(this.searchInput, 'i').test(quote.quote);
      });
    },
    shouldPaginate: function() {
      if (this.searchActive) {
        return this.searchResults.length > 15;
      } else {
        return this.quotesByTheme.length > 15;
      }
    },
    quotesUnavailable: function() {
      if (this.searchActive && this.searchResults.length === 0) {
        this.quotesUnavailableMessage = 'No quotes match your query! (╯°□°)╯︵ ┻━┻';
        return true;
      } else if (this.quotesByTheme.length === 0) {
        this.quotesUnavailableMessage = 'Sorry, no quotes are available at this time. ¯\\_(ツ)_/¯';
        return true;
      }
    }
  },
  methods: {
    updateSelectedTheme: function(theme) {
      this.selectedTheme = theme;
      this.resetPage();
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
    resetPage: function() {
      this.currentPage = 1;
    },
  },
  mounted: function() {
    fetch(QUOTES_URL)
      .then(response => response.json())
      .then(quotes => this.allQuotes = quotes)
      .catch(err => console.error(err));
  },
});