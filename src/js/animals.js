var animals = {
	container: document.getElementById("gallery"),
	letters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
	master: {
		clean: [
			{name:"goat", image: "https://pngimage.net/wp-content/uploads/2018/06/ram-animal-png-2.png"},
			{name:"deer", letter:"i"},
			{name:"chicken", letter: "a"},
			{name:"cow", letter: "b"},
			{name:"giraffe", image: "http://pngimg.com/uploads/giraffe/giraffe_PNG13518.png"},
			{name:"grasshopper", letter: "c"}
		],
		unclean: [
			{name:"pig", letter: "d" },
			{name:"bear",image: "http://pluspng.com/img-png/wild-animals-png-wildlife-encounter-diagnosing-and-managing-infectious-disease-foundation-funded-studies-improved-knowledge-of-infectious-disease-risk-400.png"},
			{name:"hippo", image: "http://pngimg.com/uploads/hippo/hippo_PNG16.png"},
			{name:"shrimp", letter: "e"},
			{name:"horse", letter: "f"},
			{name:"bat" , letter: "g"},
			{name:"cockroach", letter: "h"},
			{name:"hawk", letter: "i"},

		]
	},
	createCritter:function(name, image, status, letter){
		let li = document.createElement("li");
		li.classList.add("ui-widget-content");
		li.setAttribute("data-draggable","item");
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
			//crt.style.display = "none"; /* or visibility: hidden, or any of the above */
			document.body.appendChild(crt);
			//e.dataTransfer.setDragImage(crt, 0, 0);
			/*
			var clone = e.target.cloneNode(true);
			e.target.parentNode.appendChild(clone);
			e.target.ghostDragger = clone;//SET A REFERENCE TO THE HELPER
			clone.classList.add("dragging");
			*/
			
			
			//setTimeout(function() { el.classList.remove('dragging'); }, 0);

			//we don't need the transfer data, but we have to define something
			//otherwise the drop action won't work at all in firefox
			//most browsers support the proper mime-type syntax, eg. "text/plain"
			//but we have to use this incorrect syntax for the benefit of IE10+
			//e.dataTransfer.setData('text', '');
		
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
			if(e.target.getAttribute('data-draggable') == 'target')
			{
				e.target.appendChild(item);
				
				e.preventDefault();
			}
		
		}, false);
		
		//dragend event to clean-up after drop or abort
		//which fires whether or not the drop target was valid
		document.addEventListener('dragend', function(e)
		{
			item = null;
		
		}, false);
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
	},
}

animals.init();