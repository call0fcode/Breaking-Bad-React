import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Frase from './components/Frase';
import Spinner from './components/Spinner';
import { ReactComponent as Logo } from './logo.svg';

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;

  svg {
    width: 70%;
    margin: 1rem 0 3rem;

    @media (min-width: 992px) {
      width: auto;
    }
  }
`;

const Boton = styled.button`
  background: -webkit-linear-gradient(
    top left,
    #007d35 0%,
    #007d35 30%,
    #0f574e 70%
  );
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  margin: 3rem 0 1rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 2px solid black;
  background-size: 100%;
  transition: background-size 0.8s ease;

  &:hover {
    cursor: pointer;
    background-size: 200%;
  }
`;

function App() {
  // State para las frases
  const [frase, guardarFrase] = useState({});

  // State para cuando se esté cargando frase desde la API
  const [cargando, guardarCargando] = useState(true);

  // Función que consulta la API y devuelve una frase
  const consultarAPI = async () => {
    // Vaciar el state para cada nueva carga
    guardarFrase({});

    // Comienza la carga
    guardarCargando(true);

    const api = await fetch(
      'https://breaking-bad-quotes.herokuapp.com/v1/quotes'
    );
    const frase = await api.json();

    // La frase ya se ha cargado
    guardarCargando(false);

    // Guardamos en el state los datos de la frase obtenida de la API
    guardarFrase(frase[0]);
  };

  // Cargar una frase automáticamente al renderizar el componente
  useEffect(() => {
    consultarAPI();
  }, []);

  return (
    <Contenedor>
      <Logo />
      <Frase frase={frase} />
      <Spinner cargando={cargando} />
      <Boton onClick={consultarAPI}>Obtener Frase</Boton>
    </Contenedor>
  );
}

export default App;
