'use client'
// cookie: cart
// {
//     'uuid-123':4,
//     'uuid-456':3,
//     'uuid-789':2,
//     'uuid-1011':1,
//     'uuid-1234':1,
//     'uuid-5678':1,

import { getCookie, hasCookie, setCookie } from "cookies-next"

// }
export interface CartStoreData {
  [id: string]: number
}

export const getCookieCart = (): CartStoreData => {
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}');
    return cookieCart
  }
  return {}
}

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart()
  if (cookieCart[id]) {
    cookieCart[id] += 1
  } else {
    cookieCart[id] = 1
  }
  setCookie('cart', JSON.stringify(cookieCart))
}

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart()
  if (!cookieCart[id]) return;
  cookieCart[id] -= 1
  if (cookieCart[id] <= 0) {
    delete cookieCart[id]
  }

  setCookie('cart', JSON.stringify(cookieCart))
}

export const removeAllProductFromCart = (id: string): void => {
  const cookieCart = getCookieCart()
  delete cookieCart[id]
  setCookie('cart', JSON.stringify(cookieCart))
}