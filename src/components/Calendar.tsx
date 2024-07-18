import { useState, useEffect, useRef, useContext } from "react";
import ActualTime from "./ActualTime";
import HeaderWeek from "./HeaderWeek";
import IndicatorHour from "./IndicatorHour";
import ModalTask from "./ModalTask";
import { TaskContext } from "../context/TaskContext";

interface CalendarProps {
  tasks: Task[] | undefined;
}

interface RowHourProps {
  hourStart: number;
  amPm: string;
  hourEnd: number;
  amPmEnd: string;
  day: number;
  month: number;
  year: number;
}

interface RowsHourProps {
  day: number;
  month: number;
  year: number;
}

interface Task {
  id: number;
  title: string;
  description: string;
  datestart: string;
  dateend: string;
}

interface ColumnDayProps {
  day: number;
  month: number;
  year: number;
  state: boolean;
  tasks: Task[];
  setTaskModal: React.Dispatch<React.SetStateAction<{
    state: boolean;
    task: {
        id: number;
        title: string;
        description: string;
        datestart: string;
        dateend: string;
    };
}>>;
}

interface HoursDay {
  hour: number;
  amPm: string;
}

interface dayObject {
  day: number;
  month: number;
  year: number;
  state: boolean;
  dayStr: string;
}

const generateDaysMonths = (actualYear: number) => {
  const daysMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (actualYear % 4 === 0 || actualYear % 400 === 0) {
    daysMonths[1] = 29;
  }

  return daysMonths;
};

const days = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"];

const generateDaysWeek = (
  dayActual: number,
  monthActual: number,
  yearActual: number,
  dayStr: string
) => {
  const arrDays = Array(7);
  const indexDay = days.indexOf(dayStr);
  const daysMonthActual = generateDaysMonths(yearActual)[monthActual - 1];
  const daysPrevMonth =
    monthActual !== 1
      ? generateDaysMonths(yearActual)[monthActual - 2]
      : generateDaysMonths(yearActual - 1)[11];

  for (let index = 0; index < arrDays.length; index++) {
    let dayTogenerate;
    let monthActualDay = monthActual;
    let yearActualDay = yearActual;

    if (index > indexDay) {
      dayTogenerate = dayActual + (index - indexDay);
      if (dayTogenerate > daysMonthActual) {
        dayTogenerate -= daysMonthActual;
        monthActualDay++;
        if (monthActualDay > 12) {
          monthActualDay = 1;
          yearActualDay++;
        }
      }
    } else {
      dayTogenerate = dayActual - (indexDay - index);
      if (dayTogenerate <= 0) {
        dayTogenerate = daysPrevMonth + dayTogenerate;
        monthActualDay--;
        if (monthActualDay === 0) {
          monthActualDay = 12;
          yearActualDay--;
        }
      }
    }

    arrDays[index] = {
      day: dayTogenerate,
      month: monthActualDay,
      year: yearActualDay,
      dayStr: days[index],
      state: false,
    };
  }

  arrDays[indexDay] = {
    day: dayActual,
    month: monthActual,
    year: yearActual,
    dayStr: dayStr,
    state: true,
  };

  return arrDays;
};

const hoursDay: HoursDay[] = [
  { hour: 12, amPm: "AM" },
  { hour: 1, amPm: "AM" },
  { hour: 2, amPm: "AM" },
  { hour: 3, amPm: "AM" },
  { hour: 4, amPm: "AM" },
  { hour: 5, amPm: "AM" },
  { hour: 6, amPm: "AM" },
  { hour: 7, amPm: "AM" },
  { hour: 8, amPm: "AM" },
  { hour: 9, amPm: "AM" },
  { hour: 10, amPm: "AM" },
  { hour: 11, amPm: "AM" },
  { hour: 12, amPm: "PM" },
  { hour: 1, amPm: "PM" },
  { hour: 2, amPm: "PM" },
  { hour: 3, amPm: "PM" },
  { hour: 4, amPm: "PM" },
  { hour: 5, amPm: "PM" },
  { hour: 6, amPm: "PM" },
  { hour: 7, amPm: "PM" },
  { hour: 8, amPm: "PM" },
  { hour: 9, amPm: "PM" },
  { hour: 10, amPm: "PM" },
  { hour: 11, amPm: "PM" },
];

