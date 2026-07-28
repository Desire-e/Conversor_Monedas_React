
/** 
 * PETICIONES A LA API 
 * */
import getCoins from '../api/Coins'
import getRates from '../api/Rates'

/**
 * CONTEXT - compartir datos globales entre componentes sin tener que pasar props 
 * manualmente por cada nivel.
 * */
import { CoinContext } from './CoinContext'

/** 
 * HOOKS
 * state - estado del componente
 * effect - reacciones ante cambios
 * ref - renderizado pero sin recargar datos -- el getCoins --.
 *       Cuando usas ref, aunque el estado del componente cambie y haga re-render,
 *       los datos que elijas no vuelven a recargar y persisten 
 * */
import { useState, useEffect, useRef } from 'react';



/**
 * Función que provee datos al contexto, y este contexto a otros componentes 
 * */
function CoinProvider({ children }) { // children === componentes que heredan el contexto

    // Estado monedas
    const [coins, setCoins] = useState([]);
    // coins = [
    //      { simbolo: "AFN", nombre: "Afghan Afghani" }, 
    //      { ...},
    // ]

    // Estado de rates con base USD (es decir, el valor de 1USD a XXX moneda)
    const [rates, setRates] = useState({});
    // rates = { 
    //     "USDAED": 3.672501,
    //     "USDAMD": 373.511981, ...
    // }



    // Ref para no recargar getCoins y getRates:
    // - la API falla si haces varias peticiones rápido (aunque lo tengo 
    // solucionado al usar localStorage, esto tambien es otra solución)
    // - useRef() detectará si ya se cargó previamente
    const called = useRef(false);

    
    // Al cargar este componente:
    // - se obtiene las monedas y rates de localstorage
    // - si no hay, hace petición a la API para obtener monedas y rates, y guarda en localstorage
    // - se cambia el estado
    useEffect(() => {
        // Evita la doble llamada a getCoins y getRates
        if (called.current) return;
        called.current = true;

        // Carga monedas y rates
        async function loadData(){
            try {
                // Monedas:
                // revisa LS
                const storedCoins = localStorage.getItem("coins");
                if (storedCoins && JSON.parse(storedCoins).length > 0) {
                    setCoins(JSON.parse(storedCoins));
                    // return;
                } 
                else {
                    // pide a la api y almacena en LS
                    const dataCoins = await getCoins();
                    setCoins(dataCoins);
                    localStorage.setItem("coins", JSON.stringify(dataCoins));
                }

                // Rates
                const storedRates = localStorage.getItem("rates");
                const parsedRates = JSON.parse(storedRates);
                if (storedRates && Object.keys(parsedRates).length > 0) {
                    setRates(parsedRates);
                    // return;
                } else {
                    const dataRates = await getRates();
                    setRates(dataRates);
                    localStorage.setItem("rates", JSON.stringify(dataRates));
                }
            }
            catch (error) { console.error(error); }
        }

        loadData();
    }, []);


    
    // Da los valores de moneda y rates a cualquier componente que se use dentro de este componente de contexto
    return (
        <CoinContext.Provider value={{ coins, rates }}> 
            {children}
        </CoinContext.Provider>
    );
}

export default CoinProvider;







/***** CONTEXTOS EN REACT:

El Context API es una forma de compartir datos globales entre componentes sin tener que pasar props 
manualmente por cada nivel (lo que se llama prop drilling).


Sin context:

<App>
  <Navbar user={user} />
  <Main user={user} />
</App>


Con Context: Creas un “almacén global” accesible desde cualquier componente.

import { createContext, useContext } from 'react';
const UserContext = createContext();
function App() {
  const user = { name: "Juan" };
  return (
    <UserContext.Provider value={user}>
      <Navbar />
      <Main />
    </UserContext.Provider>
  );
}

Y en cualquier componente:

function Navbar() {
  const user = useContext(UserContext);
  return <p>Hola {user.name}</p>;

*/

/***** USO DE CONTEXTOS:

1. Provider
Al crear un contexto con createContext(), React te da un objeto un componente Provider:

a) CoinContext.Provider
.Provider -- es el componente que “reparte” los datos a todos los componentes hijos.
.Provider value={{ ... }} -- los datos que quieres compartir, con useContext() los lee desde cualquier hijo


2. {{ children }}
Lo que hay dentro de un componente context, es el componente que hereda los datos pasados 

*/