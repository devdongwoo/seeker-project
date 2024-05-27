import styled from "@emotion/styled"

export function Spinner() {
  return (
    <Wrap>
      <Spin id="spin"></Spin>
    </Wrap>
  )
}

const Wrap = styled.div`
  margin: 0 auto;
  padding: 30px;
  max-width: 1170px;
`
const Spin = styled.div`
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border: 10px solid rgba(163, 151, 198, 0.2);
  border-top: 10px solid rgb(253, 101, 5);
  border-radius: 50%;
`
