import React from 'react'
import { useDeleteFavoriteMutation } from '../../redux/favorite/favorite-api'
import { shallowEqual, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';

import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';

export default function Favorite() {

  const [deleteFavorite] = useDeleteFavoriteMutation()

  const { token, favorite } = useSelector((state) => ({
    favorite: state.favorite.favorite,
    token: state.user.token
  }), shallowEqual);
  const delFav = (id) => {
    deleteFavorite({ token, id })
  }
  // const { error } = useGetFavoriteQuery()
  // console.log(error);
  return (
    (favorite.length <= 0)
      ? <h1 className="text-center text-danger mt-5">{<span> you have no favorite product</span>}</h1>
      : <Card className="p-5">
        <CardHeader
          title='Favorite'
          subheader={`${favorite?.length} Products`}
        />

          <div className=' d-flex justify-content-center gap-3 flex-wrap'>
            {favorite.map((product, i) => (
              < >
                <Card sx={{ maxWidth: 300 ,minWidth:300}}>
                  <CardMedia
                    // onClick={productDetail}
                    component="img"
                    sx={{ objectFit: 'contain', width: '100%', height: '400px', cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
                    image={product.image}
                    title={product.name}
                  />
                  <CardContent sx={{ height: '160px', marginBottom: '4px' }} >
                    <Typography gutterBottom variant="h6" component="div" sx={{ cursor: 'pointer' }} >
                      {product.name}
                    </Typography>
                    <Typography variant='h6' color="text.secondary">
                      {product.category}
                    </Typography>
                    <Typography variant='p' color="text.secondary">
                      Rating {[...Array(5)].map((star, i) => (
                        <i
                          key={i}
                          style={{
                            fontSize: "1.5rem",
                            color: product?.rating >= i + 1 ? "orange" : "grey",
                          }}
                          className="las la-star"
                        ></i>
                      ))}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >

                    <Box>
                      <IconButton onClick={() => delFav(product._id)} aria-label="add to favorites" >
                        <DeleteIcon color='error' />
                      </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'end', fontStyle: 'italic' }}>
                      <Typography color="text.secondary">
                        Stock  {product.countInStock}
                      </Typography>
                      <Typography fontWeight='bold' color="text.secondary">
                        {product.price}€
                      </Typography>
                    </Box>
                  </CardActions>
                </Card>



                {/* <Col key={i} md='4'>
                <div className='d-flex gap-3 p-1'>
                  <div className="card-image w-25">
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
                    <span className="fs-5 fw-bold"> {product?.price} €</span>
                  </div>
                </div>

              </Col> */}

              </>




            ))}

          </div>
      </Card >
  )
}
