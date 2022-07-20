export function parseDate(rawDate){
    // var date = new Date(rawDate);
    var date = new Date(rawDate).toLocaleString('en-US', { timeZone: 'Canada/Pacific' });
    // var today = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()
    return date
}