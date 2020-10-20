const text = document.querySelector(".fancy");
const strText = text.textContent;
const splitText = strText.split("");
text.textContent= "";

for (let i = 0; i < splitText.length; i++)
{
    let char = (splitText[i] === " ") ? "&nbsp;" : splitText[i];
    text.innerHTML += "<span>" + char + "</span>";
}

let char = 0;
let timer = setInterval(onTick, 50);

function onTick (){
  const span = text.querySelectorAll('span')[char];
  span.classList.add('fade');
  char++
  if(char === splitText.length) {
    complete();
    return;
  }
}

function complete () {
  clearInterval(timer);
  timer = null;
}

const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

