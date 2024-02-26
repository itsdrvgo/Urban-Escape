"use client"
import React,{useState} from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Search } from 'lucide-react'
import MobileNav from '../base/MobileNav'
import SearchSheetNav from './SearchSheetNav'
import DatePicker from './DatePicker'
import { Button } from '../ui/button'
import { addDays,format, set } from 'date-fns';
import { useRouter } from 'next/navigation'


export default function SearchSheet({session}:{session:any}) {
    const [open, setOpen] = useState(false)
    const [search,setSearch] = useState<string>("")
    const router = useRouter()
    const [dateState,setDateState] = useState([
        {
        startDate:new Date(),
        endDate:addDays(new Date(),7),
        key:'selection'
    }, 
    ])
    const handleDateChange=(data:any)=>{
        setDateState([data?.selection])
    }   
const handleSubmit = ()=>{
   const startDate = format(dateState[0].startDate,"yyyy-MM-dd")
   const endDate = format(dateState[0].endDate, "yyyy-MM-dd")
   router.replace(`/?country=${search}&startDate=${startDate}&endDate=${endDate}`)
   setOpen(()=>false)
}

  return (
    <div>
      <Sheet open={open}>
  <SheetTrigger asChild>
  <div className='w-full md:w-auto cursor-pointer' onClick={()=>setOpen(true)}>
      <div className='hidden md:flex items-center space-x-2 border rounded-3xl p-2 hover:shadow-lg transition duration-300'>
        <span className="text-sm pl-2">Anywhere</span>
        <span className='text-gray-400'>|</span>
        <span className="text-sm pl-2">Any week</span>
        <span className='text-gray-400'>|</span>
        <span className="text-sm pr-2 text-gray-400">Add guest</span>
        <span className='bg-brand text-white rounded-full p-2'>
        <Search height={15} width={15}/>
        </span>
      </div>
     <MobileNav/>
     </div>

  </SheetTrigger>
  <SheetContent side="top" >
    <SheetHeader>
      <SheetTitle>
        <SearchSheetNav session={session} searchInputCallback={setSearch}/>
      </SheetTitle>
      <SheetDescription>
        <div className='text-center mr-5'>
        <DatePicker state={dateState} dateChangeCallback={handleDateChange}/>
        <div className='flex justify-center space-x-4 items-center my-5'>
<Button className='bg-brand' onClick={handleSubmit}>Search</Button>
<Button variant={'outline'} onClick={()=>setOpen(false)}>Close</Button>
        </div>
        </div>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

    </div>
  )
}
// showCloseIcon={true}