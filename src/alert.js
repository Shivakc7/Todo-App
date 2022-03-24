import React, { useEffect } from 'react'

const Alert = ({type, Msg, removeAlert, lists}) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
          removeAlert()
        }, 3000);
        return () => clearTimeout(timeout)
      },[lists])
  return (
    <div className={`alert alert-${type}`}>{Msg}</div>
  )
}

export default Alert