const getComponentsFullDate = (date: string) => {
  const year = Number(date.substring(0, 4));
  const month = Number(date.substring(5, 7));
  const day = Number(date.substring(8, 10));
  const hour = Number(date.substring(11, 13));
  const minutes = Number(date.substring(14, 17));
  const amPm = hour > 12 ? "pm" : "am";
  const components = { year, month, day, hour, minutes, amPm };

  return components;
};

const getElementsTask = (dateStart: string, dateEnd: string, day: number) => {
  const cmpDateStart = getComponentsFullDate(dateStart);
  const cmpDateEnd = getComponentsFullDate(dateEnd);
  const sameFinishDay = cmpDateStart.day === cmpDateEnd.day;
  const sameRangeDays = day > cmpDateStart.day && day < cmpDateEnd.day;
  const hourStProv = cmpDateStart.hour + cmpDateStart.minutes / 60;
  const hourStart = sameFinishDay
    ? hourStProv
    : day > cmpDateStart.day
    ? 0
    : hourStProv;
  const defHourSt = sameRangeDays ? 0 : hourStart;
  const hourEndProv = cmpDateEnd.hour + cmpDateEnd.minutes / 60;
  const hourEnd = sameFinishDay
    ? hourEndProv
    : day < cmpDateEnd.day
    ? 24
    : hourEndProv;
  const defHourEnd = sameRangeDays ? 24 : hourEnd;
  const formatHourStart =
    cmpDateStart.hour > 12 ? cmpDateStart.hour - 12 : cmpDateStart.hour;
  const formatHourEnd =
    cmpDateEnd.hour > 12 ? cmpDateEnd.hour - 12 : cmpDateEnd.hour;
  const addZero = (time: number) => (time < 10 ? `0${time}` : time.toString());
  const strIntervalHour = `${formatHourStart}:${
    addZero(cmpDateStart.minutes) + cmpDateStart.amPm
  }-${formatHourEnd}:${addZero(cmpDateEnd.minutes) + cmpDateEnd.amPm}`;
  return { hourStart, defHourSt, defHourEnd, strIntervalHour };
};

const ColumnHours = () => (
  <div className="flex flex-col">
    {hoursDay.map((hour: HoursDay, index) => (
      <span
        key={index}
        className="text-xs font-semibold text-gray-500 h-16 text-end pr-1"
      >
        {`${hour.hour} ${hour.amPm}`}
      </span>
    ))}
  </div>
);

const RowHour = (props: RowHourProps) => {
  /* const {hourStart, amPm, hourEnd, amPmEnd, day, month, year} = props; */
  console.log(props)
  return (
    <div className="border-solid border border-blue-300 hover:bg-blue-100"></div>
  );
};

const RowsHour = (props: RowsHourProps) => (
  <div className="grid grid-rows-[24]">
    {hoursDay.map((objHour, index) => {
      const hourEnd = objHour.hour === 12 ? 1 : objHour.hour + 1;
      const formatEnd =
        objHour.hour === 11
          ? objHour.amPm === "AM"
            ? "PM"
            : "AM"
          : objHour.amPm;

      return (
        <RowHour
          hourStart={objHour.hour}
          amPm={objHour.amPm}
          hourEnd={hourEnd}
          key={index}
          amPmEnd={formatEnd}
          day={props.day}
          month={props.month}
          year={props.year}
        />
      );
    })}
  </div>
);

