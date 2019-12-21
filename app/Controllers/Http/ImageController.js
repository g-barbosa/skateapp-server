'use strict'
const Image = use('App/Models/Image')
const Perfil = use('App/Models/Perfil')
const Helpers = use('Helpers')

class ImageController {
    async show ({ params, response}) {
        return response.download(Helpers.tmpPath(`uploads/${params.path}`))
    }
    async store ({ request, params }){
        const perfil = await Perfil.findOrFail(params.id)

        const images = request.file('image', {
            types: ['image'],
            size: '2mb'
        })

        await images.moveAll(Helpers.tmpPath('uploads'), file => ({
            name: `${Date.now()}-${file.clientName}`
          }))
        
          if (!images.movedAll()) {
            return images.errors()
          }
        
          await Promise.all(
            images
              .movedList()
              .map(image => perfil.images().create({ path: image.fileName }))
          )

          
    }
}

module.exports = ImageController
