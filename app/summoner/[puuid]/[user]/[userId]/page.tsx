"use client"
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { useParams } from "next/navigation"
import styled from "@emotion/styled"
import { getMatcheData } from "../../../../axios/asia"
import { TIER_IMAGE } from "@/app/img"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { Skeleton } from "@/app/components/units/skeleton/skeleton"
import { setBookmark } from "@/app/redux/features/bookmark"
import { Spinner } from "@/app/components/units/spinner/spinner"
import { setUser } from "@/app/redux/features/user"

interface Tier {
  tier?: string
  rank?: string
  wins?: number
  losses?: number
  leaguePoints?: number
}

let start = 0
const count = 10

export default function User() {
  const params = useParams()
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tier, setTier] = useState<Tier[]>()
  const [list, setList] = useState<any>([])

  const user = useAppSelector((state) => state.persistedReducer.user)

  const dispatch = useAppDispatch()

  const changeDate = (num: number) => {
    const date = new window.Date(num)
    return date.toLocaleString()
  }

  const matcheData = async () => {
    let matchList: any = []

    const response = await fetch(
      `/api/league/${String(params.puuid)}/${start}/${count}`,
      {
        method: "GET"
      }
    )
    const matches = await response.json()
    for (let i = 0; i < matches?.data.length; i++) {
      const matchData = matches?.data[i]
      const response = await fetch(`/api/match/${matchData}`, {
        method: "GET"
      })
      const list = await response.json()
      matchList.push(list)
    }

    setShow(false)
    setLoading(true)
    setList([...list, ...matchList])
  }

  const tierData = async () => {
    const response = await fetch(`/api/league/${String(params.puuid)}`, {
      method: "GET"
    })
    const tier = await response.json()
    setTier([
      {
        tier: tier?.data[0]?.tier,
        rank: tier?.data[0]?.rank,
        wins: tier?.data[0]?.wins,
        losses: tier?.data[0]?.losses,
        leaguePoints: tier?.data[0]?.leaguePoints
      },
      {
        tier: tier?.data[1]?.tier,
        rank: tier?.data[1]?.rank,
        wins: tier?.data[1]?.wins,
        losses: tier?.data[1]?.losses,
        leaguePoints: tier?.data[1]?.leaguePoints
      }
    ])

    dispatch(
      setUser({
        ...user,
        profileIconId: tier.data.profileIconId,
        summonerLevel: tier.data.summonerLevel,
        revisionDate: tier.data.revisionDate,
        id: tier.data.id,
        accountId: tier.data.accountId
      })
    )

    dispatch(
      setBookmark({
        ...user,
        profileIconId: tier.data.profileIconId,
        summonerLevel: tier.data.summonerLevel,
        revisionDate: tier.data.revisionDate,
        id: tier.data.id,
        accountId: tier.data.accountId
      })
    )

    if (tier?.status === 200) {
      matcheData()
    }
  }

  useEffect(() => {
    tierData()

    return () => {
      start = 0
    }
  }, [])

  return (
    <Wrap>
      <Container className="info-container">
        <Info className="info">
          <div style={{ position: "relative" }}>
            <Img
              width="120px"
              src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${user.profileIconId}.png`}
            />
            <UserLevel>{`${user.summonerLevel}`}</UserLevel>
          </div>
          <UserData>
            <UserName>{`${user.gameName}`}</UserName>
            <PlayDate>League of Legend</PlayDate>
          </UserData>
        </Info>
        <SoloRank className="info">
          <TierPicture
            width="120px"
            height="120px"
            src={
              TIER_IMAGE.filter((el) => {
                return tier && tier[0].tier
                  ? el.name === (tier && tier[0].tier?.toLowerCase())
                  : "unranked"
              })[0]?.src
            }
          />
          <TierName>
            <Box>
              <Rank_Name>솔로 랭크</Rank_Name>
              <Class>
                {tier && tier[0].tier}
                <Num>
                  {(tier &&
                    tier[0].tier?.toLocaleLowerCase().trim() ===
                      "challenger") ||
                  (tier &&
                    tier[0].tier?.toLocaleLowerCase().trim() ===
                      "grandmaster") ||
                  (tier &&
                    tier[0].tier?.toLocaleLowerCase().trim() === "master")
                    ? ""
                    : tier && tier[0].rank}
                </Num>
              </Class>
              <WinLose>
                <Win>{tier && tier[0].tier ? tier && tier[0].wins : 0} 승</Win>
                <Lose>
                  {tier && tier[0].tier ? tier && tier[0].losses : 0} 패
                </Lose>
              </WinLose>
              <WinRate>
                {tier && tier[0].tier ? `승률: ` + " " : ""}
                {tier && tier[0].tier
                  ? tier &&
                    Math.round(
                      (Number(tier[0].wins) /
                        (Number(tier[0].wins) + Number(tier[0].losses))) *
                        100
                    ) + `%`
                  : ""}
              </WinRate>
              <Lp>{tier && tier[0].tier ? tier[0].leaguePoints + "LP" : ""}</Lp>
            </Box>
          </TierName>
        </SoloRank>
        <MultiRank className="info">
          <TierPicture
            width="120px"
            height="120px"
            src={
              TIER_IMAGE.filter((el) => {
                return tier && tier[1].tier
                  ? el.name === (tier && tier[1].tier?.toLowerCase())
                  : "unranked"
              })[0]?.src
            }
          />
          <TierName>
            <Box>
              <Rank_Name>자유 랭크</Rank_Name>
              <Class>
                {tier && tier[1].tier}
                <Num>
                  {(tier &&
                    tier[1].tier?.toLocaleLowerCase().trim() ===
                      "challenger") ||
                  (tier &&
                    tier[1].tier?.toLocaleLowerCase().trim() ===
                      "grandmaster") ||
                  (tier &&
                    tier[1].tier?.toLocaleLowerCase().trim() === "master")
                    ? ""
                    : tier && tier[1].rank}
                </Num>
              </Class>
              <WinLose>
                <Win>{tier && tier[1].tier ? tier && tier[1].wins : 0} 승</Win>
                <Lose>
                  {tier && tier[1].tier ? tier && tier[1].losses : 0} 패
                </Lose>
              </WinLose>
              <WinRate>
                {tier && tier[1].tier ? `승률: ` + " " : ""}
                {tier && tier[1].tier
                  ? tier &&
                    Math.round(
                      (Number(tier[1].wins) /
                        (Number(tier[1].wins) + Number(tier[1].losses))) *
                        100
                    ) + `%`
                  : ""}
              </WinRate>
              <Lp>{tier && tier[1].tier ? tier[1].leaguePoints + "LP" : ""}</Lp>
            </Box>
          </TierName>
        </MultiRank>
      </Container>
      <Bottom>
        <ListContainer>
          {loading ? (
            <ListBox style={{ listStyle: "none" }}>
              {list.map((pel: any) => {
                return (
                  <List key={pel?.data?.info?.gameId}>
                    {pel?.data?.info?.participants
                      .filter((el: any) => {
                        return el.summonerName === user.gameName
                      })
                      .map((el: any, idx: number) => {
                        const outcome = el.win ? "win" : "losses"
                        return (
                          <Content key={el.gameId + idx} outcome={outcome}>
                            <ChampionBox>
                              <div
                                style={{
                                  textAlign: "center",
                                  marginRight: "10px",
                                  width: "50px"
                                }}
                              >
                                <WinLose
                                  style={{
                                    color: "#758592"
                                  }}
                                >
                                  {el.win ? "승리" : "패배"}
                                </WinLose>
                                <Time>
                                  <Minute>
                                    {Math.floor(el.timePlayed / 60)}분
                                  </Minute>
                                  <Second>{el.timePlayed % 60}초</Second>
                                </Time>
                              </div>
                              <ChampionImg
                                width="70px"
                                src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${el.championName}.png`}
                              />
                              <Grade>
                                <MyPoint>
                                  <Kill>{`${el.kills} / `}</Kill>
                                  <Death>{`${el.deaths}`}</Death>
                                  <Assist>{` /  ${el.assists}`}</Assist>
                                </MyPoint>
                              </Grade>
                            </ChampionBox>
                            <Date>
                              {changeDate(pel?.data?.info?.gameCreation)}
                            </Date>
                          </Content>
                        )
                      })}
                  </List>
                )
              })}
              {show ? (
                <List>
                  <Spinner />
                </List>
              ) : (
                <List>
                  <MoreBtn
                    onClick={() => {
                      start += 10
                      setShow(true)
                      matcheData()
                    }}
                  >
                    더 보기
                  </MoreBtn>
                </List>
              )}
            </ListBox>
          ) : (
            <Skeleton />
          )}
        </ListContainer>
      </Bottom>
    </Wrap>
  )
}
const Wrap = styled.div`
  font-family: "AppleSDGothic";
  font-weight: bold;
  color: #fff;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
`

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  background: rgb(57, 58, 60);
  border: 1px solid rgb(91, 91, 91);
  border-radius: 4px;
  padding: 20px;
  width: 500px;
