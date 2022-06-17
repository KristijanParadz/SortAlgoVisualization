const select_algo=document.querySelector(".select-algo")
const array_length=document.querySelector(".array-length")
const generate_button=document.querySelector(".generate")
let array_elemenata
const divovi = document.querySelector(".array")

generate_button.addEventListener("click",()=>{
    divovi.replaceChildren()
    array_elemenata=[]
    for(let i = 0; i<array_length.value;i++){
        let div = document.createElement('div')
        div.innerText=generateRandom()
        div.classList.add("broj")
        div.style.height=`${div.innerText*2.2}px`
        div.style.position="relative"
        divovi.appendChild(div)
        array_elemenata.push({
            elem: div,
            moved: false,
            broj: div.innerText
        })
    }
    
    if (select_algo.options[select_algo.selectedIndex].innerText==="Insertion Sort"){
        array_of_animations=insertionSort(array_elemenata)
        animateInsertion(array_of_animations)
    }

    else if (select_algo.options[select_algo.selectedIndex].innerText==="Bubble Sort"){
        array_of_animations=bubbleSort(array_elemenata)
        animateBubble(array_of_animations)
    }
    else if (select_algo.options[select_algo.selectedIndex].innerText==="Selection Sort"){
        array_of_animations=selectionSort(array_elemenata)
        animateSelection(array_of_animations)
    }

})


function insertionSort(polje_elemenata){
    let animations=[]
    polje_elemenata[0].elem.style.backgroundColor="yellow"
    for (let i = 1;i<polje_elemenata.length;i++){
        let key=polje_elemenata[i]
        animations.push({
            element: key,
            dir : "dolje",
            broj : key.innerText,
        })
        let j=i-1
        
        //if(parseInt(key.elem.innerText)>=parseInt(polje_elemenata[i-1].elem.innerText)) polje_elemenata[i-1].elem.style.backgroundColor="yellow"

        while (j>=0 && parseInt(key.elem.innerText)<parseInt(polje_elemenata[j].elem.innerText)){
            animations.push({
                element: polje_elemenata[j],
                dir : "desno",
                broj : polje_elemenata[j].elem.innerText,
            })

            animations.push({
                element: key,
                dir : "lijevo",
                broj : key.innerText,
            })
            polje_elemenata[j+1]=polje_elemenata[j]
            j-=1
            
        }
        animations.push({
            element: key,
            dir : "gore",
            broj : key.innerText,
        })
        polje_elemenata[j+1]=key
    }
    /*animations.push({
        element:
    })*/
    return animations
}


function generateRandom(min = 10, max = 99) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}


function animateInsertion(array_of_animations){
    let counter=1000
    let pamti_desno
    let pamti_zuti_desno
    array_of_animations.forEach(animacija=>{
        setTimeout(()=>{
            
            if (pamti_desno!==undefined){
                pamti_desno.style.backgroundColor="rgb(125, 238, 238)"
            }
            if(pamti_zuti_desno!==undefined){
                pamti_zuti_desno.style.backgroundColor="yellow"
            }
            if (animacija.dir==="dolje"){
                animacija.element.elem.style.top=`20rem`
                animacija.element.elem.style.backgroundColor="rgb(229,98,98)"
            }

            else if(animacija.dir==="gore"){
                animacija.element.elem.style.top=`0rem`
                animacija.element.elem.style.backgroundColor="yellow"
            }

            else if (animacija.dir==="desno"){
                if(animacija.element.elem.style.backgroundColor==="yellow") pamti_zuti_desno=animacija.element.elem
                animacija.element.elem.style.backgroundColor="green"
                pamti_desno=animacija.element.elem
                if(animacija.element.moved===false){
                    animacija.element.elem.style.left=`2.7rem` 
                    animacija.element.moved=true
                }
                else{
                    let broj_u_rem=parseFloat(animacija.element.elem.style.left)
                    broj_u_rem+=2.7
                    animacija.element.elem.style.left=`${broj_u_rem}rem`
                }
            }

            else{
                if(animacija.element.moved===false){
                    animacija.element.elem.style.left=`-2.7rem` 
                    animacija.element.moved=true
                }
                else{
                    let broj_u_rem=parseFloat(animacija.element.elem.style.left)
                    broj_u_rem-=2.7
                    animacija.element.elem.style.left=`${broj_u_rem}rem`
                }
            }
        },counter)
        counter+=450

    })
}


