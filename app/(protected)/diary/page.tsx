import { DiaryItem } from "@/components/diary/diary-item"
import { getAllWeeks } from "@/data/week"

const Diary = async () => {
  const {weeksData, error} = await getAllWeeks()
  if (error) {
    return <div className="w-full text-center">Something went wrong</div>
  }

  return (
    <div className='space-y-6'>
      <section id="header" className='flex justify-between'>
        <h1>Diary</h1>
        <span>Total Grade: 5/100%</span>
      </section>
      <section className='space-y-4'>
        {!!weeksData && weeksData.map((item, index) => (
          <DiaryItem key={index} title={item.title} description={item.description} />
        ))}
      </section>
    </div>
  )
}

export default Diary