const ColumnDay = (props: ColumnDayProps) => (
  <div
    className={
      props.state
        ? "grid grid-rows-[24] bg-blue-200 relative"
        : "grid grid-rows-[24] relative"
    }
  >
    <RowsHour day={props.day} month={props.month} year={props.year} />
    {props.tasks.length > 0 &&
      props.tasks.map((task, index) => {
        const dateStart = task.datestart;
        const dateEnd = task.dateend;
        const elementsTask = getElementsTask(dateStart, dateEnd, props.day);
        const positionPorcent = Number(elementsTask.hourStart / 24) * 100;
        const heightPorcent =
          ((elementsTask.defHourEnd - elementsTask.defHourSt) / 24) * 100;
        return (
          <button
            key={index}
            className="w-full bg-green-400 absolute
        rounded-md flex flex-col items-center justify-center text-white"
            style={{ top: `${positionPorcent}%`, height: `${heightPorcent}%` }}
            onClick={() => props.setTaskModal({ state: true, task: task })}
          >
            <span>{task.title}</span>
            <span>{elementsTask.strIntervalHour}</span>
          </button>
        );
      })}
    {props.state && <IndicatorHour />}
  </div>
);
const formatHourMeridian = (dateActual: Date) => {
  const offsetInMinutes = dateActual.getTimezoneOffset();
  const offSetInHours = -(offsetInMinutes / 60);
  const sign = offSetInHours >= 0 ? "+" : "-";
  const absOffSetInHours = Math.abs(Math.floor(offSetInHours));
  const formattedOffset = `GMT${sign}${absOffSetInHours
    .toString()
    .padStart(2, "0")}`;
  return formattedOffset;
};

export function Calendar(props: CalendarProps) {
  const { tasks } = props;
  const [taskModal, setTaskModal] = useState({ state: false, task: {id: 0, title: "", description: "", datestart: "", dateend: ""} });
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const dateNow = new Date();
  const currentDay = dateNow.getDate();
  const currentMonth = dateNow.getMonth() + 1;
  const currentYear = dateNow.getFullYear();
  const dayStr = days[dateNow.getDay()];
  const formatMeridian = formatHourMeridian(dateNow);
  const taskContext = useContext(TaskContext)
  const deleteTask = taskContext? taskContext.deleteTask : async () => {}
  const updateTask = taskContext? taskContext.updateTask : async () => {}

  const arrDaysWeek = generateDaysWeek(
    currentDay,
    currentMonth,
    currentYear,
    dayStr
  );
  const sizeGridColumns = "6%" + " 13.42857%".repeat(7);

  console.log("Renderizado CALENDAR");

  useEffect(() => {
    const scrollCurrentTime = () => {
      const timeNow = new Date();
      const hours = timeNow.getHours();
      const minutes = timeNow.getMinutes();
      const minutesPorcent = minutes / 60;
      const hoursPorcent = (hours + minutesPorcent) / 24;
      const positionScroll = Number(hoursPorcent.toFixed(4));

      if (scrollableRef.current) {
        scrollableRef.current.scrollTop =
          scrollableRef.current.scrollHeight * positionScroll - 30;
      }
    };
    scrollCurrentTime();
  }, []);

  return (
    <>
      <div className="h-screen overflow-hidden">
        <ActualTime />
        <HeaderWeek arrDays={arrDaysWeek} formatMeridianHour={formatMeridian} />
        <div className="h-[69%]">
          <div
            className="overflow-y-scroll h-full w-full grid grid-cols-8"
            style={{ gridTemplateColumns: sizeGridColumns }}
            ref={scrollableRef}
          >
            <ColumnHours />
            {tasks != undefined && (arrDaysWeek.map((dayObject: dayObject, index) => {
              const tasksFilter = tasks.filter((task) => {
                const dateStart = getComponentsFullDate(task.datestart);
                const dateEnd = getComponentsFullDate(task.dateend);
                const conditionMonth = dateStart.month === dayObject.month;
                const conditionYear = dateStart.year === dayObject.year;
                const conditionDay =
                  dateStart.day === dayObject.day ||
                  dateEnd.day === dayObject.day ||
                  (dayObject.day > dateStart.day && dayObject.day < dateEnd.day);
                return conditionDay && conditionMonth && conditionYear;
              });
              return (
                <ColumnDay
                  day={dayObject.day}
                  month={dayObject.month}
                  year={dayObject.year}
                  state={dayObject.state}
                  setTaskModal={setTaskModal}
                  tasks={tasksFilter}
                  key={index}
                />
              );
            }))}
          </div>
        </div>
      </div>
      {taskModal.state && (<ModalTask taskModal={taskModal} deleteTask={deleteTask} setTaskModal={setTaskModal} updateTask={updateTask}/>)}
    </>
  );
}

export default Calendar;
