import axios from "axios"

const API_KEY = "RGAPI-6d27ca9e-5360-4380-95fa-ed1b1577d7d6"

const asia = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,DELETE,POST,OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With"
  }
})

export const getPuuidMatches = async (
  userPuuid: string,
  start: number,
  count: number
) => {
  try {
    const res = await asia.get(
      `lol/match/v5/matches/by-puuid/${userPuuid}/ids`,
      {
        params: {
          start,
          count,
          api_key: API_KEY
        }
      }
    )
    return res
  } catch (error) {
    if (error instanceof Error) alert(error.message)
  }
}

export const getMatcheData = async (matcheId: string) => {
  try {
    const res = await asia.get(`lol/match/v5/matches/${matcheId}`, {
      params: { api_key: API_KEY }
    })
    return res
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
  }
}
