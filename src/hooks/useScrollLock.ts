import React, { useEffect } from 'react'

function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (lock) {
      document.body.classList.add('lock') // prevent bg scroll
    } else {
      document.body.classList.remove('lock')
    }
  }, [lock])
}

export default useScrollLock