function bubbleSort(polje_elemenata){
    let animations=[]
    const n=polje_elemenata.length
    for(let i = 0; i<n;i++){
        for(let j = 0; j<n-i-1;j++){
            if (parseInt(polje_elemenata[j].elem.innerText) > parseInt(polje_elemenata[j+1].elem.innerText) ){
                animations.push({
                    element:polje_elemenata[j+1],
                    dir: "dolje"
                })
                animations.push({
                    element:polje_elemenata[j],
                    dir: "desno"
                })
                animations.push({
                    element:polje_elemenata[j+1],
                    dir: "lijevo"
                })
                animations.push({
                    element:polje_elemenata[j+1],
                    dir: "gore"
                })

                let temp=polje_elemenata[j]
                polje_elemenata[j]=polje_elemenata[j+1]
                polje_elemenata[j+1]=temp
            }
            else{
                animations.push({
                    elementi:[polje_elemenata[j+1],polje_elemenata[j]],
                    dir: "no"           
                })

            }
        }
        animations.push({
            element:polje_elemenata[n-i-1],
            dir:"zuto"
        })
    }
    return animations
}

function animateBubble(array_of_animations){
    let counter=1000
    let pamti_desno
    let pamti_lijevo=[]
    array_of_animations.forEach(animacija=>{
        setTimeout(()=>{

            if (pamti_lijevo!==[]){
                pamti_lijevo.forEach(e=>{
                    if(e.elem.style.backgroundColor!=="yellow"){
                        e.elem.style.backgroundColor="rgb(125, 238, 238)"
                    }
                })
            }

            if (pamti_desno!=undefined && pamti_desno.style.backgroundColor!=="yellow"){
                pamti_desno.style.backgroundColor="rgb(125, 238, 238)"
            }
            if (animacija.dir==="dolje"){
                animacija.element.elem.style.top=`20rem`
                animacija.element.elem.style.backgroundColor="rgb(229,98,98)" //rgb(229,98,98)
            }

            else if(animacija.dir==="gore"){
                animacija.element.elem.style.top=`0rem`
                animacija.element.elem.style.backgroundColor="rgb(125, 238, 238)"
            }

            else if (animacija.dir==="desno"){
                animacija.element.elem.style.backgroundColor="green"
                pamti_desno=animacija.element.elem
                if(animacija.element.moved===false){
                    animacija.element.elem.style.left=`2.7rem` 
                    animacija.element.moved=true
                }
                else{
                    let broj_u_rem=parseFloat(animacija.element.elem.style.left)
                    broj_u_rem+=2.7
                    animacija.element.elem.style.left=`${broj_u_rem}rem`
                }
            }

            else if (animacija.dir==="lijevo"){
                if(animacija.element.moved===false){
                    animacija.element.elem.style.left=`-2.7rem` 
                    animacija.element.moved=true
                }
                else{
                    let broj_u_rem=parseFloat(animacija.element.elem.style.left)
                    broj_u_rem-=2.7
                    animacija.element.elem.style.left=`${broj_u_rem}rem`
                }
            }

            else if (animacija.dir==="zuto"){
                animacija.element.elem.style.backgroundColor="yellow"
            }
            else{
                pamti_lijevo=[]
                animacija.elementi.forEach(e=>{
                    e.elem.style.backgroundColor="green"
                    pamti_lijevo.push(e)
                })
            }

        },counter )
        counter+=450 

    })
}

