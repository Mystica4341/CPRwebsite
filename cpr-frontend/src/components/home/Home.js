import React from 'react'
import Banner from '../Banner'
import Nav from '../Navigator'
import ComboList from '../ComboList'
import { combo } from '../data/combo'

export default function Home() {
  return (
    <div>
      <div>
        <Banner />
        <Nav />
        <div className='grid grid-cols-4 gap-4 p-4'>
          {combo.map(item => (
            <ComboList {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}
