var ProductNameInput = document.getElementById('ProductName');
var ProductImgInput = document.getElementById('ProductImg');
var ProductPriceInput =document.getElementById('ProductPrice');
var ProductCategoryInput =document.getElementById('ProductCategory');
var ProductDescInput =document.getElementById('ProductDesc');

var addBtn=document.getElementById('addBtn');
var updateBtn=document.getElementById('updateBtn');

var mainIndex = 0;
var ProductContainer=[];

if(localStorage.getItem('product')!=null){
    ProductContainer=JSON.parse(localStorage.getItem('product'));
    displayProduct(ProductContainer);
}



function addProduct(){
    if(validateProduct(regexName , ProductNameInput.value)== true  && validateProduct(regexPrice ,ProductPriceInput.value)==true){
        var product ={
            name:ProductNameInput.value,
            img:ProductImgInput.value,
            price:ProductPriceInput.value,
            Category:ProductCategoryInput.value,
            Desc:ProductDescInput.value
        }


        console.log(ProductContainer)

        ProductContainer.push(product);


        update();
    
        ClearForm();
    
    }
    else{
        swal({
            title: "wrong validation ",
            text: "Product name or price is not valid!",
            button: "ok",
        });
        // alert("Product name or price is not valid ")
    }





}

function ClearForm(){
    ProductNameInput.value="";
    ProductImgInput.value="",
    ProductPriceInput.value="";
    ProductCategoryInput.value="";
    ProductDescInput.value="";
}

function displayProduct(arr){
    var Cartoona='';
    for(var i=0;i<arr.length;i++){
        Cartoona+=`    
        <tr>
            <td class="td-cell">${arr[i].name}</td>
            <td class="td-cell"><img src="${displayImg(arr[i].img)}" class="product-img"  alt=""></td>
            <td class="td-cell">${arr[i].price}</td>
            <td class="td-cell">${arr[i].Category}</td>
            <td class="td-cell">${arr[i].Desc}</td>
            <td class="td-cell"><button class="btn btn-outline-warning btn-sm" onclick="setFormUpdate(${i})">Update</button></td>
            <td class="td-cell"><button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${i})">Delete</button></td>       
        </tr>`
    }

    document.getElementById('TableBody').innerHTML=Cartoona;
}

function deleteProduct(ProductIndex){
    ProductContainer.splice(ProductIndex,1);
    update()
}

function searchProduct(term){
    var matchProduct=[];
    for(var i=0; i<ProductContainer.length ; i++){

        if(ProductContainer[i].name.toLowerCase().includes(term.toLowerCase())===true){
            matchProduct.push(ProductContainer[i]);
        }
        
    }
    displayProduct(matchProduct);
    
}

function setFormUpdate(ProductIndex){
    mainIndex=ProductIndex;
    addBtn.classList.replace('d-block','d-none');
    updateBtn.classList.replace('d-none', 'd-block');
    ProductNameInput.value=ProductContainer[ProductIndex].name;
    ProductPriceInput.value=ProductContainer[ProductIndex].price;
    ProductCategoryInput.value=ProductContainer[ProductIndex].Category;
    ProductDescInput.value=ProductContainer[ProductIndex].Desc;
}

function setFormAdd(){
    updateBtn.classList.replace('d-block', 'd-none');

    addBtn.classList.replace('d-none','d-block');

}

function UpdateProduct(){
    if(validateProduct(regexName , ProductNameInput.value)== true  && validateProduct(regexPrice ,ProductPriceInput.value)==true){
        var product ={
            name:ProductNameInput.value,
            img:ProductImgInput.value,
            price:ProductPriceInput.value,
            Category:ProductCategoryInput.value,
            Desc:ProductDescInput.value
        }
    
            ProductContainer.splice(mainIndex,1,product)
    
    
    
        ClearForm()
        update()
        setFormAdd()
    }
    else{
        swal({
            title: "wrong validation ",
            text: "Product name or price is not valid!",
            button: "ok",
        });
        // alert("Product name or price is not valid ")
    }


}

function update(){
    displayProduct(ProductContainer);
    localStorage.setItem("product",JSON.stringify(ProductContainer));
}

function  validateProduct( regex,input){
    return regex.test(input);
}

var regexName = /^[A-Z]\w/;
var regexPrice=/^[1-9][0-9]{1,5}$/;

function displayImg(img){
    return "Imges/"+img.slice(12) 
}

