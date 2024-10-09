import React from "react";
import ComboList from '../ComboList'
import { combo } from "../../data/combo";

export default function Menu() {
  return (
    <div>
      <div className='grid grid-cols-4 gap-4 p-4'>
          {combo.map(item => (
            <ComboList {...item} />
          ))}
          </div>
    </div>
  );
}
