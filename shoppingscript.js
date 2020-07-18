var logoutbutton = document.getElementById("logout");

 logoutbutton.addEventListener("click",function(event){


    storecurrentuser(null);
    window.location.href="login.html";

  });
 currentuser=getsessionStorage();
if(currentuser==null){
window.location.href="login.html";
}
function storecurrentuser(currentuser)
{
sessionStorage.currentuser = JSON.stringify(currentuser);
}



function getsessionStorage()
{
if (!sessionStorage.currentuser)
{
sessionStorage.currentuser = JSON.stringify(null);
}
return JSON.parse(sessionStorage.currentuser);
}

var currentuser=getsessionStorage();

myname.textContent=currentuser.name;








function getStoredProducts()
{
if (!localStorage.products)
{
localStorage.products = JSON.stringify([]);
}
return JSON.parse(localStorage.products);
}
var val=getStoredProducts();
var Cart=getStoredCart();



function storeProducts(products)
{
localStorage.products = JSON.stringify(products);
}


function getStoredCart()
{
if (!localStorage.Cart)
{
localStorage.Cart = JSON.stringify([]);
}
return JSON.parse(localStorage.Cart);
}





function storeCart(Cart)
{
localStorage.Cart = JSON.stringify(Cart);
}








var list1=document.getElementById("list1");

creatList();


function UserProduct(product,myprice,myquantity)
{

	this.product=product;
	this.myprice=myprice;
	this.myquantity=myquantity;
	
}


function hide(target)
{
	target.setAttribute('style','display:none');
}


function unhide(target)
{
	target.setAttribute('style','display:block');
}



function creatList(){
	list1.textContent="";
    
	for(var i=0;i<val.length;i++){
		
if(val[i].status==1){
		var li	=createelement(val[i]);


//var i;
//=createelement(val[i]);
var adcart=li.querySelector('#adcart');



   adcart.addEventListener('click',function (event){
    	CreateCart();

});

	}}

}




function createelement(element1)
{    

	
	var li=document.createElement('li');

	var div1=document.createElement('div');
	

	lable7=	document.createElement('label');
	lable7.textContent=element1.id;
	lable7.setAttribute('id','id');
	lable7.setAttribute('style','display:none');
	div1.appendChild(lable7);





	var lable1=document.createElement('label');
	lable1.textContent="Product Name :"+element1.name;
	lable1.setAttribute('id','myname');
	div1.appendChild(lable1);

    var br=document.createElement('br');
   div1.appendChild(br);

	var lable8=document.createElement('label');
	lable8.textContent="Product Price :";
	lable8.setAttribute('id','pprice');
	div1.appendChild(lable8);
	var lable2=document.createElement('label');
	lable2.textContent=element1.price;
	lable2.setAttribute('id','myprice');
	div1.appendChild(lable2);

    var br=document.createElement('br');
    div1.appendChild(br);
	var lable3=document.createElement('label');
	lable3.textContent="Product Desc :"+element1.desc;
	div1.appendChild(lable3);

    var br=document.createElement('br');
     div1.appendChild(br);
	var lable4=document.createElement('label');
	lable4.textContent="Available Quantity :"+element1.qnty;
	lable4.setAttribute('min','0');
	lable4.setAttribute('id','myavail');
	div1.appendChild(lable4);

    var br=document.createElement('br');
    div1.appendChild(br);
var lable5=document.createElement('label');
	lable5.textContent="Required Quantity :";
	lable5.setAttribute('id','myquanti');
	div1.appendChild(lable5);
	li.appendChild(div1);
	var rqnt=document.createElement('input');
	rqnt.setAttribute("type","number");
				rqnt.setAttribute("min","1");
			rqnt.setAttribute("max",element1.qnty);
			//rqnt.setAttribute("value",'1');
			rqnt.setAttribute("width","5px");
			rqnt.setAttribute('id','myquantity');
	//rqnt.setAttribute("id","reqqnt");
	
	
	div1.appendChild(rqnt);
    li.appendChild(div1)
    var br=document.createElement('br');
    div1.appendChild(br);

    

    var adcrt=document.createElement('input');
	adcrt.setAttribute("type","button");
	adcrt.setAttribute("id","adcart");
	adcrt.setAttribute("value","Add to cart");
	div1.appendChild(adcrt);

	var br=document.createElement('br');
    div1.appendChild(br);

	    var br=document.createElement('br');
    div1.appendChild(br);

    li.appendChild(div1)


    list1.appendChild(li);
   return li;
}



function findIndex(myid)
{
	for(var j=0;j<val.length;j++)
	{

		if(myid==val[j].id)
		{
			return j;
		}
	}
}

function CreateCart()
		{
            var item=event.target.parentNode.parentNode.querySelector('#id').textContent;
            var myquantity=event.target.parentNode.parentNode.querySelector('#myquantity').value;
			var myprice=event.target.parentNode.parentNode.querySelector('#myprice').textContent;
            //myprice=myprice.substring(myprice.indexOf('$')+1);
			var index=findIndex(item);
			console.log();
			var selected_product=new UserProduct(val[index],myprice,myquantity);
            addProductCart(selected_product);
		    val[index].qnty=val[index].qnty-myquantity;
			storeProducts(val);
			creatList();
}
function addProductCart(selected_product)
{
	for(var i=0;i<Cart.length;i++)
	{
		if(Cart[i].product.id==selected_product.product.id)
		{
			selected_product.myquantity=parseInt(selected_product.myquantity)+parseInt(Cart[i].myquantity);
			Cart.splice(i,1);
	        break;
		}
	}

	Cart.push(selected_product);
	storeCart(Cart);
}

