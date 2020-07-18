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

var CheckOutHeader = [];
var CheckOutDetail = [];
 CheckOutDetail=getStoredCheckOutDetail();
 CheckOutHeader=getStoredCheckOutHeader();
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






for(var i=0;i<CheckOutHeader.length;i++){

createTable(CheckOutHeader[i]);
}
function createTable(header){

	order_header=document.getElementById("order_header");
	var tr=document.createElement('tr');
	var td=document.createElement('td');
	td.textContent=header.order_id;
	tr.appendChild(td);
	td=document.createElement('td');
	td.textContent=header.userId;
	tr.appendChild(td);
	td=document.createElement('td');
	td.textContent=header.total;
	tr.appendChild(td);
	td=document.createElement('td');
	td.textContent=header.status;
	tr.appendChild(td);
	 td=document.createElement('td');
	td.textContent=header.date;
	tr.appendChild(td);
	order_header.appendChild(tr);


}
for(var i=0;i<CheckOutDetail.length;i++)
{
/*console.log("CheckOutHeader ="+CheckOutHeader[i]);
for(var j=0;j<CheckOutDetail.length;j++)
{
	console.log("CheckOutDetail==="+CheckOutDetail[j]);
	//if(CheckOutHeader[i].oid==CheckOutDetail[j].order_id)
*/		createTable2(CheckOutDetail[i]);
//j=0;
//}


}

function createTable2(detail){

	
	order_detail=document.getElementById("order_detail");
	var tr=document.createElement('tr');
	var td=document.createElement('td');
	td.textContent=detail.odid;
	tr.appendChild(td);
	td=document.createElement('td');
	td.textContent=detail.order_id;
	tr.appendChild(td);
	td=document.createElement('td');
	td.textContent=detail.name;
	tr.appendChild(td);
	td=document.createElement('td');
	td.textContent=detail.price;
	tr.appendChild(td);
	td=document.createElement('td');
	td.textContent=detail.quantity;
	tr.appendChild(td);
	order_detail.appendChild(tr);


}