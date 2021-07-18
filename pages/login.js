import React from 'react';
// Hook do NextJS
import { useRouter } from 'next/router';
import nookies from 'nookies';

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={(infosDoEvento)=>{
                infosDoEvento.preventDefault();
                {githubUser
                ?fetch('https://alurakut.vercel.app/api/login',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({githubUser: githubUser})
                })
                .then(async (respostaDoServer) => {
                    const dadosDaResposta = await respostaDoServer.json();
                    const token = dadosDaResposta.token;

                    fetch('/api/auth',{
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      }
                    }).then(async (respostaDoAutenticador) => {
                        const {isAuthenticated, message} = await respostaDoAutenticador.json();
                        if (isAuthenticated){
                          nookies.set(null, 'USER_TOKEN', token, {
                            path: '/',
                            maxAge: 86400 * 7
                          } )
                          router.push('/');
                        } else {
                          setErrorMessage(message);
                        }
                      })
                })
                :setErrorMessage('Preencha o usuário!')}
                
            }}>
                
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
          </p>
            <input 
                placeholder="Usuário" 
                value={githubUser} 
                onChange={(evento)=>{
                    setGithubUser(evento.target.value);
                }}
            />

            <div className="errorMessage" style={{color:'#FF0000'}}>{errorMessage}</div>

            <button type="submit">
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
              </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
} 

