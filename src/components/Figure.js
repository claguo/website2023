import React from "react";

function Figure(props) {
  return (
    <figure className={props.className} style={{ display: 'flex', flexDirection: 'column', borderRadius: '4px', overflow: 'hidden' }}>
      <img src={ props.src } alt={ props.alt } style={{ height: '100%' }}/>
      <p style={{ backgroundColor: props.color, padding: '1rem 2rem', fontWeight: 'bold' }}>
        {props.caption}
      </p>
    </figure>
  )
}

export default Figure;