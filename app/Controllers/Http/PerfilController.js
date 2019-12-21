'use strict'
const Perfil = use('App/Models/Perfil')

class PerfilController {
 
  async index ({ request, response, view }) {
    const perfil = Perfil.query()
      .with('images')
      .fetch()
    return perfil
  }

  async store ({ request, response, auth }) {
    const { id } = auth.user
    const data = request.only([
      'nome',
      'base',
      'tempo_de_skate'
    ])

    const perfil = await Perfil.create({...data, user_id: id})
    return perfil
  }

  async show ({ params, request, response, view }) {
    const perfil = await Perfil.findOrFail(params.id)
    await perfil.load('images')
    return perfil
  }

  async update ({ params, request, response }) {
    const perfil = await Perfil.findOrFail(params.id)

    const data = request.only([
      'name',
      'base',
      'tempo_de_skate'
    ])

    perfil.merge(data)
    await perfil.save()
    return perfil
  }

  async destroy ({ params, request, response }) {
    const perfil = await Perfil.findOrFail(params.id)
    if(perfil.user_id !== auth.user.id){
      return response.status(401).send({ error: 'Não autorizado'})
    }

    await perfil.delete()
  }
}

module.exports = PerfilController
