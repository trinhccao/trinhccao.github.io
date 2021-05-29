import language from '/modules/language.js';

const page = {
  useLang: function(lang) {
    lang = lang.toLowerCase();
    language.setPreferred(lang);
    location.href = `/${lang}/`;
  }
}

export default page;