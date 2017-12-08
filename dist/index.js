'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _NBG = require('./banks/NBG');

var _NBG2 = _interopRequireDefault(_NBG);

var _CAE = require('./banks/CAE');

var _CAE2 = _interopRequireDefault(_CAE);

var _CBE = require('./banks/CBE');

var _CBE2 = _interopRequireDefault(_CBE);

var _NBE = require('./banks/NBE');

var _NBE2 = _interopRequireDefault(_NBE);

var _CIB = require('./banks/CIB');

var _CIB2 = _interopRequireDefault(_CIB);

var _AAIB = require('./banks/AAIB');

var _AAIB2 = _interopRequireDefault(_AAIB);

var _BDC = require('./banks/BDC');

var _BDC2 = _interopRequireDefault(_BDC);

var _BM = require('./banks/BM');

var _BM2 = _interopRequireDefault(_BM);

var _SCB = require('./banks/SCB');

var _SCB2 = _interopRequireDefault(_SCB);

var _ABB = require('./banks/ABB');

var _ABB2 = _interopRequireDefault(_ABB);

var _ABK = require('./banks/ABK');

var _ABK2 = _interopRequireDefault(_ABK);

var _SAIB = require('./banks/SAIB');

var _SAIB2 = _interopRequireDefault(_SAIB);

var _MIDB = require('./banks/MIDB');

var _MIDB2 = _interopRequireDefault(_MIDB);

var _UBE = require('./banks/UBE');

var _UBE2 = _interopRequireDefault(_UBE);

var _EDBE = require('./banks/EDBE');

var _EDBE2 = _interopRequireDefault(_EDBE);

var _AB = require('./banks/AB');

var _AB2 = _interopRequireDefault(_AB);

var _EGB = require('./banks/EGB');

var _EGB2 = _interopRequireDefault(_EGB);

var _ADIB = require('./banks/ADIB');

var _ADIB2 = _interopRequireDefault(_ADIB);

var _FIBE = require('./banks/FIBE');

var _FIBE2 = _interopRequireDefault(_FIBE);

var _BBE = require('./banks/BBE');

var _BBE2 = _interopRequireDefault(_BBE);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var banksObjects = [new _NBG2.default(), new _CAE2.default(), new _CBE2.default(), new _NBE2.default(), new _CIB2.default(), new _AAIB2.default(), new _BDC2.default(), new _BM2.default(), new _SCB2.default(), new _ABB2.default(), new _ABK2.default(), new _SAIB2.default(), new _MIDB2.default(), new _UBE2.default(), new _EDBE2.default(), new _AB2.default(), new _EGB2.default(), new _ADIB2.default(), new _FIBE2.default(), new _BBE2.default()];

function getAllBanksNames() {
  var names = [];
  banksObjects.forEach(function (bank) {
    names.push(bank.name.acronym);
  });
  return names;
}

function getBankWithName(bankName) {
  for (var i = 0; i < banksObjects.length; i += 1) {
    if (banksObjects[i].name.acronym === bankName) {
      return banksObjects[i];
    }
  }
  return null;
}

function getCurrencyRates(rates, currencyCode) {
  for (var i = 0; i < rates.length; i += 1) {
    var filteredRate = rates[i].code === currencyCode ? rates[i] : undefined;
    if (filteredRate !== undefined) return filteredRate;
  }
  return null;
}

function filterCurrencies(rates, currenciesCodes) {
  var filteredRates = [];
  currenciesCodes.forEach(function (code) {
    var rate = getCurrencyRates(rates, code);
    if (rate === null) return;

    filteredRates.push(rate);
  });
  return filteredRates;
}

function getExchangeRates(banks, currencies, cb) {
  // If banks array empty get all banks names
  var filteredBanks = banks.length === 0 ? getAllBanksNames() : banks;

  var result = {};

  var banksPromises = [];
  try {
    filteredBanks.forEach(function (bankName) {
      var bank = getBankWithName(bankName);
      if (bank === null) throw new Error('No bank with the name', bankName);

      var bankPromise = new _promise2.default(function (resolve) {
        bank.scrape(function (err, rates) {
          if (err) {
            resolve({
              name: bank.name,
              rates: []
            });
            return;
          }

          // If currencies array empty get all rates
          var filteredRates = currencies.length === 0 ? rates : filterCurrencies(rates, currencies);
          resolve({
            name: bank.name,
            rates: filteredRates
          });
        });
      });
      banksPromises.push(bankPromise);
    });
  } catch (e) {
    return cb(e);
  }
  _promise2.default.all(banksPromises).then(function (values) {
    values.forEach(function (value) {
      result[value.name.acronym] = value;
    });
    return cb(null, result);
  });
  return undefined;
}

module.exports = {
  getExchangeRates: getExchangeRates
};