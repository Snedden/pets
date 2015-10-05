function Pets(){
	var apiKey;   //apiKEy
	var baseData; //data after formatted in js object/array literal 
	var apiSecret;//Api secret for security reasons
	var breeds;   //objec literal of fetched breeds for selected animal
	
	var form;     //form element
	var animal;  //animalInput 
	var breed;    //breed input 
	var age;      //age input
	var gender;   //gender input
	var maxPets  //max Number of pets returned in an single api call 
	
	var imageListWidth; 		//Width of imageList div
	var screenWidth;            //Width of screen  
	
	var slideDirection;        //Slide direction of the images 
	var slideSpeed;
	
	
	var descBoxHeight;
	function construct(){
		init();
	}//End of construct()

	/*--
	name:init()
	purpose:Initilize properties  including the apiKey required for API request 
	*/
	function init(){
	apiKey='f789d56f7c27076c0cc20478a6cc1a51';
	apiSecret='80b43503a72be11d8ca49341f152761c';
	form=document.getElementById("petForm");
	maxPets=50;
	
	screenWidth=screen.width;
	imageListWidth=0;   //no images yet
	
	baseData=[];
	breeds=[];
	setAnimalListener();
	
	descBoxHeight=descBoxHeight;
	

	}
	
	

	function setAnimalListener(){
	animal=document.getElementById("animals");
	document.getElementById("animals").addEventListener("change",function(){getData(animal),setBreedListener(animal)});
	
	console.log('animal select change event added');
	}
	
	
	function setBreedListener(animal){
	
			$.ajax({                    															//Asyn ajax to API
			type: 'get',
			url: 'http://api.petfinder.com/breed.list?key='+apiKey+'&format=json&animal='+animal.value,
			dataType: 'jsonp',
			success: function(data)																//Callback function
			{
			    var bindTo='breeds';
				//console.log(data.petfinder.breeds.breed);
				breeds=data.petfinder.breeds.breed;
				
				
				//console.log(breedSelect==null);
															//remove breed on animal change to reset
					
				
				if(document.getElementById("breed")==null){   //check if breed selct already exist else create breed select input
					
					createBreedSelect();
				}
				else{            							  //If exist remove the existing breed input and create new one
				removeElement(breed);
				removeElement(age);
				removeElement(gender);
				createBreedSelect();
				console.log("breed select created");
				
				}
				breed=document.getElementById("breed");
				bindData(bindTo);
				
				breed.addEventListener("input",function(){getData(animal,breed),setAgeListener(animal,breed);});
				
				},
			error: function( errorThrown)
			{
				console.log("Error making the request:"+errorThrown);
			}
		});
	}
	
	function removeElement(ele){
	console.log(ele);
		if(ele!=undefined){  				//If element exist
			ele.parentNode.removeChild(ele);
			
		}
		
	}
	function setAgeListener(animal,breed){
	
		if(document.getElementById('age')==null){
			createAgeSelect();
		}
		else{
		removeElement(age);
		removeElement(gender);
		createAgeSelect();
		}
		
		console.log('age select created');
		age=document.getElementById('age');
		age.addEventListener("change",function(){getData(animal,breed,age);setGenderListener(animal,breed,age)});
	}
	
	function setGenderListener(animal,breed,age){
		if(document.getElementById('gender')==null){
			createGenderSelect();
			console.log('gender select created');
			
		}
		else{
		removeElement(gender);
		createGenderSelect();
		}
		gender=document.getElementById('gender');
		gender.addEventListener("change",function(){getData(animal,breed,age,gender);});
	}
	
	function createGenderSelect(){
	//var ageSelect;   	   //Age select input box 
	var genders=['Any','Male','Female'];
	var optionNode;
	var optionTextnode;
	
	gender = document.createElement("select");
	gender.setAttribute("id","gender"); 
	form.appendChild(gender);
	
	

		for (var i=0;i<genders.length;i++){
		    optionNode = document.createElement("option");
		    optionTextnode = document.createTextNode(genders[i]);
			optionNode.appendChild(optionTextnode);
			gender.appendChild(optionNode);
			
		}
		form.appendChild(gender);
		
	
	}
	
	function createAgeSelect(){
	//var ageSelect;   	   //Age select input box 
	var ages=['Any','Baby','Young','Adult','Senior'];
	var optionNode;
	var optionTextnode;
	
	age = document.createElement("select");
	age.setAttribute("id","age"); 
	form.appendChild(age);
	
	

		for (var i=0;i<ages.length;i++){
		    optionNode = document.createElement("option");
		    optionTextnode = document.createTextNode(ages[i]);
			optionNode.appendChild(optionTextnode);
			age.appendChild(optionNode);
			
		}
		form.appendChild(age);
		
	
	}
	
	function createBreedSelect(){
	
	var breedSelect; 
	var breedData; 		 //Breed datalist tag
	
	breedSelect = document.createElement("input");
	breedSelect.setAttribute("placeholder", "Any"); 
	breedSelect.setAttribute("id", "breed"); 
	breedSelect.setAttribute("list", "breeds"); 
	form.appendChild(breedSelect);
	
	          
	breedData = document.createElement("datalist");
	breedData.setAttribute("id", "breeds"); 
	form.appendChild(breedData);
	
	
	}
	
	function getData(animal,breed,age,gender){
	//clearBigImage();  //clears big image on every get data call;
	var animalValue="",breedValue="",ageValue="",genderValue="",location=14623;
	var URL='http://api.petfinder.com/pet.find?key='+apiKey+'&count=20&format=json&location='+location;  //basse URL
	
	console.log('getData called');
	if(animal){
	animalValue=animal.value;
	}
	if(breed){
	breedValue=breed.value;
		if(breedValue==='Any'){  //Blank is interpreted as any in the api 
			breedValue="";
		}
	}
	if(age){
	ageValue=age.value;
		if(ageValue==='Any'){  //Blank is interpreted as any in the api 
			ageValue="";
		}
	}
	if(gender){
	genderValue=gender.value[0];
		if(genderValue==='A'){  //Blank is interpreted as any in the api 
			genderValue="";
		}
	}
	//animal=document.getElementById("animals");     
	//breed=document.getElementById("breed");
	//age=document.getElementById('age');
	
	
		if(breedValue.indexOf('/')>0){
		breedValue=breedValue.split('/');
		breedValue=breedValue[0];
		//console.log('b'+breed);
		}
		
		
		
	

	var URL='http://api.petfinder.com/pet.find?key='+apiKey+'&count='+maxPets+'&format=json&breed='+breedValue+'&animal='+animalValue+'&age='+ageValue+'&sex='+genderValue+'&location='+location;
	$.ajax({                    															//Asyn ajax to API
			type: 'get',
			url:  URL,
			dataType: 'jsonp',
			success: function(data)																//Callback function
			{
				console.log('request:'+ URL);
				
				formatPets(data);
				//console.log('animal '+animal);
				//console.log('breed '+breed);
				loadImages();
				
			},
			error: function( errorThrown)
			{
				console.log("Error making the request:"+errorThrown);
			}
		});
	}
	
	function  formatPets(data){
	baseData.length=0;
	//console.log(data);
	
		if(data.petfinder.pets.pet){
			var pets=data.petfinder.pets.pet;
			
		
			var length = pets.length;
				

				for(var i = 0; i < length; i++)
				{
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
		//console.log(baseData);
	
	}
	
	function loadImages(){
	
	imageListWidth=0;   //re initiliazzing every time new images are loaded
	document.getElementById("imageList").innerHTML = "";
	console.log('images cleared');
	var secondRow=false;
	
	
	
	
	var length=baseData.length;
	
	var imgSrc;
	var imageList=document.getElementById('imageList');
	console.log(baseData);
		for(var i=0;i<length;i++){
			console.log("is data"+baseData[i].media.photos);
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
	console.log(imageListWidth)	;
	imageList.addEventListener('mouseover',function(){slideImages(event);});  //to make the images slide on mouse over
												
	
	
	console.log(document.getElementById("imageList").childNodes);
	var imagesLength=document.getElementById("imageList").childNodes.length;
	for(var i=0;i<imagesLength;i++){
		document.getElementById("imageList").childNodes[i].addEventListener('click',function(){openDialogBox(this);});
		}
	}

	function slideImages(mouseEvent){   //@mouseEvent if event is fire by mouseMove instead of set time out
	
	
	
	var imgLeft=parseInt(getComputedStyle(imageList).getPropertyValue("left"));
	var bufferEnd=30;  //to show the images have ended
	
	
	
	if(mouseEvent){
		if(mouseEvent.clientX>(screenWidth/2)){  //mouse on the right side of the screen
		slideDirection="left";
		slideSpeed=(mouseEvent.clientX-(screenWidth/2))*0.023;
		}
		else
		{
		slideDirection="right";
		slideSpeed=((screenWidth/2)-mouseEvent.clientX)*0.023;  
		}
	}
	
	   if(slideDirection==="left"){ //slide Left
	   console.log(imgLeft+">("+screenWidth+"-"+imageListWidth+")-"+bufferEnd);
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
		
		
		
		
		var repeater=setTimeout(slideImages,40);
		
			document.getElementById("imageList").addEventListener("mouseout",function(){   //clear timeOut counter on mouseOut event on the box
					//petImages.style.left=imgLeft+'px';
					clearTimeout(repeater);
					
					
					});
					
	
	}
	
	function openDialogBox(thumb){
	
	
	dialogBox=document.getElementById("petDialog"); 
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
   //Fills and image not dialog box
/*
   function fillBigImage(thumb){
		console.log('thumb clicked');
		console.log(thumb.alt);
		document.images[0].src=thumb.src;
																			
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
	*/
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
	//console.log('in bindData');
	switch(bindTo){
	case 'breeds':
		$('#breeds').find("option").remove();
		var option = '<option value="Any">Any</option>';
		for (var i=0;i<breeds.length;i++){
			option += '<option value="'+ breeds[i].$t + '">' + breeds[i].$t + '</option>';
		}
		$('#breeds').append(option);
		//console.log('option:'+option)
		break;
	
	default:
	console.log("invalid bindTo parameter");
	}
	
	}
	
	function clearBigImage(){
		var bigImageDiv=document.getElementById("bigImgContainer");
		while(bigImageDiv.firstChild){
		if(bigImageDiv.firstChild.tagName!='DIV')
		bigImageDiv.removeChild(bigImageDiv.firstChild)
		}	   
	
	}
	
	
	function changeBigImage(imageSource){
		document.images[0].src=imageSource;
		
	}
	
	////////////////////////////////////////////////
	// CONSTRUCT
	////////////////////////////////////////////////
	
	construct();
}	