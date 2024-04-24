import Image from 'next/image'

export const Loading = () => {
  return (
    <div className='flex'>
      <Image src='/images/spinner.gif' alt='Loading' width={80} height={80} />
    </div>
  )
}
