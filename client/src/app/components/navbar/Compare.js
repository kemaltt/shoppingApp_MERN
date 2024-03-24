import React from 'react'
import { Badge } from 'react-bootstrap';
import { MdOutlineCompareArrows } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Compare({ badge }) {
  return (
    <Link to="/compare" style={{ color: 'white' }} >
      <MdOutlineCompareArrows style={{ fontSize: "3rem" }} />
      {badge > 0 && (
        <>
          <Badge
            style={{
              position: "absolute",
              top: "-5px",
              right: "180px",
              width: "23px",
            }}
            bg="warning"
          >
            {badge}
          </Badge>
          <span className="visually-hidden">unread messages</span>
        </>
      )}
    </Link>
  )
}
