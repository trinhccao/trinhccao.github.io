const language = {
  setPreference: (value) => {
    localStorage.setItem('language', value.toLowerCase());
  },
  getPreference: function() {
    return localStorage.getItem('language') || 'vi';
  },
  resetPreference: function() {
    localStorage.removeItem('language');
  }
}

export default language;