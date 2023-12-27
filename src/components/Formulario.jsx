import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Error from './Error'

import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from './data/monedas'

const InputSubmit = styled.input`
    background-color: #FBAE56;
    border: none;
    width: 100%;
    padding: 1rem;
    color: #FFF;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 19px;
    border-radius: 15px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #f69220;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {
    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
    const [cripto, SelectCripto] = useSelectMonedas('Elige tu Criptomoneda', criptos)

    useEffect(() => {
      const consultarAPI = async () => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        const arrayCriptos = resultado.Data.map( cripto => {
            
            const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                } 
                
                return objeto;
            })
            
            setCriptos(arrayCriptos)
        } 
      consultarAPI();
    }, [])
     

    const handleSubmit = e => {
        e.preventDefault();

        if ([moneda, cripto].includes('')) {
            setError(true)
            return
        }
        setError(false)
        setMonedas({
            moneda, cripto
        })
    }

    return (
    <>
        {error && <Error>Todos los campos son obligatorios</Error>}

        <form onSubmit={handleSubmit}>
            <SelectMonedas />
            <SelectCripto />
                
            <InputSubmit type="submit" value="Cotizar" />
        </form>
    </>
  )
}

export default Formulario