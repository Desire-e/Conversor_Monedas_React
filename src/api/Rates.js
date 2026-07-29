import axios from 'axios';

// url base
let url = `https://api.exchangerate.host/`; 
// access key
let key = import.meta.env.VITE_API_KEY;

/*
Use the base URL and your API key to make a request. For example, fetching the latest USD and EUR rates:
curl "https://api.exchangerate.host/live?access_key=YOUR_KEY&base=USD&symbols=EUR"
{
  "success": true,
  "terms": "https://currencylayer.com/terms",
  "privacy": "https://currencylayer.com/privacy",
  "timestamp": 1776258308,
  "source": "USD",
  "quotes": {
    "USDAED": 3.672501,
    "USDAFN": 63.999827,
    "USDALL": 81.214524,
    "USDAMD": 373.511981,
    ...
    }
}
*/

async function getRates(){
    try {
        let endpoint = `${url}live?access_key=${key}&base=USD`; // base siempre USD
        
        // Petición
        const response = await axios.get(endpoint);

        // Obtiene atributo "quotes" del objeto json, 
        // el cual es un objeto con atributos las rates con base USD
        return response.data.quotes;
    } 
    catch (err) {
        // throw new Error(err);
        console.error(err);
        return 0;
    }
}

export default getRates;


/**** ¿Por qué con base USD puedes calcular todas las conversiones?

Porque el sistema de tipos de cambio funciona como una tabla relativa a una moneda base.

ExchangeRate API te devuelve:

{
  "success": true,
  "terms": "https://currencylayer.com/terms",
  "privacy": "https://currencylayer.com/privacy",
  "timestamp": 1776258308,
  "source": "USD",
  "quotes": {
    "USDAED": 3.672501,
    "USDAFN": 63.999827,
    "USDALL": 81.214524,
    "USDAMD": 373.511981,
    }
}

Cada valor es cuánto vale 1 USD en otra moneda


---- formula de conversion
rate(A) = USD → A
rate(B) = USD → B

Entonces: A → B = rate(B) / rate(A)

USD:
EUR = 0.92
JPY = 150

Entonces: 
EUR → JPY
JPY/EUR = 150 / 0.92 = 163.04

--- EJEMPLO:
1 USD = 0.92 EUR
1 USD = 150 JPY
1 USD = 0.78 GBP

Por lo que el cambio de moneda es:
USD → EUR = 0.92
USD → JPY = 150

Si:
1 USD = 0.92 EUR
Entonces:
1 EUR = 1 / 0.92 USD = 1.0869 USD

1 USD = 150 JPY

1 EUR = 1.0869 * 150 = 163.03 JPY
*/