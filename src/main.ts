const inputConta: HTMLInputElement = document.querySelector("#inputConta")
const inputValue: HTMLInputElement = document.querySelector("#inputValue")
const normalButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll("button")
const eventValues = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

let expression: string[] = []
let screenValue: string[] = []

function clickKeys(ev) {
  ev.preventDefault()
  const value = ev.target.dataset.value
  const valueExp = ev.target.dataset.exp
  if(value === "C") {
    clearAll()
  } else if(value === "CE") {
    deleteOne()
  } else if(value === "=") {
    calculate()
  } else if(value === "!") {
    settingVAlues(value, valueExp)
    factorial()
  } else {
    settingVAlues(value, valueExp)
  }
}

function eventKeys(ev) {
  ev.preventDefault()

  if(eventValues.includes(ev.key)) {
    settingVAlues(ev.key)
  }
  if(ev.key === "Backspace") {
    deleteOne()
  }
  if(ev.key === "Enter" || ev.key === "=") {
    calculate()
  }
  if(ev.key === "C") {
    clearAll()
  }
}

function settingVAlues(value: string, valueExp?: string) {
  expression.push(valueExp ?? value)
  screenValue.push(value)
  inputValue.value = screenValue.join("")
}

function clearAll() {
  inputConta.value = ""
  inputValue.value = ""
  screenValue = []
  expression = []
  inputValue.focus()
}

function deleteOne() {
  if(inputValue.value !== "") {
    screenValue.pop()
    expression.pop()
    inputValue.value = screenValue.join("")
  }
  inputValue.focus()
}

function calculate() {
  inputConta.value = "ERROR"
  let result = eval(expression.join(""))
  verifyErrors(result)
}

function verifyErrors(result: string) {
  if(!Number.isNaN(result) && !(result === undefined) && !(Number(result) === Infinity)) {
    inputConta.value = inputValue.value
    inputValue.value = result
    endSetup(result)
  }
}

function calcFactorial(a: number){
  if(a===0){
      return 1;
  }
  return (a * calcFactorial(a-1))
}

function factorial() {
  inputConta.value = "ERROR"

  const result = eval(calcFactorial(eval(expression.join(""))))
  verifyErrors(result)
}

function endSetup(result: string) {
  screenValue = []
  expression = []
  screenValue.push(result)
  expression.push(result)
 
  expression = Array.from(String(expression[0]))
  screenValue = Array.from(String(screenValue[0]))
}

normalButtons.forEach(element => element.addEventListener("click", clickKeys))
inputValue.addEventListener("keydown", eventKeys)
document.addEventListener("DOMContentLoaded", () => inputValue.focus())