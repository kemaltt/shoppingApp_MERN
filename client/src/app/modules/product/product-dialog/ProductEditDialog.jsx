import React, { useEffect, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEditProductMutation, useGetProductByIdQuery, useGetProductsMutation, useUploadImagesMutation } from '../../../../redux/product/product-api';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Textarea from '@mui/joy/Textarea';
import UploadIcon from '@mui/icons-material/Upload';
import { CATEGORIES_OPTION } from '../../../helpers/UIHelper';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../../../../constants/api/apiUrl';


export default function ProductEditDialog({ open, setOpen, productId, token }) {

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [editProduct, { isLoading }] = useEditProductMutation()
  const [uploadImages, { isLoading: uploadLoading }] = useUploadImagesMutation()
  const [getProducts] = useGetProductsMutation()
  useGetProductByIdQuery({ id: productId, token }, { skip: !token });

  const { product } = useSelector((state) => state.products);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: product
  });
  const [existingImages, setExistingImages] = useState([]); // Daha önce yüklü resimler

  // Product değiştiğinde, mevcut resimleri state'e yükle
  useEffect(() => {
    if (product?.images) {
      setExistingImages(product.images);
    }
  }, [product]);

  // Daha önce yüklenmiş bir resmi kaldır
  const removeExistingImage = (index) => {
    const updatedImages = [...existingImages];
    updatedImages.splice(index, 1);
    setExistingImages(updatedImages);
  };


  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        countInStock: product.countInStock,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category || '',
      });
    }
  }, [product, reset, open]);

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Yeni dosyaları filtrele (Daha önce seçilmiş olanları çıkar)
    const newFiles = files.filter(
      (file) => !selectedImages.some((selected) => selected.name === file.name)
    );

    if (newFiles.length + selectedImages.length > 10) {
      alert('You can upload a maximum of 10 images.');
      return;
    }

    if (newFiles.length < files.length) {
      alert('Some images were already added and skipped.');
    }

    // Yeni dosyaları state'e ekle
    setSelectedImages((prev) => [...prev, ...newFiles]);
    const previews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const saveProduct = async (value) => {

    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append('productImages', image);
    });

    const uploadData = {
      formData,
      id: productId,
      token,
    }

    const uploadedData = await uploadImages(uploadData).unwrap();
    // Mevcut ve yeni yüklenen resimleri birleştir
    const finalImages = [...existingImages, ...uploadedData];

    const data = {
      ...product,
      ...value,
      images: finalImages,
    }

    await editProduct({ id: productId, token, data }).unwrap();
    await getProducts()
    setOpen(false);
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    const updatedPreviews = [...imagePreviews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setSelectedImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };


  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={'md'}
      fullWidth
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Product Edit
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setOpen(false)}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <form
        component="form"
        // sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(saveProduct)}
      >
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", padding: "1rem", gap: '15px', width: '100%', marginTop: '2vh' }} >
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
                  required
                  id="outlined-number"
                  label="Quantity"
                  type="number"
                  name='countInStock'
                  fullWidth
                  inputProps={{
                    min: 0, // Minimum değer
                  }}
                  {...register("countInStock", {
                    required: true,
                  })}
                />
              </Col>
              <Col lg='6' >
                <TextField
                  required
                  id="outlined-number"
                  label="Price"
                  type="number"
                  name='price'
                  fullWidth
                  inputProps={{
                    min: 0, // Minimum değer
                  }}
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
                defaultValue={product?.category || ''}
                {...register("category", {
                  required: true,
                })}
              >
                {CATEGORIES_OPTION.map((el, i) => (
                  <MenuItem key={i} value={el.value}>{el.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {existingImages.map((image, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <img
                    src={`${BASE_URL}/${image.url}`}
                    alt={`existing-${index}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                  />
                  <IconButton
                    onClick={() => removeExistingImage(index)}
                    sx={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: 'white', color: 'red' }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>


            {/* Image Upload Section */}
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
            >
              Upload Images
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </Button>

            {/* Display Image Previews */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {imagePreviews.map((preview, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <img src={preview} alt={`preview-${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />
                  <IconButton
                    onClick={() => removeImage(index)}
                    sx={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: 'white', color: 'red' }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' size='small' onClick={handleClose} color="primary">
            Close
          </Button>

          <LoadingButton
            size="small"
            onSubmit={saveProduct}
            type='submit'
            endIcon={<SaveIcon />}
            loading={isLoading || uploadLoading}
            disabled={isLoading || uploadLoading}
            loadingPosition="end"
            variant="outlined"
            color='success'
          >
            Save
          </LoadingButton>
        </DialogActions>
      </form>




    </Dialog>
  )
}
