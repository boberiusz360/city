var citylvl = 1;
var population = 15;
var maxpopulation = 60;
var nextpop = parseInt((maxpopulation + (maxpopulation - (maxpopulation / (citylvl +1))))*4);
var citycost = parseInt(((citylvl * (citylvl + 1))*2212));
var cityguards = 0.1;
var citylvlup = parseInt((citycost * (citylvl))/(cityguards + 1));

var round = 0;
var treasury = 1;
var granary = 50;
var outcome = parseInt(population * (((citylvl * citylvl)/50)+1));
var foutcome = parseInt(population * (((citylvl * citylvl)/30)+1));
var growth = 5;
var random = 10;
var hunger = 0;
var cityFullnessBar = (population / maxpopulation) * 100;
var wonBattles = 0;
var points = 0;

var minelvl = 1;
var minesls = 0.6;
var income = parseInt(minelvl * minesls * 1661);
var nextinc = parseInt((minelvl + 1) * minesls * 1661);
var minecost = parseInt(16732*(minelvl+1)/((minesls * population)));
var minelvlup = parseInt((minecost * minelvl)/(minesls + 1));

var fieldslvl = 1;
var fieldssls = 0.3;
var fincome = parseInt(fieldslvl * fieldssls * 1700);
var nextfinc = parseInt((fieldslvl + 1) * fieldssls * 1700);
var fieldscost = parseInt(2643*(fieldslvl+1)/((fieldssls * population)));
var fieldslvlup = parseInt((fieldscost  * fieldslvl)/(fieldssls + 1));

