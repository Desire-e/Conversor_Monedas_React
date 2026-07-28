# Conversor de Monedas

Aplicación React que permite convertir cantidades entre diferentes divisas en tiempo real, utilizando la API de **ExchangeRate**. Los datos de monedas y tipos de cambio se cargan una única vez y se almacenan en `localStorage` para evitar peticiones innecesarias.

## Demo

[Ver proyecto desplegado](https://TU_USUARIO.github.io/TU_REPO)

## Características

- Carga la lista completa de monedas soportadas por la API.
- Obtiene los tipos de cambio actuales, con base en USD.
- Permite seleccionar moneda de origen, moneda de destino y una cantidad a convertir.
- Valida los campos del formulario antes de calcular (cantidad numérica válida, monedas seleccionadas).
- Guarda monedas y tasas en `localStorage` para no repetir peticiones a la API en cada recarga.
- Comparte los datos globales (monedas y tasas) entre componentes mediante el hook **useContext**, evitando *prop drilling*.

## Tecnologías

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/) como bundler
- [Axios](https://axios-http.com/) para las peticiones HTTP
- [Bootstrap 5](https://getbootstrap.com/) para estilos
- [ExchangeRate API](https://exchangerate.host/) para monedas y tasas de cambio

## Empezar en local
 
1. Clona el repositorio:
```bash
   git clone https://github.com/Desire-e/Conversor_Monedas_React.git
   cd Conversor_Monedas_React
```
 
2. Instala las dependencias:
```bash
   npm install
```
 
3. Configura tu propia clave de API (ver sección [Configuración](#-configuración)).
4. Ejecuta el proyecto en modo desarrollo:
```bash
   npm run dev
```

5. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Configuración

Este proyecto usa una API con clave de acceso. La clave se gestiona mediante variables de entorno y **no se sube al repositorio**.

1. Copia el archivo de ejemplo `.env.example` y renómbralo a `.env`:
```bash
   cp .env.example .env
```

2. Edita `.env` y sustituye `tu_clave_aqui` por tu propia clave de [ExchangeRate API](https://exchangerate.host/):
```
   API_KEY=tu_clave_aqui
```
 
3. Esta variable se usa internamente en `Coins.js` y `Rates.js`:
```js
   let key = import.meta.env.API_KEY;
```
 
El archivo `.env` está incluido en `.gitignore`, por lo que la clave real nunca se sube a GitHub. Solo se sube `.env.example`, que sirve de plantilla.
 
> **Importante:** la clave usada es de un plan gratuito con límites. Evita hacer llamadas innecesarias a la API (por eso se usa `localStorage` y `useRef` para evitar llamadas duplicadas).
> 
> **Sobre el despliegue en GitHub Pages:** al ser una app 100% frontend, la clave queda visible en el JavaScript compilado del sitio público, aunque no esté en el repositorio. El uso de `.env` protege el código fuente y el historial de commits, no el sitio ya desplegado.

## Lógica de conversión
 
Las tasas se obtienen siempre con base en USD. Para convertir entre dos monedas cualesquiera (A → B) se aplica la fórmula:
 
```
rate(A) = USD → A
rate(B) = USD → B
 
A → B = rate(B) / rate(A)
```
 
## Autor

Desire-e — [GitHub](https://github.com/TU_USUARIO)
 
## Licencia
 
Este proyecto es de uso personal/educativo.