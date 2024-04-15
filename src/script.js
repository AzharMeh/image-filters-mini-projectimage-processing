// Make globel variable of Image and canvas to access them in all fuctions
var image = null;
var currImage = null;
var borderdImg = null;
var canvas = document.getElementById("can1");

//Function to check if Image is uploaded and return boolean value
function checkImage(){
  if(image == null || !image.complete()) { return false;}
  return true;}

// Create a function to Upload the selected file on canvas and assign it to global variable image and currImage
function imgUpload(){
  var input = document.getElementById("finput"); 
  // Create new image object using SimpleIamge library available in dukelearntoprogram package
  image = new SimpleImage(input);  
  image.drawTo(canvas);
  currImage = new SimpleImage(input);
}

// Create function Grayscale
function grayscale(){
  if(checkImage()==false){
    alert("Please upload image or wait for somtime...!"); }
  
  var img = new SimpleImage(image);  
  // Iterate over each Pixel in img 
  for(var Pixel of img.values())  {
  // Calculate the sum of RGB value of each Pixel
    var sum = Pixel.getRed() + Pixel.getGreen() +
        Pixel.getBlue();
  // Count The average and set the RGB value of Pixel to average
    var avg = sum/3;
    Pixel.setRed(avg);
    Pixel.setGreen(avg);
    Pixel.setBlue(avg);    
  }
// Call Cleanscr function to clean the canvas and  Print the Output(img) on canvas   
    cleanscr();
    img.drawTo(canvas);
  //Set the currImage to img
  currImage = img;
}
// Create function makeRed which will be called by Make Red button
function makeRed(){
  if(checkImage()==false){
    alert("Please upload image or wait for somtime...!");
  }
// Create new copy of image object using SimpleIamge library available in dukelearntoprogram package
var img = new SimpleImage(image);
 // Iterate over each Pixel in img
  for(var Pixel of img.values()){
//Check if Pixel's red value is smaller then the sum of Blue and Green value
    if(Pixel.getRed() < Pixel.getBlue() + Pixel.getGreen()){
  // Set the sum to red
      Pixel.setRed(Pixel.getBlue() + Pixel.getGreen());
    }
  }
// Call Cleanscr function to clean the canvas and  Print the Output(img) on canvas 
  cleanscr();
    img.drawTo(canvas);
  currImage = img;
} 
// Create function makeShades which will be called by Shades button
function makeShades(){
  if(checkImage()==false){
    alert("Please upload image or wait for somtime...!");
  }
// Make copy of image
var img = new SimpleImage(image);
//Get the width and height of image
 var width = img.getWidth();     
var height = img.getHeight(); 
//Iterate over each Pixel of img
  for(var Pixel of img.values()){
// Get the X and Y position of img
    var x = Pixel.getX();
    var y = Pixel.getY();
// Make Strips of different shades of red and blue using conditionals on x and y positions 
   if(x >= y+(height/4)){
       Pixel.setRed(Pixel.getRed()+Pixel.getGreen());
       Pixel.setBlue(Pixel.getGreen());
   }
    if(x < y+(height/4) && x + (width/2) >= y+(height/4) ){
       Pixel.setRed(Pixel.getBlue()+Pixel.getGreen());
       Pixel.setBlue(Pixel.getGreen()+20);
   }
   if(x + (width/2) < y+(height/4) && x + width >= y+(height/4)  ){
       Pixel.setRed(Pixel.getBlue()+Pixel.getGreen());
       Pixel.setBlue(Pixel.getGreen()+40);
       
   }
 if( x+ width < y+(height/4)  ){
       Pixel.setRed(Pixel.getBlue()+Pixel.getGreen());
       Pixel.setBlue(Pixel.getGreen()+80);       
   }    
  }
  cleanscr();
    img.drawTo(canvas);
  currImage = img;
}


function addBorder(thickness){
  if(checkImage()==false){
    alert("Please upload image or wait for somtime...!");    
  }
  
  //main code
    var img = new SimpleImage(currImage);
    var pix = null;
  if(isNumeric(thickness)){
    for(var px of img.values()){
        if ( px.getY() < thickness || px.getY() >= img.getHeight()-thickness ){
             pix = setBlack(px);
            img.setPixel(px.getX(),px.getY(),pix);
        }
        if(px.getX() < thickness || px.getX() >= img.getWidth() - thickness){
              pix = setBlack(px);
            img.setPixel(px.getX(),px.getY(),pix);
        }
    }
   cleanscr();    
    img.drawTo(canvas);    
       borderdImg = img;
  }  
}

function setBlack(pixel){
 pixel.setRed(0);
 pixel.setBlue(0);
 pixel.setGreen(0);
    return pixel;
}


// Create a clearscr function to clear the canvas
function cleanscr(){
  //Get 2d context of canvas to drawing shapes, text, images, and other objects.
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
}
//Create a function to rest the iamge on canvas and shows the original one
function reset(){
  cleanscr();
  if(image !==null){
  image.drawTo(canvas);
  }   
}

function allClear(){
  cleanscr();
  var file = document.getElementById("finput");
  file.value=null;
  var border = document.getElementById("border");
  border.value="0";
  var rborder = document.getElementById("rBox");
  rborder.value="0";
  image = null;
}
function isNumeric (value) {
  // standard JavaScript function to determine whether a string is an illegal number (Not-a-Number)
  return !isNaN(value);
}

function download(){
  var outputImage = null;
  if(borderdImg != null){
   outputImage = borderdImg;
  }
  else{
  outputImage = currImage;
  }
  if(outputImage === null){
    return null;
  }
const canvas = outputImage.canvas;
const dataUrl = canvas.toDataURL('image/jpeg');

const anchor = document.createElement('a');
anchor.download = 'output-image.jpg';
anchor.href = dataUrl;

anchor.style.display = 'none';
document.body.appendChild(anchor);
anchor.click();
document.body.removeChild(anchor);
  borderdImg=null;
}