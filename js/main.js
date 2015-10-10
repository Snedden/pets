

window.onload = function(){ 
							if((this.BrowserDetect.browser==='Chrome')&&((parseInt(this.BrowserDetect.version))>36)||   //Chrome version 37 +
								(this.BrowserDetect.browser==='Opera')&&((parseInt(this.BrowserDetect.version))>23)){   //Opera version 24 +
							
							
						
							this.addEventListener('mousemove',function (){mouseXX=event.clientX;});                     // mouseX  defined
							                     
												 
							petObj=new Pets();
							console.log(petObj.animalID);
												
							}	
							else{
								window.location.href="browserRedirect.html"
							}

						}	