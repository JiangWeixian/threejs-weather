import React from 'react'
import useSWR from 'swr'

import ExampleCount from '@/components/Counter/Count'
import api from '@/api'

interface PageProps {
  children?: React.ReactNode
}

const Home = (props: PageProps) => {
  const { data } = useSWR('fake-data', api.fake.list, { refreshInterval: 1000 })
  console.log(props)
  return (
    <div>
      this is new home page reload1
      {data?.map(v => (
        <span key={v}>{v}-1</span>
      ))}
      <ExampleCount />
      {props.children}
    </div>
  )
}

export default Home
