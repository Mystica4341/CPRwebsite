import React from 'react'
import Banner from '../Banner'
import NavigationBar from '../Navigator'
import ItemsList from '../Item'
import { combo } from '../../data/combo'

export default function Home() {
  return (
    <div>
      <div>
        <Banner />
        <NavigationBar />
        <div className='grid grid-cols-4 gap-4 p-4'>
          {combo.map(item => (
            <ItemsList {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}
