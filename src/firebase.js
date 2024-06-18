import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// 이미지 업로드
const uploadImage = async (file, path) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

// 호텔 Img를 Firebase에 저장하는 함수
const saveHotelImageUrl = async (hotelCode, imageUrl) => {
  const hotelRef = doc(db, "hotels", hotelCode);
  await setDoc(hotelRef, { imageUrl }, { merge: true });
};

// 에이전시 Img를 Firebase에 저장하는 함수
const saveAgencyImageUrl = async (agencyCode, imageUrl) => {
  const agencyRef = doc(db, "agencies", agencyCode);
  await setDoc(agencyRef, { imageUrl }, { merge: true });
};

const deleteImage = async (imageUrl) => {
  const fileRef = ref(storage, imageUrl);

  try {
    await deleteObject(fileRef);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

const removeImageUrl = async (agencyCode) => {
  const agencyRef = doc(db, "agencies", agencyCode);

  try {
    await updateDoc(agencyRef, {
      image_url: "",
    });
    console.log("Image URL removed successfully");
  } catch (error) {
    console.error("Error removing image URL:", error);
  }
};

export {
  uploadImage,
  saveHotelImageUrl,
  saveAgencyImageUrl,
  deleteImage,
  removeImageUrl,
  db,
};
