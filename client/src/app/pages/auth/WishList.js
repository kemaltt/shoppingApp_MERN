import React from 'react'

export default function WishList() {
  return (
    <div>
      <h1 className='text-center my-5'>Favoriten</h1>
      <div className="wish-list p-2">
        <div className="wish-list__item">
          <img src="https://via.placeholder.com/250" alt="product" />
          <h3>Product title</h3>
          <p>Product description</p>
          <div>
            <button className="btn btn-primary">Add to cart</button>
            <button className="btn btn-danger">Remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}
