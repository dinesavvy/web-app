// Utility function to transform business hours format
export const transformBusinessHours = (businessHours) => {
  const dayMapping = {
    'Sunday': 'SUN',
    'Monday': 'MON',
    'Tuesday': 'TUE',
    'Wednesday': 'WED',
    'Thursday': 'THU',
    'Friday': 'FRI',
    'Saturday': 'SAT'
  };

  const periods = [];

  // Iterate through each day in the business hours
  Object.entries(businessHours).forEach(([day, dayData]) => {
    if (dayData.enabled && dayData.slots.length > 0) {
      // For each time slot in the day
      dayData.slots.forEach(slot => {
        if (slot.from && slot.to) {
          // Format the time from HHMM to HH:mm:00
          const startTime = `${slot.from.substring(0, 2)}:${slot.from.substring(2, 4)}:00`;
          const endTime = `${slot.to.substring(0, 2)}:${slot.to.substring(2, 4)}:00`;

          periods.push({
            dayOfWeek: dayMapping[day],
            startLocalTime: startTime,
            endLocalTime: endTime
          });
        }
      });
    }
  });

  return {
    periods
  };
}; 