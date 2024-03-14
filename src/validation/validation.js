import moment from "moment-jalaali";
import {
  validateNationalCode,
  validateNationalId,
  validateInclusiveNo,
  validateNationalCardSeriSerial,
  validateCardNumber,
  validateShebaNumber,
  validateAccountNumber,
} from "./../utils/utils";

const DefaultErrorMessage = {
  RequiredValidation: "validation failed for RequiredValidation",
  MobileValidation: "validation failed for MobileValidation",
  TelValidation: "validation failed for TelValidation",
  NationalCodeValidation: "validation failed for NationalCodeValidation",
  NationalIdValidation: "validation failed for NationalIdValidation",
  InclusiveNoValidation: "validation failed for InclusiveNoValidation",
  CustomerIdValidation: "validation failed for CustomerIdValidation",
  NationalCardSeriSerialValidation: "validation failed for NationalCardSeriSerialValidation",
  CardNumberValidation: "validation failed for CardNumberValidation",
  AccountNumberValidation: "validation failed for AccountNumberValidation",
  ShebaNumberValidation: "validation failed for ShebaNumberValidation",
  FarsiValidation: "validation failed for FarsiValidation",
  NumericValidation: "validation failed for NumericValidation",
  LengthValidation: "validation failed for LengthValidation",
  MinLengthValidation: "validation failed for MinLengthValidation",
  MaxLengthValidation: "validation failed for MaxLengthValidation",
  MinNumberValidation: "validation failed for MinNumberValidation",
  MaxNumberValidation: "validation failed for MaxNumberValidation",
  MinPriceValidation: "validation failed for MinPriceValidation",
  MaxPriceValidation: "validation failed for MaxPriceValidation",
  EnglishValidation: "validation failed for EnglishValidation",
  EnglishFullValidation: "validation failed for EnglishFullValidation",
  EmailValidation: "validation failed for EmailValidation",
  PostalCodeValidation: "validation failed for PostalCodeValidation",
  DomainValidation: "validation failed for DomainValidation",
  DateValidation: "validation failed for DateValidation",
  PasswordSimpleValidation: "validation failed for PasswordSimpleValidation",
  PasswordComplexValidation: "validation failed for PasswordComplexValidation",
  IsjalaliDateValidation: "validation failed for IsjalaliDateValidation",
  IsDateValidation: "validation failed for IsDateValidation",
  IsDateBeforeValidation: "validation failed for IsDateBeforeValidation",
  IsDateBeforeOrSameValidation:
    "validation failed for IsDateBeforeOrSameValidation",
  IsDateAfterValidation: "validation failed for IsDateAfterValidation",
  IsDateAfterOrSameValidation:
    "validation failed for IsDateAfterOrSameValidation",
};

/**
 * Validation function
 * @constructor
 * @param {(string|number)} val - value of input which comes from event.target.value
 * @returns {(object):{validate:boolean,message:string}} It returns an object with two properties,validate and message
 */
