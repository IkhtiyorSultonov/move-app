import { collection, getDocs } from "firebase/firestore"; 
import { db } from "src/Firebase";
import { MyList } from "src/interfaces/app.interfaces";

export const getList=async (userId?:string)=>{
let mylist:MyList[]=[]

const querySnapshot = await getDocs(collection(db, "list"));
querySnapshot.forEach(doc => {

    if(doc.data().userId==userId)
    {
        mylist.push(doc.data()as MyList)
    }
  console.log(mylist);
});
return mylist
}