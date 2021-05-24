var animals = {
	container: document.getElementById("gallery"),
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
	init: function(){
		animals.master.clean.forEach(function(el){
			animals.createCritter(el.name, el.image, "clean", el.letter);
		})
		animals.master.unclean.forEach(function(el){
			animals.createCritter(el.name, el.image, "unclean", el.letter);
		})
	},
}

animals.init();