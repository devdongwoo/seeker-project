"use client"
import { deleteBookmark } from "@/app/redux/features/bookmark"
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks"
import { useRouter } from "next/navigation"
import styled from "@emotion/styled"
import { setUser } from "@/app/redux/features/user"

interface IUser {
  id?: string
  accountId?: string
  puuid?: string
  gameName?: string
  tagLine?: string
  profileIconId?: number
  revisionDate?: number
  summonerLevel?: number
}

export default function Userui() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const onClickPage = (e: React.MouseEvent<HTMLDivElement>, el: IUser) => {
    e.preventDefault()
    dispatch(setUser({ ...el }))
    router.push(`/summoner/${el.puuid}/${el.gameName}/${el.tagLine}`)
  }

  const onClickClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dispatch(deleteBookmark(e.currentTarget.id))
  }

  const bookmark = useAppSelector((state) => state.persistedReducer.bookmark)
  const newBookmark = bookmark.filter((_, idx) => idx !== 0)

  return (
    <Wrap>
      <Container className="container">
        {newBookmark.map((el) => {
          return (
            <Extra
              key={el.id}
              onClick={(e) => {
                onClickPage(e, el)
              }}
            >
              <Img
                width="128px"
                src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${el.profileIconId}.png`}
                alt="유저 프로필 이미지"
              />
              <UserInfo>
                <UserName className="username">
                  {el.gameName + "#" + el.tagLine}
                </UserName>
                <UserUpdate>League of Legend</UserUpdate>
              </UserInfo>
              <Close onClick={onClickClose} id={el.id}>
                X
              </Close>
            </Extra>
          )
        })}
      </Container>
    </Wrap>
  )
}

const Wrap = styled.div`
  height: 400px;
  margin: 30px 0;
  overflow: auto;
`

const Container = styled.div``

const Extra = styled.div`
  display: flex;
  background: rgba(49, 49, 49, 0.7);
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;
`

const Img = styled.img``

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 20px;
  color: #fff;
  font-family: "AppleSDGothic";
  padding: 10px;
`

const UserName = styled.p`
  font-size: 24px;
  font-weight: bold;
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`
const UserUpdate = styled(UserName)`
  font-size: 18px;
`

const Close = styled.button`
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  border: none;
  background-color: transparent;
  position: absolute;
  right: 20px;
  top: 6px;
  cursor: pointer;
  width: 42px;
  height: 42px;
  z-index: 9999;
`