const RequiredValidation = (val) => ({
  validate: !!val,
  message: DefaultErrorMessage.RequiredValidation,
});
const MobileValidation = (val) => ({
  validate: /(^9[0-9]{9}$)|(^09[0-9]{9}$)/.test(val),
  message: DefaultErrorMessage.MobileValidation,
});
const TelValidation = (val) => ({
  validate: /(^[0-9]{4,15}$)/.test(val),
  message: DefaultErrorMessage.TelValidation,
});
// const NationalCodeValidation = (val) => ({ validate: /(^[0-9]{10}$)/.test(val), message: DefaultErrorMessage.NationalCodeValidation });
const FarsiValidation = (val) => ({
  validate: /^[\u0600-\u06FF\s]+$/.test(val),
  message: DefaultErrorMessage.FarsiValidation,
});
const NumericValidation = (val) => ({
  validate: /^[0-9]+$/.test(val),
  message: DefaultErrorMessage.NumericValidation,
});
const EnglishValidation = (val) => ({
  validate: /^[a-zA-Z\s]+$/i.test(val),
  message: DefaultErrorMessage.EnglishValidation,
});
const EnglishFullValidation = (val) => ({
  validate: /^[0-9a-zA-Z .!?]+$/i.test(val),
  message: DefaultErrorMessage.EnglishFullValidation,
});
const EmailValidation = (val) => ({
  validate: /^[^\s()<>@,;:/]+@\w[\w.-]+\.[a-z]{2,}$/i.test(val),
  message: DefaultErrorMessage.EmailValidation,
});
const PostalCodeValidation = (val) => ({
  validate: /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/g.test(val),
  message: DefaultErrorMessage.PostalCodeValidation,
});
const DomainValidation = (val) => ({
  validate: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
    val
  ),
  message: DefaultErrorMessage.DomainValidation,
});
const DateValidation = (val) => {
  try {
    new Date(val);
    return { vali: true, message: "" };
  } catch {
    return { validate: false, message: DefaultErrorMessage.DateValidation };
  }
};
const PasswordSimpleValidation = (val) => ({
  validate: /^[a-zA-Z0-9~!@#$%^&*_+-]{6,}/i.test(val),
  message: DefaultErrorMessage.PasswordSimpleValidation,
});
const PasswordComplexValidation = (val) => ({
  validate: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!@#$%^&*_+-]{8,}$/.test(
    val
  ),
  message: DefaultErrorMessage.PasswordComplexValidation,
});
const NationalCodeValidation = (val) => ({
  validate: /(^[0-9]{10}$)/.test(val) && validateNationalCode(val),
  message: DefaultErrorMessage.NationalCodeValidation,
});
const NationalIdValidation = (val) => ({
  validate: /(^[0-9]{11}$)/.test(val) && validateNationalId(val),
  message: DefaultErrorMessage.NationalIdValidation,
});
const InclusiveNoValidation = (val) => ({
  validate: /(^[0-9]{0,25}$)/.test(val) && validateInclusiveNo(val),
  message: DefaultErrorMessage.InclusiveNoValidation,
});
const CustomerIdValidation = (val) => ({
  validate: validateNationalCode(val) || validateNationalId(val) || validateInclusiveNo(val),
  message: DefaultErrorMessage.CustomerIdValidation,
});
const NationalCardSeriSerialValidation = (val) => ({
  validate: /(^[0-9]{8,10}$)/.test(val) && validateNationalCardSeriSerial(val),
  message: DefaultErrorMessage.NationalCardSeriSerialValidation,
});
const CardNumberValidation = (val) => ({
  validate: validateCardNumber(val),
  message: DefaultErrorMessage.CardNumberValidation,
});
const AccountNumberValidation = (val) => ({
  validate: validateAccountNumber(val),
  message: DefaultErrorMessage.AccountNumberValidation,
});
const ShebaNumberValidation = (val) => ({
  validate: validateShebaNumber(val),
  message: DefaultErrorMessage.ShebaNumberValidation,
});
/**
 * Validation function
 * @constructor
 * @param {(number)} criteria:(minLength || maxLength || minNumber || maxNumber)
 * @param {(string|number)} val - value of input which comes from event.target.value
 * @returns {(object):{validate:boolean,message:string}} It returns an object with two properties,validate and message
 */
const LengthValidation = (length) => (val) => ({
  validate: val && val.length === length,
  message: DefaultErrorMessage.LengthValidation,
});
const MinLengthValidation = (minLength) => (val) => ({
  validate:  val && val.length >= minLength,
  message: DefaultErrorMessage.MinLengthValidation,
});
const MaxLengthValidation = (maxLength) => (val) => ({
  validate:  val && val.length <= maxLength,
  message: DefaultErrorMessage.MaxLengthValidation,
});
const MinNumberValidation = (minNumber) => (val) => ({
  validate: val && val >= minNumber,
  message: DefaultErrorMessage.MinNumberValidation,
});
const MaxNumberValidation = (maxNumber) => (val) => ({
  validate:  val <= maxNumber,
  message: DefaultErrorMessage.MaxNumberValidation,
});
const MinPriceValidation = (minPrice) => (val) => ({
  validate:  val &&
    String(val)
      .split(/,| ریال/)
      .join("") &&
    String(val)
      .split(/,| ریال/)
      .join("") <= minPrice,
  message: DefaultErrorMessage.MinPriceValidation,
});
const MaxPriceValidation = (maxPrice) => (val) => ({
  validate:  val && 
    String(val)
      .split(/,| ریال/)
      .join("") &&
    String(val)
      .split(/,| ریال/)
      .join("") <= maxPrice,
  message: DefaultErrorMessage.MaxPriceValidation,
});
/**
 * date Validation function
 * @constructor
 * @param {(string)} format:data Format
 * @param {(string)} val - value of input which should be a date
 * @returns {(object):{validate:boolean,message:string}} It returns an object with two properties,validate and message
 */