function main()
{		
	if(document.getElementById("mineprc").value != ""){minesls = (document.getElementById("mineprc").value / 100);}
	if(document.getElementById("fieldsprc").value != ""){fieldssls = (document.getElementById("fieldsprc").value / 100);}
	if(document.getElementById("cityprc").value != ""){cityguards = (document.getElementById("cityprc").value / 100);}
	if((minesls + fieldssls + cityguards) > 1)
	{
		if((minesls + fieldssls) >= 1)
		{
			if(minesls >= 0.9)
			{
				minesls = 0.3;
			}
			else
			{
				fieldssls = 0.9 - minesls;
				cityguards = 0.1;
			}
		}
		else if((minesls + cityguards) >= 1)
		{
			if(minesls >= 0.9)
			{
				minesls = 0.3;
			}
			else
			{
				fieldssls = 0.9 - minesls;
				cityguards = 0.1;
			}
		}
		else
		{
			if(fieldssls >= 0.9)
			{
				fieldssls = 0.3;
			}
			else
			{
				minesls = 0.9 - fieldssls;
				cityguards = 0.1;
			}
		}
		if((minesls >= 0.9)&&(fieldssls >= 0.9))
		{
			minesls = 0.3;
			fieldssls= 0.4;
			cityguards = 0.2;
		}
		else if((minesls >= 0.9)&&(cityguards >= 0.9))
		{
			minesls = 0.3;
			fieldssls= 0.4;
			cityguards = 0.2;
		}
		else if((fieldssls >= 0.9)&&(cityguards >= 0.9))
		{
			minesls = 0.3;
			fieldssls= 0.4;
			cityguards = 0.2;
		}
	}
	
	
	
	
	document.getElementById("mineprc").value = (minesls * 100);
	document.getElementById("fieldsprc").value = (fieldssls * 100);
	document.getElementById("cityprc").value = (cityguards * 100);
	
	var bonus = 0;
	income = parseInt(minelvl * minesls * 2335);
	nextinc = parseInt((minelvl + 1) * minesls * 2335);
	
	fincome = parseInt(fieldslvl * fieldssls * 2733);
	nextfinc = parseInt((fieldslvl + 1) * fieldssls * 2733);

	outcome = parseInt(population * (((citylvl * citylvl)/50)+1));
	foutcome = parseInt(population * (((citylvl * citylvl)/30)+1));
	
	minelvlup = parseInt((minecost * minelvl)/(minesls + 1));
	fieldslvlup = parseInt((fieldscost  * fieldslvl)/(fieldssls + 1));
	citylvlup = parseInt((citycost * (citylvl))/(cityguards + 1));
	nextpop = parseInt((maxpopulation + (maxpopulation - (maxpopulation / (citylvl +1))))*4);
	cityFullnessBar = (population / maxpopulation) * 100;
	points += parseInt(((((citylvl  + (minelvl * fieldslvl)) + treasury + granary * population) * wonBattles)/((minesls * 10) * (fieldssls * 10) * round))/100);
	if(!points){points = 0;}
	if(cityguards == 0){citylvlup = Infinity;}
	if(minesls == 0){minelvlup = Infinity;}
	if(fieldssls == 0){fieldslvlup = Infinity;}
	if(population > 1000)
	{
		document.getElementById("colony").innerHTML = "<button id=\"button\" onclick=\"bbb()\">Kolonizuj</button>";
	}
	else
	{
		document.getElementById("colony").innerHTML = "";
	}
	if(population > maxpopulation)
	{
		income = parseInt((income / 10) * 8);
		fincome = parseInt((fincome / 10) * 8);
		
		outcome = parseInt(outcome * 1.15);
		foutcome = parseInt(foutcome * 1.15);
		
		document.getElementById("overgrowthalert").style.animation = "a1 1s infinite";
	}
	else
	{
		document.getElementById("overgrowthalert").style.animation = "";	
	}
	
	if(round == growth)
	{
		bonus = Math.floor(Math.random()*(population*0.5 / ((citylvl / 20) + 1)))+5;
		population += bonus;
		jsalert("Notka populacyjna","Populacja wzrosła o : " +bonus+" rodzin.","ok");
		growth += 5;
	}
	
	if(round == random)
	{
		var action = Math.floor(Math.random()*75);
		if(action < 15)
		{
			bonus = Math.floor(Math.random()*(population - (population * 0.1)))+1;
			jsalert("Bonus","Dżuma nawiedziła twoje miasto <br /> Ilość zabitych: "+bonus+".","ok");
			population -= bonus;
		}
		else if((action > 15)&&(action < 40))
		{
			bonus = Math.floor(Math.random()*(population - (population * 0.3)))+1;
			var defense = Math.floor(Math.random()*71)+1;
			if(defense > (cityguards * 100))
			{
				jsalert("Bonus","Barbarzyńcy zaatakowali twoje miasto <br /> Ilość zabitych : "+bonus+".","ok");
				population -= bonus;
			}
			else
			{
				bonus = Math.floor(Math.random()*(treasury - (treasury * 0.6)))+1;
				jsalert("Bonus","Najeźdźcy zostali pokonani <br /> Zdobyte złoto: "+bonus+".","ok");
				treasury += bonus;
				wonBattles ++;
			}
			
		}
		else if((action > 40)&&(action < 60))
		{
			bonus = Math.floor(Math.random()*(population * 0.6))+10;
			jsalert("Bonus","Dobra pogoda pozwoliła twoim mieszkańcom się rozmnożyć! Przybyło : "+bonus+" rodzin.","ok");
			population += bonus;
		}
		else if(action > 60)
		{
			bonus = Math.floor(Math.random()*(treasury * 0.6))+50;
			jsalert("Bonus","Górnicy znaleźli żyłę złota <br /> Ilość złota wzrasta o : "+bonus+".","ok");
			treasury += bonus;
		}
		random += Math.floor(Math.random()*11)+1;
	}
	
	if(fincome < foutcome)
	{
		document.getElementById("foodalert").style.animation = "a1 1s infinite";
	}
	else 
	{
		document.getElementById("foodalert").style.animation = "";
	}
	
	if(income < outcome)
	{
		document.getElementById("moneyalert").style.animation = "a1 1s infinite";
	}
	else 
	{
		document.getElementById("moneyalert").style.animation = "";
	}
	
	if((treasury <= 0)||(population <= 0))
	{
		end();
	}
	
	if((granary + fincome) < (foutcome * 10))
	{
		if(round == hunger)
		{
			bonus = parseInt(Math.floor(Math.random()*(population * 0.6))+(population * 0.2));
			jsalert("Głód","Zbyt dużo ludzi, za mało jedzenia: " +bonus+ " rodzin umiera z głodu.","cholerka");
			population -= bonus;
		}
		if(hunger < round)
		{
			hunger = round + 2;
		}
	}
	
	treasury += income;
	treasury -= outcome;
	
	if(granary < (population * 100)){granary += fincome;}
	granary -= foutcome;
	
	granary = parseInt(granary);
	treasury = parseInt(treasury);
	round ++;
	writeAll();
}

