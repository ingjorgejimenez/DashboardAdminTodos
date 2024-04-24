import { WidgetItem } from '@/common/components/WidgetItem'
import { ItemCart } from '@/components/shopping-cart/ItemCart'
import { products } from '@/common/seed/product'
import { CartStoreData } from '@/common/helpers/shopping-cart'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Carrito de Compras',
  description: 'SEO Title',
}
export default function CartPage() {
  const cookieStore = cookies()
  const cart = JSON.parse(
    cookieStore.get('cart')?.value ?? '{}',
  ) as CartStoreData
  const ProductsInCart = getProductsInCart(cart)

  const totalToPay = ProductsInCart.reduce(
    (prev, current) => prev + current?.price * current?.quantity,
    0,
  )

  return (
    <div>
      <h1 className='text-5xl'>Productos en el carrito</h1>
      <hr className='mb-2' />
      <div className='flex flex-col sm:flex-row gap-3 min-h-40'>
        <div className='flex flex-col w-full sm:w-8/12'>
          {Object.entries(cart).map(([id, quantity], i) => {
            const product = products.find(product => product.id == id)
            if (!product) return null
            return <ItemCart key={id} product={product} quantity={quantity} />
          })}
        </div>
        <div className='flex flex-col w-full sm:w-4/12'>
          {totalToPay > 0 && (
            <WidgetItem title='Total a pagar'>
              <div className='mt-2 flex flex-col justify-center gap-4'>
                <h3 className='text-3xl text-center font-bold text-gray-700'>
                  $ {(totalToPay * 1.19).toFixed(3)}
                </h3>
                <span className='font-bold text-center'>
                  Impuestos del 19% {(totalToPay * 0.19)?.toFixed(2)}
                </span>
              </div>
              {/* <span className='text-3xl'>${cart?.total?.toFixed(2)}</span> */}
            </WidgetItem>
          )}
        </div>
      </div>
    </div>
  )
}

const getProductsInCart = (cart: CartStoreData) => {
  return Object.entries(cart).map(([id, quantity], i) => {
    const product = products.find(product => product.id == id)!
    return { ...product, quantity }
  })
}
