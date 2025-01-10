import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = true;

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}

