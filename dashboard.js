
var auname=document.getElementById("auname");
var aename=document.getElementById("aename");
var apname=document.getElementById("apname");
var acpname=document.getElementById("acname");
var adminbtn=document.getElementById("adminbtn");
var admin=document.getElementById("admin");
var addadmin=document.getElementById("addadmin");
var admin_table1=document.getElementById("admin_table1");
var logoutbutton = document.getElementById("logout");
var myname = document.getElementById("myname");
var save = document.getElementById("Save");



 logoutbutton.addEventListener("click",function(event){


    storecurrentuser(null);
    window.location.href="login.html";

  });
currentuser=getsessionStorage();
if(currentuser==null){
window.location.href="login.html";
}

var Admins=[];


function getStoredAdmins()
{
if (!localStorage.Admins)
{
localStorage.Admins = JSON.stringify([]);
}
return JSON.parse(localStorage.Admins);
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
function storeAdmins(Admins)
{
localStorage.Admins = JSON.stringify(Admins);
}

var Admins=getStoredAdmins();








admin.addEventListener("click", function(event){

addadmin.setAttribute("style","display:block");
admin_table.setAttribute("style","display:block");

});

adminbtn.addEventListener("click", function(event){

var ausername=auname.value;

var aemailname=aename.value;
var apassname=apname.value;
var acpassname=acpname.value;





if(ausername==""||aemailname==""||apassname==""||acpassname=="")
						{
							alert("Enter all data");
						}
						
						if(emailchecker(aemailname)){

      alert("Email is not in valid format!");

  }else if(!passcpass(apassname,acpassname)){

      alert("Password and Confirm Password should Match!");

  }else if(emailpresentcheck(aemailname)){
    alert("Email already Exist... Try Again with different Email");
  }
  else{

					
					//var adob=document.getElementById("adob").value;
					//var agender=document.getElementById("agender").value;

					

							var myadmin=new adminn(ausername,aemailname,apassname);
						
							
							
							Admins.push(myadmin);
					
							insertIntoTable(myadmin);
							console.log(Admins);
							storeAdmins(Admins);


  }




	});	


function emailchecker(email){

      if(email==""){
        return 0;
      }
      var at = email.indexOf("@");
      var dot = email.indexOf(".");
      if(at<0){
        return 0;
      }
      if(dot<0){
        return 0;
      }

      if(dot-at<2){
        return 0;
      }

}
function emailpresentcheck(email){ //1 = email already exist

  for(var i=0;i<Admins.length;i++){
    if(Admins[i].email==email && Admins[i].status==1){
    	//console.log("hi ww");
      return 1;
    }
  }

  return 0;

}

function passcpass(pass,cpass){

  if(pass=="" || cpass==""){
    return 0;
  }
  if(pass==cpass){
    return 1;
  }else{
    return 0;
  }

}


function adminn(name,email,pass)
{

	this.name=name;
	this.email=email;
	this.pass=pass;
	this.status=1;
	this.createdBy=1;

	
}
showTable();
function showTable(){
	var admin_table1=document.getElementById('admin_table1');

	while(admin_table1.childNodes.length>2)
	{
		
		admin_table1.removeChild(admin_table1.childNodes[2]);
	}


for(var i=0;i<Admins.length;i++)
	{
		if(Admins[i].status==1)
		insertIntoTable(Admins[i]);
		
	}}



	

function insertIntoTable(myadmin){
	                        var tr =document.createElement('tr');
							

							td=document.createElement('td');
							td.textContent=myadmin.name;
							tr.appendChild(td);

							td=document.createElement('td');
							td.textContent=myadmin.email;
							tr.appendChild(td);

							td=document.createElement('td');
							td.textContent=myadmin.pass;
							tr.appendChild(td);


							

						

							td=document.createElement('td');
							td.innerHTML+="<button class=\"edittable\">&#8496</button>";

							tr.appendChild(td);

							td=document.createElement('td');
							td.innerHTML+="<button class=\"deletetable\">&#215;</button>";
							tr.appendChild(td);
admin_table1.appendChild(tr);


var deleteButtontable = tr.querySelector('.deletetable');



				deleteButtontable.addEventListener('click',function(event) 
							   {

							   	var mytr=event.target.parentNode.parentNode;
								 var email=mytr.childNodes[1].innerHTML;
								 var index=findIndex(email);
								 console.log(index);
								 Admins[index].status=0;
								 //Admins.splice(index,1);
								 showTable();
								 storeAdmins(Admins);
								 
							   }
					 );
				var editButtontable = tr.querySelector('.edittable');



				editButtontable.addEventListener('click',function(event) 
							   {
							    adminbtn.setAttribute("style","display:none");
							   	save.setAttribute("style","display:block");
							   	var mytr=event.target.parentNode.parentNode;
								 var email=mytr.childNodes[1].textContent;
								 var index=findIndex(email);
								 console.log(index);

                               auname.value=Admins[index].name;
                               aename.value=Admins[index].email;
                               apname.value=Admins[index].pass;
                             	aename.setAttribute('style','display:none');
								 
								 
							   }
					 );
  save.addEventListener('click',function(event){


							   	var mytr=event.target.parentNode;
								 var email=mytr.childNodes[5].value;
								 var index=findIndex(email);
								// console.log(mytr.childNodes[5]);

                           Admins[index].name=auname.value;
                              // Admins[index].email=aename.value;
                              Admins[index].pass =apname.value;
                               storeAdmins(Admins);
						showTable();
							
							
						






                               });
 



}				
function findIndex(email){
	for(var j=0;j<Admins.length;j++)
	{

		if(email==Admins[j].email)
		{
			return j;
		}
	}
				}

		