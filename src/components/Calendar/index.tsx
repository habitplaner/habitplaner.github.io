import {
  firstDateOfMonth,
  getISODay,
  getWeekDay,
  lastDateOfMonth,
} from '@helpers/dateHelper';
import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

interface ICalendarProps {
  date: Date;
  onDayClick?: (date: Date) => void;
  onDropToDate?: (data: string, date: Date) => void;
  selectedDate?: null | string;
  calendarDayContentMap?: { [isoDay: string]: React.ReactNode };
  loading?: boolean;
}

const Calendar: React.FC<ICalendarProps> = ({
  date,
  onDayClick,
  onDropToDate,
  selectedDate = null,
  calendarDayContentMap,
  loading,
}) => {
  const firstDay = React.useMemo(() => firstDateOfMonth(date), [date]);
  const lastDay = React.useMemo(() => lastDateOfMonth(date), [date]);

  const weekDayNames = React.useMemo(() => {
    const nearestMonday = new Date(
      new Date().getTime() - 86400000 * (new Date().getDay() - 1)
    );
    return Array(7)
      .fill('E')
      .map((_, i) =>
        new Date(nearestMonday.getTime() + 86400000 * i).toLocaleDateString(
          'default',
          { weekday: 'short' }
        )
      );
  }, []);

  const startMonthEmptyDays = React.useMemo(
    () => Array(getWeekDay(firstDay)).fill('E'),
    [firstDay]
  );
  const monthDates = React.useMemo(
    () =>
      Array(lastDay.getDate())
        .fill('D')
        .map(
          (_, i) =>
            new Date(
              date.getFullYear(),
              date.getMonth(),
              i + 1,
              date.getHours()
            )
        ),
    [lastDay, date]
  );

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.daysContainer}>
        {weekDayNames.map((name) => {
          return (
            <span key={name} className={styles.dayOfWeek}>
              {name}
            </span>
          );
        })}
        {startMonthEmptyDays.map((_, i) => {
          return <span key={i} className={styles.emptyDay} />;
        })}
        {monthDates.map((d) => {
          const isoDate = getISODay(d);
          return (
            <span
              key={isoDate}
              data-date={isoDate}
              className={clsx(
                styles.day,
                loading && styles.dayLoading,
                d.toLocaleDateString() === new Date().toLocaleDateString() &&
                  styles.today,
                selectedDate === isoDate && styles.active
              )}
              role="presentation"
              onClick={(e) => {
                e.stopPropagation();
                onDayClick?.(d);
              }}
              onDragOver={(event) => {
                event.preventDefault(); // Essential to allow dropping
                (event.target as HTMLSpanElement).classList.add(
                  styles.droppable
                );
              }}
              onDragLeave={(event) => {
                event.preventDefault(); // Essential to allow dropping
                (event.target as HTMLSpanElement).classList.remove(
                  styles.droppable
                );
              }}
              onDrop={(event) => {
                event.preventDefault();
                const data = event.dataTransfer.getData('text/plain');
                (event.target as HTMLSpanElement).classList.remove(
                  styles.droppable
                );
                if (data) {
                  onDropToDate?.(data, d);
                }
              }}
            >
              {d.getDate()}
              {calendarDayContentMap?.[isoDate] && (
                <div className={styles.calendarDayAdditionalContent}>
                  {calendarDayContentMap[isoDate]}
                </div>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
