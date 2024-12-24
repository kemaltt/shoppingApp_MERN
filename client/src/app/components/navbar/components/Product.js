import { IconButton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import { StyledBadge, StyledIcon } from '../../../helpers/UIHelper';


export default function Product({ badge, color }) {
  return (
    <Link to="/product-list" >
      <IconButton aria-label="compare">
        <StyledBadge badgeContent={badge} color="secondary">
          <ProductionQuantityLimitsOutlinedIcon sx={color ? color : StyledIcon} />
        </StyledBadge>
      </IconButton>
    </Link>
  )
}
