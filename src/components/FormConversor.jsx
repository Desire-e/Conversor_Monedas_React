
/**
 * STATE
 */
import { useState } from 'react';

/** 
 * CONTEXT
 */
// Contexto creado
import { CoinContext } from './CoinContext';
// Para obtener el contexto en el componente hijo del componente contexto
import { useContext } from 'react';



function FormConversor(){

    // USO DE CONTEXT:
    // Obtiene los datos que el provider añadió al contexto (lee lo 
    // que contiene value={{ coins, rates }} del <CoinContext.Provider>)
    const { coins, rates } = useContext(CoinContext);
    // coins = [
    //      { simbolo: "AFN", nombre: "Afghan Afghani" }, 
    //      { ...},
    // ]

    // rates = { 
    //     "USDAED": 3.672501,
    //     "USDAMD": 373.511981, ...
    // }


    // ESTADOS
    // Estado de moneda de origen seleccionada (from), por defecto USD
    const [fromCoin, setFromCoin] = useState("USD");
    // Estado de moneda de destino seleccionada (to), por defecto EUR
    const [toCoin, setToCoin] = useState("EUR");
    // Estado de cantidad a convertir (amount)
    const [amount, setAmount] = useState("");
    // Estado del resultado (result)
    const [result, setResult] = useState("");
    // Estado de error: campo donde se produjo + mensaje de error 
    const [error, setError] = useState({});
    

    // VALIDACIÓN SIMPLE:
    // Función validadora de campos, llamada en evento onclick del button
    // - Cuando se hace click en convertir, se ejecuta validate():
    // - que devuelve errors={} con o sin atributos (segun si hay errores)
    // - cambia el estado error, pasando objeto errors a setError()
    // - si errors estaba vacio, todo funciona normal; si errors contenia atributos, 
    // habrá errores que se mostraran bajo los campos y la conversion se parará
    const validate = () => {
        
        const errors = {};

        if (!fromCoin) {
            errors.from = "Debe indicar una moneda de origen";
        }
        
        if (!toCoin) {
            errors.to = "Debe indicar una moneda de destino";
        }
        
        if (!amount || amount === '') {
            errors.amount = "Debe una cantidad";
        }

        if (isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
            errors.amount = "Debe indicar un número válido";
        }
        
        return errors;
    };



    return(
        <>
            {/* AMOUNT */}
            <div className="mb-3">
                <label name="amount" className="form-label">Cantidad</label>

                <input type="number" id="amount" className="form-control" placeholder="0"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    // Limpia errores en tiempo real
                    setError("");
                }}                
                />
                {/* Forma corta de hacer un if en JSX: condicion && algo
                    Si condicion true, devuelve algo
                    Si condicion false, devuelve false (y React no renderiza nada) */}
                {error.amount && <div style={{color: "red"}}>{error.amount}</div>}
            </div>


            {/* FROM */}
            <div className="mb-3">
                <label name="from" className="form-label">De</label>


                {/* value del select será el estado fromCoin */}
                <select id="from" className="form-select" value={fromCoin}  
                // - establece estado de fromCoin cuando cambie el value del select
                // - target es el origen de donde se ejecutó el evento (option seleccionado)
                onChange={(e) => setFromCoin(e.target.value)}>

                    {coins.map((coin, index) => (
                        <option key={index} value={coin.simbolo}>{coin.nombre}</option>
                    ))}

                </select>
                {error.from && <div style={{color: "red"}}>{error.from}</div>}
            </div>


            {/* TO */}
            <div className="mb-3">
                <label name="to" className="form-label">A</label>

                <select id="to" className="form-select" value={toCoin}
                onChange={(e) => setToCoin(e.target.value)}>

                    {coins.map((coin, index) => (
                        <option key={index} value={coin.simbolo}>{coin.nombre}</option>                    
                    ))}

                </select>
                {error.to && <div style={{color: "red"}}>{error.to}</div>}

            </div>



            {/* BOTÓN */}
            <div className="d-grid">

                {/* Evento onClick - calcula el resultado usando los rates */}
                <button className="btn btn-primary" onClick={ () => {
                    
                    // Limpia errores y resultado
                    setError({});
                    setResult("");


                    // Ejecuta validación de cada campo
                    const validations = validate();
                    // Manda objeto errors = { } al estado de error, para informar a los mensajes de error de cada campo
                    setError(validations);

                    // Si contiene keys el objeto errors pasado, es que hay errores: detiene y muestra mensajes
                    // Si no contiene keys el objeto, no se han reistrado mensajes de error: continúa 
                    if(Object.keys(validations).length > 0 ) return;


                    // Conversión de valores
                    // FORMULA: 
                    // rate(A) = USD → A
                    // rate(B) = USD → B
                    // A → B = rate(B) / rate(A)

                    let from = `USD${fromCoin}`;
                    let to = `USD${toCoin}`;

                    // Si la moneda elegida es USD, rate de USD es 1 (1USD = 1USD)
                    let rateFrom = rates[from];
                    if (fromCoin === 'USD') { rateFrom = 1; }

                    let rateTo = rates[to];                        
                    if (toCoin === 'USD'){ rateTo = 1; }

                    let conversion = amount * (rateTo / rateFrom);

                    setResult(conversion);

                }}>
                    Convertir
                </button>
            </div>

            {/* Resultado */}
            <div className="alert alert-info mt-4 text-center" id="result">
                Resultado: {result}
            </div>
        </>
    );
}

export default FormConversor;