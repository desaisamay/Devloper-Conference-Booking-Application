angular.module('myApp', [])
.controller('myCtrl', ['$scope', function($scope) {
$scope.count = 0;
$scope.myFunc = function() {
$scope.count++;
};
$scope.homepage = true;
$scope.showorganiser = false;
$scope.guest = false;
$scope.project = {};
$scope.locations=[];
$scope.locations = ['Bangalore','Mumbai','Delhi'];
$scope.project.location = "";
$scope.project.topic = "";
$scope.project.time = "";
$scope.project.seat = "";
$scope.format = function(){
localStorage.clear();
alert("all the data has been cleared.")
}
$scope.showhomepage = function(){
$scope.homepage = true;
$scope.showorganiser = false;
$scope.showguest = false;
}
$scope.bookSeats = function(){
if((typeof $scope.project.numberOfSeatsToBook) != "number" || $scope.project.numberOfSeatsToBook == "0")
{
alert("Number of seats feild is invalid")
}
else{
$scope.cal = $scope.data[$scope.project.guesttitle][$scope.project.guesttitle2][$scope.project.guesttitle3] - $scope.project.numberOfSeatsToBook;
if($scope.cal > 0)
{
$scope.data[$scope.project.guesttitle][$scope.project.guesttitle2][$scope.project.guesttitle3] = $scope.cal; 
localStorage.setItem("OrganiserData", JSON.stringify($scope.data)); 
$scope.project.availableSeats = $scope.data[$scope.project.guesttitle][$scope.project.guesttitle2][$scope.project.guesttitle3];
alert("Your " + $scope.project.numberOfSeatsToBook + " seats are booked. You are left with " + $scope. cal + " seats.");
$scope.project.numberOfSeatsToBook = "";
}
else{
alert("You do not have sufficient number of seats to book.")
}
}
}
$scope.calculateSeat =function(){
$scope.data = JSON.parse(localStorage.getItem("OrganiserData"));
$scope.project.availableSeats = "";
$scope.project.numberOfSeatsToBook = "";
$scope.project.availableSeats = $scope.data[$scope.project.guesttitle][$scope.project.guesttitle2][$scope.project.guesttitle3]
}
$scope.organiserFunction = function() {
$scope.homepage = false;
$scope.showorganiser = true;
$scope.showguest = false;
};
$scope.guestFunction = function(){
$scope.data = JSON.parse(localStorage.getItem("OrganiserData"));
if($scope.data == undefined || $scope.data == null)
{
alert("There is no data present. Please add the data by clicking on Organiser. ")
}
else{
$scope.homepage = false;
$scope.showorganiser = false;
$scope.showguest = true;
}
};
//     $scope.guestFunction = function(){
//   $scope.homepage = false;
//       $scope.showorganiser = false;
//       $scope.showguest = true;
// $scope.data = JSON.parse(localStorage.getItem("OrganiserData"));
//     };
$scope.submitOrganiserForm = function(){
if($scope.project.location == "" || $scope.project.time == "" || $scope.project.seat == "" || $scope.project.topic == "")    {
alert("All feilds are mandatory. Please fill all the feilds");
}else{ 
$scope.data = JSON.parse(localStorage.getItem("OrganiserData"));
$scope.dontrepeat = "";
if($scope.data != null && $scope.data != undefined){
if($scope.data[$scope.project.location] != undefined){
if($scope.data[$scope.project.location][$scope.project.topic] != undefined){
if($scope.data[$scope.project.location][$scope.project.topic][$scope.project.time] != undefined){
$scope.dontrepeat = "yes";
alert("Same Time Slot in the same Topic in the same Location already exists in the database.");
return
}else{
$scope.testdata = {
[$scope.project.time] : $scope.project.seat
};
$scope.data[$scope.project.location][$scope.project.topic][$scope.project.time] = $scope.project.seat ;
localStorage.setItem("OrganiserData", JSON.stringify($scope.data));       //set1   
if($scope.dontrepeat != "yes"){
alert("All the data has been added. It will now appear in the Guest window. Please check.");
}       
return                                       ;
// localStorage.getItem("OrganiserData")[$scope.location][$scope.topic].push($scope.organiserData);
}
}else{
$scope.organiserData = {
[$scope.project.time] : 
$scope.project.seat
}
}
$scope.data[$scope.project.location][$scope.project.topic] = $scope.organiserData ;
localStorage.setItem("OrganiserData", JSON.stringify($scope.data));  //set2
if($scope.dontrepeat != "yes"){
alert("All the data has been added. It will now appear in the Guest window. Please check.");
}
return  
}
else{
$scope.organiserData = 
{
[$scope.project.topic ]: {
[$scope.project.time ]: 
$scope.project.seat 
}
}
;
$scope.data[$scope.project.location] = $scope.organiserData ;
localStorage.setItem("OrganiserData", JSON.stringify($scope.data));  //set3
if($scope.dontrepeat != "yes"){
alert("All the data has been added. It will now appear in the Guest window. Please check.");
}
return
}
}else{
$scope.organiserData = 
{[$scope.project.location] : {
[$scope.project.topic] : {
[$scope.project.time] : 
$scope.project.seat
}
}
}
;
localStorage.setItem("OrganiserData", JSON.stringify($scope.organiserData));  //set4
if($scope.dontrepeat != "yes"){
alert("All the data has been added. It will now appear in the Guest window. Please check.");
}
return
}
if($scope.dontrepeat != "yes"){
alert("All the data has been added. It will now appear in the Guest window. Please check.");
}
}
}
}]);
