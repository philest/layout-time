import i18n from 'react-native-i18n'

i18n.fallbacks = true

const languageCode = i18n.locale.substr(0,2)

i18n.translations = {
  es: require('./es.json'),
  en: require('./english.json'),
}

export const setTranslation = (locale) => {
  switch(locale){
  	case 'af':
  	  i18n.translations.af = require('./af.json');
  	  break;
  	case 'am':
  	  i18n.translations.am = require('./am.json');
  	  break;
  	case 'ar':
  	  i18n.translations.ar = require('./ar.json');
  	  break;
  	case 'bg':
  	  i18n.translations.bg = require('./bg.json');
  	  break;
  	case 'ca':
  	  i18n.translations.ca = require('./ca.json');
  	  break;
  	case 'cs':
  	  i18n.translations.cs = require('./cs.json');
  	  break;
  	case 'da':
  	  i18n.translations.da = require('./da.json');
  	  break;
  	case 'de':
  	  i18n.translations.de = require('./de.json');
  	  break;
  	case 'el':
  	  i18n.translations.el = require('./el.json');
  	  break;
  	case 'es':
  	  i18n.translations.es = require('./es.json');
  	  break;
  	case 'et':
  	  i18n.translations.et = require('./et.json');
  	  break;
  	case 'fi':
  	  let addCode = i18n.locale.substr(0,3);
  	  if (addCode == 'fil'){
  	    i18n.translations.fil = require('./fil.json');
  	  } else {
  	    i18n.translations.fi = require('./fi.json');
  	  }
  	  break;
  	case 'fr':
  	  i18n.translations.fr = require('./fr.json');
  	  break;
  	case 'he':
  	  i18n.translations.he = require('./he.json');
  	  break;
  	case 'hi':
  	  i18n.translations.hi = require('./hi.json');
  	  break;
  	case 'hr':
  	  i18n.translations.hr = require('./hr.json');
  	  break;
  	case 'hu':
  	  i18n.translations.hu = require('./hu.json');
  	  break;
  	case 'in':
  	  i18n.translations.in = require('./id.json');
  	  break;
  	case 'id':
  	  i18n.translations.id = require('./id.json');
  	  break;
  	case 'it':
  	  i18n.translations.it = require('./it.json');
  	  break;
  	case 'ja':
  	  i18n.translations.ja = require('./ja.json');
  	  break;
  	case 'ko':
  	  i18n.translations.ko = require('./ko.json');
  	  break;
  	case 'lt':
  	  i18n.translations.lt = require('./lt.json');
  	  break;
  	case 'lv':
  	  i18n.translations.lv = require('./lv.json');
  	  break;
  	case 'ms':
  	  i18n.translations.ms = require('./ms.json');
  	  break;
  	case 'nb':
  	  i18n.translations.nb = require('./nb.json');
  	  break;
  	case 'nl':
  	  i18n.translations.nl = require('./nl.json');
  	  break;
  	case 'no':
  	  i18n.translations.no = require('./no.json');
  	  break;
  	case 'pl':
  	  i18n.translations.pl = require('./pl.json');
  	  break;
  	case 'pt':
  	  i18n.translations.pt = require('./pt.json');
  	  break;
  	case 'ro':
  	  i18n.translations.ro = require('./ro.json');
  	  break;
  	case 'ru':
  	  i18n.translations.ru = require('./ru.json');
  	  break;
  	case 'sl':
  	  i18n.translations.sl = require('./sl.json');
  	  break;
  	case 'sk':
  	  i18n.translations.sk = require('./sk.json');
  	  break;
  	case 'sr':
  	  i18n.translations.sr = require('./sr.json');
  	  break;
  	case 'sv':
  	  i18n.translations.sv = require('./sv.json');
  	  break;
  	case 'sw':
  	  i18n.translations.sw = require('./sw.json');
  	  break;
  	case 'th':
  	  i18n.translations.th = require('./th.json');
  	  break;
  	case 'tr':
  	  i18n.translations.tr = require('./tr.json');
  	  break;
  	case 'uk':
  	  i18n.translations.uk = require('./uk.json');
  	  break;
  	case 'vi':
  	  i18n.translations.vi = require('./vi.json');
  	  break;
  	case 'zh':
  	  i18n.translations.zh = require('./zh.json');
  	  break;
  	case 'zu':
  	  i18n.translations.zu = require('./zu.json');
  	  break;
  }
}
