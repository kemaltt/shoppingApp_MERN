import React from 'react'
import { Link } from 'react-router-dom';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { IconButton } from '@mui/material';
import { StyledBadge, StyledIcon } from '../helper/UIHelper';

export default function Compare({ badge }) {
  return (
    // <Link to="/compare" style={{ color: 'white' }} >
    //   <MdOutlineCompareArrows style={{ fontSize: "3rem" }} />
    //   {badge > 0 && (
    //     <>
    //       <Badge
    //         style={{
    //           position: "absolute",
    //           top: "-5px",
    //           right: "180px",
    //           width: "23px",
    //         }}
    //         bg="warning"
    //       >
    //         {badge}
    //       </Badge>
    //       <span className="visually-hidden">unread messages</span>
    //     </>
    //   )}
    // </Link>
    <Link to="/compare" >
      <IconButton aria-label="compare">
        <StyledBadge badgeContent={badge} color="secondary">
          <CompareArrowsIcon sx={StyledIcon}/>
        </StyledBadge>
      </IconButton>
    </Link>
  )
}
