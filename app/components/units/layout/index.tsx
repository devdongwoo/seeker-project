"use client"
import styled from "@emotion/styled"
import SearchBar from "../search"

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <Wrap>
      <Container className="container">
        <Section>
          <SearchBar />
        </Section>
        {props.children}
      </Container>
    </Wrap>
  )
}

const Wrap = styled.section`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-image: url("/background_img.png");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`

const Section = styled.div`
  display: flex;
  justify-content: space-between;
`

const Container = styled.div`
  width: 80rem;
  padding: 0 10px;
`
