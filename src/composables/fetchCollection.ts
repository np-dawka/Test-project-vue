import { ref } from 'vue';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export  const fetchDataFromFirestore = async (url: string) => {
    const querySnapshot = await getDocs(collection(db, url));
    
    const data = ref([{}]);
  
    querySnapshot.forEach((doc) => {
      const content = {
        id: doc.id,
        content: doc.data()
      };
      data.value.push(content);
    });

    return {
        data
    }
    };

  