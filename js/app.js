'use strict';

var hourShop = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];
var locationCity = ['Seattle','Tokyo','Dubai','paris','lima'];
var minhourShop = [23,3,11,20,2];
var maxhourshop = [65,24,38,38,16];
var avgshop = [6.3,1.2,3.7,2.3,4.6]


function Location(name , minshop, maxshop,avg){
  this.name = name;
  this.minshop = minshop;
  this.maxshop = maxshop;
  this.avg = avg;
  this.customerPerHour= [];
  this.cookiesPerHour = [];


  Location.prototype.allShopLocation.push(this);
}

Location.prototype.allShopLocation = [];


Location.prototype.calculateCustomerPerHour = function(){
    for(var i=0; i < hourShop.length ; i++){
      this.customerPerHour.push(Math.floor(Math.random()*(this.maxshop - this.minshop +1)+ this.minshop));
    }
  };

Location.prototype.calculateCookiesPerHour = function(){
  for(var i=0; i < hourShop.length ; i++){
    this.cookiesPerHour.push(Math.floor(this.customerPerHour[i] * this.avg ));
  }
}

for(var i=0; i < locationCity.length; i++){
  new Location(locationCity[i], minhourShop[i],maxhourshop[i],avgshop[i]);
  Location.prototype.allShopLocation[i].calculateCustomerPerHour();
  Location.prototype.allShopLocation[i].calculateCookiesPerHour();
}


console.log(Location.prototype.allShopLocation);


var table_div;
function creatContent(){
var main_content = document.getElementById('main_content');
table_div = document.createElement('div');
table_div.id = 'table_div';
main_content.appendChild(table_div);

var table = document.createElement('table');
table.id = 'table';
table_div.appendChild(table);
}

creatContent();



function headRowTable(){

var headRow = document.createElement('tr');
headRow.id = 'headRow';
table.appendChild(headRow);

var firstHead = document.createElement('th');
firstHead.textContent = ' ';
headRow.appendChild(firstHead);

for(var i =0; i<hourShop.length ;i++){
 
var hourshopHead = document.createElement('th');
hourshopHead.textContent = hourShop[i];
headRow.appendChild(hourshopHead);
}

var totalRow = document.createElement('th');
totalRow.textContent = 'total';
headRow.appendChild(totalRow);

}

headRowTable();



function render(){

for(var j=0 ; j< Location.prototype.allShopLocation.length ; j++){
  var sumRow = 0;
  var shopRow = document.createElement('tr');
  shopRow.className = 'shopRow'
  table.appendChild(shopRow);
  var shopName = document.createElement('td');
  shopName.textContent = Location.prototype.allShopLocation[j].name ;
  shopRow.appendChild(shopName);

  for(var i=0 ; i<hourShop.length ; i++){
    var cookies = document.createElement('td');
    cookies.textContent = Location.prototype.allShopLocation[j].cookiesPerHour[i];
    sumRow = sumRow + Location.prototype.allShopLocation[j].cookiesPerHour[i];
    shopRow.appendChild(cookies);
  }

  var totalDataRow = document.createElement('td');
  totalDataRow.textContent = sumRow;
  shopRow.appendChild(totalDataRow);
}

}

render();


// total 
function totalFun(){
var allTotal=0;
var totalDataV = document.createElement('tr');
totalDataV.id= 'totalDataDiv';
table.appendChild(totalDataV);;
var totalv;
var totalhour;

var lastTotal = document.createElement('td');
lastTotal.textContent='Total';
totalDataV.appendChild(lastTotal);

for( var i=0 ; i<hourShop.length ;i++){
   totalv = 0;

  for(var j=0; j<Location.prototype.allShopLocation.length;j++){
    totalv = totalv + Location.prototype.allShopLocation[j].cookiesPerHour[i];
    if(j === Location.prototype.allShopLocation.length-1){
      totalhour = document.createElement('td');
      totalhour.textContent= totalv ;
      totalDataV.appendChild(totalhour);
    }
  }
  allTotal=allTotal+totalv;
}

  var allTotalData = document.createElement('td');
  allTotalData.textContent= allTotal;
  totalDataV.appendChild(allTotalData);
}

totalFun();


var newLocation= document.getElementById('formLocation');

newLocation.addEventListener('submit',locationSubmitter);

function locationSubmitter(event){
    event.preventDefault();
  
    var storeLocationName = event.target.storeLocationName.value;
    var minCust = event.target.minCust.value;
    var maxCust = event.target.maxCust.value;
    var average = event.target.average.value;
  
    if(storeLocationName === '' || minCust === '' || maxCust === '' || average === '' || minCust===maxCust || minCust>maxCust|| average<=0 || minCust<0 || maxCust<1 ){
  
      alert('enter valid data');
    } else{
  
    var nLocation = new Location(storeLocationName,minCust,maxCust,average);
    nLocation.calculateCustomerPerHour();
    nLocation.calculateCookiesPerHour();
  
    table_div.textContent= '';
    creatContent();
    headRowTable();
    render();
    totalFun();
    }
  }
  
  