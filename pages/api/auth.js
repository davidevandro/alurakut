import jwt from 'jsonwebtoken';

export default async function validadorDeTokens(request, response){
    if (request.method == 'POST'){
        const token = (request.headers.authorization)?.substring(7,);
        
        if (token){
            const decodedToken = jwt.decode(token);
            const githubUser = decodedToken?.githubUser;
            

            const {message} = await fetch(`https://api.github.com/users/${githubUser}`)
                                    .then(async (resposta) => resposta.json());

    
            if (message === "Not Found") {
              response.json({ 
                  isAuthenticated: false, 
                  message: 'usuário não encontrado',
              });
              return;
            }

            response.json({
                isAuthenticated: true,
                message: '',
            })
            return;
        } else {
            response.json({
                isAuthenticated: false,
                message: '',
        })
        }
    }

    response.status(404).json({
        message: "Ainda não temos nada no GET, mas no POST tem!",
    })
}