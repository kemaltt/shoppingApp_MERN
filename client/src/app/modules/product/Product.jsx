import React, { useEffect } from 'react'
import ProductTable from './ProductTable'
import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import Button from '../../components/Button'
import { useGetProductsMutation } from '../../../redux/product/product-api'
import ProductAddDialog from './product-dialog/ProductAddDialog'



export default function Product() {
  const [open, setOpen] = React.useState(false);

  const [getProducts, { isLoading }] = useGetProductsMutation()


  useEffect(() => {
    const getProduct = async () => {
      await getProducts()
    }
    getProduct()
  }, [getProducts])

  return (
    <>
      <Card className='p-5'>
        <CardHeader
          title='Product List'
          action={<Typography >
            <Button onClick={() => setOpen(true)} title={'Product Add'} />
          </Typography>}
        />

        <CardContent>

          <Typography variant="body2">
            <ProductTable isLoading={isLoading} />
          </Typography>
        </CardContent>

        <ProductAddDialog open={open} setOpen={setOpen} getProducts={getProducts} />
      </Card>

    </>

  )
}
