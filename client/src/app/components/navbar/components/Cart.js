import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { IconButton, Tooltip, } from '@mui/material';
import { StyledBadge, StyledIcon } from '../../../helpers/UIHelper';




export default function Cart({ badge, color }) {
  return (
    <Link to="/cart" >
      <Tooltip placement="top" title="Cart">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={badge} color="secondary">
            <ShoppingCartOutlinedIcon sx={color ? color : StyledIcon} />
          </StyledBadge>
        </IconButton>
      </Tooltip>
    </Link>

  )
}

