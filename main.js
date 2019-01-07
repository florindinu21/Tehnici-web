var movieContainer = document.getElementById("movieInfo");
var btnIncarcare=document.getElementById("IncarcareFilme");
var btnStergere= document.getElementById("StergereFilm");
var btnEditare = document.getElementById("EditareButon");
var inputStergere= document.getElementById("InputStergereFilm");
var btnAdaugare = document.getElementById("AdaugaFilmButon");
var movieNames = [];
var movieIDS = [];
var alreadyDeletedCount = 0;



btnIncarcare.addEventListener("click",function(){
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET','http://localhost:3000/movies');
	ourRequest.onload = function() {
	var ourData = JSON.parse(ourRequest.responseText);
	render(ourData);
};

	ourRequest.send();
	
});

btnStergere.addEventListener("click",function(){
	var i=0;
	var value = document.getElementById("InputStergereFilm").value;
		for(i=0;i<movieIDS.length;i++)
			if ( movieIDS[i] == value)
				break;
			if( i==movieIDS.length +1)
			{	alert("Nu exista film cu acest ID");
				return;
			}
	if(isNaN(value) || i> movieContainer.childElementCount || value<0)
		alert ("Eroare! Introduceti un numar valid");
	else
	{	movieContainer.removeChild(movieContainer.childNodes[i]);
		for (j=i;j<movieIDS.length-1;j++)
			movieIDS[j] = movieIDS[j+1];
		for (j=i;j<movieNames.length-1;j++)
			movieNames[j] = movieNames[j+1];
		//alreadyDeletedCount += 1;
		inputStergere.value='';
		var answer = confirm(" Doriti sa stergeti si din baza de date?");
		if ( answer == true)
		{
			var ourRequest = new XMLHttpRequest();
			ourRequest.open("DELETE", 'http://localhost:3000/movies/' + value.toString(), true);
			ourRequest.send(null);
		}
	}
	
});
btnAdaugare.addEventListener("click",function(){
	var data ={};
	data.name =document.getElementById("AdaugaFilmInput").value;
	data.description=document.getElementById("AdaugaFilmTextarea").value;
	var movie = JSON.stringify(data);
	if ( data.name !="" && data.description!="")
	{
	var ourRequest2 = new XMLHttpRequest();
	ourRequest2.open("POST",'http://localhost:3000/movies',true);
	ourRequest2.setRequestHeader('Content-type','application/json; charset=utf-8');
	ourRequest2.send(movie);
	document.getElementById("AdaugaFilmInput").value="";
	document.getElementById("AdaugaFilmTextarea").value="";
	}
});

btnEditare.addEventListener("click",function(){
	var value = document.getElementById("EditareInput").value;
	var i=0;
	for(i=0;i<movieIDS.length;i++)
			if ( movieIDS[i] == value)
				break;
			if( i==movieIDS.length +1)
			{	alert("Nu exista film cu acest ID");
				return;
			}
	if(isNaN(value) || i > movieContainer.childElementCount || value<0)
		alert ("Eroare! Introduceti un numar valid");
	else{
		var descriptions = movieContainer.getElementsByTagName('span');
		var descriptionText = document.getElementById("EditareTextarea").value;
		descriptions[i].innerHTML = descriptionText;
		var answer = confirm(" Doriti sa modificati si in baza de date?");
		document.getElementById("EditareTextarea").value="";
		document.getElementById("EditareInput").value="";
		if(answer == true)
		{   var data={};
			var ourRequest = new XMLHttpRequest();
			ourRequest.open("PUT", 'http://localhost:3000/movies/'+ value.toString(), true);
			ourRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
			data.description = descriptionText;
			data.name = movieNames[i];
			var movie = JSON.stringify(data);
			ourRequest.send(movie);
			
			
			
		}
		
	}
	
	
	
});

inputStergere.addEventListener("keyup",function(event){
		 event.preventDefault();
		 if (event.keyCode === 13)
		 {btnStergere.click();
		 inputStergere.value='';
		 }
	
});

function render(data){
	var htmlString = "";
	movieNames=[];
	movieIDS= [];
	for ( i=0;i < data.length; i++)
	{htmlString +="<p>"+ data[i].id +" " +"->" +" "+ data[i].name + " " +" ->" +" "+ "<span>" + data[i].description+ "</span></p>";
	 movieNames[i] = data[i].name;
	 movieIDS[i] = data[i].id;
	}
	
	while(movieContainer.childElementCount)
	movieContainer.removeChild(movieContainer.childNodes[0]);
	movieContainer.insertAdjacentHTML('beforeend',htmlString);
		
	
		
	
}

