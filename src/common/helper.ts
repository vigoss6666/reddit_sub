export const merge = (arr1, arr2) => {
    const finalArray = []; 
    for(let x = 0; x < arr1.length; x++){
    for(let y = 0; y < arr2.length; y++){
     if(arr1[x]._id == arr2[y]._id){
      finalArray.push(Object.assign({}, arr1[x], arr2[y]))
     }
    } 	
    }
    return finalArray; 
   }