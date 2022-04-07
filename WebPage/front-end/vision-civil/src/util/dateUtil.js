const getTodayFormattedDate = () => {
    const date = new Date();
    const dateStr = date.getFullYear() + '-'
    + ('0' + (date.getMonth()+1)).slice(-2) + '-'
    + ('0' + date.getDate()).slice(-2);

    return dateStr;
};

const generateDaysAgoFormattedDate = (daysToSubtract) => {
    const date = new Date();
    date.setDate(date.getDate() - daysToSubtract);

    const dateStr = date.getFullYear() + '-'
    + ('0' + (date.getMonth()+1)).slice(-2) + '-'
    + ('0' + date.getDate()).slice(-2);

    return dateStr;
};

export { getTodayFormattedDate, generateDaysAgoFormattedDate };