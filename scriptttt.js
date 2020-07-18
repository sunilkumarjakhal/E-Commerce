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

function storeProducts(products)
{
localStorage.products = JSON.stringify(products);
}

var products=getStoredProducts();



var button=document.getElementById("my");

button.addEventListener('click',function(event)
		{
			showMe();
		});

function showMe()
		{

					hide(button);
					var input_div=createInputBox();

					var save = input_data.querySelector('.save');
					save.addEventListener('click',function(event)
						{
							saveNewData();

						});
		};
		function createInputBox()
{
			deleteInputBox();

			var input_data=document.getElementById("input_data");
			unhide(input_data);
			var p;
			var input;

			p=document.createElement('p');
			p.textContent="Product Name";
			input_data.appendChild(p);

			p=document.createElement('p');
			input=document.createElement('input');
			input.setAttribute('type',"text");
			input.setAttribute('id',"pname");
			p.appendChild(input);
			input_data.appendChild(p);

			p=document.createElement('p');
			p.textContent="Product Price";
			input_data.appendChild(p);

			p=document.createElement('p');
			input=document.createElement('input');
			input.setAttribute('type',"number");
			input.setAttribute('id',"price");
			p.appendChild(input);
			input_data.appendChild(p);

			p=document.createElement('p');
			p.textContent="Description";
			input_data.appendChild(p);

			p=document.createElement('p');
			input=document.createElement('textarea');
			input.setAttribute('rows',"3");
			input.setAttribute('cols',"18");
			input.setAttribute('id',"desc");
			p.appendChild(input);
			input_data.appendChild(p);

			p=document.createElement('p');
			p.textContent="Quantity";
			input_data.appendChild(p);

			p=document.createElement('p');
			input=document.createElement('input');
			input.setAttribute('type',"number");
			input.setAttribute('id',"Quantity");
			p.appendChild(input);
			input_data.appendChild(p);
			

			p=document.createElement('p');
			input=document.createElement('input');
			input.setAttribute('type',"button");
			input.setAttribute('class','save');
			input.setAttribute('id',"save");
			input.setAttribute('value',"Save");
			p.appendChild(input);
			input_data.appendChild(p);

return input_data;
}
var productId=1;
if(products.length>0)
{
	productId=products[products.length-1].id+1;
}

function show_in_table()
{	

	var table=document.getElementById('table');

	while(table.childNodes.length>2)
	{
		
		table.removeChild(table.childNodes[2]);
	}

	for(var i=0;i<products.length;i++)
	{
		if(products[i].status==1)
		insertIntoList(products[i]);
		
	}
	if(table.childNodes.length>2)
	{
		unhide(table);
	}
	else
	{
		hide(table);
	}
}

show_in_table();

function product(name,price,desc,qnty)
{
	this.id=productId;
	this.name=name;
	this.price=price;
	this.desc=desc;
	this.qnty=qnty;
	this.status=1;
	this.createdBy=1;
	productId++;
}

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



var refresh=document.getElementById("refresh");

refresh.addEventListener('click',function(event)
		{
			show_in_table();
		});


function hide(target)
{
	target.setAttribute('style','display:none');
}


function unhide(target)
{
	target.setAttribute('style','display:block');
}



function deleteInputBox()
{
	var input_data=document.getElementById("input_data");

	input_data.innerHTML = "";
}
function saveNewData(myproduct)
{

					var name=document.getElementById("pname").value;
					var price=document.getElementById("price").value;
					var desc=document.getElementById("desc").value;
					var qnty=document.getElementById("Quantity").value;

						if(name==""||price==""||desc==""||qnty=="")
						{
							alert("Enter all data");
						}
						else
						{

							var myproduct=new product(name,price,desc,qnty);
							var table=document.getElementById('table');
							unhide(table);
							
							products.push(myproduct);
					
							insertIntoList(myproduct);
							
							storeProducts(products);

						var input_data=document.getElementById("input_data");
						unhide(button);
						hide(input_data);
						deleteInputBox();
						}
}

