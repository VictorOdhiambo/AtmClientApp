import React from 'react'

function Loader({show}) {
  return (
    <div className={show ? "wrapper show" : "wrapper"}>
    <div className={show ? "loader-overlay show" : "loader-overlay"}></div>
    <div className={show ? "spinner show" : "spinner"}>
      <div className="loader"></div>
      {/* <p>Please wait ...</p> */}
    </div>
  </div>
  )
}

export default Loader