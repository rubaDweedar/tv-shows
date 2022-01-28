let form=document.querySelector("form");
const list=document.getElementById("list");
let title=document.getElementById("modalLabel");
let modalBody=document.getElementById("modalBody");
let myModal = new bootstrap.Modal(document.getElementById('modal'));
let isSubmitedBefore=false;

function makeModal(img,r){
    img.addEventListener("click",()=>{
        title.innerHTML=r.show.name;
        modalImg.src=r.show.image.original;
        modalLang.innerHTML=r.show.language;
        let genres=""
        for(let i of r.show.genres){
            genres+=i+", ";
        }
        modalGenres.innerHTML=genres;
        modalRate.innerHTML=r.show.rating.average;
        modalSummary.innerHTML=r.show.summary;
        myModal.toggle();
    })
}
function showResult(s){
    form.style.height="50vh";
    list.style.backgroundColor="rgba(0,0,0,.5)";
    for(let r of s){
        if(r.show.image){
            let img = document.createElement("img");
            img.src=r.show.image.medium;
            img.classList.add("col-12","col-sm-3","col-lg-2","mb-4");
            makeModal(img,r);
            list.appendChild(img);
        }
    }
    isSubmitedBefore="true"
}
form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    if(isSubmitedBefore){
        list.innerHTML='';
    }
    let input=form.elements.tvshows.value;
    let shows=await axios.get(`https://api.tvmaze.com/search/shows?q=${input}`)
    showResult(shows.data);
})