import * as React from 'react';

interface SpanishMonth {
  name: string;
  shortName: string;
  spanishCalendarMonthNumber: number;
}

interface DatePickerReducerState {
  isOpen: boolean;
  date: string;
  displayDate: string;
  month: number;
  year: number;
  daysInMonthArr: number[];
  blankDaysArr: number[];
}

const months: { [id: number]: string } = {
  0: 'January',
  1: 'Febuary',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

const spanishMonths: { [id: number]: SpanishMonth } = {
  0: {
    name: 'January',
    shortName: 'Jan',
    spanishCalendarMonthNumber: 1,
  },
  1: {
    name: 'Febuary',
    shortName: 'Feb',
    spanishCalendarMonthNumber: 2,
  },
  2: {
    name: 'March',
    shortName: 'Mar',
    spanishCalendarMonthNumber: 3,
  },
  3: {
    name: 'April',
    shortName: 'Apr',
    spanishCalendarMonthNumber: 4,
  },
  4: {
    name: 'May',
    shortName: 'May',
    spanishCalendarMonthNumber: 5,
  },
  5: {
    name: 'June',
    shortName: 'Jun',
    spanishCalendarMonthNumber: 6,
  },
  6: {
    name: 'July',
    shortName: 'Jul',
    spanishCalendarMonthNumber: 7,
  },
  7: {
    name: 'August',
    shortName: 'Aug',
    spanishCalendarMonthNumber: 8,
  },
  8: {
    name: 'September',
    shortName: 'Sep',
    spanishCalendarMonthNumber: 9,
  },
  9: {
    name: 'October',
    shortName: 'Oct',
    spanishCalendarMonthNumber: 10,
  },
  10: {
    name: 'November',
    shortName: 'Nov',
    spanishCalendarMonthNumber: 11,
  },
  11: {
    name: 'December',
    shortName: 'Dec',
    spanishCalendarMonthNumber: 12,
  },
};

interface SpanishCalendarDay {
  name: string;
  shortName: string;
  spanishCalendarWeekdayNumber: number;
}

const spanishDays: { [id: number]: SpanishCalendarDay } = {
  0: {
    name: 'Sunday',
    shortName: 'Sun',
    spanishCalendarWeekdayNumber: 6,
  },
  1: {
    name: 'Monday',
    shortName: 'Mon',
    spanishCalendarWeekdayNumber: 0,
  },
  2: {
    name: 'Tuesday',
    shortName: 'Tue',
    spanishCalendarWeekdayNumber: 1,
  },
  3: {
    name: 'Wednessday',
    shortName: 'Wed',
    spanishCalendarWeekdayNumber: 2,
  },
  4: {
    name: 'Thursday',
    shortName: 'Thu',
    spanishCalendarWeekdayNumber: 3,
  },
  5: {
    name: 'Friday',
    shortName: 'Fri',
    spanishCalendarWeekdayNumber: 4,
  },
  6: {
    name: 'Saturday',
    shortName: 'Sat',
    spanishCalendarWeekdayNumber: 5,
  },
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type DatePickeReducerAction =
  | { type: 'SET_INIT_STATE' }
  | { type: 'IS_OPEN'; isOpen: boolean }
  | { type: 'SET_DATE'; dayNumber: number }
  | { type: 'ADD_MONTH' }
  | { type: 'SUBTRACT_MONTH' };

const initState: DatePickerReducerState = {
  isOpen: false,
  date: '',
  displayDate: '',
  month: 1,
  year: 1900,
  daysInMonthArr: [],
  blankDaysArr: [],
};

const datePickerReducer: React.Reducer<
  DatePickerReducerState,
  DatePickeReducerAction
> = (state, action) => {
  switch (action.type) {
    case 'SET_INIT_STATE': {
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();

      const dayOfWeek = new Date(year, month).getDay();
      const spanishWeekday =
        spanishDays[dayOfWeek].spanishCalendarWeekdayNumber;
      const displayDate = getSpanishDate(
        new Date(year, month, today.getDate()),
      );
      const date = formatYearsMonthDay(new Date(year, month, today.getDate()));

      // Get last day number of the previous actual month
      const daysInMonth = new Date(year, month, 0).getDate();

      // Get the number (0-6) on which the actual month starts
      const blankDaysArr: number[] = [];
      for (let i = 1; i <= spanishWeekday; i++) {
        blankDaysArr.push(i);
      }

      const daysInMonthArr: number[] = [];
      for (let i = 1; i < daysInMonth; i++) {
        daysInMonthArr.push(i);
      }

      return {
        ...state,
        date,
        displayDate,
        month,
        year,
        daysInMonthArr,
        blankDaysArr,
      };
    }

    case 'IS_OPEN': {
      return {
        ...state,
        isOpen: action.isOpen,
      };
    }

    case 'SET_DATE': {
      const dateToFormat = new Date(state.year, state.month, action.dayNumber);
      const date = formatYearsMonthDay(dateToFormat);
      const displayDate = getSpanishDate(dateToFormat);

      return {
        ...state,
        date,
        displayDate,
        isOpen: false,
      };
    }

    case 'ADD_MONTH': {
      let newYear: number;
      let newMonth: number;
      if (state.month === 11) {
        newMonth = 0;
        newYear = state.year + 1;
      } else {
        newMonth = state.month + 1;
        newYear = state.year;
      }

      const newMonthFirstWeekdayNumber = new Date(
        newYear,
        newMonth,
        1,
      ).getDay();
      const spanishFirstWeekdayNumber =
        spanishDays[newMonthFirstWeekdayNumber].spanishCalendarWeekdayNumber;
      const daysInMonth = new Date(newYear, newMonth + 1, 0).getDate();

      const blankDaysArr = [];
      for (let i = 1; i <= spanishFirstWeekdayNumber; i++) {
        blankDaysArr.push(i);
      }

      const daysInMonthArr = [];
      for (let i = 1; i <= daysInMonth; i++) {
        daysInMonthArr.push(i);
      }

      return {
        ...state,
        month: newMonth,
        year: newYear,
        daysInMonthArr,
        blankDaysArr,
      };
    }

    case 'SUBTRACT_MONTH': {
      let newYear: number;
      let newMonth: number;
      if (state.month === 0) {
        newMonth = 11;
        newYear = state.year - 1;
      } else {
        newMonth = state.month - 1;
        newYear = state.year;
      }

      const newMonthFirstWeekdayNumber = new Date(
        newYear,
        newMonth,
        1,
      ).getDay();
      const spanishFirstWeekdayNumber =
        spanishDays[newMonthFirstWeekdayNumber].spanishCalendarWeekdayNumber;
      const daysInMonth = new Date(newYear, newMonth + 1, 0).getDate();

      const blankDaysArr = [];
      for (let i = 1; i <= spanishFirstWeekdayNumber; i++) {
        blankDaysArr.push(i);
      }

      const daysInMonthArr = [];
      for (let i = 1; i <= daysInMonth; i++) {
        daysInMonthArr.push(i);
      }

      return {
        ...state,
        year: newYear,
        month: newMonth,
        daysInMonthArr,
        blankDaysArr,
      };
    }

    default: {
      throw Error('Error un reducer');
    }
  }
};

const getSpanishDate = (date: Date): string => {
  const year = date.getFullYear();
  const monthShortName = spanishMonths[date.getMonth()].shortName;
  const day = ('0' + date.getDate()).slice(-2);
  const dayShortName = spanishDays[date.getDay()].shortName;

  return `${dayShortName} ${day} ${monthShortName}, ${year}`;
};

const formatYearsMonthDay = (date: Date): string => {
  return (
    date.getFullYear() +
    '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + date.getDate()).slice(-2)
  );
};

const DatePicker = () => {
  const [state, dispatch] = React.useReducer<
    React.Reducer<DatePickerReducerState, DatePickeReducerAction>
  >(datePickerReducer, initState);
  const displayDateRef = React.useRef<HTMLInputElement>(null);
  const daysDivRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    dispatch({ type: 'SET_INIT_STATE' });
  }, []);

  const isToday = (dayNumber: number) => {
    const today = new Date();
    const day = new Date(state.year, state.month, dayNumber);

    return today.toDateString() === day.toDateString() ? true : false;
  };

  const handleDatePickerKeydown = (event: React.KeyboardEvent) => {
    if (event.charCode === 0) {
      dispatch({ type: 'IS_OPEN', isOpen: false });
    }
  };

  const toggleDisplayDateFocus = (): void => {
    /**
     * This functions triggers when the user clicks:
     * 1. The input element
     * 2. The input element goes out of focus
     * 3. A day in the calendar
     *
     * When the calendar input contains shadow-outline class it means it's focus,
     * so we remove that class and trigger blur programatically.
     * On the other hand if the input doesn't have the class, it means it's not focused,
     * so we trigger the focus and add the class.
     */
    const displayDate = displayDateRef.current;
    if (displayDate?.classList.contains('shadow-outline')) {
      displayDate.classList.remove('shadow-outline');
      displayDate.blur();
    } else {
      displayDate?.classList.add('shadow-outline');
      displayDate?.focus();
    }

    const daysDiv = daysDivRef.current;
    daysDiv?.focus();
  };

  return (
    <div className="mb-5 w-64">
      <label
        htmlFor="datepicker"
        className="mb-1 block font-bold text-gray-700"
      >
        Select Day:
      </label>
      <div className="relative">
        <input
          type="text"
          readOnly
          value={state.displayDate}
          ref={displayDateRef}
          onClick={() => {
            dispatch({ type: 'IS_OPEN', isOpen: !state.isOpen });
            toggleDisplayDateFocus();
          }}
          onKeyDown={(event) => handleDatePickerKeydown(event)}
          onBlur={() => {
            dispatch({ type: 'IS_OPEN', isOpen: false });
            toggleDisplayDateFocus();
          }}
          className="focus:shadow-outline w-full rounded-lg py-3 pl-4 pr-10 font-medium leading-none text-gray-600 shadow-sm outline-none focus:outline-none"
          placeholder="Select date"
        />

        <div className="absolute right-0 top-0 px-3 py-2">
          <svg
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <div
          className={`absolute left-0 top-0 mt-12 rounded-lg bg-white p-4 shadow duration-200 focus:outline-none ${
            !state.isOpen ? 'invisible opacity-0' : 'visible opacity-100'
          }`}
          style={{ width: '17rem' }}
          ref={daysDivRef}
          tabIndex={-1}
        >
          <div className="mb-2 flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-800">
                {months[state.month]}
              </span>
              <span className="ml-1 text-lg font-normal text-gray-600">
                {state.year}
              </span>
            </div>
            <div>
              <button
                type="button"
                className={`focus:shadow-outline mr-1 inline-flex cursor-pointer rounded-full p-1 transition duration-100 ease-in-out hover:bg-gray-200 focus:outline-none`}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => dispatch({ type: 'SUBTRACT_MONTH' })}
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
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                className={`focus:shadow-outline inline-flex cursor-pointer rounded-full p-1 transition duration-100 ease-in-out hover:bg-gray-200 focus:outline-none`}
                onClick={() => dispatch({ type: 'ADD_MONTH' })}
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
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="-mx-1 mb-3 flex flex-wrap">
            {days.map((day, index) => (
              <div key={index} style={{ width: '14.26%' }} className="px-1">
                <div className="text-center text-xs font-medium text-gray-800">
                  {day}
                </div>
              </div>
            ))}
          </div>

          <div className="-mx-1 flex flex-wrap">
            {state.blankDaysArr.map((day) => (
              <div
                key={day}
                style={{ width: '14.28%' }}
                className="border border-transparent p-1 text-center text-sm"
              />
            ))}
            {state.daysInMonthArr.map((dayNumber, index) => (
              <div
                key={index}
                style={{ width: '14.28%' }}
                className="mb-1 px-1"
              >
                <div
                  onClick={() => {
                    dispatch({ type: 'SET_DATE', dayNumber });
                    toggleDisplayDateFocus();
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                  className={`cursor-pointer rounded-full text-center text-sm leading-loose leading-none transition duration-100 ease-in-out ${
                    isToday(dayNumber)
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-blue-200'
                  }`}
                >
                  {dayNumber}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