function insertIntoList(myproduct)
{

							var tr =document.createElement('tr');
							var td=document.createElement('td');

							td=document.createElement('td');
							td.textContent=myproduct.id;
							hide(td);
							tr.appendChild(td);

							td=document.createElement('td');
							td.textContent=myproduct.name;
							tr.appendChild(td);

							td=document.createElement('td');
							td.textContent=myproduct.price;
							tr.appendChild(td);

							td=document.createElement('td');
							td.textContent=myproduct.desc;
							tr.appendChild(td);

							td=document.createElement('td');
							td.textContent=myproduct.qnty;
							tr.appendChild(td);

						

							td=document.createElement('td');
							td.innerHTML+="<button class=\"edittable\">&#8496</button>";

							tr.appendChild(td);

							td=document.createElement('td');
							td.innerHTML+="<button class=\"deletetable\">&#215;</button>";
							tr.appendChild(td);


							var table=document.getElementById('table');
							

							table.appendChild(tr);

							var edittable=tr.querySelector('.edittable');

							edittable.addEventListener('click', function(event) 
						   {
						   		var mytr=event.target.parentNode.parentNode;
						   		
							  	event.preventDefault();
							  		
								hide(button);
				
								var input_div=createInputBox();

							var index=findIndex(mytr.childNodes[0].textContent);

							document.getElementById("pname").value=products[index].name;
							document.getElementById("price").value=products[index].price;
							document.getElementById("desc").value=products[index].desc;
							document.getElementById("Quantity").value=products[index].qnty;
								

							var save = input_data.querySelector('.save');
								save.addEventListener('click',function(event)
								{
									saveEditData(mytr.childNodes[0].textContent);

								});
							  	


							}
							);

				var deleteButtontable = tr.querySelector('.deletetable');


				deleteButtontable.addEventListener('click',function(event) 
							   {
							   	var mytr=event.target.parentNode.parentNode;
								 if(mytr.parentNode.childElementCount===2)
								 {
								 	hide(mytr.parentNode);
								 }
								 var index=findIndex(mytr.childNodes[0].textContent);
								 //products.splice(index,1);
								 products[index].status=0;
								 show_in_table();
								 storeProducts(products);
							   }
					 );

}

function saveEditData(id){

					var name=document.getElementById("pname").value;
					var price=document.getElementById("price").value;
					var desc=document.getElementById("desc").value;
					var qnty=document.getElementById("Quantity").value;

						if(name==""||price==""||desc==""||qnty=="")
						{
							alert("Enter all data");
						}
						else
						{


							var table=document.getElementById('table');
							unhide(table);


						var index=findIndex(id);

						products[index].name=name;
						products[index].price=price;
						products[index].desc =desc;
						products[index].qnty=qnty;

						show_in_table();
						storeProducts(products);

						var input_data=document.getElementById("input_data");
						unhide(button);
						hide(input_data);
						deleteInputBox();
						

					}
				}
		/*		var studentAttendenceList = document.getElementById("studentAttendenceList");
				var StudentCount=products.length;
		
		var i;
		for(i=0;i<StudentCount;i++){

tr=document.createElement('tr');
		td=document.createElement('td');
							td.textContent=products[i].name;
							tr.appendChild(td);

td=document.createElement('td');
							td.textContent=products[i].price;
							tr.appendChild(td);

			td=document.createElement('td');
			input=document.createElement('input');
			input.setAttribute('type',"radio");
			input.setAttribute('name',products[i].id);
			td.appendChild(input);
			tr.appendChild(td);
			td=document.createElement('td');
			input=document.createElement('input');
			input.setAttribute('type',"radio");
			input.setAttribute('name',products[i].id);
			td.appendChild(input);
			tr.appendChild(td);
studentAttendenceList.appendChild(tr);
			


		}*/