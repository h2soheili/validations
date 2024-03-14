import React  from 'react'
import { faLang , enLang } from './locales'

let UXIDLocale = 'fa';

let locales = {
    'en': {
        ...enLang
    }, 
    'fa': {
        ...faLang
    }
};

function setLocale (locale) {
    UXIDLocale = locale;
    return UXIDLocale
}

function getLocale (){
    return UXIDLocale
}

function getLocales(store) {
    let storage = locales
    if(store && typeof store === 'object') {
        storage = store
    }
    return storage
}

function locale(locale , store) {
    let defaultLocale = UXIDLocale;
    let storage = locales;

    if(locale && typeof locale === 'string'){
        defaultLocale = locale
    }

    if(store && typeof store === 'object') {
        storage = store
    }

    return {
        locale: defaultLocale,
        options: storage[defaultLocale]
    }
}

function addLocale(locale, options) {
    locales[locale] = { ...locales['en'], ...locales['fa'] , ...options };
}

function updateLocaleOption(key, value, locale) {
    localeOptions(locale)[key] = value;
}

function updateLocaleOptions(options, locale) {
    const _locale = locale || UXIDLocale;
    locales[_locale] = { ...locales[_locale], ...options };
}

function localeOption(key, store , locale) {
    let defaultLocale = locale || UXIDLocale 
    try {
        return localeOptions(defaultLocale , store)[key];
    }
    catch(error) {
        throw new Error(`The ${key} option is not found in the current locale('${locale || UXIDLocale}').`);
    }
}

function localeOptions(locale , store) {
    const _locale = locale ||UXIDLocale;
    const storage = store || locales
    return storage[_locale];
}

function injectIntl (Comp , store , locale) {
    const storage = store || locales 
    const _locale = locale || UXIDLocale;
    return class extends React.Component {
        render() {
           return <Comp locale={UXIDLocale} intlOptions={storage[_locale]} {...this.props} />
        }
     }
}

export { 
    locale,
    getLocales ,
    setLocale ,
    getLocale,
    addLocale,
    updateLocaleOption,
    updateLocaleOptions,
    localeOption,
    localeOptions ,
    injectIntl,
};
