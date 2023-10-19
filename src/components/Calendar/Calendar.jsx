import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ko } from 'date-fns/locale';
import './MyDayPicker.css';

function Calendar({ date, setDate }) {
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    threeMonthsLater.setHours(0, 0, 0, 0);

    return date < today || date > threeMonthsLater;
  };

  return (
    <div>
      <DayPicker
        locale={ko}
        mode="multiple"
        className="calendar-border"
        selected={date}
        onSelect={setDate}
        disabled={isDateDisabled}
        modifiersClassNames={{
          selected: 'my-selected',
          today: 'my-today'
        }}
      />
    </div>
  );
}

export default Calendar;
