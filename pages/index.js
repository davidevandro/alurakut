import React from 'react';
import User from '../src/components/User';
import Box from '../src/components/Box';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

export default function Home(props) {
  const githubUser = props.githubUser?props.githubUser:'davidevandro';
  const [comunidades, setComunidades] = React.useState([]);
  const sorteDoDia = [
    'A melhor maneira de prever o futuro é criá-lo',
    'A água ganha força na queda', 
    'A vida trará coisas boas se tiveres paciência', 
    'Demonstre amor e alegria em todas as oportunidades e verás que a paz nasce dentro de você',
    'Não compense na ira o que lhe falta na razão',
    'Defeitos e virtudes são apenas dois lados da mesma moeda',
    'A maior de todas as torres começa no solo',
    'Não há que ser forte. Há que ser flexível',
    'Gente todo dia arruma os cabelos, por que não o coração?',
    'Há três coisas que jamais voltam; a flecha lançada, a palavra dita e a oportunidade perdida'
  ];
  const [sorte, setSorte] = React.useState('');
  //const [seguidores, setSeguidores] = React.useState([]);
  
  const amigos = [
    'debbyohanne',
    'diego3g', 
    'rodrigorgtic', 
    'omariosouto',
    'juunegreiros',
    'maykbrito',
    'jph00'

  ];


  React.useEffect(function(){
    setSorte(sorteDoDia[Math.floor(Math.random()*sorteDoDia.length)]);

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
    <User 
      githubUser={githubUser} 
      amigos = {amigos} 
      comunidades = {comunidades}
      sorte = {sorte}
    >
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
    </User>
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
