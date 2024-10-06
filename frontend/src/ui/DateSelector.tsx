import { useState, useEffect } from 'react';
import {
  format,
  subMonths,
  addMonths,
  subYears,
  addYears,
  isEqual,
  getDaysInMonth,
  getDay,
} from 'date-fns';

type DatepickerType = 'date' | 'month' | 'year';

export default function DateSelector({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}) {
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [dayCount, setDayCount] = useState<Array<number>>([]);
  const [blankDays, setBlankDays] = useState<Array<number>>([]);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerHeaderDate, setDatepickerHeaderDate] = useState(new Date());
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [type, setType] = useState<DatepickerType>('date');

  const decrement = () => {
    switch (type) {
      case 'date':
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
      case 'month':
        setDatepickerHeaderDate((prev) => subYears(prev, 1));
        break;
      case 'year':
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const increment = () => {
    switch (type) {
      case 'date':
        setDatepickerHeaderDate((prev) => addMonths(prev, 1));
        break;
      case 'month':
        setDatepickerHeaderDate((prev) => addYears(prev, 1));
        break;
      case 'year':
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const isToday = (date: number) =>
    isEqual(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date),
      selectedDate,
    );

  const setDateValue = (date: number) => () => {
    setSelectedDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        datepickerHeaderDate.getMonth(),
        date,
      ),
    );
    setShowDatepicker(false);
  };

  const getDayCount = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);

    // find where to start calendar day of week
    const dayOfWeek = getDay(new Date(date.getFullYear(), date.getMonth(), 1));
    const blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);
    setDayCount(daysArray);
  };

  const isSelectedMonth = (month: number) =>
    isEqual(
      new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
      selectedDate,
    );

  const setMonthValue = (month: number) => () => {
    setDatepickerHeaderDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        month,
        datepickerHeaderDate.getDate(),
      ),
    );
    setType('date');
  };

  const toggleDatepicker = () => setShowDatepicker((prev) => !prev);

  const showMonthPicker = () => setType('month');

  const showYearPicker = () => setType('date');

  useEffect(() => {
    getDayCount(datepickerHeaderDate);
  }, [datepickerHeaderDate]);

  return (
    <div className="mb-5 w-64">
      <label
        htmlFor="datepicker"
        className="mb-1 block font-bold text-gray-700"
      >
        Select Date
      </label>
      <div className="relative">
        <input type="hidden" name="date" />
        <input
          type="text"
          readOnly
          className="focus:shadow-outline w-full cursor-pointer rounded-lg py-3 pl-4 pr-10 font-medium leading-none text-gray-600 shadow-sm focus:outline-none"
          placeholder="Select date"
          value={format(selectedDate, 'yyyy-MM-dd')}
          onClick={toggleDatepicker}
        />
        <div
          className="absolute right-0 top-0 cursor-pointer px-3 py-2"
          onClick={toggleDatepicker}
        >
          <svg
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        {showDatepicker && (
          <div
            className="absolute left-0 top-0 mt-12 rounded-lg bg-white p-4 shadow"
            style={{ width: '17rem' }}
          >
            <div className="mb-2 flex items-center justify-between">
              <div>
                <button
                  type="button"
                  className="inline-flex cursor-pointer rounded-full p-1 transition duration-100 ease-in-out hover:bg-gray-200"
                  onClick={decrement}
                >
                  <svg
                    className="inline-flex h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>
              {type === 'date' && (
                <div
                  onClick={showMonthPicker}
                  className="flex-grow cursor-pointer rounded-lg p-1 text-lg font-bold text-gray-800 hover:bg-gray-200"
                >
                  <p className="text-center">
                    {format(datepickerHeaderDate, 'MMMM')}
                  </p>
                </div>
              )}
              <div
                onClick={showYearPicker}
                className="flex-grow cursor-pointer rounded-lg p-1 text-lg font-bold text-gray-800 hover:bg-gray-200"
              >
                <p className="text-center">
                  {format(datepickerHeaderDate, 'yyyy')}
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex cursor-pointer rounded-full p-1 transition duration-100 ease-in-out hover:bg-gray-200"
                  onClick={increment}
                >
                  <svg
                    className="inline-flex h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {type === 'date' && (
              <>
                <div className="-mx-1 mb-3 flex flex-wrap">
                  {DAYS.map((day, i) => (
                    <div key={i} style={{ width: '14.26%' }} className="px-1">
                      <div className="text-center text-xs font-medium text-gray-800">
                        {day}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="-mx-1 flex flex-wrap">
                  {blankDays.map((_, i) => (
                    <div
                      key={i}
                      style={{ width: '14.26%' }}
                      className="border border-transparent p-1 text-center text-sm"
                    ></div>
                  ))}
                  {dayCount.map((d, i) => (
                    <div
                      key={i}
                      style={{ width: '14.26%' }}
                      className="mb-1 px-1"
                    >
                      <div
                        onClick={setDateValue(d)}
                        className={`cursor-pointer rounded-full text-center text-sm leading-loose leading-none transition duration-100 ease-in-out ${
                          isToday(d)
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 hover:bg-blue-200'
                        }`}
                      >
                        {d}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {type === 'month' && (
              <div className="-mx-1 flex flex-wrap">
                {Array(12)
                  .fill(null)
                  .map((_, i) => (
                    <div
                      key={i}
                      onClick={setMonthValue(i)}
                      style={{ width: '25%' }}
                    >
                      <div
                        className={`cursor-pointer rounded-lg p-5 text-center text-sm font-semibold hover:bg-gray-200 ${
                          isSelectedMonth(i)
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 hover:bg-blue-200'
                        }`}
                      >
                        {format(
                          new Date(
                            datepickerHeaderDate.getFullYear(),
                            i,
                            datepickerHeaderDate.getDate(),
                          ),
                          'MMM',
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
