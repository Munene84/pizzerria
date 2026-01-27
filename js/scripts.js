var total=0;
var sizeTotal=0;
var crustTotal=0;
var toppingsTotal=0;
var deliveryTotal=0;
var newTotal;
var tp1="",tp2="",tp3="",tp4="";
var delivery;
var orderLocation

/*business logic*/

//pizza constructor
function Pizza(size,crust,number,delivery,orderLocation,tp1,tp2,tp3,tp4){
    this.size=size;
    this.crust=crust;
    this.number=number;
    this.delivery=delivery;
    this.orderLocation=orderLocation;
    this.tp1=tp1;
    this.tp2=tp2;
    this.tp3=tp3;
    this.tp4=tp4;
}

//prototype
Pizza.prototype.order=function(){
    return ("Number of pizzas: "+this.number+"\n\n"+"Pizza size: "+this.size+" = "+sizeTotal+"\n\nCrust type: "+this.crust+" = "+crustTotal+"\n\n"+"Toppings: "+this.tp1+" "+this.tp2+" "+
    this.tp3+" "+this.tp4+" = "+toppingsTotal+"\n\n"+"Delivery: "+this.delivery+" = "+deliveryTotal);
}

// size function
function sizeCheckout(size,number){
    //switch statement for pizza size //small=200 medium=400 large=600
    switch (size){
        case ("Small"):
            sizeTotal=sizeTotal+200;
            break;
        case ("Medium"):
            sizeTotal=sizeTotal+400;
            break;
        case ("Large"):
            sizeTotal=sizeTotal+600;
            break;
    }
    
    sizeTotal=sizeTotal*number
    
    
}

//crust function
function crustCheckout(crust,number){
    //switch statement for pizza crust //crispy=50 stuffed=70 glutencrispy=90 gluttenstuffed=110 
    switch (crust){
        case ("Crispy"):
            crustTotal=crustTotal+50;
            break;
        case ("Stuffed"):
            crustTotal=crustTotal+70;
            break;
        case ("Gluten Free Crispy"):
            crustTotal=crustTotal+90;
            break;
        case ("Gluten Free Stuffed"):
            crustTotal=crustTotal+110;
            break;        
    }

    crustTotal=crustTotal*number
}

//toppings function
function toppingsCheckout(size,tp1,tp2,tp3,tp4,number){
    //switch statement for pizza topping //bbqchicken=90,110,130 bbqbeef=70,90,110 vegetarian=50,70,99 shrimp=100,120,140 
    if (size==="Small"){
        if(tp1==="BBQ Chicken"){
            toppingsTotal=toppingsTotal+90;
        }
        if(tp2==="BBQ Beef"){
            toppingsTotal=toppingsTotal+70;
        }
        if(tp3==="Vegetarian"){
            toppingsTotal=toppingsTotal+50;
        }
        if(tp4==="Shrimp"){
            toppingsTotal=toppingsTotal+100;
        }
    }
    else if (size==="Medium"){
        if(tp1==="BBQ Chicken"){
            toppingsTotal=toppingsTotal+110;
        }
        if(tp2==="BBQ Beef"){
            toppingsTotal=toppingsTotal+90;
        }
        if(tp3==="Vegetarian"){
            toppingsTotal=toppingsTotal+70;
        }
        if(tp4==="Shrimp"){
            toppingsTotal=toppingsTotal+120;
        }
    }
    else if(size==="Large"){
        if(tp1==="BBQ Chicken"){
            toppingsTotal=toppingsTotal+130;
        }
        if(tp2==="BBQ Beef"){
            toppingsTotal=toppingsTotal+110;
        }
        if(tp3==="Vegetarian"){
            toppingsTotal=toppingsTotal+90;
        }
        if(tp4==="Shrimp"){
            toppingsTotal=toppingsTotal+140;
        }
    }
    else{alert("please select all boxes")}

    toppingsTotal=toppingsTotal*number
}

//delivery function

function deliveryCheckout(delivery){
    if (delivery==="Yes"){
        deliveryTotal=deliveryTotal+50
    }
    else{
        deliveryTotal=0
    }
}

//calculate total function

function Checkout(sizeTotal,crustTotal,toppingsTotal,deliveryTotal){

    total=sizeTotal+crustTotal+toppingsTotal+deliveryTotal;    
            
}

/*user logic*/

