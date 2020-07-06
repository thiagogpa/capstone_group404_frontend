import { useState } from 'react'

export const useControlledComponents = (initialState) => {
  const [input, setInput] = useState(initialState)

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  })

  return [input, handleInputChange]
}