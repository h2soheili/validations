import moment from "moment-jalaali";
// import PrintLayout from './print-layout.html';

export const convertToMoney = (x) =>
  `${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
export const convertNumberToDate = (x) =>
  x.toString().replace(/(\d{4})(\d{2})(\d{2})/g, "$1/$2/$3");
export const convertToJalali = (x) => moment(x).format("jYYYY/jM/jD");

export const validationBlurWrapper = (
  validations = [(val) => ({ validate: true })],
  setErrorMessage = (val) =>
    console.log("nothing implemented for error: ", val),
  blurFunc = (event) => {}
) => (event) => {
  let validationsList =
    typeof validations === "function" ? [validations] : validations;
  let validationTarget = validationsList.find((validation) => {
    let validationResult = validation(event.target.value);
    return !validationResult.validate;
  });
  if (validationTarget) {
    let valResult = validationTarget(event.target.value);
    setErrorMessage(valResult.message);
  } else {
    setErrorMessage("");
  }
  blurFunc(event);
};

export const validateNationalCode = (value) => {
  let validate = false;
  if (value && value.length === 10) {
    const nationalCode = value.split("");
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
  return validate;
};

export const validateCardNumber = (value) => {
  let validate = false;
  let sum = 0;
  if (value && value.length === 16) {
    const cardNo = value.split("");
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
  return validate;
};

export const validateAccountNumber = (value) => {
  let validate = false;
  if (value && value.length >= 3) {
    let chdg = value.substring(value.length - 2, value.length) ;
    let accNo = value.substring(0, value.length-2) ;
  let checkDgt = 0 ,zarib = 7 ,accLen;
  accLen = accNo.length;
    for (let i = 0; i < accNo.length; i++) {
      let dg =accNo.substr(accLen-1 , 1);
      checkDgt = checkDgt + (zarib * dg);
      zarib = zarib === 7 ?  3 : 7;
      accLen = accLen - 1;
    }
    checkDgt =(checkDgt + 101) % 97;
    checkDgt = checkDgt.length < 2 ? "0".concat(checkDgt) : checkDgt;
    return Number(checkDgt) !== Number(chdg) ? false : true;
  }
  return validate;
};

export const validateShebaNumber = (value) => {
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
  return remainder === 1;
};

export const regex = {
  Farsi: /^[\u0600-\u06FF\s]+$/,
  Numeric: /^[0-9]+$/,
  English: /^[a-zA-Z\s]+$/i,
  EnglishFull: /^[0-9a-zA-Z .!?]+$/i,
};

export const defaultDirection = "rtl";

export const mapOrder = (array, order, key) => {
  array.sort(function (a, b) {
    var A = a[key],
      B = b[key];
    if (order.indexOf(A + "") > order.indexOf(B + "")) {
      return 1;
    } else {
      return -1;
    }
  });
  return array;
};

export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return dd + "." + mm + "." + yyyy;
};

export const getCurrentTime = () => {
  const now = new Date();
  return now.getHours() + ":" + now.getMinutes();
};

export const getDirection = () => {
  let direction = defaultDirection;
  if (localStorage.getItem("direction")) {
    const localValue = localStorage.getItem("direction");
    if (localValue === "rtl" || localValue === "ltr") {
      direction = localValue;
    }
  }
  return {
    direction,
    isRtl: direction === "rtl",
  };
};

export const setDirection = (localValue) => {
  let direction = "ltr";
  if (localValue === "rtl" || localValue === "ltr") {
    direction = localValue;
  }
  localStorage.setItem("direction", direction);
};

export const checkValidation = (
  data,
  validationData,
  hndlNextSteps,
  setValidationData,
  dependentData = {}
) => (event) => {
  if (validationData === {}) {
    hndlNextSteps(event);
    return;
  }
  let [errorResult, hasError] = Object.entries(validationData).reduce(
    (acc, [key, value]) => {
      if (!value.validations || value.validations.length === 0) return acc;
      return value.validations.reduce((acc2, validation) => {
        let inputValue = data[key];
        let res = validation(inputValue);
        if (
          dependentData &&
          dependentData.hasOwnProperty(key) &&
          typeof res === "function"
        ) {
          res = validation(data[dependentData[key]])(inputValue);
        }
        if (!res.validate) {
          acc2[0][key].error = res.message;
          acc2[1] = true;
        } else if (acc2[0][key].error) {
          delete acc2[0][key].error;
        }
        return acc2;
      }, acc);
    },
    [validationData, false]
  );

  if (
    hasError ||
    Object.values(errorResult).find((i) => i.hasOwnProperty("error"))
  ) {
    setValidationData({ ...errorResult });
  } else {
    hndlNextSteps(event);
  }
};

export const printPreview = (Page) => (event) => {
  // let myWindow = window.open("", "", "titlebar");
  // // myWindow.document.write('<link rel="stylesheet" href="./style.min.css">');
  // myWindow.document.write(
  //   // Page
  //   PrintLayout + Page +
  //     "<button class='print-button no-print'>پرینت</button>"
  // );
  // myWindow.addEventListener(
  //   "click",
  //   async () => {
  //     myWindow.print();
  //   },
  //   false
  // );
};
// export const checkValidationItem = (value, validationData, [handleSuccessFunction, ...args], setValidationData) => {
//   console.log("here");
//   console.log(validationData);

//   if (!validationData.validations || validationData.validations.length === 0) return;

//   let [errorResult, hasError] = validationData.validations.reduce((acc, validation) => {
//     let res = validation(value || undefined);
//     if (!res.validate) {
//       acc[0].error = res.message;
//       acc[1] = true;
//     } else if (acc[0].error) {
//       delete acc[0].error;
//     }
//     return acc;
//   }, [validationData, false]);

//   console.log("here");
//   console.log(hasError || Object.values(errorResult).find(i => i.hasOwnProperty("error")));

//   if (hasError || Object.values(errorResult).find(i => i.hasOwnProperty("error"))) {
//     console.log(1);

//     setValidationData({ ...errorResult });
//   } else {
//     console.log(2);
//     handleSuccessFunction(...args);
//   }
// };

let selected = 0;
export const keybinding = (e) => {
  const li = document.querySelectorAll(
    ".modal-md.modal-dialog li.list-group-item"
  );
  if (li.length === 0) {
    document.removeEventListener("keydown", keybinding);
    return;
  }
  if (e.code === "ArrowDown") {
    if (li.length - 1 > selected && selected >= 0) {
      if (li.length - 1 > selected) {
        li[selected].classList.remove("select");
        selected++;
        li[selected].classList.add("select");
      } else {
        selected = 0;
        li[selected].classList.remove("select");
      }
    } else {
      if (selected === -1) {
        selected = 0;
        li[selected].classList.add("select");
      } else {
        li[selected].classList.remove("select");
        selected = 0;
        li[selected].classList.add("select");
      }
    }
  } else if (e.code === "ArrowUp") {
    if (selected > -1) {
      if (selected > 0) {
        li[selected].classList.remove("select");
        selected--;
        li[selected].classList.add("select");
      } else {
        li[selected].classList.remove("select");
        selected = li.length - 1;
        li[selected].classList.add("select");
      }
    } else {
      if (selected === -1) {
        selected = li.length - 1;
        li[selected].classList.add("select");
      } else {
        li[selected].classList.remove("select");
        selected = li.length - 1;
      }
    }
  } else if (e.key === "Enter") {
    if (selected > -1 && li[selected]) {
      const clickTarget = document.querySelector(
        ".modal-md.modal-dialog li.list-group-item.select"
      );
      clickTarget && clickTarget.click();
    }
  }
};

export const PersianNumToStringNum = (num) => {
  try {
    let negative = "";
    if (
      (!num && num !== 0) ||
      isNaN(num) === true ||
      (typeof num !== "number" && typeof num !== "string")
    )
      return "";

    if (num % 1 !== 0 && num % 1 !== -0) {
      num = Math.floor(num * 1);
    }
    if (Math.sign(num) === -1) {
      num *= -1;
      negative = " منفی ";
    } else if (Math.sign(num) !== -1) {
      negative = "";
    }

    const spliter = " و ";
    const zero = "صفر";
    const Letters = [
      ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"],
      [
        "ده",
        "یازده",
        "دوازده",
        "سیزده",
        "چهارده",
        "پانزده",
        "شانزده",
        "هفده",
        "هجده",
        "نوزده",
        "بیست",
      ],
      ["", "", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"],
      [
        "",
        "صد",
        "دویست",
        "سیصد",
        "چهارصد",
        "پانصد",
        "ششصد",
        "هفتصد",
        "هشتصد",
        "نهصد",
      ],
      [
        "",
        " هزار ",
        " میلیون ",
        " میلیارد ",
        " تریلیون ",
        " تریلیارد ",
        " کوآدریلیون ",
        " کادریلیارد ",
        " کوینتیلیون ",
        " کوانتینیارد ",
        " سکستیلیون ",
        " سکستیلیارد ",
        " سپتیلیون ",
        " سپتیلیارد ",
        " اکتیلیون ",
        " اکتیلیارد ",
        " نانیلیون ",
        " نانیلیارد ",
        " دسیلیون ",
        " دسیلیارد ",
      ],
    ];
    if (typeof num === "number") {
      num = num.toString();
    }
    const NumberLength = num.length % 3;
    if (NumberLength === 1) {
      num = "00" + num;
    } else if (NumberLength === 2) {
      num = "0" + num;
    }
    // Explode to array
    const reg = num.replace(/\d{3}(?=\d)/g, "$&*").split("*");
    if (
      parseInt(num, 0) === 0 ||
      num === "" ||
      num === null ||
      num === undefined
    ) {
      return zero;
    }
    if (num.length > 66) {
      return "خارج از محدوده";
    }
    // Split to sections
    const SplitedNumber = reg;
    // Fetch Sections and convert
    const funcout = [];
    const SplitLength = SplitedNumber.length;
    for (let i = 0; i < SplitLength; i += 1) {
      const SectionTitle = Letters[4][SplitLength - (i + 1)];
      const converted = ThreeNumbersToLetter(
        SplitedNumber[i],
        Letters,
        spliter
      );
      if (converted !== "") {
        funcout.push(converted + SectionTitle);
      }
    }
    return negative + funcout.join(spliter);
  } catch (e) {
    return "";
  }
};

const ThreeNumbersToLetter = (num, Letters, spliter) => {
  let one;
  let ten;

  if (parseInt(num, 0) === 0) {
    return "";
  }
  const parsedInt = parseInt(num, 0);
  if (parsedInt < 10) {
    return Letters[0][parsedInt];
  }
  if (parsedInt <= 20) {
    return Letters[1][parsedInt - 10];
  }
  if (parsedInt < 100) {
    one = parsedInt % 10;
    ten = (parsedInt - one) / 10;
    if (one > 0) {
      return Letters[2][ten] + spliter + Letters[0][one];
    }
    return Letters[2][ten];
  }
  one = parsedInt % 10;
  const hundreds = (parsedInt - (parsedInt % 100)) / 100;
  ten = (parsedInt - (hundreds * 100 + one)) / 10;
  const out = [Letters[3][hundreds]];
  const SecendPart = ten * 10 + one;
  if (SecendPart > 0) {
    if (SecendPart < 10) {
      out.push(Letters[0][SecendPart]);
    } else if (SecendPart <= 20) {
      out.push(Letters[1][SecendPart - 10]);
    } else {
      out.push(Letters[2][ten]);
      if (one > 0) {
        out.push(Letters[0][one]);
      }
    }
  }
  return out.join(spliter);
};
