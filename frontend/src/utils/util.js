export function getDate(){
    // var date = new Date(rawDate);
    var currentdate = new Date();
    var datetime =  currentdate.getDay() + "/" + currentdate.getMonth() 
                    + "/" + currentdate.getFullYear() + " " + currentdate.getHours() + ":" 
                    + currentdate.getMinutes() 
    return datetime
}