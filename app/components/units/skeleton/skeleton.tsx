"use client"
import styled from "@emotion/styled"

export function Skeleton() {
  const skeleton_arr = Array.from({ length: 10 }, () => 0)

  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8
        return v.toString(16)
      }
    )
  }
  return (
    <ListBox>
      {skeleton_arr.map((el) => {
        return (
          <List key={el + uuidv4()} className="skeleton-list">
            <Content key={uuidv4()} className="skeleton-content"></Content>
          </List>
        )
      })}
    </ListBox>
  )
}

const ListBox = styled.ul`
  margin-top: 60px;
  list-style: none;
  height: 540px;
  overflow: hidden;
  overflow-y: auto;
`

const List = styled.li`
  margin-bottom: 10px;
  position: relative;
  box-shadow: 0 9px 33px rgba(0, 0, 0, 0.07);
  border-radius: 4px;
  border-left-width: 6px;
  border-left-style: solid;
`
const Content = styled.div`
  background-color: #434040;
  height: 100px;
`
