// export const getStartDate = () => {
//   let wholeDate = new Date().toLocaleString()
//   let localDateArray = wholeDate.split(' ')
//   let dateWithComma = localDateArray[0].split(',')
//   let localDate = dateWithComma[0]
//   let newLocalDateArray = localDate.split('/')
//   let correctLocalDate = newLocalDateArray.join('-')
//   let correctLocalDateArray = correctLocalDate.split('-')
//   let localDay = correctLocalDateArray[2]
//   let localTime = localDateArray[1]
//   let localTimeArray = localTime.split(':')
//   let localHour = localTimeArray[0]
//   if (parseInt(localHour) < 10) {
//     localHour = '0' + localHour
//   }
//   let date = new Date()
//   let dateInEnglish = date.toISOString().split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let smallDate = dateArray[0]
//   let smallDateArray = smallDate.split('-')
//   smallDateArray.splice(0, 1, localDay)
//   let joinDate = smallDateArray.join('-')
//   let time = dateArray[1]
//   let timeArray = time.split(':')
//   timeArray.splice(0, 1, localHour)
//   let joinTime = timeArray.join(':')
//   let newDate = joinDate + `T${joinTime}Z`;
//   return newDate
// }

// export const getEndDate = (passedDate) => {
//   let dateInEnglish = passedDate.split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let time = dateArray[1]
//   let timeArray = time.split(':')
//   let hour = timeArray[0]
//   let increment = 3
//   if (parseInt(hour) < 21) {
//     let newHour = parseInt(hour) + increment
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return newDate
//   } else {
//     let newHour = parseInt(hour) + increment - 24
//     if (newHour < 10) {
//       newHour = '0' + newHour
//     }
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return newDate
//   }
// }

// export const getFutureDay = (passedDate) => {
//   let dateInEnglish = passedDate.split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let time = dateArray[1]
//   let smallDate = dateArray[0]
//   let smallDateArray = smallDate.split('-')
//   let day = smallDateArray[2]
//   let increment = 1
//   if (parseInt(day) > 27 && parseInt(day) < 30) {
//     let newDay = parseInt(day) + increment
//     smallDateArray.splice(0, 1, newDay)
//     let joinDate = smallDateArray.join('-')
//     let newDate = joinDate + `T${time}Z`;
//     return newDate
//   } else if (parseInt(day) > 30) {
//     let newDay = parseInt(day) + increment - 30
//     smallDateArray.splice(0, 1, newDay)
//     let joinDate = smallDateArray.join('-')
//     let newDate = joinDate + `T${time}Z`;
//     return getFutureMonth(newDate)
//   }
//   let newDay = parseInt(day) + increment
//   smallDateArray.splice(0, 1, newDay)
//   let joinDate = smallDateArray.join('-')
//   let newDate = joinDate + `T${time}Z`;
//   return newDate
// }

// export const getFutureMonth = (passedDate) => {
//   let dateInEnglish = passedDate.split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let time = dateArray[1]
//   let smallDate = dateArray[0]
//   let smallDateArray = smallDate.split('-')
//   let month = smallDateArray[1]
//   let increment = 1
//   if (parseInt(month) > 12) {
//     let newMonth = parseInt(month) + increment
//     smallDateArray.splice(0, 1, newMonth)
//     let joinDate = smallDateArray.join('-')
//     let newDate = joinDate + `T${time}Z`;
//     return newDate
//   }
//   let newMonth = parseInt(month) + increment - 12
//   smallDateArray.splice(0, 1, newMonth)
//   let joinDate = smallDateArray.join('-')
//   let newDate = joinDate + `T${time}Z`;
//   return getFutureYear(newDate)
// }

// export const getFutureYear = (passedDate) => {
//   let dateInEnglish = passedDate.split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let time = dateArray[1]
//   let smallDate = dateArray[0]
//   let smallDateArray = smallDate.split('-')
//   let year = smallDateArray[0]
//   let increment = 1
//   let newYear = parseInt(year) + increment
//   smallDateArray.splice(0, 1, newYear)
//   let joinDate = smallDateArray.join('-')
//   let newDate = joinDate + `T${time}Z`;
//   return newDate
// }