const IsjalaliDateValidation = (format = "jYYYYjMMjDD") => (val) => ({
  validate: moment(val, format).isValid(),
  message: DefaultErrorMessage.IsjalaliDateValidation,
});
const IsDateValidation = (val) => ({
  validate: moment(val).isValid(),
  message: DefaultErrorMessage.IsDateValidation,
});
const IsDateBeforeValidation = (
  targetDate,
  inputDateformat = "jYYYYjMMjDD",
  targetDateformat = "jYYYYjMMjDD"
) => (val) => ({
  validate: moment(val, inputDateformat).isBefore(
    moment(targetDate, targetDateformat)
  ),
  message: DefaultErrorMessage.IsDateBeforeValidation,
});
const IsDateBeforeOrSameValidation = (
  targetDate,
  inputDateformat = "jYYYYjMMjDD",
  targetDateformat = "jYYYYjMMjDD"
) => (val) => ({
  validate: moment(val, inputDateformat).isSameOrBefore(
    moment(targetDate, targetDateformat)
  ),
  message: DefaultErrorMessage.IsDateBeforeOrSameValidation,
});
const IsDateAfterValidation = (
  targetDate,
  inputDateformat = "jYYYYjMMjDD",
  targetDateformat = "jYYYYjMMjDD"
) => (val) => ({
  validate: moment(val, inputDateformat).isAfter(
    moment(targetDate, targetDateformat)
  ),
  message: DefaultErrorMessage.IsDateAfterValidation,
});
const IsDateAfterOrSameValidation = (
  targetDate,
  inputDateformat = "jYYYYjMMjDD",
  targetDateformat = "jYYYYjMMjDD"
) => (val) => ({
  validate: moment(val, inputDateformat).isSameOrAfter(
    moment(targetDate, targetDateformat)
  ),
  message: DefaultErrorMessage.IsDateAfterOrSameValidation,
});

/**
 *  Password Complex Description
 * (?=.*\d)          // should contain at least one digit
 * (?=.*[a-z])       // should contain at least one lower case
 * (?=.*[A-Z])       // should contain at least one upper case
 * [a-zA-Z0-9~!@#$%^&*_+-]{8,}   // should contain at least 8 characters
 */

export default {
  RequiredValidation,
  MobileValidation,
  TelValidation,
  NationalCodeValidation,
  NationalIdValidation,
  InclusiveNoValidation,
  CustomerIdValidation,
  NationalCardSeriSerialValidation,
  CardNumberValidation,
  AccountNumberValidation,
  ShebaNumberValidation,
  FarsiValidation,
  NumericValidation,
  LengthValidation,
  MinLengthValidation,
  MaxLengthValidation,
  MinNumberValidation,
  MaxNumberValidation,
  MinPriceValidation,
  MaxPriceValidation,
  EnglishValidation,
  EnglishFullValidation,
  EmailValidation,
  PostalCodeValidation,
  DomainValidation,
  DateValidation,
  PasswordSimpleValidation,
  PasswordComplexValidation,
  IsjalaliDateValidation,
  IsDateValidation,
  IsDateBeforeValidation,
  IsDateBeforeOrSameValidation,
  IsDateAfterValidation,
  IsDateAfterOrSameValidation,
};
