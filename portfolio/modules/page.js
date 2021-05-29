import language from './language.js';

const page = {
  useLang: function(lang) {
    lang = lang.toLowerCase();
    language.setPreferred(lang);
    location.href = `/portfolio/${lang}/`;
  }
}

export default page;