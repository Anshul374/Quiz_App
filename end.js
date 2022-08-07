let inputVal=document.getElementById("inputVal");
let saveBtn=document.getElementById("saveBtn");
let playAgainBtn=document.getElementById("playAgainBtn");
let homeBtn=document.getElementById("homeBtn");
let endScore = document.querySelector(".endScore");

let mostRecentScore=localStorage.getItem('mostRecentScore');
let str3=`<h2>Score</h2>
         <h1>${mostRecentScore}</h1>`
endScore.innerHTML=str3;
inputVal.addEventListener("keyup",()=>{
    saveBtn.disabled=!inputVal.value;
    // console.log(inputVal.value)

})
// localStorage.setItem("HighScores",JSON.stringify(array));
let highscore=localStorage.getItem("highscore");
if(highscore==null){
    array=[];
}
else{
    array=JSON.parse(highscore)
}
saveBtn.addEventListener("click",()=>{
    // saveBtn.classList.add("saveBtnBorder");
    let details={
        name:inputVal.value,
        score:mostRecentScore
    };
    // console.log(details)
    array.push(details);
    array.sort((a,b)=>{
        return b.score - a.score
    })
    array.splice(3);
    localStorage.setItem("highscore", JSON.stringify(array));
})

