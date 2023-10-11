
import { ref, watch } from 'vue';

const createCalendar = (initialDate : Date, monthIndex: number, hasBackground: boolean) => {
  const date = ref(initialDate);

  const prevMonth = () => {
    date.value = new Date(date.value.getFullYear(), date.value.getMonth() - 1, 1);
    updateCalendar(); // Call the updateCalendar function to update rows and days
  };

  const nextMonth = () => {
    date.value = new Date(date.value.getFullYear(), date.value.getMonth() + 1, 1);
    updateCalendar(); // Call the updateCalendar function to update rows and days
  };

  const month = ref({
    index: hasBackground && monthIndex !== null ? monthIndex : date.value.getMonth(),
    days: 0 
  });

  const days = ref([]);
  const rows = ref([]);

  // Function to update the calendar data
  const updateCalendar = () => {
    month.value.index = hasBackground && monthIndex !== null ? monthIndex : date.value.getMonth();
    // Calculate the number of days for the selected month and year
    month.value.days = new Date(date.value.getFullYear(), month.value.index + 1, 0).getDate();
    days.value = [];

    for (let i = 1; i <= month.value.days; i++) {
      days.value.push(i);
    }

    const firstDayOfMonth = new Date(date.value.getFullYear(), month.value.index, 1).getDay();
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.value.unshift(null);
    }

    rows.value = [];
    while (days.value.length) {
      rows.value.push(days.value.splice(0, 7));
    }
  };

  // watch([initialDate, monthIndex], () => {
  //   // Update the month's data when the year or month changes
  //   updateCalendar();
  // });

  updateCalendar();

  return {
    date,
    prevMonth,
    nextMonth,
    month,
    days,
    rows,
  };
};
export default createCalendar