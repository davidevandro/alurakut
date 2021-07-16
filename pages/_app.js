import { createGlobalStyle, ThemeProvider } from 'styled-components'
import {AlurakutStyles} from '../src/lib/AlurakutCommons';
import '../src/css/style.css';

const GlobalStyle = createGlobalStyle`
  /* Reset CSS (Necolas Reset CSS)*/
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #D9E6F6;
    font-family: "Rubik",sans-serif;
  }

  #_next{
    display:flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#ddf5f4',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
