/* window.localStorage is a object provided by javascript Engine to store data:


*/
//Selecting element Object having Id value : addNote and storing to addButton;
const addButton = document.querySelector('#addNote');


//Selecting element Object having Id value : noteText and storing to noteText ;
const noteText = document.querySelector('#noteText');


//Selecting element Object having Id value : title and storing to title ;
const title = document.querySelector('#title');

////Selecting element Object having Id value : search and storing to search ;
const search = document.querySelector('#search');

//It assigns an arrow functions to search object and whenever user type in search object ,
//it run this arrow function:
search.addEventListener('input',eventObject => {
  
  //eventObject is store information like whom to event occur etc:

  //It selects target element and take its value and converted in lowercase and store to searchData variable: 
  let searchData = eventObject.target.value.toLowerCase() ;

  //It selects element Object having class value : row and return its childrens:
  //Children : child elements of that object :
  let elements =  document.querySelector('.row').children;
    
  //Array.from() function convert HTMLCollection object to Array object:
  //so that we can apply for each :
  //forEach is callback function :,it takes a function as arguments :
  //I am passing an arrow function to forEach function:
      Array.from(elements).forEach(element =>{
        //It selects child paragraph element whom to element object point & store to p variable/object :                 
         let p  = element.querySelector('p'); 
        
        //It converts text of paragraph object to lowercase and store to data variable : 
         let data  = p.innerText.toLowerCase() ;
        
        //If block execute if searchData not found in data :
        //includes is a function which receive string as argument and  return true of searchData available in data: 
         if( !(data.includes(searchData)))
              element.style.display = "none"; //It will hide element
       
       //If block will execute if searchData has emptyString :       
        if(searchData == "")
           element.style.display = "block"; //It will show elememt :
              
      });
   
  

});



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
   //It create date and store to d1 :      
     let d1 = new Date();
    //creating key in notes and storing value & date on it :  
    Notes[key] = `${noteText.value} <br>Date: <b>${d1}</b> `;
    
    //Reset Value of Title Object to empty:
    title.value = "";
    //Reset Value of noteText Object to Empty :
    noteText.value = "";
    //Converting Javascript Object into JSON Object : 
    Notes = JSON.stringify(Notes);

    //Storing JSON Object to Notes key in localStorage Object : 
    window.localStorage.setItem('Notes', Notes);
   
    //calling displayNote function :
    displayNote();
    
});

//It is deleteNote arrow function:It is responsible to deleting note from page : 
//It automatically call when  user click to delete note button :because I did inline event handling :

const deleteNote = targetElement =>{
//targetElement a object which is point to element whom to this event bind:

//first it select parent Object of target Object(Element) :
//Then findout paragraph element among their child:
//and select id of paragraph element and store to Id variable : 
let Id = targetElement.parentNode.querySelector('p').id ;



    // It checks whether Notes key present on localStorage Object or not :
    //If not present , return null:
    //If Present it return  its corresponding value : 
 
      let Notes  = window.localStorage.getItem('Notes');
    
   //It  convets into JSON object to javascript Object : 
         Notes = JSON.parse(Notes);
         
    //Iterate javascript object :    
         for(let key in Notes){
            
           //It key of NoteObject match with Id variable: 
           //then it will delete particular key,valye pair from Note Object: 
             if(key === Id )
              delete Notes[Id]; // delete particular key,valye pair from Note Object: 
         }
        
        //convert Notes javascript Object to JSON Object and store to localStorage : 
       window.localStorage.setItem('Notes',JSON.stringify(Notes));
 
    //Calling display Note function:   
    displayNote();
   
}

//It is displayNote function :responsible to display notes :
const displayNote = () => {
  
    // It checks whether Notes key present on localStorage Object or not :
    //If not present , return null:
    //If Present it return  its corresponding value : 
   let  Notes = window.localStorage.getItem('Notes');

   //Convert JSON  Object to Javascript Object & store to Notes:
    Notes = JSON.parse(Notes);

  //create an element string to text variable :  
    let text = "";
  
   //It execute If block instructions if Notes contain null : 
   //Otherwise it execute Else Block :

    if(!Notes)
       text = "<h1>Oops No Notes Found :</h1>";         
    else{
      //It iterates Notes object 
      //for Particular Key and value it use a templete and cancatinate with text variable:  
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
     //onclick = deleteNote(this) :It is  traditional way to handle event : & here this pointing to button element: 
     //deleteNote() function will run automatically whenever user click Delete Note Button :     
   }
}   
 //It selects Object (element having class value : row) and assign text to its inner Html :
 document.querySelector('.row').innerHTML = text;
} 
//Calling Display note function :
displayNote();
