function init()
{
	$("span").bind("click",changeColor);
	obj=new Suggest();
	obj.movie=document.getElementById("search");
	obj.prediction=document.getElementById("container");
	
	count=0; //tells index of first row
	window.onscroll=getmore;
	makeRequest();
}
function makeRequest()
{
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = updateText;
	xhr.open("GET","getText.php?count="+count,true);
	xhr.send();
	
	setTimeout(getImage,1000);

}
function getmore()
{
	//console.log(document.documentElement.scrollHeight-document.documentElement.scrollTop);
	//console.log("H:"+document.documentElement.clientHeight);
	 if($(window).scrollTop() + $(window).height() == $(document).height())
	{
		count+=18;
		makeRequest();
	}
}
function updateText()
{
	if(xhr.readyState==4 && xhr.status==200)
	{
		arr = JSON.parse(xhr.responseText);
		count1=count;
		for(i=0;i<18;i++)
		{
			divMain = document.getElementById("main");
			divc = document.createElement("div");
			divc.className="col-sm-2";
			divCard = document.createElement("div");
			divCard.className="card card-cascade wider";
			divView = document.createElement("div");
			divView.className = "view overlay hm-white-slight";
			img1 = document.createElement("img");
			img1.id="img"+count1;
			img1.className="img-fluid";
			divView.appendChild(img1);
			a1 = document.createElement("a");
			divMask = document.createElement("div");
			divMask.className = "mask waves-effect waves-light";
			divMask.id="card"+count1;
			divMask.onclick=clickFunction;
			a1.appendChild(divMask);
			divView.appendChild(a1);
			divCard.appendChild(divView);
			divCardCon = document.createElement("div");
			divCardCon.id="hi";
			divCardCon.className="card-block text-center";
			p1 = document.createElement("p");
			p1.className = "card-text";
			txt=arr[i].split(";");
			p1.innerHTML = txt[1];
			p2 = document.createElement("p");
			p2.id="view"+count1;
			p2.innerHTML="Views : "+txt[2];
			p1.appendChild(p2);
			divCardCon.appendChild(p1);
			divCard.appendChild(divCardCon);
			divc.appendChild(divCard);
			divc.appendChild(document.createElement("br"));
			divMain.appendChild(divc);
			count1++;
		}
	}
}
function getSLink()
{
	search=document.getElementById("search");
	xhr3=new XMLHttpRequest();
	xhr3.onreadystatechange=get_Link_For_Video;
	xhr3.open("GET","http://localhost/Video/getSLink.php?search="+search.value,true);
	xhr3.send();
}
//CHANGE....
function clickFunction(event)  //This function will call a php (getVideoLink.php) script and to that script it sends divCard.id
{
	xhr2 = new XMLHttpRequest();
	xhr2.onreadystatechange = get_Link_For_Video;
	hello=event.target.parentNode.parentNode.parentNode.childNodes;
	hello1=hello[1].childNodes;
	hello2=hello1[0].childNodes;
	view=document.getElementById(hello2[1].id);
	x=view.innerHTML.split(":");
	y=parseInt(x[1]);
	y=y+1;
	alert(y);
	view.innerHTML="Views : "+y;
	xhr2.open("GET","http://localhost/Video/getLink.php?id="+event.target.id+"&view="+hello2[1].id,true);
	xhr2.send();
}

//	CHANGE...
function get_Link_For_Video()
{
	if(this.readyState == 4 && this.status == 200)
	{
		 window.location.assign("http://localhost/Video/streaming/player1.html")
	}
}
function getImage()
{
	xhr1 = new XMLHttpRequest();
	xhr1.onreadystatechange = putImage;
	xhr1.open("GET","getImg.php?count="+count,true);
	xhr1.send();
}
function putImage()
{

	if(xhr1.readyState == 4 && xhr1.status == 200)
	{
		arr1 = JSON.parse(xhr1.responseText);
		count2=count;
		for(i=0;i<18;i++)
		{
			img2 = document.getElementById("img"+count2);
			img2.src = arr1[i];
			count2++;
		}
	}
}

function changeColor(event)
{
	newNode=event.target.parentNode;
	$("span").attr("class","deco1");
	newNode.className="deco2";
}

function Suggest()
{
	this.timer=null;
	this.xhr=new XMLHttpRequest();
	this.getMovie=function()
	{
		if(obj.timer)
		{
			clearTimeout(obj.timer);
		}
		obj.timer=setTimeout(obj.fetchMovie,1000);
	}
	this.fetchMovie=function()
	{
		if(obj.movie.value=="")
		{
			obj.prediction.innerHTML="";
			obj.prediction.style.display="none";
			return;
		}
		else
		{
			obj.xhr.onreadystatechange=obj.recieveMovie;
			obj.xhr.open("GET","http://localhost/Video/getSearch.php?movie="+obj.movie.value,true);
			obj.xhr.send();			
		}
	}
	this.recieveMovie=function()
	{
		if(obj.xhr.readyState==4 && obj.xhr.status==200)
		{
			moviearray=JSON.parse(obj.xhr.responseText);
			if(moviearray.length==0)
			{
				obj.prediction.innerHTML="";
				obj.prediction.style.display="none";
			}
			else
			{
				obj.showMovies(moviearray);
				obj.movie.className="found";
			}
		}
	}
	this.showMovies=function(movielist)
	{
		obj.prediction.innerHTML="";
		for(i=0;i<movielist.length;i++)
		{
			div=document.createElement("div");
			div.className="suggest";
			div.innerHTML=movielist[i];
			obj.prediction.appendChild(div);
			div.onclick=obj.setMovie;
		}
		obj.prediction.style.display="block";
	}
	this.setMovie=function(event)
	{
		obj.movie.value=event.target.innerHTML;
		obj.prediction.innerHTML='';
		obj.prediction.style.display="none";
	}
}
