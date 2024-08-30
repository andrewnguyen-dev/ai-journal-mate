'use client'

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const handleClick = () => {
  console.log("clicked")
}

export const DiaryItem = ({ title, description }: {
  title: string;
  description: string;
}) => {
  return (
    <div className='bg-white flex flex-row justify-between p-4 rounded-lg hover:shadow-sm hover:cursor-pointer transition-all'>
      <p className='text-slate-800'>{title}: {description}</p>
      <div className='flex items-center space-x-4'>
        {1 && <p className='text-slate-800'>Grade: NaN</p>}
        <Button onClick={handleClick} size="icon" className="h-6 w-6">
          <Plus size={16} />
        </Button>
      </div>
    </div>
  )
}