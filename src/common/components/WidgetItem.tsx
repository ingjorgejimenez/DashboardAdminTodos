import { ReactNode } from 'react'

interface Props {
  title?: string
  children?: ReactNode
}

export const WidgetItem = ({ title, children }: Props) => {
  return (
    <div className='md:col-span-2 lg:col-span-1'>
      <div className='h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white'>
        <div className='flex flex-col'>
          <h5 className='text-xl text-gray-600 text-center'>
            {title ?? 'Global Activities'}
          </h5>
          <div className='mt-2 flex  flex-col justify-center gap-4'>
            {children ? (
              children
            ) : (
              <div className='flex flex-col items-end gap-1 text-green-500'>
                <svg
                  className='w-3'
                  viewBox='0 0 12 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M6.00001 0L12 8H-3.05176e-05L6.00001 0Z'
                    fill='currentColor'
                  />
                </svg>
                <span>2%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
