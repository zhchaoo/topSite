document.body.style.border = '5px solid red';

function spider() {

    var links = document.links;

    var random = Math.floor(Math.random() * links.length);

    links[random].click();
}

spider();

setInterval(spider, 3000);
