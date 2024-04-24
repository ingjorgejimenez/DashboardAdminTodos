'use client'

import { useEffect, useState } from "react"
import { authSession } from "../actions/authSession"
import { Session } from "next-auth"

export const useGetSession = () => {
  const [data, setData] = useState<Session | null>()
  const [loading, setLoading] = useState(false)
  const getData = async () => {
    try {
      setLoading(true)
      const { session } = await authSession()
      // console.log(updateSession)
      setData(session)
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return { ...data, loading }
}
