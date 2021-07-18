import MainGrid from '../MainGrid';
import Box from '../Box';
import ProfileSideBar from '../ProfileSideBar';
import ProfileRelationsBox from '../ProfileRelationsBox';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../../lib/AlurakutCommons';

const User = propriedades => (
    <>
      <AlurakutMenu githubUser={propriedades.githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSideBar githubUser={propriedades.githubUser}/>
        </div>

        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>  
          <Box>
            <h1 className="title"> 
              Bem vindo(a)
            </h1>
            <div className="dayLuck"> 
              <strong>Sorte do Dia: </strong> {propriedades.sorte}
            </div>
            <OrkutNostalgicIconSet confiavel = "3" legal = "3" sexy = "3"/>
          </Box>

          {propriedades.children}
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBox title="Meus Amigos" items={propriedades.seguidores}/>
          <ProfileRelationsBox title="Minhas Comunidades" items={propriedades.comunidades}/>
        </div>

      </MainGrid>
    </>
);

export default User;