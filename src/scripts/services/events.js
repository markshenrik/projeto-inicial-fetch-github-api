import { baseUrl } from '/src/scripts/variables.js'

async function getEvents(userName){
    const events = await fetch(`${baseUrl}/${userName}/events`)
    return await events.json()
}

export { getEvents }