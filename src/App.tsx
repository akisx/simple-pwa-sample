import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { MemoContainer } from './components/MemoContainer'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans JP', sans-serif;
    padding: 0;
    margin: 0;
  }
`

const Layout = styled.div`
  padding: 16px;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr;
`

export const App = () => (
  <>
    <GlobalStyle />
    <Layout>
      <MemoContainer />
    </Layout>
  </>
)
