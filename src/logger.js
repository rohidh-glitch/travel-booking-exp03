
export const logAction = (action, details = {}) => {
  console.log(`[Travel Booking] ${action}`, {
    ...details,
    time: new Date().toLocaleTimeString(),
  });
};