function lvlUP(what)
{
	switch(what)
	{
		case 1:
		{
			if(minelvlup < (treasury - outcome))
			{
				minelvl += 1;
				treasury -= minelvlup;
				minecost = minelvlup;
				main();
				break;
			}
			else
			{
				jsalert("Błąd0001","Nie można ulepszyć kopalni","Jesteś zbyt biedny");
				break;
			}
		}
		
		case 2:
		{
			if(citylvlup < (treasury - outcome))
			{
				citylvl += 1;
				treasury -= citylvlup;
				maxpopulation = parseInt((maxpopulation + (maxpopulation - (maxpopulation / citylvl)) * 2)*4);
				citycost = citylvlup;
				main();
				break;
			}
			else
			{
				jsalert("Błąd 0002","Nie można ulepszyć miasta","Jesteś zbyt biedny");
				break;
			}
		}
		
		case 3:
		{
			if(fieldslvlup < (treasury - outcome))
			{
				fieldslvl += 1;
				treasury -= fieldslvlup;
				fieldscost = fieldslvlup;
				main();
				break;
			}
			else
			{
				jsalert("Błąd 0003","Nie można ulepszyć pól","Jesteś zbyt biedny");
			}
		}		
	}
}

function writeAll()
{
	put(round,"round");
	
	if(granary >= 100000)
	{
		if(granary >= 1000000)
		{
			put(parseInt(granary / 1000000) + " M","grana");
		}
		else
		{
			put(parseInt(granary / 1000) + " K","grana");
		}
	}	
	else{put(granary,"grana");}
	
	if(treasury >= 100000)
	{	
		if(treasury >= 1000000)
		{
			if(treasury >= 1000000000)
			{
				if(treasury > 10000000000)
				{
					var tr = treasury;
					var mld;
					var hum;
					for(mld = 0; tr > 1000000000;mld+=1)
					{
						tr -= 1000000000;
					}
					
					for(hum = 0;tr>100000000;hum+=1)
					{
						tr -= 100000000;
					}
					put(mld+"."+hum+" Mld","treas");
				}
				else
				{
					var tr = treasury;
					var mld;
					var hum;
					var tm;
					var ml;
					for(mld = 0; tr > 1000000000;mld+=1)
					{
						tr -= 1000000000;
					}
					
					for(hum = 0;tr>100000000;hum+=1)
					{
						tr -= 100000000;
					}
					
					for(tm = 0;tr>10000000;tm+=1)
					{
						tr -= 10000000;
					}
					
					for(ml = 0;tr>1000000;ml+=1)
					{
						tr -= 1000000;
					}
					put(mld+"."+hum+tm+ml+" Mld","treas");
				}
				
			}
			else
			{
				var tr = treasury;
				var mln;
				var hut;
				var tt;
				for(mln = 0; tr > 1000000;mln+=1)
				{
					tr -= 1000000;
				}
				
				for(hut = 0;tr>100000;hut+=1)
				{
					tr -= 100000;
				}
				
				for(tt = 0;tr>10000;tt+=1)
				{
					tr -= 10000;
				}
				put(mln +"."+hut+tt+" M","treas");
			}
		}
		else
		{
			put(parseInt(treasury / 1000) + " K","treas");
		}
	}	
	else{put(treasury,"treas");}
	
	if(citylvlup >= 100000)
	{	
		if(citylvlup >= 1000000)
		{
			if(citylvlup >= 1000000000)
			{
				if(citylvlup > 10000000000)
				{
					var tr = citylvlup;
					var mld;
					var hum;
					for(mld = 0; tr > 1000000000;mld+=1)
					{
						tr -= 1000000000;
					}
					
					for(hum = 0;tr>100000000;hum+=1)
					{
						tr -= 100000000;
					}
					put(mld+"."+hum+" Mld","citylvlup");
				}
				else
				{
					var tr = citylvlup;
					var mld;
					var hum;
					var tm;
					var ml;
					for(mld = 0; tr > 1000000000;mld+=1)
					{
						tr -= 1000000000;
					}
					
					for(hum = 0;tr>100000000;hum+=1)
					{
						tr -= 100000000;
					}
					
					for(tm = 0;tr>10000000;tm+=1)
					{
						tr -= 10000000;
					}
					
					for(ml = 0;tr>1000000;ml+=1)
					{
						tr -= 1000000;
					}
					put(mld+"."+hum+tm+ml+" Mld","citylvlup");
				}
				
			}
			else
			{
				var tr = citylvlup;
				var mln;
				var hut;
				var tt;
				for(mln = 0; tr > 1000000;mln+=1)
				{
					tr -= 1000000;
				}
				
				for(hut = 0;tr>100000;hut+=1)
				{
					tr -= 100000;
				}
				
				for(tt = 0;tr>10000;tt+=1)
				{
					tr -= 10000;
				}
				put(mln +"."+hut+tt+" M","citylvlup");
			}
		}
		else
		{
			put(parseInt(citylvlup / 1000) + " K","citylvlup");
		}
	}	
	else{put(citylvlup,"citylvlup");}
	
	if(fieldslvlup >= 100000)
	{	
		if(fieldslvlup >= 1000000)
		{
			if(fieldslvlup >= 1000000000)
			{
				if(fieldslvlup > 10000000000)
				{
					var tr = fieldslvlup;
					var mld;
					var hum;
					for(mld = 0; tr > 1000000000;mld+=1)
					{
						tr -= 1000000000;
					}
					
					for(hum = 0;tr>100000000;hum+=1)
					{
						tr -= 100000000;
					}
					put(mld+"."+hum+" Mld","fieldslvlup");
				}
				else
				{
					var tr = fieldslvlup;
					var mld;
					var hum;
					var tm;
					var ml;
					for(mld = 0; tr > 1000000000;mld+=1)
					{
						tr -= 1000000000;
					}
					
					for(hum = 0;tr>100000000;hum+=1)
					{
						tr -= 100000000;
					}
					
					for(tm = 0;tr>10000000;tm+=1)
					{
						tr -= 10000000;
					}
					
					for(ml = 0;tr>1000000;ml+=1)
					{
						tr -= 1000000;
					}
					put(mld+"."+hum+tm+ml+" Mld","fieldslvlup");
				}
				
			}
			else
			{
				var tr = fieldslvlup;
				var mln;
				var hut;
				var tt;
				for(mln = 0; tr > 1000000;mln+=1)
				{
					tr -= 1000000;
				}
				
				for(hut = 0;tr>100000;hut+=1)
				{
					tr -= 100000;
				}
				
				for(tt = 0;tr>10000;tt+=1)
				{
					tr -= 10000;
				}
				put(mln +"."+hut+tt+" M","fieldslvlup");
			}
		}
		else
		{
			put(parseInt(fieldslvlup / 1000) + " K","fieldslvlup");
		}
	}	
	else{put(fieldslvlup,"fieldslvlup");}
	
	if(minelvlup >= 100000)
	{	
		if(minelvlup >= 1000000)
		{
			if(minelvlup >= 1000000000)
			{
				if(minelvlup > 10000000000)
				{
					var tr = minelvlup;
					var mld;
					var hum;
					for(mld = 0; tr > 1000000000;mld+=1)
					{
						tr -= 1000000000;
					}
					
					for(hum = 0;tr>100000000;hum+=1)
					{
						tr -= 100000000;
					}
					put(mld+"."+hum+" Mld","minelvlup");
				}
				else
				{
					var tr = minelvlup;
					var mld;
					var hum;
					var tm;
					var ml;
					for(mld = 0; tr > 1000000000;mld+=1)
					{
						tr -= 1000000000;
					}
					
					for(hum = 0;tr>100000000;hum+=1)
					{
						tr -= 100000000;
					}
					
					for(tm = 0;tr>10000000;tm+=1)
					{
						tr -= 10000000;
					}
					
					for(ml = 0;tr>1000000;ml+=1)
					{
						tr -= 1000000;
					}
					put(mld+"."+hum+tm+ml+" Mld","minelvlup");
				}
				
			}
			else
			{
				var tr = minelvlup;
				var mln;
				var hut;
				var tt;
				for(mln = 0; tr > 1000000;mln+=1)
				{
					tr -= 1000000;
				}
				
				for(hut = 0;tr>100000;hut+=1)
				{
					tr -= 100000;
				}
				
				for(tt = 0;tr>10000;tt+=1)
				{
					tr -= 10000;
				}
				put(mln +"."+hut+tt+" M","minelvlup");
			}
		}
		else
		{
			put(parseInt(minelvlup / 1000) + " K","minelvlup");
		}
	}	
	else{put(minelvlup,"minelvlup");}

	put(parseInt(population),"popul");
	put(foutcome,"feeds");
	put(income,"incom");
	put(outcome,"outco");
	put(parseInt((minesls * population) * 2), "minesls");
	put(parseInt((fieldssls * population) * 2), "fieldssls");
	put(minelvl,"minelvl");
	put(fieldslvl,"fieldslvl");
	put(citylvl,"citylvl");
	put(maxpopulation,"maxpop");
	put(fincome,"finco");
	put(nextpop,"nextpop");
	put(nextinc,"nextinc");
	put(nextfinc,"nextfinc");
	put(points,"point");
	if(cityFullnessBar > 100)
	{
		document.getElementById("cityFullnessBar").style.backgroundColor = "red";
		document.getElementById("cityFullnessBar").style.width = "100%";
	}
	else if(cityFullnessBar < 20)
	{
		document.getElementById("cityFullnessBar").style.backgroundColor = "red";
		document.getElementById("cityFullnessBar").style.width = cityFullnessBar + "%";
	}
	else
	{
		document.getElementById("cityFullnessBar").style.backgroundColor = "lightblue";
		document.getElementById("cityFullnessBar").style.width = cityFullnessBar + "%";
	}
	
	document.getElementById("mineprc").value = (minesls * 100);
	document.getElementById("fieldsprc").value = (fieldssls * 100);
	document.getElementById("cityprc").value = (cityguards * 100);
}

