



fetch('product.json')
    .then(function(response){
         return response.json();
    }).then(function(json){                  
        let product_list = json;
        first(product_list);
    })


function first(product_list){
    const category = document.querySelector('#category');
    const searchTerm = document.querySelector('#searchTerm');
    const searchBtn = document.querySelector('button');
//const main = document.querySelector('aside');
    var pnum = 0;
    const total =product_list.length;
    var categoryGroup = [];
    var finalGroup = [];
    finalGroup = product_list
    updateDisplay();
    finalGroup = [];


window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight)
        {  }
}

searchBtn.onclick = selectCategory;

function selectCategory(e){
    e.preventDefault();
    categoryGroup = [];
    finalGroup = [];
    if(category.value === 'All') {
        categoryGroup = product_list;
    }
    else{
        let lowerCaseType = category.value.toLowerCase();
        for(let i = 0; i < total ; i++){
            if(product_list[i].type == lowerCaseType){
                categoryGroup.push(k[i]);
            }
        }
    }
    selectProducts();
}

function selectProducts(){
    if(searchTerm.value.trim() === '') {
        finalGroup = categoryGroup;
    } else {
      let lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
      for(let i = 0; i < categoryGroup.length ; i++) {
        if(categoryGroup[i].name.indexOf(lowerCaseSearchTerm) !== -1) {
           finalGroup.push(categoryGroup[i]);        
            }
        }
    }
    updateDisplay();
}

function updateDisplay(){
    while(document.getElementById("k").firstChild){
        document.getElementById("k").removeChild(document.getElementById("k").firstChild)
    }
    if(finalGroup.length == 0){
        var para = document.createElement('div');
        para.textContent = "No result";
        document.getElementById("k").appendChild(para);
    }
    else{
        for(let i = 0; i < finalGroup.length; i++) {
            Storing(finalGroup[i]);
        }
    }
}

function Storing(product_list){
    let url = './' + product_list.image;
    fetch(url).then(function(response) {
        return response.blob();
    }).then(function(blob) {
        let objectURL = URL.createObjectURL(blob);
        showProduct(objectURL, product_list);
    });

}

function showProduct(objectURL, product) {
    
    const divs = document.createElement('div');
    const heading = document.createElement('h2');
    const pp = document.createElement('p');
    const image = document.createElement('img');
    const button = document.createElement('btn');
    button.textContent= "자세히";

    
    divs.setAttribute('class', product.type);

    
    heading.textContent = product.name
    pp.textContent = product.price +"원"
    image.src = objectURL;
    image.alt = product.name;

   
    document.getElementById("k").appendChild(divs);
    function moreinfo() {
        divs.appendChild(heading);
        divs.appendChild(pp);
    }
    divs.appendChild(image);
    divs.appendChild(button);
    button.onclick = moreinfo;
}



}

