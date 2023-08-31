import { updateData } from '../InboxReducer';

export const inboxAction = () => {
  return async (dispatch) => {
    try {
      const reciver = localStorage.getItem('emailId').split('@')[0];
      const inboxData = await fetch(
        `https://mail-box-client-1328c-default-rtdb.firebaseio.com/inbox/${reciver}.json`,
      );
      if (inboxData.ok) {
        const resData = await inboxData.json();
        const loadedData = [];
        for (const key in resData) {
          // if (!resData[key].isDeleted) {
          loadedData.push({
            id: key,
            subject: resData[key].subject,
            seen: resData[key].seen,
            isDeleted: resData[key].isDeleted,
            description: resData[key].description,
            recipitents: resData[key].recipients,
            from: resData[key].EmailReplace,
          });
        }
        dispatch(updateData(loadedData));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const trashInboxData = (id) => {
  return async () => {
    try {
      const data = await fetch(
        `https://mail-box-client-1328c-default-rtdb.firebaseio.com/inbox/${reciver}/${item.id}.json`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (err) {
      alert(err);
    }
  };
};
