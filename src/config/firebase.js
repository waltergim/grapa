import { initializeApp } from "firebase/app";

import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDItnB5q3_H0MksTIFLI12-Xfo8e01jfwA",
  authDomain: "graphis-fd154.firebaseapp.com",
  projectId: "graphis-fd154",
  storageBucket: "graphis-fd154.firebasestorage.app",
  messagingSenderId: "704020637293",
  appId: "1:704020637293:web:e87e4eb684a890426d4164",
  measurementId: "G-SV5HZ6TRW0",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export const subirImagen = async (file) => {
  console.log(file);
  const mountainsIamgesRef = ref(storage, `images/${file}`);
  await uploadBytes(mountainsIamgesRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
    console.log(mountainsIamgesRef);
  });

  return mountainsIamgesRef.fullPath;
};
