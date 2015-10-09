

window.onload = function(){ 
							if((this.BrowserDetect.browser==='Chrome')&&((parseInt(this.BrowserDetect.version))>36)||   //Chrome version 37 +
								(this.BrowserDetect.browser==='Opera')&&((parseInt(this.BrowserDetect.version))>23)){   //Opera version 24 +
							
							
							console.log(this);
							this.addEventListener('mousemove',function (){mouseXX=event.clientX;mouseY=event.clientY});// mouseX and mouseY are define
							                     
												 
												petObj=new Pets();
												
							}	
							else{
								window.location.href="browserRedirect.html"
							}

						}	