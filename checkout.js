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
var CheckOutHeader=[];
var CheckOutDetail=[];

function getStoredCheckOutHeader()
{
if (!localStorage.CheckOutHeader)
{
localStorage.CheckOutHeader = JSON.stringify([]);
}
return JSON.parse(localStorage.CheckOutHeader);
}

function storeCheckOutHeader(CheckOutHeader)
{
localStorage.CheckOutHeader = JSON.stringify(CheckOutHeader);
}

var CheckOutDetail=getStoredCheckOutDetail();
var CheckOutHeader=getStoredCheckOutHeader();
function getStoredCheckOutDetail()
{
if (!localStorage.CheckOutDetail)
{
localStorage.CheckOutDetail = JSON.stringify([]);
}
return JSON.parse(localStorage.CheckOutDetail);
}

function storeCheckOutDetail(CheckOutDetail)
{
localStorage.CheckOutDetail = JSON.stringify(CheckOutDetail);
}



function getStoredProducts()
{
if (!localStorage.products)
{
localStorage.products = JSON.stringify([]);
}
return JSON.parse(localStorage.products);
}
var products=getStoredProducts();
var Cart=getStoredCart();

function storeProducts(products)
{
localStorage.products = JSON.stringify(products);
}



var products=getStoredProducts();
var cart=getStoredCart();




function findIndex(myid)
{
	for(var j=0;j<products.length;j++)
	{

		if(myid==products[j].id)
		{
			return j;
		}
	}
}

function findindexofCart(id)
{
	for(var j=0;j<cart.length;j++)
	{

		if(id==cart[j].product.id)
		{
			return j;
		}
	}

}



function hide(target)
{
	target.setAttribute('style','display:none');
}


function unhide(target)
{
	target.setAttribute('style','display:block');
}


create_table();

function create_table()
{	

	var table=document.getElementById('cTable');
	while(table.childNodes.length>2)
	{
		table.removeChild(table.childNodes[2]);
	}
  
	for(var i=0;i<cart.length;i++)
	{
		if(cart)
		insertIntoTable(cart[i]);
		
	}

	if(table.childNodes.length>2)
	{
		unhide(table);
	}
	else
	{
		hide(table);
	}


	var tr =document.createElement('tr');
	var td=document.createElement('td');

	td.setAttribute('colspan','2');
	td.innerHTML+="<b>TOTAL</b>";
	tr.appendChild(td);

	td=document.createElement('td');
	td.setAttribute('colspan','2');
	var total=0;
	for(var i=0;i<cart.length;i++)
	{
		total+=(parseInt(cart[i].myquantity)*parseInt(cart[i].myprice));
	}
	td.innerHTML+="<b>"+total+"</b>";
	tr.appendChild(td);

	table.appendChild(tr);

}


function insertIntoTable(userProduct)
{
							console.log(userProduct);
							var tr =document.createElement('tr');
							var td=document.createElement('td');

							//td=document.createElement('td');
							td.textContent=userProduct.product.id;
							hide(td);
							tr.appendChild(td);

							td=document.createElement('td');
							td.textContent=userProduct.product.name;
							tr.appendChild(td);


							td=document.createElement('td');
							//input=document.createElement('input');
							//input.setAttribute("type","number");
                            //input.setAttribute("value","userProduct.myquantity;");
						    td.textContent=userProduct.myquantity;
						    //td.appendChild(input);
							tr.appendChild(td);

							td=document.createElement('td');
							td.textContent=userProduct.myprice;
							tr.appendChild(td);


							td=document.createElement('td');
							td.innerHTML+="<button class=\"deletetable\">&#215;</button>";
							tr.appendChild(td);

                            
							var table=document.getElementById('cTable');
							table.appendChild(tr);
							

							

				var deleteButtontable = tr.querySelector('.deletetable');


				deleteButtontable.addEventListener('click',function(event) 
							   {
							   	var mytr=event.target.parentNode.parentNode;
								 if(mytr.parentNode.childElementCount===2)
								 {
								 	hide(mytr.parentNode);
								 }
								 var index=findIndex(parseInt(mytr.childNodes[0].textContent));
								var cartindex=findindexofCart(parseInt(mytr.childNodes[0].textContent));
								
								//console.log(parseInt(mytr.childNodes[0].textContent));
								 products[index].qnty+=parseInt(cart[cartindex].myquantity);
								 cart.splice(cartindex,1);
								
								 storeProducts(products);
								 storeCart(cart);
								 create_table();
							   }
					 );

}


var order_id=1;
if(CheckOutHeader.length>0){
	order_id=CheckOutHeader[CheckOutHeader.length-1].order_id+1;
}
var odid=1;
//if(CheckOutDetail.length>0){
//	odid=CheckOutDetail[CheckOutDetail.length-1].odid+1;
//}



var pay=document.getElementById('pay');
pay.addEventListener("click",function(event){

CreateCheckOutHeader();
Cart=[];
storeCart(Cart);
window.location.href="order.html";
});



function cdetail(name,price,quantity,id)
{
	this.odid=odid;
	this.name=name;
	this.price=price;
	this.quantity=quantity;
	this.order_id=id;
	odid++;
	
}


function CreateCheckOutDetail(i,id)
		{
            
            var name=Cart[i].product.name;
            var price=Cart[i].myprice;
            var quantity=Cart[i].myquantity;

           var detail=new cdetail(name,price,quantity,id);
           CheckOutDetail.push(detail);
           storeCheckOutDetail(CheckOutDetail);

}

function cHeader(total,cart)
{

	this.active=1;
	this.total=total;
	this.date=new Date();
	this.userId=1;
	this.status="not delivered";
	this.order_id=order_id;
	for(var i=0;i<cart.length;i++)
	{
		CreateCheckOutDetail(i,order_id);
	}
	order_id++;
}

function CreateCheckOutHeader()
		{  var total=0;
            for(var i=0;i<Cart.length;i++){
            total=total+((Cart[i].myprice)*(Cart[i].myquantity));
            }
           var header=new cHeader(total,Cart);
           CheckOutHeader.push(header);
           storeCheckOutHeader(CheckOutHeader);

}