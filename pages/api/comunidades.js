import {SiteClient}from 'datocms-client';

export default async function recebedorDeRequests(request, response){

    if (request.method == 'POST'){
        const TOKEN = process.env.NEXT_PUBLIC_TOKEN_ALL;
    
        const client = new SiteClient(TOKEN);
    
        //TODO: Validar os dados antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "974680",
            ...request.body,

            // title: "Comunidade de Teste",
            // imageUrl: "https://github.com/davidevandro.png",
            // creatorSlug: "davidevandro",
    
        })
    
        response.json({
            dados: "Algum registro criado",
            registroCriado: registroCriado,
        })

        return;
    }

    response.status(404).json({
        message: "Ainda não temos nada no GET, mas no POST tem!",
    })

}