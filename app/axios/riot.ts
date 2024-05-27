import axios from "axios"

const riot = axios.create({
  headers: {
    "X-Riot-Token": process.env.API_KEY
  }
})

export const getSummoner = async (gameName: string, tagLine: string) => {
  try {
    const res = await riot.get(
      `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`
    )

    console.log(res)
    return res
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
  }
}

/* export const getTier = async (id: string) => {
  try {
    const res = await riot.get(`/lol/league/v4/entries/by-summoner/${id}`, {
      params: {
        api_key: API_KEY
      }
    })
    return res
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
  }
}
  */
