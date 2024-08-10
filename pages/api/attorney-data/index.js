import dbConnect from '@/utils/dbConnect'
import Attorney from '@/db-schemas/Attorney'
import AttorneyPriceMap from '@/db-schemas/AttorneyPriceMap'
import TrafficCourt from '@/db-schemas/TrafficCourt'
import TrafficCounty from '@/db-schemas/TrafficCounty'
import Violation from '@/db-schemas/Violation'
import TrafficState from '@/db-schemas/TrafficState'
import mongoose from 'mongoose'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const attorneys = await Attorney.find({})
        res.status(200).json({ success: true, data: attorneys })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const { name, email, phone, address, enabled, priceMaps } = req.body

        const existingAttorney = await Attorney.findOne({ email });
        if (existingAttorney) {
          return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        // Créer l'avocat
        const attorney = new Attorney({ name, email, phone, address, enabled })
        await attorney.save()

        const attorneyId = attorney._id

        if (priceMaps && priceMaps.length > 0) {
          const priceMapPromises = priceMaps.map(async (priceMap) => {
            const { court, county, violation, points, price } = priceMap

            let courtDoc
            if (typeof court === 'string' || court instanceof String) {
              courtDoc = await TrafficCourt.findById(court)
            } else if (court && court.name) {
              courtDoc = await TrafficCourt.findOne({ name: court.name })
              if (!courtDoc) {
                const trafficState = await TrafficState.findOne({ shortName: 'NY' }) // Exemple de recherche d'état
                const trafficCounty = await TrafficCounty.findOne({ name: 'New York' }) // Exemple de recherche de comté
                if (trafficState && trafficCounty) {
                  courtDoc = new TrafficCourt({
                    name: court.name,
                    address: priceMap.courtAddress || '',
                    trafficCounty: trafficCounty._id,
                    trafficState: trafficState._id,
                    stateShortName: trafficState.shortName,
                    enabled: true,
                  })
                  await courtDoc.save()
                }
              }
            }

            let countyDoc
            if (typeof county === 'string' || county instanceof String) {
              countyDoc = await TrafficCounty.findById(county)
            } else if (county && county.name) {
              countyDoc = await TrafficCounty.findOne({ name: county.name })
              if (!countyDoc) {
                const trafficState = await TrafficState.findOne({ shortName: 'NY' }) // Exemple de recherche d'état
                if (trafficState) {
                  countyDoc = new TrafficCounty({
                    name: county.name,
                    trafficState: trafficState._id,
                    stateShortName: trafficState.shortName,
                    enabled: true,
                  })
                  await countyDoc.save()
                }
              }
            }

            let violationDoc
            if (typeof violation === 'string' || violation instanceof String) {
              violationDoc = await Violation.findById(violation)
            } else if (violation && violation.name) {
              violationDoc = await Violation.findOne({ name: violation.name })
              if (!violationDoc) {
                violationDoc = new Violation({ name: violation.name, points })
                await violationDoc.save()
              }
            }

            return new AttorneyPriceMap({
              attorney: attorneyId,
              court: courtDoc ? courtDoc._id : undefined,
              county: countyDoc ? countyDoc._id : undefined,
              violation: violationDoc ? violationDoc._id : undefined,
              points,
              price,
            }).save()
          })

          await Promise.all(priceMapPromises)
        }

        res.status(201).json({ success: true, data: attorney })
      } catch (error) {
        console.error('Error creating attorney:', error)
        res.status(400).json({ success: false, error: error.message })
      }
      break
    case 'DELETE':
      try {
        const { id } = req.query
        if (!id) {
          return res.status(400).json({ success: false, error: 'No attorney ID provided' })
        }

        // Supprimer les grilles tarifaires associées
        await AttorneyPriceMap.deleteMany({ attorney: id })

        // Supprimer l'avocat
        const deletedAttorney = await Attorney.findByIdAndDelete(id)

        if (!deletedAttorney) {
          return res.status(404).json({ success: false, error: 'Attorney not found' })
        }

        res.status(200).json({ success: true, data: deletedAttorney })
      } catch (error) {
        res.status(400).json({ success: false, error: error.message })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
