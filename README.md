# Banks Scraper [![Version](https://img.shields.io/npm/v/banks-fx-scraper.svg)](https://www.npmjs.com/package/banks-fx-scraper) [![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/MMayla/egypt-banks-scraper/blob/master/LICENSE) [![airbnb code style](https://img.shields.io/badge/code%20style-airbnb-fd5c63.svg)](https://github.com/airbnb/javascript)

Scrape exchange rates from Egypt's banks and Asia Banks

## Installation
```bash
npm install --save banks-fx-scraper
```

## Getting Started

### Require the package
```javascript
var EGBScraper = require('banks-fx-scraper');
```

`getExchangeRates` takes 3 arguments:
  - banks array: list of banks codes to get its exchange rates
  - currencies array: list of currencies iso code to get from the banks
  - callback function: called when finished with the signature (err, data)

### To get all banks with all currencies
```javascript
EGBScraper.getExchangeRates([], [], (err, data) => {
  // data
});
```

### To get All banks with certain currencies
```javascript
// Get only USD and EUR exchange rates from all banks
EGBScraper.getExchangeRates([], ['USD', 'EUR'], (err, data) => {
  // data
});
```

### To get All exchange rates in certain banks
```javascript
EGBScraper.getExchangeRates(['NBG', 'CIB'], [], (err, data) => {
  // data
});
```

### To get the exchange rates for some currencies and some banks
```javascript
EGBScraper.getExchangeRates(['NBG', 'CIB'], ['USD', 'EUR'], (err, data) => {
  // data
});
```
## Banks
### Supported banks
| Code | Bank Name                              |
| ---- | -------------------------------------- |
| NBG  | National Bank of Greece                |
| CAE  | Credit Agricole                        |
| CBE  | Central Bank of Egypt                  |
| NBE  | National Bank of Egypt                 |
| CIB  | Commercial International Bank          |
| AAIB | Arab African International bank        |
| BDC  | Banque Du Caire                        |
| BM   | Banque Misr                            |
| SCB  | Suez Canal Bank                        |
| ABB  | Al Baraka Bank                         |
| ABK  | Al Ahli bank of kuwait                 |
| SAIB | Société Arabe Internationale de Banque |
| MIDB | Misr Iran Development Bank             |
| UBE  | The United Bank of Egypt               |
| EDBE | Export Development Bank of Egypt       |
| AB   | Alex Bank                              |
| EGB  | Egyptian Gulf Bank                     |
| ADIB | Abu Dhabi Islamic Bank                 |
| FIBE | Faisal Islamic Bank Of Egypt           |
| BBE  | Blom Bank Egypt                        |
| HSBC | The Hongkong and Shanghai Banking Corporation Limited   |

### To support soon
- Mashreq bank
- Ahli United bank
- AIBK
- Housing and development bank
- Emirated NBD
- Arab Bank
- QNB AlAhli
- Bank Audi
- PBDAC

## Development

available predefined NPM scripts.
Run them by typing this in your terminal: `npm run [script]`

| Name       | Description                                           |
| ---------- | ----------------------------------------------------- |
| `lint`     | Runs `ESlint` on all files from `./src` and `./tests` |
| `lint:fix` | Runs `ESlint` and fixes all the inconsistencies       |
| `test`     | Runs the tests with Mocha                             |
| `test:dev` | Re-runs the tests whenever a change occurs            |
| `build`    | Compiles all ES2015 files to ES5 (legacy code)        |
| `clean`    | Removes the compiled files                            |
| `start`    | Run src/index.js using babel-node

**NOTE:** There is another script `prepublish` that runs before you publish the package to NPM. All it does is to run `clean` and `build`.

## Contributing

Before you submit a pull request, please take the following actions.

1. Open an issue describing the contribution you would like to make
2. Discuss until we all agree that your idea is useful for the project
3. Create a pull request but make sure you follow the style guide and the tests pass
4. Voila! You've done an amazing job.

## Credits

- [Andrei Canta](https://twitter.com/deiucanta) for the work he has put into his [npm-starter](https://github.com/deiucanta/npm-starter) project
- [Airbnb](http://airbnb.com) for the work they've put into the javascript style guide and into the ESlint package.

## License

MIT @ [Mohamed Mayla](https://twitter.com/mohamedmayla)
