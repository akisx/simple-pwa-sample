import React from 'react'
import { Memos } from '../types'
import { Card } from './Card'
import styled from 'styled-components'
import { IconButton } from './IconButton'
import { CloseIcon } from './CloseIcon'

type Prop = {
  memos: Memos
  onClickDeleteItem: (id: number) => void
}

const MemoList = ({ memos, onClickDeleteItem }: Prop) => {
  return (
    <Wrapper>
      {memos.map(memo => (
        <Card key={memo.id}>
          <MemoInner>
            {memo.text}
            <DeleteButtonWrapper>
              <IconButton onClick={() => onClickDeleteItem(memo.id)}>
                <CloseIcon />
              </IconButton>
            </DeleteButtonWrapper>
          </MemoInner>
        </Card>
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

const MemoInner = styled.div`
  display: flex;
`

const DeleteButtonWrapper = styled.div`
  margin-left: auto;
  padding-left: 16px;
`
