import 'drag-drop-touch';

import Calendar from '@components/Calendar';
import {
  firstDateOfMonth,
  getISODay,
  lastDateOfMonth,
} from '@helpers/dateHelper';
import { getCalendarHabits } from '@store/calendar/calendar.actions';
import {
  selectCalendar,
  setSelectedDate,
} from '@store/calendar/calendar.slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import React from 'react';

import CalendarActive from './CalendarActive';
import styles from './styles.module.css';

const CalendarWithData = () => {
  const { isLoading, loadingError, currentDate } =
    useAppSelector(selectCalendar);
  const dispatch = useAppDispatch();

  const ref = React.useRef<HTMLDivElement>(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout>>(null);

  React.useLayoutEffect(() => {
    if (ref.current) ref.current.scrollLeft = ref.current?.clientWidth ?? 100;
  }, [currentDate]);

  const date = new Date(currentDate);
  return (
    <section
      onClick={() => {
        dispatch(setSelectedDate(null));
      }}
    >
      <header className={styles.calendarHeader}>
        <button
          onClick={() => {
            dispatch(
              getCalendarHabits(
                getISODay(new Date(firstDateOfMonth(date).getTime() - 86400000))
              )
            );
          }}
        >
          🔙
        </button>
        {isLoading && '⏳'}
        {loadingError && <span title={loadingError.message}>❌</span>}
        <label>
          <input
            type="month"
            value={currentDate.substring(0, 7)}
            onChange={(e) => {
              console.log();
              dispatch(getCalendarHabits(`${e.target.value}-01`));
            }}
          />
        </label>
        <button
          onClick={() => {
            dispatch(
              getCalendarHabits(
                getISODay(
                  new Date(lastDateOfMonth(date).getTime() + 86400000 * 2)
                )
              )
            );
          }}
        >
          🔜
        </button>
      </header>
      <section
        className={styles.calendarInfinity}
        onScroll={(e) => {
          const { scrollLeft, scrollWidth, clientWidth } =
            e.target as HTMLDialogElement;

          if (debounceRef.current) clearTimeout(debounceRef.current);
          if (scrollLeft <= 60) {
            debounceRef.current = setTimeout(() => {
              console.log('LEFT -100px');
              dispatch(
                getCalendarHabits(
                  getISODay(
                    new Date(firstDateOfMonth(date).getTime() - 86400000)
                  )
                )
              );
            }, 100);
          }

          if (scrollLeft + clientWidth >= scrollWidth - 60) {
            // Load more when 100px from bottom
            // Trigger loadMoreContent function
            debounceRef.current = setTimeout(() => {
              console.log('RIGHT -100px');
              dispatch(
                getCalendarHabits(
                  getISODay(
                    new Date(lastDateOfMonth(date).getTime() + 86400000 * 2)
                  )
                )
              );
            }, 100);
          }
        }}
        ref={ref}
      >
        <Calendar
          date={new Date(firstDateOfMonth(date).getTime() - 86400000)}
          loading
        />

        <CalendarActive />

        <Calendar
          date={new Date(lastDateOfMonth(date).getTime() + 86400000 * 2)}
          loading
        />
      </section>
    </section>
  );
};

export default CalendarWithData;