// export const incStartDate = (startDate) => {
//   let dateInEnglish = startDate.split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let time = dateArray[1]
//   let timeArray = time.split(':')
//   let hour = timeArray[0]
//   let increment = 3
//   if (parseInt(hour) < 21) {
//     let newHour = parseInt(hour) + increment
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return newDate
//   } else {
//     let newHour = parseInt(hour) + increment - 24
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return getFutureDay(newDate)
//   }
// }

// export const incEndDate = (endDate) => {
//   let dateInEnglish = endDate.split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let time = dateArray[1]
//   let timeArray = time.split(':')
//   let hour = timeArray[0]
//   let increment = 3
//   if (parseInt(hour) < 21) {
//     let newHour = parseInt(hour) + increment
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return newDate
//   } else {
//     let newHour = parseInt(hour) + increment - 24
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return getFutureDay(newDate)
//   }
// }

// export const decStartDate = (startDate) => {
//   let dateInEnglish = startDate.split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let time = dateArray[1]
//   let timeArray = time.split(':')
//   let hour = timeArray[0]
//   let increment = 3
//   if (parseInt(hour) < 21) {
//     let newHour = parseInt(hour) - increment
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return newDate
//   } else {
//     let newHour = parseInt(hour) + increment + 24
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return getFutureDay(newDate)
//     // return newDate
//   }
// }

// export const decEndDate = (startDate) => {
//   let dateInEnglish = startDate.split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let time = dateArray[1]
//   let timeArray = time.split(':')
//   let hour = timeArray[0]
//   let increment = 3
//   if (parseInt(hour) < 21) {
//     let newHour = parseInt(hour) - increment
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return newDate
//   } else {
//     let newHour = parseInt(hour) + increment + 24
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return getFutureDay(newDate)
//   }
// }

// export const getPrevDay = (passedDate) => {
//   let dateInEnglish = passedDate.split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let time = dateArray[1]
//   let smallDate = dateArray[0]
//   let smallDateArray = smallDate.split('-')
//   let day = smallDateArray[2]
//   let increment = 1
//   if (parseInt(day) > 27 && parseInt(day) < 30) {
//     let newDay = parseInt(day) + increment
//     smallDateArray.splice(0, 1, newDay)
//     let joinDate = smallDateArray.join('-')
//     let newDate = joinDate + `T${time}Z`;
//     return newDate
//   } else if (parseInt(day) > 30) {
//     let newDay = parseInt(day) + increment - 30
//     smallDateArray.splice(0, 1, newDay)
//     let joinDate = smallDateArray.join('-')
//     let newDate = joinDate + `T${time}Z`;
//     return getFutureMonth(newDate)
//   }
//   let newDay = parseInt(day) + increment
//   smallDateArray.splice(0, 1, newDay)
//   let joinDate = smallDateArray.join('-')
//   let newDate = joinDate + `T${time}Z`;
//   return newDate
// }

// export const getPrevMonth = (passedDate) => {
//   let dateInEnglish = passedDate.split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let time = dateArray[1]
//   let smallDate = dateArray[0]
//   let smallDateArray = smallDate.split('-')
//   let month = smallDateArray[1]
//   let increment = 1
//   if (parseInt(month) > 12) {
//     let newMonth = parseInt(month) + increment
//     smallDateArray.splice(0, 1, newMonth)
//     let joinDate = smallDateArray.join('-')
//     let newDate = joinDate + `T${time}Z`;
//     return newDate
//   }
//   let newMonth = parseInt(month) + increment - 12
//   smallDateArray.splice(0, 1, newMonth)
//   let joinDate = smallDateArray.join('-')
//   let newDate = joinDate + `T${time}Z`;
//   return getFutureYear(newDate)
//   // return newDate
// }

// export const getPrevYear = (passedDate) => {
//   let dateInEnglish = passedDate.split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let time = dateArray[1]
//   let smallDate = dateArray[0]
//   let smallDateArray = smallDate.split('-')
//   let year = smallDateArray[0]
//   let increment = 1
//   let newYear = parseInt(year) + increment
//   smallDateArray.splice(0, 1, newYear)
//   let joinDate = smallDateArray.join('-')
//   let newDate = joinDate + `T${time}Z`;
//   return newDate
// }

