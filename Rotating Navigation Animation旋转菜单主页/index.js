const san = document.querySelector('.san')
const cha = document.querySelector('.cha')
const tools = document.querySelector('.tools')
const box = document.querySelector('.box')

san.addEventListener('click',() => {
    tools.style.transform='rotate(-90deg)'
    box.style.transform='rotate(-25deg)'
})

cha.addEventListener('click',() => {
    tools.style.transform='rotate(0deg)'
    box.style.transform='rotate(0deg)'
})