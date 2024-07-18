interface DayOb {
  day: number;
  month: number;
  year: number;
  dayStr: string;
  state: boolean;
}

interface HeaderWeekProps {
  arrDays: DayOb[];
  formatMeridianHour: string;
}

interface DayProps {
  day: number;
  state: boolean;
  dayStr: string;
}

const Day = (props: DayProps) => {
  const { day, state, dayStr } = props;
  return (
    <div className="w-[13.42857%] flex flex-col items-center justify-center">
      <p
        className={`${
          state ? "text-blue-500 font-bold" : "text-gray-500 font-bold"
        }`}
      >
        {dayStr}
      </p>
      <div
        className={`${
          state
            ? "bg-blue-500 text-white hover:bg-blue-700"
            : "text-gray-500 hover:bg-gray-300"
        } rounded-full font-bold text-xl 
            flex items-center justify-center cursor-pointer w-10 h-10`}
      >
        {day}
      </div>
    </div>
  );
};

function HeaderWeek(props: HeaderWeekProps) {
  const { arrDays, formatMeridianHour } = props;

  return (
    <div className="w-full pt-1 h-[16%]">
      <div className="flex items-center">
        <div className="w-[6%] self-stretch justify-self-stretch flex items-center">
          <span className="text-xs text-gray-500 font-semibold w-full text-end">{formatMeridianHour}</span>
        </div>
        {arrDays.map((dayObj, index) => (
          <Day
            day={dayObj.day}
            state={dayObj.state}
            dayStr={dayObj.dayStr}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default HeaderWeek;
