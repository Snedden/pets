function Pets(){
    
	//api variables
	var apiKey;   //apiKEy
	var baseData; //data after formatted in js object/array literal 
	var apiSecret;//Api secret for security reasons
	
	
	var form;     //form element
	
	var dialogBox; //modal dialog
	
	//select Boxes
	var animal;  //animalInput 
	var breed;    //breed input 
	var age;      //age input
	var gender;   //gender input
	var maxPets  //max Number of pets returned in an single api call 
	
	//Data in select boxes
	var animals;
	var breeds;   //objec literal of fetched breeds for selected animal
	var ages;
	var genders;
	
	//select Boxes IDs
	var animalID;
	var breedID;
	var ageID;
	var genderID;
	var breedListID;
	
	
	//Slide images variables
	var imageListWidth; 		//Width of imageList div
	var screenWidth;            //Width of screen  
	var slideDirection;        //Slide direction of the images 
	var slideSpeed;            //Speed of the slide
	
	
	
	//Local storage variable
	var firstLoad=true;
	
	//Cookie variable
	var username;
	
	
	var descBoxHeight;
	
	function Construct(){
		init();
	}//End of construct()

	
	function init(){
	
		apiKey='f789d56f7c27076c0cc20478a6cc1a51';
		apiSecret='80b43503a72be11d8ca49341f152761c';
		
		form=document.getElementById("petForm");
		dialogBox=document.getElementById("petDialog"); 
		//clearGreeting();
		
		maxPets=50;
		
		screenWidth=screen.width;
		imageListWidth=0;   //no images yet
		
		baseData=[];
		animals=['Please select animal','barnyard','bird','cat','dog','horse','pig','reptile','smallfurry'];
		breeds=[];
		ages=['Any','Baby','Young','Adult','Senior'];
		genders=['Any','Male','Female'];
		
		animalID='animals';
		breedID='breed';
		ageID='age';
		genderID='gender';
		breedListID='breeds';
	
		
		
		if(document.cookie){
			
		    
            var helloUser=document.getElementById('helloUsr');
		    username = document.cookie.split("=");
			helloUser.innerHTML="Hello "+username[1]+"!"; 			
			 
		}
		
		animal=createSelect(animalID,animals);  //Creating first select
		setListener(animal,'change');																								 //Created event listener to tht select	
		
		descBoxHeight=descBoxHeight;
		//call getData if altleast animal i.e first element is stored locally
		if(window.localStorage&&(localStorage.getItem("animal"))){
			
			animal.value=localStorage.getItem("animal");
			
			getBreeds();
			
			
		}
	
	}
	
	function createLocalStorageSelect(){
		if(localStorage.getItem("breed")){
			breed.value=localStorage.getItem("breed");
			age=createSelect(ageID,ages);
			setListener(age,'change');
				
			if(localStorage.getItem("age")){
				age.value=localStorage.getItem("age");
				gender=createSelect(genderID,genders);
				setListener(gender,'change');
					
				if(localStorage.getItem("gender")){
					gender.value=localStorage.getItem("gender");
						
						
				}
			}
		}
		getData();
	}
	

	
	function createSelect(elementID,dataArray){
	
		var optionNode;
		var optionTextnode;
		
		
	     
		var selectEle = document.createElement("select");
		selectEle.setAttribute("id",elementID); 
		form.appendChild(selectEle);	//Append select node
	
	

		for (var i=0;i<dataArray.length;i++){
		    optionNode = document.createElement("option");
		    optionTextnode = document.createTextNode(dataArray[i]);
			optionNode.appendChild(optionTextnode);
			if(i==0){
				optionNode.setAttribute('value',0);
			}
			else{
				optionNode.setAttribute('value',dataArray[i]);
			}
			selectEle.appendChild(optionNode);
			
		}
		form.appendChild(selectEle);   //append options to select node
		
		return selectEle;
	
	}
	
	function setListener(ele,evt){
		
		
		ele.addEventListener(evt,function(){
											firstLoad=false; // to check if to use locally stored variable or not 
											
											
											clearGreeting();
											switch(ele.id){
												case animalID:

													getBreeds();   //creating in different function as breed data is dynamically populated thru 'async' ajax and breed is not a select 
													
													if(window.localStorage){
														localStorage.setItem("animal",ele.value);   //Locally storing which select boxes where already selected
														localStorage.removeItem("breed");
														localStorage.removeItem("age");
														localStorage.removeItem("gender");
													}
													break;
													
												case breedID:
													 removeElement(age);
													 removeElement(gender);
													 age=createSelect(ageID,ages);
													 setListener(age,'change');
													
													if(window.localStorage ){
														localStorage.setItem("breed",ele.value);
														localStorage.removeItem("age");
														localStorage.removeItem("gender");
													 }
													getData();
													 break;
													 
												case ageID:
													
													
										            removeElement(gender);
													
													gender=createSelect(genderID,genders);
													setListener(gender,'change');	
													if(window.localStorage){
														localStorage.setItem("age",ele.value);
														localStorage.removeItem("gender");
													}
													getData();
													break;
													
												case genderID:	
													if(window.localStorage){
														localStorage.setItem("gender",ele.value);
													}
													getData();
												    break
													
												default:
													console.log('ele id does not match ');
											}
											
											
											});
	

	
	
	}


	
	function getBreeds(){
	
	animalValue=animal.value;
		
	
	var URL='http://api.petfinder.com/breed.list?key='+apiKey+'&format=json&animal='+animalValue;
	console.log('breedURL'+URL);
		$.ajax({                    															//Asyn ajax to API
			type: 'get',
			url: URL,
			dataType: 'jsonp',
			success: function(data)																//Callback function
			{
			    
				breeds=data.petfinder.breeds.breed;
				
				
				createBreed(); //calling  here due to asyn behaviour of ajax
				 
				if(firstLoad){
					createLocalStorageSelect();   //calling it here as ajax call is async
				}
			    getData();
				
			},
			error: function( errorThrown)
			{
				console.log("Error making the request:"+errorThrown);
				window.location.href="requestFailed.html";
			}
		});
			
	}
	
	function createBreed(){
	
		
			    var bindTo='breeds';
			
				
				if(document.getElementById("breed")==null){   //check if breed selct already exist else create breed  input 
					
					createBreedSelect();   					  //name is misleading as breed is an input box
					
				}
				else{            							  //If exist remove the existing breed input and create new one
					removeElement(breed);
					
					
					removeElement(age);
					
					
					removeElement(gender);
					
				
					createBreedSelect();
				}
				breed=document.getElementById(breedID);
				bindData(bindTo);
				
				
				setListener(breed,'input');

	}
	
	
	function createBreedSelect(){
	
		var breedSelect; 
		var breedData; 		 //Breed datalist tag
		
		breedSelect = document.createElement("input");
		breedSelect.setAttribute("placeholder", "Any"); 
		breedSelect.setAttribute("id", breedID); 
		breedSelect.setAttribute("list", breedListID); 
		form.appendChild(breedSelect);
		
		breedData = document.createElement("datalist");
		breedData.setAttribute("id", breedListID); 
		form.appendChild(breedData);
	}
	
	function removeElement(ele,isID){
	
	
		if(ele!=undefined){  				//If element exist
			ele.parentNode.removeChild(ele);
			
		}
		
		
	}
	
	function getData(){
	

	
		animal=document.getElementById(animalID);
		breed=document.getElementById(breedID);
		age=document.getElementById(ageID);
		gender=document.getElementById(genderID);
	

		var animalValue="",breedValue="",ageValue="",genderValue="",location=14623;
		var URL='http://api.petfinder.com/pet.find?key='+apiKey+'&count=20&format=json&location='+location;  //basse URL
		//use local storage if page is first loaded
	
	
		if(animal){
			animalValue=animal.value;
			if(animalValue==='0'){  
				animalValue="";
			}
		}
		if(breed){
			breedValue=breed.value;
			if(breedValue==='Any'){  //Blank is interpreted as 'any' in the api //0 is first value
				breedValue="";
			}
		}
		if(age){
			ageValue=age.value;
			if(ageValue==='0'){  
			ageValue="";
			}
		}
		if(gender){
			genderValue=gender.value[0];
			if(genderValue==='0'){  //Blank is interpreted as 'any' in the api, gender is 'm' 'f' in api
				genderValue="";
			}
		}
	
	
	
		if(breedValue.indexOf('/')>0){
			breedValue=breedValue.split('/');
			breedValue=breedValue[0];
		
		}
		
		
		
	

		URL='http://api.petfinder.com/pet.find?key='+apiKey+'&count='+maxPets+'&format=json&breed='+breedValue+'&animal='+animalValue+'&age='+ageValue+'&sex='+genderValue+'&location='+location;
		
		
		$.ajax({                    															//Asyn ajax to API
			type: 'get',
			url:  URL,
			dataType: 'jsonp',
			success: function(data)																//Callback function
			{
				console.log('request:'+ URL);
				
				formatPets(data);
				loadImages();
				
			},
			error: function( errorThrown)
			{
				console.log("Error making the request:"+errorThrown);
				window.location.href="requestFailed.html";
			}
		});
	}
	
	

	
	
	function  formatPets(data){
		baseData.length=0;
	
		if(data.petfinder.pets.pet){
			var pets=data.petfinder.pets.pet;
			
		
			var length = pets.length;
				
			for(var i = 0; i < length; i++){
				baseData.push({
							'num'			:i,
							'id'			:pets[i].id.$t,
							'options'		:pets[i].options,
							'breeds'		:pets[i].breeds.breed,
							'status' 		:pets[i].status.$t,
							'name"'			:pets[i].name.$t,
							'contact' 		:pets[i].contact,
							'description'	:pets[i].description.$t,
							'sex'			:pets[i].sex.$t,
							'age		'	:pets[i].age.$t,
							'size'			:pets[i].size.$t,
							'mix'			:pets[i].mix.$t,
							'shelterId'		:pets[i].shelterId.$t ,
							'lastUpdate'	:pets[i].lastUpdate.$t,
							'media'	 		:pets[i].media,
							'animal'		:pets[i].animal.$t		
				});
			}
		}	
		
	
	}
	
	function loadImages(){
	
		imageListWidth=0;   //re initiliazzing every time new images are loaded
		
		var imgSrc;
		var imageList=document.getElementById('imageList');
		imageList.innerHTML="";
	
		var secondRow=false;
	
		var length=baseData.length;
		if(length===0){
			var noPetMsg=document.createElement('p');
			var noPetMsgText=document.createTextNode('Sorry no pets found for the above input near your location.');
			noPetMsg.appendChild(noPetMsgText);
			imageList.appendChild(noPetMsg);
			return;
		}
	
		
	
		for(var i=0;i<length;i++){
			
			if(baseData[i].media.photos)
			{
				var imageThumb=document.createElement("img");
				imageThumb.setAttribute("class", "thumb");
				imageThumb.setAttribute("style", "width:150px;display:inline-block;vertical-align:top;");
				imageThumb.setAttribute("alt", baseData[i].description);
				imageThumb.setAttribute("src", baseData[i].media.photos.photo[2].$t);
			
				imageList.appendChild(imageThumb);
				if(!secondRow){
					imageListWidth=imageListWidth+ parseInt(imageThumb.style.width); //append to imageLIst width as images are added to the div 
				}
				if((i+1)===length/2){
					secondRow=true;
					imageList.appendChild(document.createElement("br")); //break line when half the images are added to create two rows
				
				}
			
		
			}
		}	
	
		imageList.addEventListener('mouseenter',function(){slideImages(event);},false);  //to make the images slide on mouse over
												
	
	

		var imagesLength=document.getElementById("imageList").childNodes.length;
		for(var i=0;i<imagesLength;i++){
			document.getElementById("imageList").childNodes[i].addEventListener('click',function(){openDialogBox(this);});
		}
	}

	function slideImages(mouseEvent){   //@mouseEvent if event is fire by mouseMove instead of set time out
	
	
		var repeater=setTimeout(slideImages,40);
		var imgLeft=parseInt(getComputedStyle(imageList).getPropertyValue("left"));
		var bufferEnd=30;  //to show the images have ended
	
		if(mouseXX>(screenWidth/2)){  //mouse on the right side of the screen
			slideDirection="left";
			slideSpeed=(mouseXX-(screenWidth/2))*0.023;
		}
		else{
			slideDirection="right";
			slideSpeed=((screenWidth/2)-mouseXX)*0.023;  
		}
	
	
		if(slideDirection==="left"){ //slide Left
			if(imgLeft>(screenWidth-imageListWidth)-bufferEnd){  //to stop the slide when last image is slided
				imgLeft=imgLeft-slideSpeed;
			}
		}	
	   if(slideDirection==="right"){//slide right
			if(imgLeft<0){
				imgLeft=imgLeft+slideSpeed;
			}
	   }
		document.getElementById("imageList").style.left=imgLeft+'px';
		
		document.getElementById("imageList").addEventListener("mouseleave",function(){   //clear timeOut counter on mouseOut event on the box
																	clearTimeout(repeater);
																	});
					
	
	}
	
	function openDialogBox(thumb){
	
	
		clearGreeting();
		dialogBox.showModal();
		
		
	
		document.getElementById("big-pic").src=thumb.src;
	
		var descNode = document.getElementById("desc");
		var petDesc = document.createElement("p");
		var petDescText = document.createTextNode(thumb.alt);
		
		
		while (descNode.firstChild) {
				descNode.removeChild(descNode.firstChild);
		}
																		
																			
		petDesc.appendChild(petDescText);
		descNode.appendChild(petDesc);
		
		descNode.addEventListener("mouseover",function(){   //capture MouseOver event
	
			enlargeDesc(this);  
		});
	}
   
	function enlargeDesc(descBox){
		var descHeight=descBox.style.height;
		descBox.style.height='auto';
	
	
		var repeater=setTimeout(enlargeDesc,40,descBox);
	
		descBox.addEventListener("mouseout",function(){   //clear timeOut counter on mouseOut event on the box
				clearTimeout(repeater);
				descBox.style.height='100px';
				});
	}			
		
	
	
	function bindData(bindTo){
		
		
		var breedList=document.getElementById(breedListID);	
		    while (breedList.firstChild) {  							//remove all options tag
				breedList.removeChild(breedList.firstChild);
			}
			
			var option=document.createElement('option');
				option.setAttribute('value','Any');
				var optionText=document.createTextNode('Any');
				option.appendChild(optionText);
				breedList.appendChild(option);
			
			for (var i=0;i<breeds.length;i++){
				var option=document.createElement('option');
				option.setAttribute('value',breeds[i].$t);
				var optionText=document.createTextNode(breeds[i].$t);
				option.appendChild(optionText);
				breedList.appendChild(option);
				
			}
	
	}
	
    //Form Submisssion events
	var contactForm=document.getElementById('contactForm');
	contactForm.addEventListener('submit', function(event) { event.preventDefault();
													console.log('submit done');
													onFormSubmit();false});  //add form submission event
	
	function onFormSubmit(){
		console.log('submitted');
		
		var formGreeting=document.getElementById('Greeting');
		var submitInfo=document.createElement('p');
		var submitInfoText=document.createTextNode('Thank you! Your inquiry has been sumitted ,expect an response on your email within 3 days')
		formGreeting.appendChild(submitInfo);
		submitInfo.appendChild(submitInfoText);
		
		
		document.cookie="username="+document.getElementsByName('user')[0].value;
		console.log(document.cookie);
		var helloUser=document.getElementById('helloUsr');
		
		if(document.cookie){
		username = document.cookie.split("=");
			helloUser.innerHTML="Hello "+username[1]; 	
		}	
		
		dialogBox.close();
		
		return false;
	
	}
	
	function clearGreeting(){
		var formGreeting=document.getElementById('Greeting');
		
	    if(formGreeting.childNodes[3]){
			formGreeting.removeChild(formGreeting.childNodes[3]); //remove p tag child
		}			
				
	
	}
	////////////////////////////////////////////////
	// CONSTRUCT
	////////////////////////////////////////////////
	
	Construct();
}	