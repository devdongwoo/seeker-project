import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

interface IParams {
  params: {
    puuid: string
  }
}

export const GET = async (request: NextRequest, { params }: IParams) => {
  try {
    let res

    res = await axios({
      method: "get",
      headers: {
        "X-Riot-Token": process.env.API_KEY
      },
      url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${params.puuid}`
    })
    const { data: accountId } = res

    if (accountId.id) {
      res = await axios({
        method: "get",
        headers: {
          "X-Riot-Token": process.env.API_KEY
        },
        url: `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${accountId.id}`
      })
    } else {
      throw new Error("사용자의 정보를 불러올 수 없습니다.")
    }

    const { data: summonerData } = res
    return NextResponse.json({
      status: 200,
      data: { ...accountId, ...summonerData }
    })
  } catch (err) {
    return NextResponse.json({ status: "error", err })
  }
}
