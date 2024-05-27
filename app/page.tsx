"use client"
import styled from "@emotion/styled"
import Userui from "./components/units/userUi"

export default function Home() {
  return (
    <>
      <About>
        <Example>
          <span style={{ color: "rgb(253, 101, 5)" }}>{`<소환사명>`}</span>
          {`을 입력하면 전적을 확인할 수 있습니다.`}
        </Example>
      </About>
      <Userui />
    </>
  )
}

const About = styled.div`
  margin-top: 60px;
  height: 60px;
  background: rgb(57, 58, 60);
  border: 1px solid rgb(91, 91, 91);
  border-radius: 4px;
`

const Example = styled.div`
  color: #fff;
  font-family: "AppleSDGothic";
  font-weight: bold;
  padding: 20px;
`
