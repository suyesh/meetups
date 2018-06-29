import moment from 'moment'
import User from '../../assets/images/user.png'

export const createNewEvent = (user, photoURl, event) => {
  event.date = moment(event.date).toDate();
  return {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: photoURl || User,
    created: Date.now(),
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: Date.now(),
        photoURL: photoURl || User,
        displayName: user.displayName,
        host: true
      }
    }
  }
}

export const objectToArray = (object) => {
  if (object){
    return Object.entries(object).map(e => Object.assign(e[1], { id: e[0] }))
  }
}
