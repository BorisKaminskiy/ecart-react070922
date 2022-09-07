import React, { useState } from 'react'
import Ecart from './Ecart'
import Inventory from './Inventory'
import './App.css'

let inventoryDict = {
  Apple: {
    price: 10,
    src: './Img/apple.jpg',
    stockQuantity: 12,
    selectedQuantity: 0,
  },
  Melon: {
    price: 20,
    src: './Img/melon.jpg',
    stockQuantity: 5,
    selectedQuantity: 0,
  },
  Orange: {
    price: 8,
    src: './Img/orange.jpg',
    stockQuantity: 20,
    selectedQuantity: 0,
  },
}

function dictConvertation(dict) {
  return Object.keys(dict).map((key) => {
    return { ...dict[key], key, isSelected: false }
  })
}

export default function App() {
  let inventoryArray = dictConvertation(inventoryDict)
  let [inventory, setInventory] = useState(inventoryArray)

  function increaseStock(key) {
    setInventory(
      inventory.map((item) =>
        item.key === key
          ? {
              ...item,
              stockQuantity: item.stockQuantity - 1,
              selectedQuantity: item.selectedQuantity + 1,
              isSelected: true,
            }
          : { ...item }
      )
    )
  }

  function decreaseStock(key) {
    setInventory(
      inventory.map((item) =>
        item.key === key
          ? {
              ...item,
              stockQuantity: item.stockQuantity + 1,
              selectedQuantity: item.selectedQuantity - 1,
              isSelected: true,
            }
          : { ...item }
      )
    )
  }

  function summSelected() {
    return inventory
      .map((item) => item.price * item.selectedQuantity)
      .reduce((accumulator, item) => accumulator + item)
  }

  function deleteSelectedItem(key) {
    setInventory(
      inventory.map((item) =>
        item.key === key
          ? {
              ...item,
              stockQuantity: item.stockQuantity + item.selectedQuantity,
              selectedQuantity: 0,
              isSelected: false,
            }
          : { ...item }
      )
    )
  }

  return (
    <>
      <div className="p-3">
        <h1 className="h3">Ecart</h1>
        <Ecart
          inventoryItems={inventory}
          inventoryIncreaseFunction={increaseStock}
          inventoryDecreaseFunction={decreaseStock}
          sumSelectedItemsFunction={summSelected}
          inventoryDeleteFunction={deleteSelectedItem}
        />
        <Inventory
          inventoryItems={inventory}
          inventoryIncreaseFunction={increaseStock}
        />
      </div>
    </>
  )
}
