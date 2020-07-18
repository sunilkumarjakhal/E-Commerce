
function getStoredAdmins()
{
if (!localStorage.Admins)
{
localStorage.Admins = JSON.stringify([]);
}
return JSON.parse(localStorage.Admins);
}

function storeAdmins(Admins)
{
localStorage.Admins = JSON.stringify(Admins);
}
var currentuser=null;
function storeCurrenrUser(currentuser)
{
sessionStorage.currentuser = JSON.stringify(currentuser);
}

var Admins=getStoredAdmins();

var uname=document.getElementById("uname");
var ename=document.getElementById("ename");
var pname=document.getElementById("pname");
var cpname=document.getElementById("cname");
var SignUp=document.getElementById("SignUp");
var lname=document.getElementById("lname");
var lpname=document.getElementById("lpname");
var adminlogin=document.getElementById("adminlogin");
var userlogin=document.getElementById("userlogin");


SignUp.addEventListener("click", function(event){

var username=uname.value;

var emailname=ename.value;
var passname=pname.value;
var cpassname=cpname.value;





if(username==""||emailname==""||passname==""||cpassname=="")
						{
							alert("Enter all data");
						}


						if(!passcpass(passname,cpassname)){
							alert("Enter same password");
						}

		




	});	

function adminn(name,email,pass)
{

  this.name=name;
  this.email=email;
  this.pass=pass;
  this.status=1;
  this.createdBy=1;

  
} 




  /*		
adminlogin.addEventListener("click", function(event){
	var loginname=lname.value;
	var loginpass=lpname.value;
	if(loginname=="sunil" && loginpass=="kumar"){
		window.location.href="file:///D:/Code%20Quotient/javascript/MY/project/2nd%20page/dashboard.html";
	}
	else{
			alert("emailid or password are wrong!!!");
	}

});*/
userlogin.addEventListener("click", function(event){
 if(username.value=="sunil@sunil.sunil" && userpname.value=="sunil"){
  currentuser = new adminn("sunil","sunil@sunil.sunil","sunil");
   storeCurrenrUser(currentuser);
 	window.location="shopping.html";
 }
 else{
 	alert("Invalid Email");
 }

}
);


adminlogin.addEventListener("click", function(event){



	 if(emailchecker(lname.value)==0){

    alert("Invalid Email");

  }else{//email right
      if(validateemailpass(lname.value,lpname.value)>=-1){

        if(validateemailpass(lname.value,lpname.value)==-1){
           currentuser = new adminn("sunil","sunil@sunil.sunil","sunil");
           storeCurrenrUser(currentuser);


          

         

            window.location="dashboard.html";

        }else{

          var i=validateemailpass(lname.value,lpname.value);

           currentuser = new adminn(Admins[i].name,Admins[i].email,Admins[i].pass);
         storeCurrenrUser(currentuser);


         

        

            window.location="dashboard.html";


        }

      }else{

        alert("Email or Password is wrong");

      }}

storeCurrenrUser(currentuser);

});
function validateemailpass(email,pass){

  if(email=="sunil@sunil.sunil" && pass=="sunil"){
    return -1;
  }else{


    for(var i=0;i<Admins.length;i++){
      if(Admins[i].email==email && Admins[i].pass==pass && Admins[i].status!=0 ){
        return i;
      }
    }

    return -2;

  }


}

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
function emailpresentcheck(email){

  for(var i=0;i<Admins.length;i++){
    if(Admins[i].email==email){
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



