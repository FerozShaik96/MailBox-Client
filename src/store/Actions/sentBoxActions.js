import { updateSendBox } from '../SendReducer';

const email = localStorage.getItem('emailId').split('@')[0];
export const sendBoxData = () => {
  return async (dispatch) => {
    try {
      const sentmails = await fetch(
        `https://mail-box-client-1328c-default-rtdb.firebaseio.com/sentBox/${email}.json`,
      );
      if (sentmails.ok) {
        const loadedMails = [];
        const data = await sentmails.json();
        for (let key in data) {
          loadedMails.push({
            id: key,
            subject: data[key].subject,
            description: data[key].description,
            recipitents: data[key].recipients,
            isDeleted: data[key].isDeleted,
            seen: data[key].seen,
            from: data[key].EmailReplace,
            to: data[key].recipients.split('@')[0],
          });
        }
        dispatch(updateSendBox(loadedMails));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const sentBoxTrash = (id) => {
  return async (dispatch) => {
    try {
      const sentTrash = await fetch(
        `https://mail-box-client-1328c-default-rtdb.firebaseio.com/sentBox/${email}/${id}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify({ isDeleted: true }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (sentTrash.ok) {
        const res = await sentTrash.json();
      }
    } catch (err) {
      console.log(err);
    }
  };
};
