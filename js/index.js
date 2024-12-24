
let categoryMenu = document.getElementById('categoryMenu')
let difficultyOptions = document.getElementById('difficultyOptions')
let questionsNumber = document.getElementById('questionsNumber')
let allQuestions
let quiz

document.getElementById('startQuiz').addEventListener('click', async ()=>{
let categName =categoryMenu.value
let diff =difficultyOptions.value
let nums =questionsNumber.value
    quiz = new Quiz(categName,diff,nums)  
    allQuestions = await quiz.getQuestions()



let quesetion = new Quesetion(0) 
quesetion.display()
document.getElementById("quizOptions").classList.replace("d-block","d-none")
document.getElementById("myData").classList.replace("d-none","d-block")
})


class Quiz {
  constructor (category,difficulty,nums){
    this.categName =category
    this.difficulty =difficulty
    this.quesNums =nums
    this.score = 0
   
    
  }

//هعمل method هترجعلي api  url 
getAPI(){
 return `https://opentdb.com/api.php?amount=${this.quesNums}&category=${this.categName}&difficulty=${this.difficulty}`
}

  
 async getQuestions(){
  let res=await fetch(this.getAPI())
  let  final = await res.json()  
  return final.results  
 }

 displayScore(){                                 
let cartona =` <h2 class="mb-0"> ${this.score == allQuestions.length ? `Congratulations 🤩🥳
                     your score is ${this.score} of ${allQuestions.length}` 
                     : `Opss your score is ${this.score} of ${allQuestions.length} `}
          </h2>
          <button id="tryBtn" class="again btn btn-primary rounded-pill"><i class="bi bi-arrow-repeat"></i> Try Again</button>
        
`
document.getElementById("finish").innerHTML = cartona
document.getElementById("finish").classList.replace("d-none","d-block")
document.getElementById("myData").classList.replace("d-block","d-none")
document.getElementById("tryBtn").addEventListener('click',()=>{
     window.location.reload()

})
 }

}

class Quesetion{
constructor(index) 


{ this.index = index
  this.question = allQuestions[index].question
  this.correct_answer = allQuestions[index].correct_answer
  this.incorrect_answers = allQuestions[index].incorrect_answers
  this.category = allQuestions[index].category
  this.allAnswers = this.getAllAnswers()

  console.log(this.correct_answer);
  this.clickedFlag = false

}


getAllAnswers(){
  let allAnswers =[...this.incorrect_answers, this.correct_answer]
      allAnswers.sort()
      return allAnswers
}
 
display(){
  let cartona =`<div class="w-100 d-flex justify-content-between">
            <span class=" h5 btn-category ">${this.category}</span>
            <span class=" h5 btn-questions "> ${this.index + 1} of ${allQuestions.length}</span>
          </div>
          <h2 class="text-capitalize h4 text-center">${this.question}</h2>
          <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
          ${this.allAnswers.map((ele) => {
             return `<li>${ele}</li>`
            }) .join(" ")}
          </ul>
          <h2 class="text-capitalize text-center score-color w-100 fw-bold "><i class="bi bi-emoji-laughing"></i> Score
            :${quiz.score} </h2> `

            document.getElementById("myData").innerHTML = cartona
   
        let allLi = document.querySelectorAll("#myData ul li")
        
        allLi.forEach((ele)=> {
                ele.addEventListener("click", ()=>{
                this.checkClicked(ele)
          
   }) 
        })
}


checkClicked(li){
  if(!this.clickedFlag){
      this.clickedFlag = true
  if(this.correct_answer == li.innerHTML){ 
    li.classList.add("correct")     
      quiz.score++           
}
   else{  li.classList.add("wrong")}
   this.nextQuestion()
}
}



nextQuestion(){
this.index++
if(this.index<allQuestions.length){
  setTimeout(()=>{
    let quesetion = new Quesetion(this.index)
  quesetion.display()
  },2000)
} 
else{
setTimeout(()=>{
  quiz.displayScore()}
  ,2000)}


}
}

