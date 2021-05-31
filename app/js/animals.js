var animals = {
	container: document.getElementById("gallery"),
	letters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
	master: {
		clean: [
			'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o'
		],
		unclean: [
			'p','q','r','s','t','u','v','w','x','y','z'

		]
	},
	state: {
		progress:{
			clean: 0,
			unclean: 0,
			mistakes: 0
		}
	},
	elems: {
		scoreGood: document.getElementById("goodScore"),
		scoreBad:  document.getElementById("badScore"),
	},
	audio: {
		effects: [
			{name:"chirp", id: "chirpy", src: "./audio/chirp.mp3"},
			{name:"pop", id: "poppy", src: "./audio/pop.mp3"}
		],
		players: []
	},
	createCritter:function(name, image, status, letter){
		let li = document.createElement("li");
		li.classList.add("ui-widget-content");
		li.setAttribute("data-draggable","item");
		li.setAttribute("data-id",letter);
		let header = document.createElement("h5");
		header.innerHTML = name;
		header.classList.add("ui-widget-header");
		li.append(header);
		
		if(image){
			let img = document.createElement("img");
			img.src = image;
			li.append(img);
		} else {
			let span = document.createElement("span");
			span.classList.add("animalFont");
			span.innerHTML = letter;
			li.append(span)
		}
		animals.container.append(li);

	},
	initDragDrop: function(){
		//exclude older browsers by the features we need them to support
     	//and legacy opera explicitly so we don't waste time on a dead browser
     if
     (
         !document.querySelectorAll 
         || 
         !('draggable' in document.createElement('span')) 
         || 
         window.opera
     ) 
     { return; }
     
     //get the collection of draggable items and add their draggable attribute
     for(var 
         items = document.querySelectorAll('[data-draggable="item"]'), 
         len = items.length, 
         i = 0; i < len; i ++){
			items[i].setAttribute('draggable', 'true');
		 }
 
		//variable for storing the dragging item reference 
		//this will avoid the need to define any transfer data 
		//which means that the elements don't need to have IDs 
		var item = null;
		
		//dragstart event to initiate mouse dragging
		document.addEventListener('dragstart', function(e)
		{
			//set the item reference to this element

			
			item = e.target;
			e.target.style.opacity = 0;
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData("text/plain", e.target);
			e.target.classList.add("dragging");

			let crt = e.target.cloneNode(true);
			crt.setAttribute("data-clones", "");
			crt.classList.add("currentGhost");
			document.body.appendChild(crt);

			document.getElementById("poppy").play();

			console.log("make sound!", e.target.getAttribute("data-id"))

		
		}, false);

		//dragstart event to initiate mouse dragging
		document.addEventListener('dragend', function(e)
		{
			
			//set the item reference to this element
			item = e.target;
			e.target.style.opacity = 1;
			e.target.classList.remove("dragging")
			document.querySelector(".currentGhost").remove();
		}, false);
	
		//dragover event to allow the drag by preventing its default
		//ie. the default action of an element is not to allow dragging 
		document.addEventListener('dragover', function(e)
		{


			if(e.target.classList.contains("dropArea")){
				console.log(e.target);
				if(e.target.classList.contains("hovering")){
					// already has it
				} else {
					e.target.classList.add("hovering")
				}
			}
			
			if(item)
			{
				e.preventDefault();
			}
		
		}, false);


		document.addEventListener('dragleave', function(e)
		{
			if(e.target.classList.contains("hovering")){
				e.target.classList.remove("hovering")
			} 
			if(item)
			{
				e.preventDefault();
			}
		
		}, false);
		
		
		document.addEventListener('drag', function(e)
		{
			
			let x = e.clientX;
			let y = e.clientY;
			const ghost = document.querySelector(".currentGhost");
			ghost.style.top = (y - 50) + "px";
			ghost.style.left = (x -15) + "px";

		
		}, false);
	
		//drop event to allow the element to be dropped into valid targets
		document.addEventListener('drop', function(e)
		{
			//if this element is a drop target, move the item here 
			//then prevent default to allow the action (same as dragover)

			// get the target and see which one it is

			if(e.target.classList.contains("hovering")){
				e.target.classList.remove("hovering")
			} 

			let id = e.target.id;
			let itemID = item.getAttribute("data-id");
			if(e.target.getAttribute('data-draggable') == 'target')
			{
				
				
				e.preventDefault();
				if(id=="table"){
					if(animals.master.clean.includes(itemID)){
						animals.state.progress.clean +=1;
						e.target.appendChild(item);
						window.setTimeout(function(){animals.showRandomCritter()}, 600)
					} else {
						alert("Nope!")
					}

				} else if(id=="trash"){
					if(animals.master.unclean.includes(itemID)){
						animals.state.progress.unclean +=1;
						e.target.appendChild(item);
						window.setTimeout(function(){animals.showRandomCritter()}, 600)
					} else {
						alert("Nope!")
					}
				} else {

				}
				animals.updateScore()
			}
		
		}, false);
		
		//dragend event to clean-up after drop or abort
		//which fires whether or not the drop target was valid
		document.addEventListener('dragend', function(e)
		{
			item = null;
		
		}, false);
	},
	getRandomNum: function(min, max){
		return Math.floor(Math.random() * (max - min) + min);
	},
	showRandomCritter: function(){
		let max = document.querySelectorAll(".source li").length;
		let indexCritter = animals.getRandomNum(1, max);
		let selector = document.querySelector("#gallery li:nth-child(" + indexCritter + ")");
		if(selector){
			selector.classList.remove("hide");
			selector.classList.add("selected")
		}

	},
	createAudio: function(dat){
		let aud = document.createElement("audio");

		aud.src = dat.src;
		aud.setAttribute("id", dat.id);
		aud.setAttribute("data-name", dat.name);
		aud.setAttribute("volume", 0.1);
		document.querySelector("body").append(aud)
	},
	init: function(){
		animals.master.clean.forEach(function(el){
			//animals.createCritter(el.name, el.image, "clean", el.letter);
		});
		animals.letters.forEach(function(l){
			let cleanUnclean = "clean";
			animals.createCritter(l, null, cleanUnclean, l)
		})
		animals.master.unclean.forEach(function(el){
			//animals.createCritter(el.name, el.image, "unclean", el.letter);
		});
		animals.initDragDrop();


		animals.audio.effects.forEach(function(el){
			animals.createAudio(el);
		});

		// set critter class
		let animalList = document.querySelectorAll("#gallery li");

		if(animalList.length){
			animalList.forEach(function(el, idx){
				el.classList.add("hide")
			})
		}
		window.setTimeout(function(){
			document.getElementById("intro").classList.remove("shown");
			animals.showRandomCritter();

		}, 100)
	},
	updateScore: function(){
		animals.elems.scoreGood.innerHTML = animals.state.progress.clean;
		animals.elems.scoreBad.innerHTML = animals.state.progress.unclean;
	},
}

animals.init();