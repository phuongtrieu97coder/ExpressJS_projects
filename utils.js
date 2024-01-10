let expressionIdCounter, animalIdCounter=0;

let getElementById = (id, elementList)=>{
    return elementList.find((element)=>{
        return element.id === Number(id);
    });
}
let getIndexById = (id, elementList)=>{
    return elementList.findIndex((element)=>{
        return element.id === Number(id);
    });
}

let createElement = (elementType, queryArgumentObj)=>{
   let currentId;
   if(queryArgumentObj.hasOwnProperty("emoji")&&
   queryArgumentObj.hasOwnProperty("name")){
       if(elementType == "expressions"){
        expressionIdCounter+=1;
        currentId = expressionIdCounter;
       }else{
        animalIdCounter+=1;
        currentId = animalIdCounter;
       }
       return {
        'id':currentId,
        'emoji':queryArgumentObj.emoji,
        'name':queryArgumentObj.name,
       }
   }else{
    return false;
   }
 
}

let updateElement = (id, queryArgumentObj, elementList)=>{
   let elementIndex = getIndexById(id, elementList);
   if(elementIndex === -1){
     throw new Error("updateElement must be called with a valid id parameter!!!");
   }
   if(queryArgumentObj.id){
      queryArgumentObj.id = Number(queryArgumentObj.id);
   }
   Object.assign(elementList[elementIndex],queryArgumentObj);
   return elementList[elementIndex];
}


let seedElements = (arr, type)=>{
    if(type === "expressions"){
        arr.push(createElement("expressions",{'emoji':'😊','name':'happy'}));
        arr.push(createElement("expressions",{'emoji':'😂','name':'laugh'}));
    }else if(type === "animals"){
        arr.push(createElement("animals",{'emoji':'🐶','name':'dog'}));
        arr.push(createElement("animals",{'emoji':'😺','name':'cat'}));
    }else{
        return false;
    }
}

module.exports = {
    getElementById:getElementById,
    getIndexById:getIndexById,
    createElement:createElement,
    updateElement:updateElement,
    seedElements:seedElements
}