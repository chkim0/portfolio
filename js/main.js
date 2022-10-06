const brand = document.querySelector("#brand");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const ul = brand.querySelector("swiper-wrap");
const lis = ul.querySelectorAll("swiper");

let len = lis.length;

let enableClick = true;

init();
 
next.addEventListener("click",(e)=>{
    e.preventDefault();

    if(enableClick){
        enableClick = false;
         nextSlide();
         console.log(enableClick);
    }
   
})

prev.addEventListener("click",(e)=>{
    e.preventDefault();
    if(enableClick){
        enableClick = false;
        prevSlide();
    }
    
})

function init(){
    ul.style.left = "-100%"; 
    ul.prepend(ul.lastElementChild); 
    ul.style.width = `${100 * len}%`; 
    lis.forEach((el)=>{
        el.style.width = `${100 / len}%`; 
    })
}

function nextSlide(){
    new Anim(ul,{
        prop : "left",
        value : "-200%",
        duration : 1000,
        callback : ()=>{
            ul.style.left = "-100%";
            ul.append(ul.firstElementChild);
            enableClick = true; //모션이 끝나고 enableClilk을 true로 변경
        }
    })
}

function prevSlide(){
    new Anim(swrap,{
        prop : 'left',
        value : "0%",
        duration : 1000,
        callback : ()=>{
            ul.style.left = "-100%";
            ul.prepend(ul.lastElementChild);
            enableClick = true;
        }
    })
}