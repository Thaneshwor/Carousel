var VELOCITY = -1;
var container = document.querySelector(".carousel-wrapper");
var images = document.getElementsByClassName('carousel');
var totalImages = images.length;
var currentImage = 0;

var imageWrapper = document.querySelector(".image-wrapper");

var bulletsContainer = document.createElement('div');
bulletsContainer.className = "bullets-container";
var bulletArrays = [];
var activeBackground = "url(img/bullet-active.png)";
var inactiveBackground = "url(img/bullet-inactive.png)"



container.appendChild(bulletsContainer);


var leftClicked = false;
var rightClicked = false;


var moveLeft = true;
var moveRight = false;
	 
var marginLeft = 0;

console.log(images.length);

var counter =  1;

// Function to move images
 function move(){

 	marginLeft =imageWrapper.offsetLeft;
 	imageWrapper.style.marginLeft = marginLeft + VELOCITY+ 'px';

    console.log("currentImage"+ currentImage);

 	if(marginLeft <= -1498 ){
       
 		VELOCITY = 2;
 		moveRight = true;
        moveLeft = false;
        
 	}else if(marginLeft >= -2 ){
      
 		VELOCITY = -2;
        moveRight = false;
        moveLeft = true;

 	}

 	if(marginLeft%500 === 0){

        if(moveLeft){
            currentImage++;
        }else{
            currentImage--;
        }
 		clearInterval(interval);

 		setTimeout(function(){interval = setInterval(move, 1000/600)},1000);
 		

 	}
 	console.log(marginLeft)

 }


// Funciotn to create buttons and bullets
function createButtonsAndOtherFunction(){
	var btnLeft = document.createElement('button');
    var btnRight = document.createElement('button');
    btnLeft.style.position = 'absolute';
    btnRight.style.position = 'absolute';
    btnLeft.innerHTML = '<';
    btnLeft.classList.add("arrow");
    btnRight.classList.add("arrow");
    btnRight.innerHTML = '>';
    btnLeft.style.top = 50 + '%';
    btnLeft.style.left = 0;
    btnRight.style.top = 50 + '%';
    btnRight.style.right = 0;
    container.appendChild(btnLeft);
    container.appendChild(btnRight);
    btnLeft.addEventListener("click", function(){

    	leftClicked = true;
    	if(marginLeft > -1498){
    		for (var i = 0; i < 500; i++) {
    			imageWrapper.style.marginLeft = marginLeft + VELOCITY+ 'px';
    			marginLeft--;
    			if(marginLeft % 500 === 0){
                    currentImage++;
    				break;
                  
    			}
    		}
    	}
         console.log('left clidked');
    	

    });
    btnRight.addEventListener("click", function(){

    	
    	if(marginLeft < -2   ){
    		for (var i = 0; i < 500; i++) {
    			imageWrapper.style.marginLeft = marginLeft + VELOCITY+ 'px';		
    			marginLeft++;
    			if(marginLeft % 500 === 0){
                      currentImage--;
    				break;
    			}
    		}
    	}

        console.log('right clidked');

    });

    function bulletCreate() {
        for(var i = 0; i < totalImages; i++) {
            var bullet = document.createElement('span');
            bulletArrays.push(bullet);
            bullet.onclick = (function(num){
                return function() {
                    //bullets clicked
                    
                    imageWrapper.style = "margin-left: -"+ (num * 500)+"px";
                    currentImage = num;
                    bulletArrays[num].style.backgroundImage = activeBackground;
                  
                }
            })(i);
            bulletsContainer.appendChild(bullet);


        }
    }

    // Function to clear all current bullet 
    var clearBullets = function() {
        for(var i =0; i < bulletArrays.length; i++) {
            bulletArrays[i].style.backgroundImage = inactiveBackground;
        }
    }

    //Function to display which image is in display
    function glowBullet(){
      for(var i =0; i < bulletArrays.length; i++) {
        bulletArrays[i].style.backgroundImage = inactiveBackground;

        }
     bulletArrays[currentImage].style.backgroundImage = activeBackground;
    }

  
    bulletCreate();
    setInterval(glowBullet, 1000);
    
}


var interval = setInterval(move, 1000/600);
createButtonsAndOtherFunction();