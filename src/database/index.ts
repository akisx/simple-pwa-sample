import Dexie from 'dexie'
import { Memo, Memos } from '../types'

const db = new Dexie('my-db')

db.version(1).stores({
  memos: `++id, text`
})

type UnsavedMemo = {
  text: string
}

const memoTable: Dexie.Table<UnsavedMemo | Memo, number> = db.table('memos')

export const saveMemo = async (memo: UnsavedMemo): Promise<Memo> => {
  const savedId = await memoTable.put(memo)
  return {
    id: savedId,
    text: memo.text
  }
}

export const getMemos = async (): Promise<Memos> => {
  return memoTable.toArray(memos => memos.map(memo => memo as Memo))
}

export const deleteMemo = async (id: number): Promise<void> => {
  await memoTable.delete(id)
  return
}
