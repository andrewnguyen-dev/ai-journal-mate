import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react'

type DiaryItem = {
  title: string;
  description: string;
  grade: string | null;
};

const diaryItemData: DiaryItem[] = [
  {
    title: 'Week 1',
    description: 'Getting to know your team',
    grade: '4.3',
  },
  {
    title: 'Week 2',
    description: 'It’s a plan not a promise',
    grade: null,
  },
  {
    title: 'Week 3',
    description: 'The Proposal',
    grade: null,
  },
  {
    title: 'Week 4',
    description: 'Agreement and Prototype',
    grade: null,
  },
]

const Diary = () => {
  return (
    <div className='space-y-6'>
      <div id="header" className='flex justify-between'>
        <h1>Diary</h1>
        <span>Total Grade: 5/100%</span>
      </div>
      <div className='space-y-4'>
        {diaryItemData.map((item, index) => (
          <DiaryItem key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Diary

const DiaryItem = ({ title, description, grade }: DiaryItem) => {
  return (
    <div className='bg-white flex flex-row justify-between p-4 rounded-lg hover:shadow-sm hover:cursor-pointer transition-all'>
      <p className='text-slate-800'>{title}: {description}</p>
      <div className='flex items-center space-x-4'>
        {grade && <p className='text-slate-800'>Grade: {grade}</p>}
        <Button size="icon" className="h-6 w-6">
          <Plus size={16} />
        </Button>
      </div>
    </div>
  )
}