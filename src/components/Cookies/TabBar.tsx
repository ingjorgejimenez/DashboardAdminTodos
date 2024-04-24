'use client'

import { getCookie, setCookie } from 'cookies-next' //esto solo se usa del lado del client
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// https://tailwindcomponents.com/component/radio-buttons-1

interface Props {
  currenTab?: number
  tabOptions?: number[]
}
export const TabBar = ({
  tabOptions = [1, 2, 3, 4, 5],
  currenTab = 1,
}: Props) => {
  const [selected, setSelected] = useState(currenTab)
  const router = useRouter()

  const onTabSelected = (tab: number) => {
    setSelected(tab)
    setCookie('selectedTab', `${tab}`)
    router.refresh()
  }
  // useEffect(() => {
  //   const select = getCookie('selectedTab')
  //   setSelected(Number(select))
  // }, [])

  return (
    <div
      className={`grid w-full grid-cols-${tabOptions.length} space-x-2 rounded-xl bg-gray-200 p-2`}
    >
      {tabOptions.map(tabOption => {
        return (
          <div key={tabOption}>
            <input
              type='radio'
              id={`${tabOption.toString()}`}
              className='peer hidden'
              checked={selected === tabOption}
              onChange={() => {}}
            />
            <label
              onClick={() => onTabSelected(tabOption)}
              className='transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'
            >
              {tabOption}
            </label>
          </div>
        )
      })}
    </div>
  )
}
