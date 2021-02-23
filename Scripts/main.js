const newsCont = document.getElementById('news-container');
const templateSource = document.getElementById('news-template').innerHTML;
const template = Handlebars.compile(templateSource);
const searchForm = document.querySelector('.search');
searchForm.addEventListener("submit", getQuery);
function getQuery(event) {
    event.preventDefault();
    let topic = document.getElementById('query').value;
    let url = 'http://localhost:3000/search/?query=' + topic;
    fetchNews(url);
}
async function fetchNews(url) {
    let response = await fetch(url);
    if(response.ok){
        let json=await response.json();
        document.getElementById('news-container').innerHTML = template(json);
    }
    else{
        console.log("ERROR");
    }
}
