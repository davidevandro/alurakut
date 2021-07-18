import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

function ProfileSideBar(propriedades){
  return (
    <Box as="aside" >
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}}/>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>

      <hr/>
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

function ProfileRelationsBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
          {/* {seguidores.map((itemAtual) => {
            return (
              <li key={itemAtual}>
                <a href={`https://github.com/${itemAtual}.png`}>
                  <img src={itemAtual.image} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
            )
          })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);
  const sorteDoDia = [
    'A melhor maneira de prever o futuro é criá-lo',
    'A água ganha força na queda', 
    'A vida trará coisas boas se tiveres paciência', 
    'Demonstre amor e alegria em todas as oportunidades e verás que a paz nasce dentro de você'
  ]
  const pessoasFavoritas = [
    'debbyohanne',
    'diego3g', 
    'rodrigorgtic', 
    'omariosouto',
    'juunegreiros',
    'maykbrito',

  ];

  const [seguidores, setSeguidores] = React.useState([]);
  
  React.useEffect(function(){
    //GET
    fetch(`https://api.github.com/users/juunegreiros/followers`)
    .then(function (respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta){
      setSeguidores(respostaCompleta);
    })

    // API Graph QL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_READ}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({"query":`query {
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      }`})
    })
    .then( (response) => response.json())
    .then( (respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      setComunidades(comunidadesVindasDoDato);
    })
  },[])



  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSideBar githubUser={githubUser}/>
        </div>

        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>  
          <Box>
            <h1 className="title"> 
              Bem vindo(a)
            </h1>
            <div className="dayLuck"> 
              <strong>Sorte do Dia: </strong> {sorteDoDia[Math.floor(Math.random()*sorteDoDia.length)]}
            </div>
            <OrkutNostalgicIconSet confiavel = "3" legal = "3" sexy = "3"/>
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: githubUser,
              };
              fetch('api/comunidades',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade),
              })
              .then(async (response) => {
                const dados = await response.json();
                setComunidades([...comunidades,dados.registroCriado]);
              })


              //
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type = "text"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma url para usarmos de capa"
                  name="image" 
                  aria-label="Coloque uma url para usarmos de capa"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBox title="Seguidores" items={seguidores}/>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
                {comunidades.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`/communities/${itemAtual.title}`}>
                        <img src={itemAtual.imageUrl} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key = {itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context){
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const decodedToken = jwt.decode(token);
  const githubUser = decodedToken?.githubUser;
 
  const {message}  = await fetch(`https://api.github.com/users/${githubUser}`)
                          .then(async (resposta) => resposta.json());

  if (message === 'Not Found'){
    return {
      redirect: {
        destination : '/login',
        statusCode: 301,
      }
    }
  }

  return {
      props: {
          githubUser
      }
  }
}
