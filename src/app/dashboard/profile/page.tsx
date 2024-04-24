'use client'

import { ProfileDetails } from '@/components/ProfileDetails'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const [name, setName] = useState('')
  useEffect(() => {
    setName('Perfil')
  }, [])

  return (
    <div>
      <h1>{name}</h1>
      <hr />
      <ProfileDetails />
    </div>
  )
}
