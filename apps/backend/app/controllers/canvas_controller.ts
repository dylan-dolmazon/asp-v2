import Player from '#models/player'
import { createCanvas, loadImage } from 'canvas'
import type { HttpContext } from '@adonisjs/core/http'

export default class CanvasController {
  async index({ request }: HttpContext) {
    const { title, season } = request.qs()

    const players = await Player.query().orderBy('goalsscored', 'desc')
    const filteredPlayers = players.filter((player) => player.goalsscored > 0 || player.assists > 0)

    // Définir les dimensions de l'image
    const width = 800
    const height = 400 + 30 * filteredPlayers.length
    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    // Charger le logo
    const logo = await loadImage('./public/logo.png')

    // Couleurs
    const primaryColor = 'rgb(60, 147, 208)'
    const secondaryColor = 'rgba(60, 147, 208, 0.2)'

    // Fond de l'image
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, width, height)

    // Dessiner le titre
    context.fillStyle = primaryColor
    context.font = '40px Arial'
    context.fillText(title, 100, 150)

    // Dessiner le logo
    context.drawImage(logo, 250, 25, 75, 75)

    context.font = '20px Arial'
    context.fillStyle = '#000000'
    context.fillText(season, 500, 75)

    // Dessiner le tableau
    const tableX = 50
    const tableY = 180
    const tableWidth = 700
    const rowHeight = 50

    context.fillStyle = primaryColor
    context.fillRect(tableX, tableY, tableWidth, rowHeight)

    context.fillStyle = '#FFFFFF'
    context.font = '20px Arial'
    context.fillText('Nom Prénom', tableX + 10, tableY + 30)
    context.fillText('Buts marqués', tableX + 300, tableY + 30)
    context.fillText('Passe décisives', tableX + 500, tableY + 30)

    filteredPlayers.forEach((player, index) => {
      const rowY = tableY + rowHeight * (index + 1)
      context.fillStyle = index % 2 === 0 ? secondaryColor : '#FFFFFF'
      context.fillRect(tableX, rowY, tableWidth, rowHeight)

      context.fillStyle = '#000000'
      context.fillText(`${index + 1}.`, 30, rowY + 30)
      context.fillText(player.fullname, tableX + 10, rowY + 30)
      context.fillText(player.goalsscored.toString(), tableX + 300, rowY + 30)
      context.fillText(player.assists.toString(), tableX + 500, rowY + 30)
    })

    return { canvas: canvas.toDataURL('image/png') }
  }
}