$(document).ready(function(){
    //delivery 

    $("#Yes").click(function(){
        $(".hide-delivery").show();
        alert("Delivery will cost you 50 shillings");
        delivery=this.value;
        

    });
    $("#No").click(function(){
        $(".hide-delivery").hide();
        delivery=this.value;
        
    });

    // location
    $('#locationbtn').click(function() {
        orderLocation=$("#location").val();
        if (delivery==="Yes"){
            alert(" Your order will be delivered to "+orderLocation+ " once you checkout"); 
        }
        
    });
    //checkbox for toppings
   
    
    $("#tp1").click(function(){
        if($(this).prop("checked") == true){
            tp1=this.value;
             
        }
        else if($(this).prop("checked") == false){
            tp1=""
        }
       
    });  
    
    $("#tp2").click(function(){
        if($(this).prop("checked") == true){
            tp2=this.value;
            
        }
        else if($(this).prop("checked") == false){
            tp2="";
        }
        
    });
    $("#tp3").click(function(){
        if($(this).prop("checked") == true){
            tp3=this.value;
            
        }
        else if($(this).prop("checked") == false){
            tp3="";
        }
        
    });  
    
    $("#tp4").click(function(){
        if($(this).prop("checked") == true){
            tp4=this.value;
            
        }
        else if($(this).prop("checked") == false){
            tp4="";
        }
        
    });
    //form section
    
    $("form#myForm").submit(function(event){
        event.preventDefault();
        var size=$("#size").val();
        var crust=$("#crust").val();
        
        var myNumber=$("#noOfPizzas").val();
        var number=parseInt(myNumber);
        
        var t1=$("#tp1").prop("checked");
        var t2=$("#tp2").prop("checked");
        var t3=$("#tp3").prop("checked");
        var t4=$("#tp4").prop("checked");
        if(t1==false&&t2==false&&t3==false&&t4==false){
            alert("Choose atleast one topping");
            return;
        }
        
        
        var newPizza=new Pizza(size,crust,number,delivery,orderLocation,tp1,tp2,tp3,tp4); 
        
        sizeCheckout(size,number);
        crustCheckout(crust,number);
        toppingsCheckout(size,tp1,tp2,tp3,tp4,number);
        deliveryCheckout(delivery);
        Checkout(sizeTotal,crustTotal,toppingsTotal,deliveryTotal);
        $(".pizza-form").hide();
        $(".hide-order").show();
        $(".hide-delivery").hide();
        $(".order").text(newPizza.order())
        $(".ordertotal").text(total);
        $("#myForm").trigger("reset");

        var button = document.getElementById("mpesaButton");

if (button !== null) {
    document.head.insertAdjacentHTML('beforeend', '<link rel=stylesheet href="https://cdn.jsdelivr.net/gh/muaad/mpesa_button@master/styles/style.css">');
    img = '<img style="width: 35px; display: inline; margin: -8px;" src= "https://cdn.jsdelivr.net/gh/muaad/mpesa_button@master/images/mpesa.png">'
    btnMarkup = '<a href="" id="mpesaBtn" class="mpesaButton">' + img + '<span style="margin-left: 15px;">Pay with Mpesa</span></a>'
    phoneInstruction = '<strong><em>We will send an Mpesa payment request to this phone number</em></stron>'
    form = '<form>\
        <label for="amount" class="mpesaLabel">Amount</label><input class="mpesaInput" type="text" placeholder="2000" name="phone" id="mpesaAmount"></input><br>\
        <label for="phone" class="mpesaLabel">Phone Number</label><input class="mpesaInput" type="text" placeholder="254722123456" name="phone" id="mpesaPhoneNumber"></input><br>' + phoneInstruction + '<br><br><button href="" id="mpesaSend" class="mpesaButton" style="width: 100%;">' + img + '<span style="margin-left: 15px;">Pay</span></button></form>'
    formMarkup = '<div id="mpesaForm"><h3 class="mpesaHeader">Pay With Mpesa</h3>' + form + '</div>'
    button.innerHTML = btnMarkup

    success = '<div style="text-align: center;" class="animate-bottom">\
      <h2>√ Success</h2>\
      <p>An Mpesa payment request will be sent to your phone shortly</p>\
    </div>'

    button.addEventListener('click', function (e) {
        e.preventDefault();
        formDiv = document.createElement('div')
        button.parentNode.insertBefore(formDiv, button.nextSibling);
        formDiv.innerHTML = formMarkup
        amountInput = document.getElementById("mpesaAmount")
        phoneInput = document.getElementById("mpesaPhoneNumber")
        phone = button.getAttribute('data-phone')
        amount = button.getAttribute('data-amount')
        url = button.getAttribute('data-url')
        amountInput.value = amount
        phoneInput.value = phone
        button.style.display = 'none';

        payButton = document.getElementById("mpesaSend")
        loaderDiv = document.createElement('div')
        loaderDiv.setAttribute("id", "loader");
        payButton.parentNode.insertBefore(loaderDiv, payButton.nextSibling);
        loader = document.getElementById("loader")
        loader.style.display = "none";
        loader.style.margin = '-75px 0 0 -110px';

        payButton.addEventListener('click', function (evt) {
            evt.preventDefault();
            payButton.disabled = true;
            document.getElementById('mpesaPhoneNumber').disabled = true;
            formDiv = document.getElementById('mpesaForm')
            if (url !== undefined) {
                var xhttp = new XMLHttpRequest();
                xhttp.open("POST", url, true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send('phone=' + phoneInput.value + '&amount=' + amountInput.value);
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        formDiv.innerHTML = success
                    }
                    else {
                        formDiv.innerHTML = 'Something went wrong. Contact website developer. Error: "We could not POST to the URL specified!"'
                    }
                };
            } else {
                setTimeout(function () {
                    formDiv.innerHTML = 'Something went wrong. Contact website developer. Error: "No URL specified!"'
                }, 3000); 
            }
            loader.style.display = "";
        })
    })
}

        

        

     
