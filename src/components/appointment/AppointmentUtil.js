export const getStatusText = (appointment) => {
    const currentDate = new Date();

    if (new Date(appointment.appointmentDate) < currentDate) {
        return 'Completed';
    }

    switch (appointment.statusId) {
        case 1:
            return 'Booked';
        case 0:
            return 'Cancelled';
        case -1:
            return 'Pending';
        default:
            return 'Unknown'; 
    }
};
