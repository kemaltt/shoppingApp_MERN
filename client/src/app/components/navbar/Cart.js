import React from 'react'
import Badge from "react-bootstrap/Badge";
import { SlHandbag } from "react-icons/sl";
import { Link } from 'react-router-dom'



export default function Cart({ badge }) {
  return (
    <Link to="/cart" style={{ color: 'white' }}>
      <SlHandbag style={{ fontSize: "3rem" }} />
      {badge > 0 && (
        <>
          <Badge
            style={{
              position: "absolute",
              top: "-5px",
              right: "125px",
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
