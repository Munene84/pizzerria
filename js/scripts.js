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

    });




});