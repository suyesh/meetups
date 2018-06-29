import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid'


export const updateProfile = (user) =>
  async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { isLoaded, isEmpty, ...updatedUser } = user;
    if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
      updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
    }

    try {
      await firebase.updateProfile(updatedUser)
      toastr.success('Success', 'Profile updated')
    } catch(error){
      console.log(error)
    }
  }

export const uploadProfileImage = (file, fileName) =>
  async (dispatch, getState, { getFirebase, getFirestore}) => {
    const imageName = cuid();
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;
    const options = {
      name: imageName
    }
    try {
      // upload the file to firebase firebase Storage
      let uploadedFile = await firebase.uploadFile(path, file, null, options);
      // get url of image
      let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
      // get userdoc
      let userDoc = await firestore.get(`users/${user.uid}`);
      // check if user has photo, if not update profile with new image
      if (!userDoc.data().photoURL) {
        await firebase.updateProfile({
          photoURL: downloadURL
        });
        await user.updateProfile({
          photoURL: downloadURL
        })
      }
      // add the new photo to photos collection
      return await firestore.add({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'photos'}]
      }, {
        name: imageName,
        url: downloadURL
      })
    } catch (error){
      console.log(error)
      throw new Error('Problem uploading photos')
    }
  }
