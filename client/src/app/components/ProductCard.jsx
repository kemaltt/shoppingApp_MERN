import React from "react";
import { useNavigate } from "react-router-dom";
import { CardActions, CardContent, CardMedia, Typography, Card, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from "../../redux/favorite/favorite-api";
import { useSelector, shallowEqual } from "react-redux";




export default function ProductCard({ product, i, id, cart }) {
  const [addFavorite] = useAddFavoriteMutation()
  const [deleteFavorite] = useDeleteFavoriteMutation()
  const navigate = useNavigate();
  const { token, favorite } = useSelector((state) => ({
    favorite: state.favorite.favorite,
    token: state.user.token,
  }), shallowEqual);

  const productDetail = () => {
    // fetchSingleProduct(dispatch, id, token);
    navigate(`/product/${id}`);
  };
  const delFav = async () => {
    if (token) {
      await deleteFavorite({ id, token });
    }
  }
  const addFav = async () => {
    if (token) {
      await addFavorite({ token, id });
    }
  }

  return (
    <>

      <Card
        sx={{
          maxWidth: 300,
        }}>
        <CardMedia
          onClick={productDetail}
          component="img"
          sx={{ objectFit: 'contain', width: '100%', height: '400px', cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
          image={product.image}
          title={product.name}
        />
        <CardContent sx={{ height: '120px' }} >
          <Typography gutterBottom variant="h4" component="div">
            {product.name}
          </Typography>
          <Typography variant='h6' color="text.secondary">
            {product.category}
          </Typography>
        </CardContent>
        <CardActions >
          {favorite.some(el => el._id === id) ?
            <IconButton onClick={delFav} aria-label="add to favorites" >
              <FavoriteIcon color='warning' fontSize='large' />
            </IconButton>
            :
            <IconButton onClick={addFav} aria-label="add to favorites" >
              <FavoriteIcon fontSize='large' />
            </IconButton>
          }

        </CardActions>
      </Card>
      {/* <Card style={{ width: '24rem', height: '45rem' }}>
        <Card.Img onClick={productDetail} className="img-fluid" style={{ width: '100%', height: '300px' }} variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            {product.category}
          </Card.Text>
        </Card.Body>
      </Card> */}
      {/* <div key={i} className="product_card">
      <img onClick={productDetail} src={product.image} alt={product.name} />
      <div className="product_body">
        <h3>{product.name} </h3>
        <p className="price">${product.price}</p>

        <div className="card_buttons">
          {selectedCompareProducts &&
            selectedCompareProducts.includes(product) ? (
            // <MdCompareArrows
            //   onClick={() =>
            //     !isAuthenticated
            //       ? alert("please login")
            //       : removeFromCompare(product)
            //   }
            //   style={{ color: "red" }}
            // />
            <Button
              onClick={() => removeFromCompare(product)}
              variant="outlined"
              // style={{ color: "#fff", background: "red" }}
              color="error"
              startIcon={<CompareArrowsIcon />}
            ></Button>
          ) : (
            <Button
              onClick={() => !isAuthenticated ? navigate('/login') : addToCompare(product)}
              variant="outlined"
              color="success"
              startIcon={<CompareArrowsIcon />}
            ></Button>

          )}
          <div className="cart_buttons">
            {selectedCartProducts && selectedCartProducts.includes(cart) ? (
              <Button
                onClick={() => removeFromCart(product)}
                variant="outlined"
                color="error"
                startIcon={<RemoveShoppingCartIcon />}
              >
                Del
              </Button>
            ) : (
              <Button
                onClick={() => !isAuthenticated ? navigate('/login') : addToCart(product)}
                variant="outlined"
                color="success"
                startIcon={<AddShoppingCartIcon />}
              >
                Add
              </Button>
            )}
          </div>
        </div>
      </div>
    </div> */}
    </>

  );
}
