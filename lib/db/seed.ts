import 'dotenv/config'
import { db } from './index'
import { ticketType, conference, ticket } from './schema/index'
import { v4 as uuidv4 } from 'uuid'

async function main() {
  console.log('🌱 Seeding database...')
  console.log('Cleaning up old data...')
  try {
    console.log('Deleting tickets...')
    await db.delete(ticket)

    console.log('Deleting ticket types...')
    await db.delete(ticketType)

    console.log('Deleting conferences...')
    await db.delete(conference)
  } catch (e) {
    console.warn('Cleanup failed (maybe tables empty or constraints):', e)
  }

  console.log('Creating conferences...')
  await db.insert(conference).values([
    {
      id: uuidv4(),
      title: "L'Architecture de Demain",
      description:
        'Comment construire durablement en 2030 ? Une exploration des matériaux bio-sourcés.',
      theme: 'Écologie & Habitat',
      startAt: new Date('2026-07-17T10:00:00'),
      endAt: new Date('2026-07-17T11:30:00'),
      speakerName: 'Jean Nouvel (Invité)',
      location: 'Grande Scène',
    },
    {
      id: uuidv4(),
      title: "L'Océan, notre avenir",
      description:
        'Plongée au coeur des enjeux maritimes et de la biodiversité.',
      theme: 'Biodiversité',
      startAt: new Date('2026-07-17T14:00:00'),
      endAt: new Date('2026-07-17T15:30:00'),
      speakerName: 'Claire Nouvian',
      location: 'Chapiteau Océan',
    },
    {
      id: uuidv4(),
      title: 'Concert : The Green Vibes',
      description: 'Un concert acoustique pour célébrer la nature.',
      theme: 'Musique',
      startAt: new Date('2026-07-17T20:00:00'),
      endAt: new Date('2026-07-17T22:00:00'),
      speakerName: 'The Green Vibes',
      location: 'Grande Scène',
    },
    {
      id: uuidv4(),
      title: 'Tech & Sobriété',
      description:
        'Le numérique peut-il être compatible avec les limites planétaires ?',
      theme: 'Numérique Responsable',
      startAt: new Date('2026-07-18T11:00:00'),
      endAt: new Date('2026-07-18T12:30:00'),
      speakerName: 'Aurélien Barrau',
      location: 'Salle des Possibles',
    },
    {
      id: uuidv4(),
      title: 'Atelier : Zéro Déchet',
      description:
        'Apprenez à réduire vos déchets au quotidien avec des solutions simples.',
      theme: 'Atelier',
      startAt: new Date('2026-07-18T14:00:00'),
      endAt: new Date('2026-07-18T16:00:00'),
      speakerName: 'Association Zéro Waste',
      location: 'Village Associatif',
    },
    {
      id: uuidv4(),
      title: 'Concert : Electro Bio',
      description: 'Soirée festive avec des sons organiques.',
      theme: 'Musique',
      startAt: new Date('2026-07-18T21:00:00'),
      endAt: new Date('2026-07-18T23:00:00'),
      speakerName: 'DJ Gaia',
      location: 'Chapiteau Océan',
    },
    {
      id: uuidv4(),
      title: "Clôture : L'Espoir en action",
      description: "Table ronde finale sur l'engagement citoyen.",
      theme: 'Engagement',
      startAt: new Date('2026-07-19T16:00:00'),
      endAt: new Date('2026-07-19T18:00:00'),
      speakerName: 'Collectif',
      location: 'Grande Scène',
    },
  ])

  console.log('Creating ticket types...')
  await db.insert(ticketType).values([
    {
      id: uuidv4(),
      name: 'Pass Gratuit',
      description: 'Accès complet',
      validFrom: new Date('2026-07-17T00:00:00'),
      validUntil: new Date('2026-07-19T23:59:59'),
    },
  ])

  console.log('✅ Seeding completed!')
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
