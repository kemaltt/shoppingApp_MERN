import React from 'react'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Textarea from '@mui/joy/Textarea';
import { useForm } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '../components/Button';
import { Col, Row } from 'react-bootstrap';
import { useAddProductMutation } from '../../redux/product/product-api';
import { useNavigate } from 'react-router-dom';


export default function ProductList() {
  const { register, handleSubmit } = useForm();
  // const { token } = useSelector((state) => state.user);

  const [addProduct, { isLoading, status }] = useAddProductMutation()
  const navigate = useNavigate()

  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'jewelery', label: 'Jewelery' },
    { value: 'men\'s clothing', label: 'Men\'s Clothing' },
    { value: 'women\'s clothing', label: 'Women\'s Clothing' }
  ];

  const handleClick = async (value) => {
    const { countInStock, price, ...rest } = value;
    if (countInStock && price) {
      const data = {
        ...rest,
        countInStock: +countInStock,
        price: +price
      }
      await addProduct(data);
    }
  };
  if(status === 'fulfilled'){
    navigate('/')
  }

  return (
    <Container component="main" maxWidth="sm"
    //  sx={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}
    >
      <form
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleClick)}
      >
        <Box sx={{ display: "flex", flexDirection: "column", padding: "1rem", gap: '15px', width: '100%', marginTop: '2vh' }} >
          <Typography sx={{ marginBottom: 1 }} component="h1" variant="h5"        >
            Add Product Page
          </Typography>

          <TextField
            required
            type='text'
            id="name"
            name="name"
            label="Product Title"
            // autoFocus
            // color="secondary"
            {...register("name", {
              required: true,
              pattern: {
                value: /^.{2,25}$/,
                message: "Name must be between 2 and 25 characters",
              },
            })}
          />
          <Row >
            <Col lg='6' >
              <TextField
                id="outlined-number"
                label="Quantity"
                type="number"
                name='countInStock'
                fullWidth
                inputProps={{
                  min: 0, // Minimum değer
                }}
                // slotProps={{
                //   inputLabel: {
                //     shrink: true,
                //   },
                // }}
                {...register("countInStock", {
                  required: true,
                })}
              />
            </Col>
            <Col lg='6' >
              <TextField
                id="outlined-number"
                label="Price"
                type="number"
                name='price'
                fullWidth
                inputProps={{
                  min: 0, // Minimum değer
                }}
                // slotProps={{
                //   inputLabel: {
                //     shrink: true,
                //   },
                // }}
                {...register("price", {
                  required: true,
                })}
              />
            </Col>



          </Row>

          <Textarea
            required
            minRows={5}
            sx={{ borderStyle: 'solid', borderColor: 'gray', borderRadius: '5px', borderWidth: '1px' }}
            type="text"
            name="description"
            placeholder="Product Description"
            id="description"
            // color="secondary"
            {...register("description", {
              required: true,
              pattern: {
                value: /^.{2,500}$/,
                message: "Name must be between 2 and 25 characters",
              },
            })}
          />


          <TextField
            required
            type='text'
            id="image"
            name="image"
            label="Product image URL"
            // autoFocus
            // color="secondary"
            {...register("image", {
              required: true,
              pattern: {
                value: /^.{2,700}$/,
                message: "Name must be between 2 and 25 characters",
              },
            })}
          />
          <FormControl >
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              name='category'
              defaultValue="" // Boş bir başlangıç değeri
              {...register("category", {
                required: true,
              })}
            >
              {categories.map((el, i) => (
                <MenuItem key={i} value={el.value}>{el.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button onClick={handleClick} disabled={isLoading} isLoading={isLoading} title={'Add Product'} />
        </Box>
      </form>
    </Container>
    // <div className='d-flex align-items-center justify-content-center vh-100'>
    //   <div className='w-50 h-50 bg-info'>
    //   ProductList
    //   </div>
    // </div>
  )
}