function selectionSort(polje_elemenata){
    let animations=[]
    let min_ind
    for (let i = 0;i<polje_elemenata.length;i++){
        min_ind=i
        animations.push({
            element: polje_elemenata[i],
            dir: "red"
        })
        for (let j=i+1;j<polje_elemenata.length;j++){
            animations.push({
                element: polje_elemenata[j],
                dir: "green"
            })
            if (parseInt(polje_elemenata[min_ind].elem.innerText) > parseInt(polje_elemenata[j].elem.innerText)){
                min_ind=j
                animations.push({
                    element: polje_elemenata[min_ind],
                    dir: "red"
                })
            }
        }
        animations.push({
            element:polje_elemenata[min_ind],
            dir: "dolje",
        })

        if(min_ind-i!==0){
            animations.push({
                element:polje_elemenata[min_ind],
                dir: "lijevo",
                broj_koliko_puta: min_ind-i
            })
        }

        animations.push({
            element:polje_elemenata[i],
            dir: "dolje",
        })
        
        if(min_ind-i!==0){
            animations.push({
                element:polje_elemenata[i],
                dir: "desno",
                broj_koliko_puta: min_ind-i
            })
        }

        animations.push({
            element:polje_elemenata[min_ind],
            dir: "gore",
        })

        animations.push({
            element:polje_elemenata[i],
            dir: "gore",
        })

        let temp=polje_elemenata[i]
        polje_elemenata[i]=polje_elemenata[min_ind]
        polje_elemenata[min_ind]=temp
        animations.push({
            element: polje_elemenata[i],
            dir: "yellow"
        })
    }
    return animations
}

function animateSelection(array_of_animations){
    let pamti_crveni
    let posljednji
    let counter=1000
    array_of_animations.forEach(animacija=>{
        setTimeout(()=>{

            if (posljednji!==undefined && posljednji.style.backgroundColor!=="red" && posljednji.style.backgroundColor!=="yellow"){
                posljednji.style.backgroundColor="rgb(125, 238, 238)"
            }
            
            if (animacija.dir==="dolje"){
                animacija.element.elem.style.top=`20rem`
            }

            else if(animacija.dir==="gore"){
                animacija.element.elem.style.top=`0rem`
            }

            else if (animacija.dir==="desno"){
                if(animacija.element.moved===false){
                    animacija.element.elem.style.left=`${animacija.broj_koliko_puta*2.7}rem` 
                    animacija.element.moved=true
                }
                else{
                    let broj_u_rem=parseFloat(animacija.element.elem.style.left)
                    broj_u_rem+=animacija.broj_koliko_puta*2.7
                    animacija.element.elem.style.left=`${broj_u_rem}rem`
                }
            }

            else if (animacija.dir==="lijevo"){
                if(animacija.element.moved===false){                    
                    animacija.element.elem.style.left=`-${animacija.broj_koliko_puta*2.7}rem` 
                    animacija.element.moved=true
                }
                else{
                    let broj_u_rem=parseFloat(animacija.element.elem.style.left)
                    broj_u_rem-=animacija.broj_koliko_puta*2.7
                    animacija.element.elem.style.left=`${broj_u_rem}rem`
                }
            }

            else if (animacija.dir==="green"){
                animacija.element.elem.style.backgroundColor="green"
                posljednji=animacija.element.elem
            }

            else if (animacija.dir==="red"){
                animacija.element.elem.style.backgroundColor="red"
                if (pamti_crveni!== undefined && pamti_crveni!==animacija.element.elem && pamti_crveni.style.backgroundColor!=="yellow"){
                    pamti_crveni.style.backgroundColor="rgb(125, 238, 238)"
                }
                pamti_crveni=animacija.element.elem
            }

            else if (animacija.dir==="yellow"){
                animacija.element.elem.style.backgroundColor="yellow"
            }

        },counter)
        counter+=450

    })
}