// export const getUpcomingStartDate = (startDate) => {
//   let dateInEnglish = startDate.split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let time = dateArray[1]
//   let timeArray = time.split(':')
//   let hour = timeArray[0]
//   let increment = 1
//   if (parseInt(hour) < 21) {
//     let newHour = parseInt(hour) + increment
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return newDate
//   } else {
//     let newHour = parseInt(hour) + increment - 24
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return getFutureDay(newDate)
//   }
// }

// export const getUpcomingEndDate = (passedDate) => {
//   let dateInEnglish = passedDate.split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let time = dateArray[1]
//   let timeArray = time.split(':')
//   let hour = timeArray[0]
//   let increment = 12
//   if (parseInt(hour) < 12) {
//     let newHour = parseInt(hour) + increment
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return newDate
//   } else {
//     let newHour = parseInt(hour) + increment - 24
//     if (newHour < 10) {
//       newHour = '0' + newHour
//     }
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return getFutureDay(newDate)
//   }
// }

// export const getGenreEndDate = (passedDate) => {
//   let dateInEnglish = passedDate.split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let time = dateArray[1]
//   let timeArray = time.split(':')
//   let hour = timeArray[0]
//   let increment = 12
//   if (parseInt(hour) < 12) {
//     let newHour = parseInt(hour) + increment
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return newDate
//   } else {
//     let newHour = parseInt(hour) + increment - 24
//     if (newHour < 10) {
//       newHour = '0' + newHour
//     }
//     timeArray.splice(0, 1, newHour)
//     let joinTime = timeArray.join(':')
//     let newDate = dateArray[0] + `T${joinTime}`;
//     return getFutureDay(newDate)
//   }
// }

// export const getAge = (passedDate) => {
//   let wholeDate = new Date().toLocaleString()
//   let localDateArray = wholeDate.split(' ')
//   let dateWithComma = localDateArray[0].split(',')
//   let localDate = dateWithComma[0]
//   let newLocalDateArray = localDate.split('/')
//   let correctLocalDate = newLocalDateArray.join('-')
//   let correctLocalDateArray = correctLocalDate.split('-')
//   let currentYear = correctLocalDateArray[2]
//   let birthDateArray = passedDate.split('-')
//   let birthYear = birthDateArray[0]
//   let age = parseInt(currentYear) - parseInt(birthYear)

//   return age
// }

// export const getStartsIn = (passedDate) => {
//   let wholeDate = new Date().toISOString()
//   let localTime = wholeDate.split('T')[1].split('Z')[0]
//   let localTimeArray = localTime.split(':')
//   localTimeArray.length = 2
//   let localTimeHour = localTimeArray[0]
//   let localTimeMinute = localTimeArray[1]

//   let passedTime = passedDate.split('T')[1].split('Z')[0]
//   let passedTimeArray = passedTime.split(':')
//   let passedTimeHour = passedTimeArray[0]
//   let passedTimeMinute = passedTimeArray[1]

//   let diffHour = parseInt(passedTimeHour) - parseInt(localTimeHour)
//   let diffMinute = parseInt(passedTimeMinute) - parseInt(localTimeMinute)

// }

// export const getStartDateNoSeconds = () => {
//   let wholeDate = new Date().toLocaleString()
//   let localDateArray = wholeDate.split(' ')
//   let dateWithComma = localDateArray[0].split(',')
//   let localDate = dateWithComma[0]
//   let newLocalDateArray = localDate.split('/')
//   let correctLocalDate = newLocalDateArray.join('-')
//   let correctLocalDateArray = correctLocalDate.split('-')
//   let localDay = correctLocalDateArray[2]
//   let localTime = localDateArray[1]
//   let localTimeArray = localTime.split(':')
//   let localHour = localTimeArray[0]
//   if (parseInt(localHour) < 10) {
//     localHour = '0' + localHour
//   }
//   let date = new Date()
//   let dateInEnglish = date.toISOString().split('.')
//   let dateFormat = dateInEnglish[0]
//   let dateArray = dateFormat.split('T')
//   let smallDate = dateArray[0]
//   let smallDateArray = smallDate.split('-')
//   smallDateArray.splice(0, 1, localDay)
//   let joinDate = smallDateArray.join('-')
//   let time = dateArray[1]
//   let timeArray = time.split(':')
//   timeArray.splice(0, 1, localHour)
//   timeArray.splice(2, 1)
//   let joinTime = timeArray.join(':')
//   let newDate = joinDate + `T${joinTime}Z`;
//   return newDate
// }