`

const Bottom = styled.div``

const Box = styled.div``

const Img = styled.img`
  border-radius: 4px;
`

const UserData = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`
const UserLevel = styled.span`
  display: inline-block;
  line-height: 20px;
  padding: 0px 8px;
  font-size: 12px;
  border-radius: 10px;
  color: rgb(255, 255, 255);
  background-color: rgb(32, 45, 55);
  position: absolute;
  bottom: 0;
  left: 46px;
`

const UserName = styled.p`
  font-size: 24px;
  width: 100%;
  text-align: right;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`

const PlayDate = styled.div`
  font-size: 18px;
`

const SoloRank = styled.div`
  color: #fff;
  padding: 20px 20px 10px;
  background: rgb(57, 58, 60);
  border: 1px solid rgb(91, 91, 91);
  border-radius: 4px;
  width: 360px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;

  :first-of-type {
    margin-top: 0px;
  }
`

const MultiRank = styled(SoloRank)``

const TierPicture = styled.img`
  margin-top: 20px;
`

const TierName = styled.span``

const Num = styled.span`
  margin-left: 5px;
`

const Rank_Name = styled.p`
  position: absolute;
  top: 10px;
  left: 0px;
  padding-bottom: 5px;
  padding-left: 10px;
  width: 100%;
  font-size: 15px;
  border-bottom: 1px solid #555555;
`

