import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

interface IParams {
  params: {
    gameName: string
    tagLine: string
  }
}

export const GET = async (request: NextRequest, { params }: IParams) => {
  try {
    const res = await axios({
      method: "get",
      headers: {
        "X-Riot-Token": process.env.API_KEY
      },
      url: `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${params.gameName}/${params.tagLine}`
    })

    const { data } = res

    return NextResponse.json({ data, status: 200 })
  } catch (err) {
    return NextResponse.json({ status: "error", err })
  }
}
