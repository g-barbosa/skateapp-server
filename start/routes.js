'use strict'

const Route = use('Route')

Route.get('images/:path', 'ImageController.show')

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')
Route.post('perfil/:id/images', 'ImageController.store')
  .middleware('auth')

Route.resource('perfil', 'PerfilController')
  .apiOnly()
  .middleware('auth')