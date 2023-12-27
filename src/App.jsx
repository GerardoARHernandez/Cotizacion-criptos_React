import { useState, useEffect } from 'react'
import styled from '@emotion/styled'

import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'

import ImagenCripto from './assets/img/imagen-criptos.png'

const Contenedor = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 768px){
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Imagen = styled.img`
  max-width: 40rem;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 8rem;
  margin-bottom: 5rem;
  font-size: 34px;

  &::after{
    content: '';
    width: 150px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setCargando(true)
        setResultado({})

        const {moneda, cripto} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[cripto][moneda])

        setCargando(false)
      }

      cotizarCripto()
    }
  }, [monedas])
  

  return (
    <>
      <Contenedor> 
        <Imagen src={ImagenCripto} alt='Imagen de Criptomonedas'/>
        <div>
          <Heading>Cotiza Criptomonedas al instante</Heading>
          
          <Formulario 
            setMonedas={setMonedas}
          />

          {cargando && <Spinner />}
          {resultado.PRICE && <Resultado resultado={resultado} />}
        </div>
        
      </Contenedor>
       
    </>
  )
}

export default App
