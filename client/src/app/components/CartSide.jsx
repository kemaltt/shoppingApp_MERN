import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { IconButton, Tooltip, } from '@mui/material';
import { StyledBadge, StyledIcon } from "../helpers/UIHelper";

export default function Cart() {
  const { cart } = useSelector((state) => state.cart);

  const badge = cart?.products?.length;
  return (
    <Link to="/cart" className="cart_container">
      <Tooltip placement="top" title="Cart">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={badge} color="secondary">
            <ShoppingCartOutlinedIcon sx={StyledIcon} />
          </StyledBadge>
        </IconButton>
      </Tooltip>
    </Link>
  );
}
