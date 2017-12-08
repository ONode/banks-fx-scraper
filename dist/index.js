'use strict';

const _promise = require('babel-runtime/core-js/promise');

const _promise2 = _interopRequireDefault(_promise);

const _NBG = require('./banks/NBG');

const _NBG2 = _interopRequireDefault(_NBG);

const _CAE = require('./banks/CAE');

const _CAE2 = _interopRequireDefault(_CAE);

const _CBE = require('./banks/CBE');

const _CBE2 = _interopRequireDefault(_CBE);

const _NBE = require('./banks/NBE');

const _NBE2 = _interopRequireDefault(_NBE);

const _CIB = require('./banks/CIB');

const _CIB2 = _interopRequireDefault(_CIB);

const _AAIB = require('./banks/AAIB');

const _AAIB2 = _interopRequireDefault(_AAIB);

const _BDC = require('./banks/BDC');

const _BDC2 = _interopRequireDefault(_BDC);

const _BM = require('./banks/BM');

const _BM2 = _interopRequireDefault(_BM);

const _SCB = require('./banks/SCB');

const _SCB2 = _interopRequireDefault(_SCB);

const _ABB = require('./banks/ABB');

const _ABB2 = _interopRequireDefault(_ABB);

const _ABK = require('./banks/ABK');

const _ABK2 = _interopRequireDefault(_ABK);

const _SAIB = require('./banks/SAIB');

const _SAIB2 = _interopRequireDefault(_SAIB);

const _MIDB = require('./banks/MIDB');

const _MIDB2 = _interopRequireDefault(_MIDB);

const _UBE = require('./banks/UBE');

const _UBE2 = _interopRequireDefault(_UBE);

const _EDBE = require('./banks/EDBE');

const _EDBE2 = _interopRequireDefault(_EDBE);

const _AB = require('./banks/AB');

const _AB2 = _interopRequireDefault(_AB);

const _EGB = require('./banks/EGB');

const _EGB2 = _interopRequireDefault(_EGB);

const _ADIB = require('./banks/ADIB');

const _ADIB2 = _interopRequireDefault(_ADIB);

const _FIBE = require('./banks/FIBE');

const _FIBE2 = _interopRequireDefault(_FIBE);

const _BBE = require('./banks/BBE');

const _BBE2 = _interopRequireDefault(_BBE);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

const banksObjects = [new _NBG2.default(), new _CAE2.default(), new _CBE2.default(), new _NBE2.default(), new _CIB2.default(), new _AAIB2.default(), new _BDC2.default(), new _BM2.default(), new _SCB2.default(), new _ABB2.default(), new _ABK2.default(), new _SAIB2.default(), new _MIDB2.default(), new _UBE2.default(), new _EDBE2.default(), new _AB2.default(), new _EGB2.default(), new _ADIB2.default(), new _FIBE2.default(), new _BBE2.default()];

function getAllBanksNames() {
    const names = [];
    banksObjects.forEach(function (bank) {
        names.push(bank.name.acronym);
    });
    return names;
}

function getBankWithName(bankName) {
    for (let i = 0; i < banksObjects.length; i += 1) {
        if (banksObjects[i].name.acronym === bankName) {
            return banksObjects[i];
        }
    }
    return null;
}

function getCurrencyRates(rates, currencyCode) {
    for (let i = 0; i < rates.length; i += 1) {
        const filteredRate = rates[i].code === currencyCode ? rates[i] : undefined;
        if (filteredRate !== undefined) return filteredRate;
    }
    return null;
}

function filterCurrencies(rates, currenciesCodes) {
    const filteredRates = [];
    currenciesCodes.forEach(function (code) {
        const rate = getCurrencyRates(rates, code);
        if (rate === null) return;

        filteredRates.push(rate);
    });
    return filteredRates;
}

function getExchangeRates(banks, currencies, cb) {
    // If banks array empty get all banks names
    const filteredBanks = banks.length === 0 ? getAllBanksNames() : banks;

    const result = {};

    const banksPromises = [];
    try {
        filteredBanks.forEach(function (bankName) {
            const bank = getBankWithName(bankName);
            if (bank === null) throw new Error('No bank with the name', bankName);

            const bankPromise = new _promise2.default(function (resolve) {
                bank.scrape(function (err, rates) {
                    if (err) {
                        resolve({
                            name: bank.name,
                            rates: []
                        });
                        return;
                    }

                    // If currencies array empty get all rates
                    const filteredRates = currencies.length === 0 ? rates : filterCurrencies(rates, currencies);
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