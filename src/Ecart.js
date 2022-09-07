import React, { useState } from 'react'
import './App.css'

function EcartItems({
  inventoryArr,
  functionCheckSelected,
  inventoryIncreaseFunction,
  inventoryDecreaseFunction,
  inventoryDeleteFunction,
}) {
  let checkSelectedQuantity = functionCheckSelected()

  if (checkSelectedQuantity > 0) {
    return inventoryArr
      .filter((item) => item.isSelected)
      .map((item) => {
        return (
          <>
            <div className="select-container">
              <img src={item.src} className="img-thumbnail" alt="..." />
              <div className="my-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  name={item.key}
                  disabled={item.stockQuantity === 0 ? true : false}
                  onClick={(event) => {
                    inventoryIncreaseFunction(event.target.name)
                  }}
                >
                  +1
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  name={item.key}
                  disabled={item.selectedQuantity === 0 ? true : false}
                  onClick={(event) => {
                    inventoryDecreaseFunction(event.target.name)
                  }}
                >
                  -1
                </button>

                <span>
                  {item.selectedQuantity === 0 ? (
                    <s>
                      {`${item.key} - $${item.price} x ${item.selectedQuantity}`}
                    </s>
                  ) : (
                    `${item.key} - $${item.price} x ${item.selectedQuantity}`
                  )}
                </span>
                <button
                  className="btn btn-outline-danger btn-sm"
                  name={item.key}
                  onClick={(event) => {
                    inventoryDeleteFunction(event.target.name)
                  }}
                >
                  X
                </button>
              </div>
            </div>
          </>
        )
      })
  } else {
    return <div>Your cart is empty</div>
  }
}

function EcartCheckout({
  inventoryArr,
  functionCheckSelected,
  sumSelectedItemsFunction,
}) {
  let checkSelectedQuantity = functionCheckSelected()
  let checkoutSum = sumSelectedItemsFunction()
  let receipt = inventoryArr
    .filter((item) => item.isSelected)
    .map(
      (item) =>
        `\nname:${item.key} qtty:${item.selectedQuantity} summ:${
          item.selectedQuantity * item.price
        }$ \n`
    )

  if (checkSelectedQuantity > 0)
    return (
      <>
        <div>Total: $ {checkoutSum} </div>
        <button
          className="btn btn-primary"
          onClick={() =>
            alert(`Receipt 
            ${receipt}, 
            Total:$${checkoutSum}, 
            'Thank you'`)
          }
        >
          Checkout
        </button>
      </>
    )
}

export default function Ecart({
  inventoryItems,
  inventoryIncreaseFunction,
  inventoryDecreaseFunction,
  sumSelectedItemsFunction,
  inventoryDeleteFunction,
}) {
  function checkSelected() {
    let checkSelectedQuantity = 0
    inventoryItems.forEach((element) => {
      if (element.isSelected) checkSelectedQuantity += 1
    })

    return checkSelectedQuantity
  }

  return (
    <div>
      <EcartItems
        inventoryArr={inventoryItems}
        functionCheckSelected={checkSelected}
        inventoryIncreaseFunction={inventoryIncreaseFunction}
        inventoryDecreaseFunction={inventoryDecreaseFunction}
        inventoryDeleteFunction={inventoryDeleteFunction}
      />
      <EcartCheckout
        inventoryArr={inventoryItems}
        functionCheckSelected={checkSelected}
        sumSelectedItemsFunction={sumSelectedItemsFunction}
      />
    </div>
  )
}
