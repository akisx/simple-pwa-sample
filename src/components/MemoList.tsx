import React from 'react'
import { Memos } from '../types'
import { Card } from './Card'
import styled from 'styled-components'

type Prop = {
  memos: Memos
}

const MemoList = ({ memos }: Prop) => {
  return (
    <Wrapper>
      {memos.map(memo => (
        <Card key={memo.id}>{memo.text}</Card>
      ))}
    </Wrapper>
  )
}

export { MemoList }

const Wrapper = styled.div`
  padding: 8px 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 8px;
`
