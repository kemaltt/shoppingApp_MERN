import React from 'react'
import { useDeleteFavoriteMutation, useGetFavoriteQuery } from '../../redux/favorite/favorite-api'
import { useSelector } from 'react-redux';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Col, Row } from 'react-bootstrap';

export default function WishList() {

  const [deleteFavorite] = useDeleteFavoriteMutation()

  const { token, favorite } = useSelector((state) => ({
    favorite: state.favorite.favorite,
    token: state.user.token
  }));
  const delFav = (id) => {
    deleteFavorite({ token, id })
  }
  // const { error } = useGetFavoriteQuery()
  // console.log(error);
  return (
    (favorite.length <= 0)
      ? <h1 className="text-center text-danger mt-5">{<span> you have no favourite product</span>}</h1>
      : <>
        <div className="cart-title d-flex justify-content-start align-items-center gap-4 mb-4 p-4">
          <h1>Favorite</h1>
          <p className="m-0"> {favorite.length} Products</p>
        </div>
        <Row className="p-5">
          <>
            {favorite.map((product, i) => (
              <Col key={i} md='4' className="card">
                <div className="cart? d-flex gap-5 mb-5">
                  <div className="cart-image w-25">
                    <img
                      className="img-fluid "
                      src={product?.image}
                      alt={product?.name}
                    />
                  </div>
                  <div className="cart-detail w-50">
                    <h3 className="fw-bold mb-4">{product?.name}</h3>
                    <p>category:   {product?.category}</p>
                    <p>rating:   {[...Array(5)].map((star, i) => (
                      <i
                        key={i}
                        style={{
                          fontSize: "1.5rem",
                          color: product?.rating >= i + 1 ? "orange" : "grey",
                        }}
                        className="las la-star"
                      ></i>
                    ))}</p>
                    <p>Stock: {product?.countInStock}</p>


                    <div className="cart-buttons d-flex justify-content-between align-items-center gap-5 mt-5 w-50">
                      <div type="button" className="cart-delete d-flex justify-content-between align-items-center gap-3" onClick={() => delFav(product._id)} >
                        <RiDeleteBin6Fill style={{ color: "red", fontSize: "2rem" }} />
                        <span className="fs-4 border-bottom border-dark">Delete</span>
                      </div>
                    </div>
                  </div>
                  <div className="price w-25 text-end">
                    <span className="fs-3 fw-bold"> {product?.price} €</span>
                  </div>
                </div>

              </Col>
            ))}

          </>
        </Row>
      </>
  )
}
