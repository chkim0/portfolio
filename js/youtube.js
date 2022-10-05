
// key =  AIzaSyBFLAU4DL_bNMTCPBWvqtiTwRwd24rWKgU
// playlist = PLBVGGbELl6gjHDweDXqZMtC71J6ldWUcT


const vidlist = document.querySelector(".vidList");
const key = "AIzaSyBFLAU4DL_bNMTCPBWvqtiTwRwd24rWKgU";
const playList = "PLBVGGbELl6gjHDweDXqZMtC71J6ldWUcT"
const num = 5;

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playList}&maxResults=${num}`;

//fetch = HTTP 파이프라인을 구성하는 요청과 응답 등의 요소를 JavaScript에서 접근하고 조작할 수 있는 인터페이스를 제공
fetch(url)
  .then((data) => {
    return data.json();
  })
  .then(json => {
    let items = json.items;
    console.log(items);

    let result = '';


    items.map((item) => {

      let title = item.snippet.title;
      let titleLength = title.length;


      if (title.length > 30) {
        title = title.substr(0, 30) + "...";
      }

      let con = item.snippet.description;
      
      if (con.length > 100) {
        con = con.substr(0, 100) + "...";
      }


      let date = item.snippet.publishedAt;
        date = date.split("T")[0];
      

      result += `


      <article>
        <a href="${item.snippet.resourceId.videoId}" class="pic">
          <img src="${item.snippet.thumbnails.medium.url}">
        </a>
        <div class="con">
          <h2>${title}</h2>
          <p>${con}</p>
          <span>${date}</span>
        </div>
      </article>

      `
    });
    vidlist.innerHTML = result;
  });

  vidlist.addEventListener("click",(e)=>{
    e.preventDefault();
    
    if(!e.target.closest("a")) return;

    const vidId = e.target.closest("a").getAttribute("href");

    let pop = document.createElement("figure");
    pop.classList.add("pop");

    pop.innerHTML = `<iframe src="https://www.youtube.com/embed/${vidId}" 
    frameborder="0" width="100%" height="100%" allowfullscreen>
    이브라우저는 iframe을 지원하지 않습니다</iframe>
    <span class="btnClose">close</span>
    `;
    vidlist.append(pop);
  });
  vidlist.addEventListener("click",(e)=>{
    const pop = vidlist.querySelector(".pop");
    if(pop){
      console.log("123");
      const close = pop.querySelector('span');
      if(e.target == close) pop.remove();
    }
  }); 