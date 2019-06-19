var x,deposit1,withdraw,balance2,temp3;
var balance=10000;
var temp1 = 10000;
var attempt = 3;

function validate(){
  if(document.getElementById('t1').value=="1997"){
    alert('LOGIN SUCCESSFUL');
    location.href="dashboard.html"
  }
  else{
    attempt = attempt - 1;
    if(attempt > 0){
       alert('ACCESS DENIED \n \n You have '+attempt+' attempts remaining'); }
    else{
       alert('ACCOUNT BLOCKED \n \n Maximum attempts reached');
       location.href="thankyou.html"
     }
  }
}

function balance1(){
    // document.getElementById('bal').value = balance;

      temp1=localStorage.getItem("withdraw");
      alert('The balance in your account is Rs. '+temp1);

    localStorage.setItem("withdraw",temp1);
}

function withdraw(){
   if(document.getElementById('t2').value % 100 !=0 ){
   alert('Please enter the amount in multiples of 100'); }
   else if(document.getElementById('t2').value > balance-1000){
     alert('Cannot withdraw, \n \n Account balance becomes below minimum balance'); }
   else{
      temp1=localStorage.getItem("withdraw");
     temp2 = temp1 - document.getElementById('t2').value;
     alert('Please collect cash \n \n Current balance is Rs. '+temp2);
     localStorage.setItem("withdraw", temp2);
   }
}
function deposit(){
  deposit1 = document.getElementById('t3').value ;
       temp3 = localStorage.getItem("withdraw");

     console.log(temp3);
    balance2 = Number(temp3) + Number(deposit1);
    alert('Your account balance is Rs. '+Number(balance2));
    localStorage.setItem("withdraw",balance2);
}
