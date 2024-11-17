import { IconButton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { StyledBadge, StyledIcon } from '../helper/UIHelper'
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';


export default function Product({ badge }) {
  return (
    <Link to="/product-list" >
      <IconButton aria-label="compare">
        <StyledBadge badgeContent={badge} color="secondary">
          <ProductionQuantityLimitsOutlinedIcon sx={StyledIcon}/>
        </StyledBadge>
      </IconButton>
    </Link>
  )
}
