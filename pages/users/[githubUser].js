import React from 'react';
import User from '../../src/components/User';

export default function UserPage(props){
    const githubUser = props.githubUser;
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

    const amigos = [
      'debbyohanne',
      'diego3g', 
      'rodrigorgtic', 
      'omariosouto',
      'juunegreiros',
      'maykbrito',
  
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
      <User githubUser={githubUser} 
      amigos = {amigos} 
      comunidades = {comunidades}
      sorte = {sorte}/>
    )
}

export async function getStaticProps({params}){
    const githubUser = params.githubUser;
    return {
        props: {
            githubUser
        }
    }
}

export async function getStaticPaths(){
    return{
        paths: [
            {
                params:{
                    githubUser: 'debbyohanne',
                },
            },
            {
                params:{
                    githubUser: 'diego3g',
                },
            },
            {
                params:{
                  githubUser: 'rodrigorgtic',
              },
            },
            {
              params:{
                githubUser: 'omariosouto',
              },
            },
            {
              params:{
                githubUser: 'juunegreiros',
              },
            },
            {
              params:{
                githubUser: 'maykbrito',
            },
            }
        ],
        fallback: false,
    }
}