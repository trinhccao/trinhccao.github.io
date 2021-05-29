'use strict';
import language from './modules/language.js';
import page from './modules/page.js';

page.useLang( language.getPreferred() );