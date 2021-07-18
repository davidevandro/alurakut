import Link from 'next/link';
import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

const ProfileRelationsBox = propriedades => (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {propriedades.title} ({propriedades.items.length})
        </h2>
        { <ul>
              {propriedades.items.slice(0,6).map((itemAtual) => {
                return (
                  <li key = {itemAtual.id?itemAtual.id:itemAtual}>
                    <Link href={`${itemAtual.title?'/communities/':'/users/'}${itemAtual.title?itemAtual.title:itemAtual}`}>
                        <a>
                          <img src={itemAtual.imageUrl
                                    ?itemAtual.imageUrl
                                    :`https://github.com/${itemAtual}.png`} />
                          <span>{itemAtual.title?itemAtual.title:itemAtual}</span>
                        </a>
                      </Link>
                  </li>
                )
              })}
            </ul> 
        }
        <a className='seeAll' href = '/'>Ver todos</a>
          
        
      </ProfileRelationsBoxWrapper>
)
export default ProfileRelationsBox;