import React, { useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Tooltip, Typography } from '@mui/material';
import ProductDeleteDialog from '../modules/product/product-dialog/ProductDeleteDialog';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAddToCartMutation } from '../../redux/cart/cart-api';


export default function Favorite() {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const { token, favorite } = useSelector((state) => ({
    favorite: state.favorite.favorite,
    token: state.user.token
  }), shallowEqual);
  const delFav = (id) => {
    // deleteFavorite({ token, id })
    setOpen(true)
    setProductId(id)
  }
  const addCart = async (product) => {
    const data = {
      _id: product._id,
      quantity: 1,
      price: product.price
    }
    await addToCart(data)
  };
  return (
    (favorite.length <= 0)
      ? <h1 className="text-center text-danger mt-5">{<span> you have no favorite product</span>}</h1>
      : <>
        <Card className="p-5">
          <CardHeader
            title='Favorite'
            subheader={`${favorite?.length} Products`}
          />

          <div className=' d-flex justify-content-center gap-3 flex-wrap'>
            {favorite.map((product, i) => (
              <Card key={i} sx={{ maxWidth: 300, minWidth: 300 }}>
                <CardMedia
                  // onClick={productDetail}
                  component="img"
                  sx={{ objectFit: 'contain', width: '100%', height: '400px', cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
                  image={product?.images[0]?.url || product?.image}
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
                    <Tooltip placement="top" title="Delete">
                      <IconButton onClick={() => delFav(product._id)} aria-label="add to favorites" >
                        <DeleteIcon color='error' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip placement="top" title="Add to cart">
                      <IconButton onClick={() => addCart(product)} disabled={isLoading} aria-label="add to cart" >
                        <AddShoppingCartIcon color='success' />
                      </IconButton>
                    </Tooltip>
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
            ))}

          </div>

        </Card >
        {open && <ProductDeleteDialog type={'favorite'} open={open} setOpen={setOpen} productId={productId} token={token} />}
      </>
  )
}
