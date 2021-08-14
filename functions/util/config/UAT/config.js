import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCo-4I_Yj_Fr3IA_zDt5-IHjDiafA2qkj0',
  authDomain: 'sendtester-3faf3.firebaseapp.com',
  databaseURL: 'https://sendtester-3faf3.firebaseio.com',
  projectId: 'sendtester-3faf3',
  storageBucket: 'sendtester-3faf3.appspot.com',
  messagingSenderId: '372581430884',
  appId: '1:372581430884:ios:54cf295245150e31121171',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };