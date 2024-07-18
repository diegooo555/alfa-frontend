import {useState, useEffect} from 'react';

export default function IndicatorHour () {
    const [currentPosition, setCurrentPosition] = useState(0);

    useEffect(() => {
        const updateTime = () => {
            const timeNow = new Date();
            const hours = timeNow.getHours();
            const minutes = timeNow.getMinutes();
            const minutesPorcent = (minutes / 60);
            const hoursPorcent = ((hours + minutesPorcent) / 24) * 100;
            setCurrentPosition(Number(hoursPorcent.toFixed(4)));
        }

        updateTime();

        const intervalTimer = setInterval(updateTime, 30000);
        return () => clearInterval(intervalTimer);
    }, [])

    return(<div className='w-full h-[2.5px] bg-red-600 absolute' style={{top: `${currentPosition}%`}}/>)
}