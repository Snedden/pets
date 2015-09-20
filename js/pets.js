function pets(){
	var apiKey;
	var baseData;
	var apiSecret;
	var breeds;
	
	
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
	
	getData();
	}
	
	function setListeners()
	{
	document.getElementById("animals").addEventListener("change",fetchBreeds);
	}
	
	
	function fetchBreeds(){
		//var ajax;
		//var data;
		//ajax = new XMLHttpRequest();
		console.log("animal :"+document.getElementById("animals").value);
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
                
				

			
			},
			error: function( errorThrown)
			{
				console.log("Error making the request:"+errorThrown);
			}
		});
	}
	
	function getData(){
	console.log('in get data');
	var location=14623;
	$.ajax({                    															//Asyn ajax to API
			type: 'get',
			url: 'http://api.petfinder.com/pet.find?key='+apiKey+'&format=json&location='+location,
			dataType: 'jsonp',
			success: function(data)																//Callback function
			{
				console.log('data '+data);
				
				formatPets(data);
				
				//bindData(breeds);
             },
			error: function( errorThrown)
			{
				console.log("Error making the request:"+errorThrown);
			}
		});
	}
	
	function  formatPets(data){
	
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