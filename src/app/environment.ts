import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
    apiKey: "AIzaSyDes7zKru58xC7VIeeASYzCXtU9nufFf50",
    authDomain: "igyunk-e31d7.firebaseapp.com",  
    projectId: "igyunk-e31d7",  
    storageBucket: "igyunk-e31d7.appspot.com",  
    messagingSenderId: "1043534981809",  
    appId: "1:1043534981809:web:cc63f58215e9ba69f55090",
    measurementId: "G-SSRVS671JT"
  };
  

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);