import React from 'react';
import Banner from '../Banner';
import NavigationBar from '../Navigator';
import ItemsList from '../Item';
import { combo } from '../../data/data';

export default function Home() {
  // Lọc sản phẩm có giá 150000
  const filteredCombo = combo.filter(item => item.cartegory_id === "combo");

  return (
    <div>
      <div>
        <Banner />
        <NavigationBar />
        <div className='grid grid-cols-4 gap-4 p-4'>
          {filteredCombo.map(item => (
            <ItemsList key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
