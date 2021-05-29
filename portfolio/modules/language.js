const language = {
  setPreferred: (value) => {
    localStorage.setItem('language', value.toLowerCase());
  },
  getPreferred: function() {
    return localStorage.getItem('language') || 'en';
  },
  resetPreferred: function() {
    localStorage.removeItem('language');
  }
}

export default language;