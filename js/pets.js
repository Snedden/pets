function pets(){
	var apiKey;
	var baseData;
	var apiSecret;
	var breeds;
	var breed;
	
	function construct()
	{
		init();
	}//End of construct()

	/*--
	name:init()
	purpose:Initilize properties  including the apiKey required for API request 
	*/
	function init()
	{
	apiKey='f789d56f7c27076c0cc20478a6cc1a51';
	apiSecret='80b43503a72be11d8ca49341f152761c';
	
	baseData=[];
	breeds=[];
	setListeners();
	
	//getData();
	}
	
	function setListeners()
	{
	document.getElementById("animals").addEventListener("change",fetchBreeds);
	
	console.log('events added');
	}
	
	
	function fetchBreeds(){
		//var ajax;
		//var data;
		//ajax = new XMLHttpRequest();
		//console.log("animal :"+document.getElementById("animals").value);
		
	   	 $.ajax({                    															//Asyn ajax to API
			type: 'get',
			url: 'http://api.petfinder.com/breed.list?key='+apiKey+'&format=json&animal='+document.getElementById("animals").value,
			dataType: 'jsonp',
			success: function(data)																//Callback function
			{
				console.log(data.petfinder.breeds.breed);
				breeds=data.petfinder.breeds.breed;
				
				var bindTo='breeds';
				bindData(bindTo);
				
				document.getElementById("breeds").addEventListener("change",function(){getData();});
                getData();
				

			
			},
			error: function( errorThrown)
			{
				console.log("Error making the request:"+errorThrown);
			}
		});
	}
	
	function getData(animal,breed){
	animal=document.getElementById("animals").value;     
	breeds=document.getElementById("breeds");
    breed = breeds.options[breeds.selectedIndex].text;
	console.log('Index '+breed.indexOf('/'));
		if(breed.indexOf('/')>0){
		breed=breed.split('/');
		breed=breed[0];
		console.log('b'+breed);
		}
	console.log('in get data');
	var location=14623;
	var URL='http://api.petfinder.com/pet.find?key='+apiKey+'&count=20&format=json&breed='+breed+'&animal='+animal+'&location='+location;
	$.ajax({                    															//Asyn ajax to API
			type: 'get',
			url:  URL,
			dataType: 'jsonp',
			success: function(data)																//Callback function
			{
				console.log('request:'+ URL);
				
				formatPets(data);
				console.log('animal '+animal);
				console.log('breed '+breed);
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
	console.log(data);
	console.log('pets '+data.petfinder.pets);
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
		console.log(baseData);
	
	}
	
	function loadImages(){
	
	document.getElementById("imageList").innerHTML = "";
	//
	
	
	
	
	
	var length=baseData.length;
	var images='';
	var imgSrc;
	console.log(baseData);
		for(var i=0;i<length;i++){
			console.log("is data"+baseData[i].media.photos);
			if(baseData[i].media.photos)
			{
			images+='<a href=""><img src="'+baseData[i].media.photos.photo[2].$t+'"width:"160" height:"160">';
			}
		}	
	$('#imageList').append(images)
	}
	
	
	function bindData(bindTo){
	
	switch(bindTo){
	case 'breeds':
		$('#breeds').find("option").remove();
		var option = '';
		for (var i=0;i<breeds.length;i++){
			option += '<option value="'+ breeds[i] + '">' + breeds[i].$t + '</option>';
		}
		$('#breeds').append(option);
	break;
	
	default:
	console.log("invalid bindTo parameter");
	}
	
	}
	
	////////////////////////////////////////////////
	// CONSTRUCT
	////////////////////////////////////////////////
	
	construct();
}	