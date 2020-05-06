
//Selecting element Object having Id value : addNote and storing to addButton;
const addButton = document.querySelector('#addNote');


//Selecting element Object having Id value : noteText and storing to noteText ;
const noteText = document.querySelector('#noteText');


//Selecting element Object having Id value : title and storing to title ;
const title = document.querySelector('#title');






//It assigns an arrow functions to addButton object and whenever user click on addButton object ,
//it run this arrow function:

addButton.addEventListener('click', eventObject => {

    // It checks whether Notes key present on localStorage Object or not :
    //If not present , return null:
    //If Present it return  its corresponding value : 
    let Notes = window.localStorage.getItem('Notes');

    //If notes  = null ,it execute if block instructions:
    //If Notes  != null,it execute else block instruction:     
    if (!Notes) {
        //It create an empty object  and store to Notes variable :
        Notes = {};
    } else
        Notes = JSON.parse(Notes); // It convert JSON Object to Javascript Object :

    //It gets Title Object value and store to key variable :    
    let key = title.value;
      
     let d1 = new Date();
    //creating key in notes and storing value on it :  
    Notes[key] = `${noteText.value} <br>Date:${d1} `;
    
    //Reset Value of Title Object to empty:
    title.value = "";
    //Reset Value of noteText Object to Empty :
    noteText.value = "";
    //Converting Javascript Object into JSON Object : 
    Notes = JSON.stringify(Notes);

    //Storing JSON Object to Notes key in localStorage Object : 
    window.localStorage.setItem('Notes', Notes);
   
    
    displayNote();
    console.log(window.localStorage);
});

const deleteNote = targetElement =>{

let Id = targetElement.parentNode.querySelector('p').id ;
     
      let Notes  = window.localStorage.getItem('Notes');
         Notes = JSON.parse(Notes);
         
        
         for(let key in Notes){
                   
             if(key === Id )
              delete Notes[Id];
         }
            
       window.localStorage.setItem('Notes',JSON.stringify(Notes));

    displayNote();
    console.log(localStorage);
}

const displayNote = () => {

   let  Notes = window.localStorage.getItem('Notes');
    Notes = JSON.parse(Notes);
    let text = "";
  
    if(!Notes)
       text = "<h1>Oops No Notes Found :</h1>";         
    else{
         for(let key in Notes){
           
          text += `
            <div class="card mr-3 my-3" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">${key}</h5>
                <p class="card-text" id = '${key}' > ${Notes[key]}  </p>
                <button  class="btn btn-primary w-100" id ="deleteNote" onclick = deleteNote(this) >Delete Note</button>
               </div>
            </div>
      `     
   }
}   
 document.querySelector('.row').innerHTML = text;
} 

displayNote();