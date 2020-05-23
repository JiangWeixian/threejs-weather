import React from 'react'

interface Props {
  content?: string
}

const ExampleJest = ({ content }: Props) => {
  return <div>{content}</div>
}

export default ExampleJest