function jsalert(boxName,content,ok)
{
	if(document.getElementById("jsalert").innerHTML == "")
	{
		document.getElementById("jsalert").innerHTML = "<div id=\"alertBox\"><div id=\"alertBoxControls\">"+boxName+"<button id=\"alertBoxClose\" onclick=\"closes(1)\">X</buton> </div><div id=\"alertBoxContent\"></div><button onclick=\"closes(1)\" id=\"alertBoxOk\">"+ok+"</button></div>";
		document.getElementById("jsalert").style.width = "100%";
		document.getElementById("jsalert").style.height = "600px";
		document.getElementById("alertBoxContent").innerHTML = content;
		document.getElementById("jsalertShadow").innerHTML = "<div id=\"alertBoxShadow\"></div>";
	}
	else
	{
		document.getElementById("jsalert2").innerHTML = "<div style=\"margin-left:170px;margin-top:120px;\" id=\"alertBox\"><div id=\"alertBoxControls\">"+boxName+"<button id=\"alertBoxClose\" onclick=\"closes(2)\">X</buton> </div><div id=\"alertBoxContent\"></div><button onclick=\"closes(2)\" id=\"alertBoxOk\">"+ok+"</button></div>";
		document.getElementById("jsalert2").style.width = "100%";
		document.getElementById("jsalert2").style.height = "600px";
		document.getElementById("alertBoxContent").innerHTML = content;
		document.getElementById("jsalertShadow2").innerHTML = "<div style=\"margin-top:100px;margin-left:200px;\" id=\"alertBoxShadow\"></div>";
	}
}
function closes(num)
{
	if(num == 1)
	{
		document.getElementById("jsalert").innerHTML = "";
		document.getElementById("jsalertShadow").innerHTML = "";
		document.getElementById("jsalert").style.width = "0%";
		document.getElementById("jsalert").style.height = "0px";
	}
	else if(num == 2)
	{
		document.getElementById("jsalert2").innerHTML = "";
		document.getElementById("jsalertShadow2").innerHTML = "";
		document.getElementById("jsalert2").style.width = "0%";
		document.getElementById("jsalert2").style.height = "0px";
	}
	
}
function put(what, where)
{
	document.getElementById(where).innerHTML = what;
}

function colony()
{
	population -= 1000;
	treasury -= 2000;
	granary -= 3000;
	document.getElementById("colony").innerHTML = "";
	wonBattles -= 1;
	main();
}

function end()
{
	document.getElementById("mainBox").innerHTML = "<div id=\"jsalert\"></div><div id=\"jsalertShadow\"></div>";
	jsalert("The end","Game Over!","you suck");
}