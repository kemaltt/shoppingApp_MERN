import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { IconButton, Tooltip, } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { StyledBadge, StyledIcon } from '../../../helpers/UIHelper';




export default function Cart({ badge, color }) {
  const { t } = useTranslation();
  return (
    <Link to="/cart-list" >
      <Tooltip placement="top" title={t('cart.title')}>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={badge} color="secondary">
            <ShoppingCartOutlinedIcon sx={color ? color : StyledIcon} />
          </StyledBadge>
        </IconButton>
      </Tooltip>
    </Link>

  )
}

