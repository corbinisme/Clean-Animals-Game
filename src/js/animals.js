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
	gallery: $( "#gallery" ),
	trash: $( "#trash" ),
	trash_icon: "<a href='link/to/trash/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-trash'>Delete image</a>",
	recycle_icon: "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>",
	
	initDragging:function(){
		// There's the gallery and the trash
	    //const $gallery = $( "#gallery" );
	    
	 
	    // Let the gallery items be draggable
	    $( "li", animals.gallery ).draggable({
	      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
	      revert: "invalid", // when not dropped, the item will revert back to its initial position
	      containment: "document",
	      helper: "clone",
	      cursor: "move",
	       	 start: function( event, ui ) {
	              $(this).addClass('original'); 
	              $(ui.helper).addClass("animate")
	         },
	         stop: function( event, ui ) {
	              $(this).removeClass('original');
	              $(ui.helper).removeClass("animate") 
	         }
	    });
	 
	    // Let the trash be droppable, accepting the gallery items
	    animals.trash.droppable({
	      accept: "#gallery > li",
	      classes: {
	        "ui-droppable-active": "ui-state-highlight"
	      },
	      drop: function( event, ui ) {
	        animals.deleteImage("trash", ui.draggable );
	      }
	    });

	    $("#table").droppable({
	      accept: "#gallery > li",
	      classes: {
	        "ui-droppable-active": "ui-state-highlight"
	      },
	      drop: function( event, ui ) {
	        animals.deleteImage("table", ui.draggable );
	      }
	    });
	 
	    // Let the gallery be droppable as well, accepting items from the trash
	    animals.gallery.droppable({
	      accept: "#trash li, #table li",
	      classes: {
	        "ui-droppable-active": "custom-state-active"
	      },
	      drop: function( event, ui ) {
	        animals.recycleImage( ui.draggable );
	      }
	    });

	    // Resolve the icons behavior with event delegation
	    $( "ul.gallery > li" ).on( "click", function( event ) {
	      var $item = $( this ),
	        $target = $( event.target );
	 
	      if ( $target.is( "a.ui-icon-trash" ) ) {
	        animals.deleteImage( $item );
	      } else if ( $target.is( "a.ui-icon-refresh" ) ) {
	        animals.recycleImage( $item );
	      }
	 
	      return false;
	    });
	},
	deleteImage(id, $item ) {
    	var $node = $("#"+id);
      	$item.fadeOut(function() {
        var $list = $( "ul", $node ).length ?
          $( "ul", $node ) :
          $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $node );
 
        $item.find( "a.ui-icon-trash" ).remove();
        $item.append( animals.recycle_icon ).appendTo( $list ).fadeIn(function() {
          $item
            .animate({ width: "48px" })
            .find( "img" )
              .animate({ height: "36px" });
        });
      });
    },
    recycleImage:function( $item ) {
      $item.fadeOut(function() {
        $item
          .find( "a.ui-icon-refresh" )
            .remove()
          .end()
          .css( "width", "96px")
          .append( animals.trash_icon )
          .find( "img" )
            .css( "height", "72px" )
          .end()
          .appendTo( animals.gallery )
          .fadeIn();
      });
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
         i = 0; i < len; i ++)
     {
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
         
         //we don't need the transfer data, but we have to define something
         //otherwise the drop action won't work at all in firefox
         //most browsers support the proper mime-type syntax, eg. "text/plain"
         //but we have to use this incorrect syntax for the benefit of IE10+
         e.dataTransfer.setData('text', '');
     
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
			animals.createCritter(el.name, el.image, "clean", el.letter);
		})
		animals.master.unclean.forEach(function(el){
			animals.createCritter(el.name, el.image, "unclean", el.letter);
		});
		animals.initDragDrop();
	},
}

animals.init();