import React, { useState } from 'react'
import './App.css'

export default function Inventory({
  inventoryItems,
  inventoryIncreaseFunction,
}) {
  function GetInventoryItem() {
    return inventoryItems.map((item) => {
      return (
        <div className="my-2">
          <button
            className="btn btn-outline-primary btn-sm"
            name={item.key}
            disabled={item.stockQuantity === 0 ? true : false}
            onClick={(event) => {
              inventoryIncreaseFunction(event.target.name)
            }}
          >
            Buy
          </button>
          <span>
            {' '}
            {item.key}- ${item.price} ({item.selectedQuantity} selected,
            {item.stockQuantity} in stock)
          </span>
        </div>
      )
    })
  }

  return (
    <div>
      <h3 className="h4">Inventory</h3>
      <div className="inventory-items">
        <GetInventoryItem />
      </div>
    </div>
  )
}
