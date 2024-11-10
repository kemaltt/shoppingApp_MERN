import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { IconButton, } from '@mui/material';
import { StyledBadge, StyledIcon } from './helper/UIHelper';




export default function Cart({ badge }) {
  return (
    // <Link to="/cart" style={{ color: 'white' }}>
    //   <SlHandbag style={{ fontSize: "3rem" }} />
    //   {badge > 0 && (
    //     <>
    //       <Badge
    //         style={{
    //           position: "absolute",
    //           top: "-5px",
    //           right: "125px",
    //           width: "23px",
    //         }}
    //         bg="danger"
    //       >
    //         {badge}
    //       </Badge>
    //       <span className="visually-hidden">unread messages</span>
    //     </>
    //   )}
    // </Link>
    <Link to="/cart" >

      <IconButton aria-label="cart">
        <StyledBadge badgeContent={badge} color="secondary">
          <ShoppingCartOutlinedIcon sx={StyledIcon}/>
        </StyledBadge>
      </IconButton>
    </Link>

  )
}

