import React from 'react'
import styled from '@emotion/styled'

const Texto = styled.div`
    background-color: #eb2217;
    color: #FFF;
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 900;
    text-align: center;
`

const Error = ({children}) => {
  return (
    <>
        <Texto>
            {children}

        </Texto>
    </>
  )
}

export default Error