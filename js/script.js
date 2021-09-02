
const product = document.getElementById('product');


document.getElementById('search-btn').addEventListener('click', ()=> {

    const searchBookName = document.getElementById('searchInput').value;


document.getElementById('product').innerHTML = "";
document.getElementById('message').textContent = "";

    if (searchBookName !== '') {

        document.getElementById('spinner').style.display = 'block';
         // fetch('http://openlibrary.org/search.json?q=javascript')
fetch(`https://openlibrary.org/search.json?q=${searchBookName}`)

.then(res => res.json())
.then(data => {

    let dataShow = data.docs;
    

if (dataShow.length === 0) {
    document.getElementById('message').textContent = `search not found`;
    document.getElementById('message-show').textContent= `Search value: ${searchBookName}`;
    
}
  
else{

    showDataFunction(dataShow);
    document.getElementById('message').textContent = `Search value:  ${searchBookName}`;
    
    
    const itemArr = dataShow.filter(dataShow => dataShow.cover_i !== undefined && dataShow.first_publish_year !== undefined && dataShow.author_name !== undefined)
    
    document.getElementById('message-show').textContent= `Showing data: ${itemArr.length}`;
    document.getElementById('spinner').style.display = 'none';  
}
})   
}

document.getElementById('searchInput').value = '';
document.getElementById('message-show').textContent='';
  
});

const showDataFunction = (bookData) => {
bookData.forEach(item => {


    if (item.cover_i === undefined || item.first_publish_year === undefined || item.author_name === undefined) {

        }

        else{
            
        const div = document.createElement('div');
        div.classList.add('flex-row');
        div.innerHTML=`

        
        <div class="card" style="width: 18rem;">

        <div class="card__img">

        <img src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg" class="card-img-top" alt="...">
        </div>

        <div class="card-body">
<h5 class="card-title">${item.author_name[0]}</h5>
</div>

   <div>
   <ul class="list-group list-group-flush">
   <li class="list-group-item">Title: ${item.title}</li>
   <li class="list-group-item">Publish: ${item.first_publish_year}</li>
   <li class="list-group-item">Publisher: ${item.publisher[0]}</li>
   </ul>
   </div>  
    </div>
        `
        product.appendChild(div);
        
            }
    })
}

