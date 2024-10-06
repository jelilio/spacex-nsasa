import ApodToday from '../features/apod/ApodToday';
import DateSelector from '@/ui/DateSelector';
import { useState } from 'react';

export default function Apod() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div>
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        Picture of the Day
      </h1>
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <hr />
      <ApodToday selectedDate={selectedDate} />
    </div>
  );
}
