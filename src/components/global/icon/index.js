import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Icon = ({icon, className}) => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    if(!mounted) return null
  return (
    <FontAwesomeIcon icon={icon} className={className} />
  )
}

export default Icon