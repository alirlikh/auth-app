"use client"

import { useEffect, useState } from "react"

const SearchBar = () => {

const [query, setQuery] = useState<string>("")
const [debounced, setDebounced] = useState<string>("")


useEffect(()=>{
    const timer = setTimeout(()=> {
        setDebounced(query)
    },2000)

   return ()=> clearInterval(timer) 

},[query])

  useEffect(() => {
    if (debounced) {
      performSearch(debounced);
    }
  }, [debounced]);

  const performSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
  };


const handleChange = (e:any) =>{
    setQuery(e.target.value)
}

  return (
    <div className="flex flex-row gap-x-1 m-2">
        <input placeholder="Search..." value={query} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 w-full" type="search" />
        {/* <button  className="focus:outline-2 focus:outline-offset-2 focus:outline-amber-400 p-2 rounded-xl bg-amber-400 shadow-md hover:shadow-lg hover:bg-amber-500 active:shadow-inner" >search</button> */}
    </div>
  )
}
export default SearchBar