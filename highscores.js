let ordered_list=document.querySelector(".ordered_list");
let highscore=JSON.parse(localStorage.getItem("highscore"));
console.log(highscore);
let string='';
highscore.forEach((element) => {
    console.log(element.name); 
    string +=`<li>${element.name}-${element.score}</li>`
    ordered_list.innerHTML=string; 
});