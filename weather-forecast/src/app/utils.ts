import { dateModal } from "./modals/cities.modal";

 export function fetchDateAndDay(dateStr : string) : dateModal {
    const date = new Date(dateStr);
    let day = date.toLocaleString('en-US', { weekday: 'long' });
    let month = date.toLocaleString('en-US', { month: 'short' });
    let dayNumber = date.getDate();
    return {
        day: day,
        month: month, 
        dayNumber: dayNumber
    };
 }