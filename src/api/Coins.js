// axios para hacer peticiones a la API
import axios from 'axios';

// url base
let url = `https://api.exchangerate.host/`; 
// access key
let key = import.meta.env.VITE_API_KEY;

/* 
/list
Lista de monedas admitidas

https://api.exchangerate.host/list?access_key=YOUR_ACCESS_KEY
{
  "success": true,
  "terms": "https://currencylayer.com/terms",
  "privacy": "https://currencylayer.com/privacy",
  "currencies": {
    "AED": "United Arab Emirates Dirham",
    "AFN": "Afghan Afghani",
    "ALL": "Albanian Lek",
    ...
  }
}
*/

async function getCoins(){

    try{
        let endpoint = `${url}list?access_key=${key}`;

        // Petición
        const response = await axios.get(endpoint);


        // Obtiene los clave-valor del objeto JSON "currencies" 
        // que contiene como atributos las monedas permitidas
        const entries = Object.entries(response.data.currencies);
        
        // Crea array de objetos JS:
        // coins = [
        //      { simbolo: "AFN", nombre: "Afghan Afghani" }, 
        //      { ...},
        // ]
        const coins = entries.map(([key, value]) => {
            return { simbolo: key, nombre: value };
        });

        return coins;
    } 
    catch(err){
        console.error(err);
        return []; 
    }
}

export default getCoins;