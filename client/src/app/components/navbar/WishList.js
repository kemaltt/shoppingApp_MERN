import React from 'react'
import Badge from "react-bootstrap/Badge";
import { SlHeart } from "react-icons/sl";
import { Link } from 'react-router-dom'

export default function WishList({ badge }) {

  return (
    <Link to="/wishlist" style={{ color: 'white' }}>
      <SlHeart style={{ fontSize: "3rem" }} />

      {badge > 0 && (

        <>
          <Badge
            style={{
              position: "absolute",
              top: "-5px",
              right: "60px",
              width: "23px",
            }}
            bg="danger"
          >
            {badge}
          </Badge>
          <span className="visually-hidden">unread messages</span>
        </>

      )}

    </Link>
  )
}
