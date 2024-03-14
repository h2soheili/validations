import { getLocale , getLocales} from '../utils/locale'

const DefaultErrorMessage = getLocales();

const RequiredValidation = (val , key) => (errors) =>{
    if (!val[key]) {
       const lang = getLocale();
       errors[key] = `${DefaultErrorMessage[lang].RequiredValidation}`;
    }
}

const LengthValidation = (data , key , length) => (errors) => {
    if(!(data[key] && data[key].length === length )){
        const lang = getLocale();
       errors[key] = `${DefaultErrorMessage[lang].LengthValidation}`
    }
}

const MinLengthValidation = (data , key , minLength) => (errors) => {
    if(!(data[key] && data[key].length >= minLength)){
        const lang = getLocale();
       errors[key] = `${DefaultErrorMessage[lang].MinLengthValidation}`
    }
}

const MaxLengthValidation = (data , key , maxLength) => (errors) => {
    if(!(data[key] && data[key].length <= maxLength)){
        const lang = getLocale();
       errors[key] = `${DefaultErrorMessage[lang].MaxLengthValidation}`
    }
}

const MinNumberValidation = (data , key , minNumber) => (errors) => {
    if(!(data[key] && data[key]>= minNumber)){
        const lang = getLocale();
       errors[key] = `${DefaultErrorMessage[lang].MinNumberValidation}`
    }
}

const MaxNumberValidation = (data , key , maxNumber) => (errors) => {
    if(!(data[key] && data[key] <= maxNumber)){
        const lang = getLocale();
       errors[key] = `${DefaultErrorMessage[lang].MaxNumberValidation}`
    }
}

const MinPriceValidation = (data , key , minPrice) => (errors) => {
    if(!(data[key] && String(data[key].split(/,| ریال/).join("")) >= minPrice)){
        const lang = getLocale();
       errors[key] = `${DefaultErrorMessage[lang].MinPriceValidation}`
    }
}

const MaxPriceValidation = (data , key , maxPrice) => (errors) => {
    if(!(data[key] && String(data[key].split(/,| ریال/).join("")) <= maxPrice)){
        const lang = getLocale();
       errors[key] = `${DefaultErrorMessage[lang].MaxPriceValidation}`
    }
}

const MobileValidation = (data , key) => (errors) => {
    if(!(/(^9[0-9]{9}$)|(^09[0-9]{9}$)/.test(data[key]))){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].Mobile}`;
    }
}

const TelValidation = (data , key) => (errors) => {
    if(!(/(^[0-9]{4,15}$)/.test(data[key]))){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].TelValidation}`
    }
}

const FarsiValidation = (data , key) => (errors) => {
    if(!(/^[\u0600-\u06FF\s]+$/.test(data[key]))){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].FarsiValidation}`
    }
}

const NumericValidation = (data , key) => (errors) => {
    if(!(/^[0-9]+$/.test(data[key]))){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].NumericValidation}`
    }
}

const EnglishValidation = (data , key) => (errors) => {
    if(!(/^[a-zA-Z\s]+$/i.test(data[key]))){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].EnglishValidation}`
    }
}

const EmailValidation = (data , key) => (errors) => {
    if(!(/^[^\s()<>@,;:/]+@\w[\w.-]+\.[a-z]{2,}$/i.test(data[key]))){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].EmailValidation}`
    }
}

const PostalCodeValidation = (data , key) => (errors) => {
    if(!(/\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/g.test(data[key]))){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].PostalCodeValidation}`
    }
}

const DomainValidation = (data , key) => (errors) => {
    if(!(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(data[key]))){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].DomainValidation}`
    }
}

const EnglishFullValidation = (data , key) => (errors) => {
    if(!(/^[0-9a-zA-Z .!?]+$/i.test(data[key]))){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].EnglishFullValidation}`
    }
}

const NationalCodeValidation = (data , key) => (errors) => {
    let validate = false;
    if (data[key] && data[key].length === 10) {
      const nationalCode = data[key].split("");
      let num = nationalCode.map((n, index) => {
        if (10 - index > 1) return n * (10 - index);
        return 0;
      });
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let res = Math.floor(num.reduce(reducer) % 11);
      if (res >= 2) {
        11 - res === parseInt(nationalCode[9])
          ? (validate = true)
          : (validate = false);
      } else {
        res === parseInt(nationalCode[9]) ? (validate = true) : (validate = false);
      }
    }
    if(!validate){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].NationalCodeValidation}`
    }
};

