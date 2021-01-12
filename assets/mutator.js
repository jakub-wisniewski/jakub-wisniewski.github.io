(function() {

// var inputs = $("#fieldset > input");
// inputs.each(function(i){
// 	var that = $(this)
// 	that.bind("click",function(){
// 		if(that.val() === "slow") {
// 			clearTimeout(loopVariable)
// 			mutate(5000)
// 		} else if (that.val() === "normal") {
// 			clearTimeout(loopVariable)
// 			mutate(1000)
// 		} else {
// 			clearTimeout(loopVariable)
// 			mutate(100)
// 		}
		
// 	})
// })

var charSet = "aąbcćdeęfghijklłmnńoóprqsśtuwyzźżAĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ~1234567890-=+!@#$%^&*()_+[]{}:;'?><,./";
var info = $("#info-text")
var mutationInfo = $("#mutation-info")
var mutationCounter = 0

var button = $("#mutate")
var pause = $("#pauseButton")
var wznow = $("#wznow")
var empty = $("#empty")

var $txt = $("#text") // blast-root 

empty.on("click",function(){
	$(this).hide();
	$txt.empty()
	$txt.html("<br><br><br><br>")
	$txt.attr('contenteditable','true')
	info.text("")
	mutationInfo.text("")
	mutationCounter = 0
})

button.on("click",function(){
	
	var that = $(this)
    if(that.val()==="stop"){
    	 // that.removeClass("yellowButton").addClass("greenButton")
         button.text("Mutuj")
         clearTimeout(loopVariable)
         button.val("start")

    } else {
    	mutate(1000)
    	
    }
	
})


function deletionMutation(arr,place,whatColor,animationTime){
	mutationInfo.html("Nastąpiła <strong><span style='color:"+whatColor+"'>mutacja delecji</span></strong> na " + (place+1) + " znaku.")
	arr.eq(place).css({color:whatColor})
		.velocity({
		    rotateZ: '720deg',
			top: -100,
			left:20,
			opacity:0.0
		  }, {
		    duration:animationTime,
			    complete: function() {
			     	arr.eq(place).remove()
			     	
			     	// button.prop('disabled', false)
			    }
			  })

}

function insertionMutation(arr,place,character,whatColor) {
	mutationInfo.html("Nastąpiła <strong><span style='color:"+whatColor+"'>mutacja insercji.</span></strong> Po " + (place +1) + " znaku dodano znak: " + charSet.charAt(character))
	arr.eq(place).after("<span class='blast'>"+charSet.charAt(character)+"</span>").next().css({color:whatColor})
		.velocity("transition.slideLeftIn", { stagger: 250 })	
}

function substitutionMutation(arr,place,character,whatColor) {
	mutationInfo.html("Nastąpiła <strong><span style='color:"+whatColor+"'> mutacja substytucji</span></strong> na " + (place+1) + " znaku.")
	arr.eq(place).text(charSet.charAt(character)).css({color:whatColor})
		.velocity("transition.slideUpIn", { stagger: 250 })	
}

var loopVariable

function mutate(speed) {
	// Blast the text apart by word.
	$txt.blast({
		delimiter: "character",
		tag: 'span',
		customClass: "" // Add a custom class to wrappers
	});
	var $spans = $(".blast")
	var len = $spans.length
	if(len !== 0) {
		empty.show()
		// button.removeClass("greenButton").addClass("yellowButton")
		button.val("stop")
		button.text("Zatrzymaj")
		$txt.attr('contenteditable','false');
		// button.prop('disabled', true)
		
		loopVariable = window.setInterval(function mainFunc(){
			
			$spans = $(".blast")
			len = $spans.length
			if(len !== 0 ) {
			mutationCounter += 1
			if(mutationCounter === 1) {
				info.text("Tekst po " + mutationCounter + " mutacji:")
			} else {
				info.text("Tekst po " + mutationCounter + " mutacjach:")
			}
			var whatMutation = Math.floor(Math.random(0,3)*3);
		
			
			var rand = Math.floor(Math.random(0,len)*len);
			var randomFromSet = Math.floor(Math.random(0,charSet.length)*charSet.length);

			// random color search:

			var randomColorFromArray = Math.floor(Math.random(0,colors.length)*colors.length);
			var randomColor = colors[randomColorFromArray]

			switch(whatMutation){
				case 0:
					deletionMutation($spans,rand,randomColor,speed-100)
					break
				case 1:
					substitutionMutation($spans,rand,randomFromSet,randomColor)
					break
				case 2:
					insertionMutation($spans,rand,randomFromSet,randomColor)
					break
			}
			return mainFunc
			}else{
				clearTimeout(loopVariable)
				button.prop('disabled', false)
				button.val("start")
				button.text("Mutuj")
				// button.removeClass("yellowButton").addClass("greenButton")
				$txt.attr('contenteditable','true');
				info.text("")
				mutationInfo.text("")
				empty.hide()
			}	
		}(),speed)
		

	} else {
		$txt.velocity("callout.shake")
		mutationInfo.text("Proszę wprowadzić tekst do zmutowania!")
		mutationCounter = 0;
	}

}

var colors = [
    "#008B8B",
    "#BCE5E5",
    "#000000",
    "#0000ff",
    "#a52a2a",
    "#00ffff",
    "#00008b",
    "#008b8b",
    "#a9a9a9",
    "#006400",
    "#bdb76b",
    "#8b008b",
    "#556b2f",
    "#ff8c00",
    "#9932cc",
    "#8b0000",
    "#e9967a",
    "#9400d3",
    "#ff00ff",
    "#ffd700",
    "#008000",
    "#4b0082",
    "#f0e68c",
    "#00ff00", 
    "#ff00ff",
    "#800000",
    "#000080",
    "#808000",
    "#ffa500",
    "#ffc0cb",
    "#800080",
    "#800080",
    "#ff0000",
    "#ffff00"
]

})();
 
