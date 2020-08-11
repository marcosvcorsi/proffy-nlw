export default function convertHourToMinutes(time: string) {
  if (!time.includes(':')) {
    throw new Error('Invalid format');
  }

  const [hour, minutes] = time.split(':').map(Number);

  const timeInMinutes = hour * 60 + minutes;

  return timeInMinutes;
}