const NationalIdValidation = (data , key) => (errors) => {
    let validate = false;
    if (data[key] && data[key].length === 11) {
      const nationalId = data[key].split("");
      nationalId.splice(10, 1)
      const last_num = nationalId[nationalId.length - 1];
      const times = [29, 27, 23, 19, 17, 29, 27, 23, 19, 17]
  
      let num = nationalId.map((n, index) => {
        return ((parseInt(n)) + parseInt(last_num) + 2) * times[index]
      });
  
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let res = Math.floor(num.reduce(reducer) % 11);
  
      if (res.toString().length === 1) {
        parseInt(data[key].split("")[10]) === res ? (validate = true) : (validate = false)
      } else if (res.toString().length > 1) {
        parseInt(res.toString()[1]) === data[key].split("")[10] ? (validate = true) : (validate = false)
      }
    }
    if(!validate){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].NationalIdValidation}`
    }
};

const InclusiveNoValidation = (data , key) => (errors) => {
    let validate = false;
    if (data[key] && data[key].length <= 25) {
      const pcode = data[key].split("");
      pcode.splice(pcode.length - 1, 1)
      let togen = pcode;
      let total = 0;
      let counter = 0;
      let situation = 'odd'
      let curval = 0;
  
      togen.map((n, index) => {
        counter = togen.length - (index + 1);
        if (counter >= -1) {
          if (situation === 'odd') {
            curval = parseInt(n) * 2;
            return  curval = curval > 9 ? curval - 9 : curval;
          } else if (situation === 'even') {
            return curval = parseInt(n);
          }
          total = total + curval;
         return situation = situation === 'odd' ? 'even' : 'odd'
        }
        return null;
      })
      let mod = total % 10;
      if (mod !== 0) {
        mod = 10 - mod;
        parseInt(data[key].split("")[data[key].split("").length - 1]) === mod ? (validate = true) : (validate = false);
      } else {
        parseInt(data[key].split("")[data[key].split("").length - 1]) === mod ? (validate = true) : (validate = false);
      }
    }
    if(!validate){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].InclusiveNoValidation}`
    }
};

const validateNationalCardSeriSerial = (value) => {
    let validate = false;
    if (value && value.length >=8 && value.length <=10) {
      validate = true;
    }
    return validate;
};

const NationalCardSeriSerialValidation = (data , key) => (errors) => {
      if(!(/(^[0-9]{8,10}$)/.test(data[key]) && validateNationalCardSeriSerial(data[key]))){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].NationalCardSeriSerialValidation}`
      }
};

const CardNumberValidation = (data , key) => (errors) => {
    let validate = false;
    let sum = 0;
    if (data[key] && data[key].length === 16) {
      const cardNo = data[key].split("");
      cardNo.map((n, index) => {
        let result = 0;
        if ((index + 1) % 2 === 0) {
          result = n * 1 > 9 ? n * 1 - 9 : n * 1;
        } else {
          result = n * 2 > 9 ? n * 2 - 9 : n * 2;
        }
        return sum = sum + result;
      });
      validate = sum % 10 === 0 ? true : false;
    }
    if(!validate){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].CardNumberValidation}`
    }
};

const ShebaNumberValidation = (data , key) => (errors) => {
    let value = data[key]
    var rearranged = value.substring(4, value.length) + value.substring(0, 4);
    var numeric = Array.from(rearranged)
      .map(function (c) {
        return isNaN(parseInt(c)) ? (c.charCodeAt(0) - 55).toString() : c;
      })
      .join("");
    var remainder = Array.from(numeric)
      .map(function (c) {
        return parseInt(c);
      })
      .reduce(function (remainder, value) {
        return (remainder * 10 + value) % 97;
      }, 0);

      if(!(remainder === 1)){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].ShebaNumberValidation}`
    }
};

const AccountNumberValidaiton = (data , key) => (errors) => {
    let validate = false;
    let value = data[key]
    if (value && value.length >= 3) {
      let chdg = value.substring(value.length - 2, value.length);
      let accNo = value.substring(0, value.length - 2);
      let checkDgt = 0, zarib = 7, accLen;
      accLen = accNo.length;
      for (let i = 0; i < accNo.length; i++) {
        let dg = accNo.substr(accLen - 1, 1);
        checkDgt = checkDgt + (zarib * dg);
        zarib = zarib === 7 ? 3 : 7;
        accLen = accLen - 1;
      }
      checkDgt = (checkDgt + 101) % 97;
      checkDgt = checkDgt.length < 2 ? "0".concat(checkDgt) : checkDgt;
      return Number(checkDgt) !== Number(chdg) ? false : true;
    }
    if(!validate){
        const lang = getLocale();
        errors[key] = `${DefaultErrorMessage[lang].AccountNumberValidaiton}`
    }
};

export {
    RequiredValidation , 
    MobileValidation,
    TelValidation,
    FarsiValidation,
    NumericValidation,
    EnglishValidation,
    EmailValidation,
    PostalCodeValidation,
    DomainValidation,
    EnglishFullValidation,
    LengthValidation,
    MinLengthValidation,
    MaxLengthValidation,
    MinNumberValidation,
    MaxNumberValidation,
    MinPriceValidation,
    MaxPriceValidation,
    NationalCodeValidation,
    NationalIdValidation,
    InclusiveNoValidation,
    NationalCardSeriSerialValidation,
    CardNumberValidation,
    ShebaNumberValidation,
    AccountNumberValidaiton,
}