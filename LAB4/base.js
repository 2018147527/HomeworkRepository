


var first_product_list;
fetch('product.json')
    .then(function(response){
         return response.json();
    }).then(function(json){                  
        first_product_list = json;
        first(first_product_list);
    })
var pnum = 0;
var firstflag = true;
var isExecuted = false;


function first(product_list){
    const category = document.querySelector('#category');
    const searchTerm = document.querySelector('#searchTerm');
    const searchBtn = document.querySelector('button');
    const total =product_list.length;
    let categoryGroup = [];
    let finalGroup = [];
    finalGroup = product_list;
    updateDisplay();



window.onscroll = infiniteScroll;
searchBtn.onclick = selectCategory;

function infiniteScroll(){
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isExecuted){
        isExecuted = true;
        if(finalGroup.length>6 && firstflag){
            for(let i = 0; i < first_product_list.length; i++) {
                Storing(first_product_list[i]);
            }
            if(pnum == 3){
                firstflag = false;
            }
            pnum = pnum + 1
        }
        setTimeout(() => {
            isExecuted = false;
        }, 1000);
    }
}


function selectCategory(e){
    e.preventDefault();
    categoryGroup = [];
    finalGroup = [];
    if(category.value === 'All') {
        categoryGroup = product_list;
        pnum = 0;
        firstflag = true;
    }
    else{
        let lowerCaseType = category.value.toLowerCase();
        for(let i = 0; i < total ; i++){
            if(product_list[i].type == lowerCaseType){
                categoryGroup.push(product_list[i]);
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
        document.getElementById("k").removeChild(document.getElementById("k").firstChild);
    }
    if(finalGroup.length == 0){
        var para = document.createElement('div');
        para.textContent = "해당 검색 결과가 없습니다.";
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

    
    heading.textContent = product.name;
    pp.textContent = product.price +"원";
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