const Class = styled.span`
  font-size: 14px;
`

const WinLose = styled.p`
  font-size: 14px;
  color: #9aa4af;
`
const WinRate = styled(WinLose)``

const Lp = styled(WinRate)``

const Win = styled.span`
  margin-right: 5px;
`

const Lose = styled(Win)`
  margin-right: 0px;
`

const ListContainer = styled.div``

const ListBox = styled.ul`
  margin-top: 60px;
  list-style: none;
  height: 540px;
  overflow: hidden;
  overflow-y: auto;
`

const MoreBtn = styled.button`
  border-width: 1px;
  border-style: solid;
  border-color: #dbe0e4;
  background-color: #fff;
  border-radius: 4px;
  width: 100%;
  height: 40px;
  padding: 8px 0px;
  color: #202d37;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
`

const List = styled.li`
  margin-bottom: 10px;
`

const Content = styled.div`
  background-color: ${(props: { outcome: string }) => {
    return props.outcome === "win" ? "#ECF2FF" : "#FFF1F3"
  }};
  height: 100px;
  border-radius: 4px;
  border-left-width: 6px;
  border-left-style: solid;
  border-color: ${(props: { outcome: string }) => {
    return props.outcome === "win" ? "#5383E8" : "#E84057"
  }};
  position: relative;
`

const ChampionBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 30px;
`
const Date = styled.div`
  font-size: 12px;
  color: #818181;
  width: 100px;
  position: absolute;
  top: 2rem;
  right: 1.2rem;
  text-align: center;
`

const Time = styled.div`
  font-size: 12px;
  text-align: center;
  color: rgb(117, 133, 146);
  margin-top: 2px;
  border-top: 1px solid #bbb5b5;
  padding-top: 2px;
`

const Minute = styled.span``

const Second = styled(Minute)``

const ChampionImg = styled.img`
  border-radius: 50%;
`

const Grade = styled.div`
  text-align: center;
  margin-left: 10px;
`

const MyPoint = styled.div``

const Kill = styled.span`
  color: #202d37;
`

const Death = styled(Kill)`
  color: #d31a45;
`

const Assist = styled(Kill)``
