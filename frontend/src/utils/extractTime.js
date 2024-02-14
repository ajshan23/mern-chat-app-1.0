export function extractTime(dateString){
    const date=new Date(dateString)
    const hours=padZero(date.getHours())
    const minuts=padZero(date.getMinutes());

    return `${hours}:${minuts}`
}

function padZero(number){
    return number.toString().padStart(2,"0")
}