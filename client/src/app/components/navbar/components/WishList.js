import React from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { IconButton, Tooltip } from '@mui/material';
import { StyledBadge, StyledIcon } from '../helper/UIHelper';



export default function WishList({ badge }) {

  return (
    // <Link to="/wishlist" style={{ color: 'white' }}>
    //   <SlHeart style={{ fontSize: "3rem" }} />

    //   {badge > 0 && (

    //     <>
    //       <Badge
    //         style={{
    //           position: "absolute",
    //           top: "-5px",
    //           right: "60px",
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
    <Link to="/wishlist" >
    <Tooltip placement="top-end" title="Favorite">
      <IconButton aria-label="favorite">
        <StyledBadge badgeContent={badge} color="primary">
        <FavoriteBorderOutlinedIcon sx={StyledIcon}/>
        </StyledBadge>
      </IconButton>
    </Tooltip>
    </Link>
  )
}