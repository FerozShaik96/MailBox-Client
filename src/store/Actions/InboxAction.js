import { updateData, updateSeen, updateTrash } from '../InboxReducer';

const reciver = localStorage.getItem('emailId').split('@')[0];
export const inboxAction = () => {
  return async (dispatch) => {
    try {
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
export const InboxChanger = (id) => {
  return async (dispatch) => {
    const inboxSeen = await fetch(
      `https://mail-box-client-1328c-default-rtdb.firebaseio.com/inbox/${reciver}/${id}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          seen: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (inboxSeen.ok) {
      console.log('Jello');
      const data = await inboxSeen.json();
      console.log(data);
      dispatch(updateSeen(id));
    }
  };
};
export const trashChangeHandler = (id) => {
  return async (dispatch) => {
    try {
      const trashData = await fetch(
        `https://mail-box-client-1328c-default-rtdb.firebaseio.com/inbox/${reciver}/${id}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            isDeleted: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (trashData.ok) {
        const dataTrash = await trashData.json();
        dispatch(updateTrash(id));
        console.log(dataTrash);
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
        `https://mail-box-client-1328c-default-rtdb.firebaseio.com/inbox/${reciver}/${id}.json`,
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
