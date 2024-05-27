import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

interface IParams {
  params: {
    puuid: string
    start: number
    count: number
  }
}

export const GET = async (request: NextRequest, { params }: IParams) => {
  try {
    const res = await axios({
      method: "get",
      headers: {
        "X-Riot-Token": process.env.API_KEY
      },
      url: `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${params.puuid}/ids?start=${params.start}&count=${params.count}`
    })

    const { data } = res

    return NextResponse.json({ data, status: 200 })
  } catch (err) {
    return NextResponse.json({ status: "error", err })
  }
}
