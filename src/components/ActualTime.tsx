import { useState, useEffect } from "react";

interface ComponentDayProps {
  data: string;
}

const ComponentDay = (props: ComponentDayProps) => {
  const { data } = props;

  return (
    <div
      className="flex items-center justify-center p-3 bg-blue-500 w-14 h-14 
    rounded-md text-white text-2xl hover:scale-90 hover:bg-blue-400 cursor-pointer"
    >
      <strong>{data}</strong>
    </div>
  );
};
function ActualTime() {
  const [dateNow, setDateNow] = useState(new Date());

  useEffect(() => {
    const updateDate = () => {
      setDateNow(new Date());
    };

    updateDate();

    const intervalDate = setInterval(updateDate, 1000);

    return () => clearInterval(intervalDate);
  }, []);

  const hours = dateNow.getHours();
  const minutes = dateNow.getMinutes();
  const seconds = dateNow.getSeconds();
  const isMorning = hours < 12;
  const addZero = (time: number) => (time < 10 ? `0${time}` : time.toString());
  const formatHours = hours > 12 ? addZero(hours - 12) : addZero(hours);
  const formatMinutes = addZero(minutes);
  const formatSeconds = addZero(seconds);
  const amPm = isMorning ? "AM" : "PM";

  return (
    <div className="flex gap-2 w-full justify-center py-2 h-[15%]">
      <ComponentDay data={formatHours} />
      <ComponentDay data={formatMinutes} />
      <ComponentDay data={formatSeconds} />
      <ComponentDay data={amPm} />
    </div>
  );
}

export default ActualTime;
