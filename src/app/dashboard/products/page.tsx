import { ProductCard } from '@/components/products'
import { products } from '@/seed/product'

export default function ProductPage() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
      {/* ProductCard */}
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
