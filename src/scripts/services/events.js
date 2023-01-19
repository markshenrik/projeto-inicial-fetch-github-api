import { baseUrl, eventsQuantity } from '../variables.js'

async function getEvents(userName){
    const events = await fetch(`${baseUrl}/${userName}/events?per_page=${eventsQuantity}`)
    return await events.json()
}

export { getEvents }