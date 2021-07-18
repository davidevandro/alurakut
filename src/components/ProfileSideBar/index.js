import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';
import Box from '../Box';

export const ProfileSideBar = propriedades => (
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
);

export default ProfileSideBar;