import React, { useState, useCallback, useEffect } from 'react'
import { Memos } from '../types'
import { MemoList } from './MemoList'
import { saveMemo, getMemos, deleteMemo } from '../database'
import { MutlilineInput } from './MultilinInput'

const MemoContainer = () => {
  const [value, setValue] = useState('')
  const [memos, setMemos] = useState<Memos>([])
  const [loaded, setLoaded] = useState(false)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.keyCode == 13 && e.shiftKey == false) {
        e.preventDefault()

        if (value.trim().length === 0) return

        const save = async () => {
          const newMemo = await saveMemo({ text: value })

          setMemos([...memos, newMemo])
          setValue('')
        }

        save()
      }
    },
    [memos, setValue, value]
  )

  const handleDelete = useCallback(
    (id: number) => {
      deleteMemo(id)

      const nextMemos = [...memos].filter(v => v.id !== id)
      setMemos(nextMemos)
    },
    [memos]
  )

  useEffect(() => {
    const loadMemos = async () => {
      const savedMemos = await getMemos()
      setMemos(savedMemos)
      setLoaded(true)
    }

    loadMemos()
  }, [loaded])

  return (
    <div>
      {loaded && (
        <>
          <MutlilineInput value={value} onChange={handleChange} onKeyDown={handleKeyDown} />
          <MemoList memos={memos} onClickDeleteItem={handleDelete} />
        </>
      )}
    </div>
  )
}

export { MemoContainer }
