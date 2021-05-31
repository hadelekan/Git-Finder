const Query = () => {

    let qString = []

    const q = decodeURI(location.search.substring(1)).split('&').forEach(i => {
        const pair = i.split('=')
        qString.push({[pair[0]]: pair[1]})
    })

    return qString
}
const humanReadableTime = (datetime) => {

    const currentDate = new Date(Date.now())
    const passedDate = new Date(datetime)
    const minuteDiff = (currentDate - passedDate)/(1000*60)


    if (minuteDiff < 60) {
        return `Updated ${minuteDiff} minutes ago`
    }
    else if (minuteDiff < 1440) {
        const elaspsedDay = Math.round(minuteDiff/60)
        return `Updated ${elaspsedDay} hours ago`
    }
    else if (minuteDiff < 34560) {
        const elaspsedDay = Math.round(minuteDiff/1440)
        return `Updated  ${elaspsedDay} days ago`
    }
    else if (currentDate.getFullYear() == passedDate.getFullYear()) {
        const date = passedDate.toString().split(' ')
        return `Updated at ${date[2] } ${date[1]}`
    } else {
        const date = passedDate.toString().split(' ')
        return `Updated at ${date[2] } ${date[1]} ${passedDate.getFullYear()}`
    }

}
const nullData = (data) => {

    return (data == undefined || data == null ? 'remove' : '')
}
const numberFormat = (number) => {
    if (number < 1000) {
        return number
    } else if (number > 1000) {
        return (number/1000).toFixed(1) + 'K'
    } else if (number > 1000000) {
        return (number/1000000).toFixed(1) + 'M'
    }
    return
}
export {
    Query,
    humanReadableTime,
    nullData,
    numberFormat
}