//Goto URL ---------------------------------------------
function MM_goToURL() { //v3.0
  var i, args=MM_goToURL.arguments; document.MM_returnValue = false;
  for (i=0; i<(args.length-1); i+=2) eval(args[i]+".location='"+args[i+1]+"'");
}


//Load Header and Footer ---------------------------------------------
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};


//Open Tab ---------------------------------------------
function openInNewTab(url) {
	var win = window.open(url, '_blank', 'noreferrer,noopener');
	win.focus();
}


//Smooth Tab ---------------------------------------------


if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

function wheel(event) {
    var delta = 0;
    if (event.wheelDelta) delta = event.wheelDelta / 50;
    else if (event.detail) delta = -event.detail / 3;

    handle(delta);
    if (event.preventDefault) event.preventDefault();
    event.returnValue = false;
}

var goUp = true;
var end = null;
var interval = null;

function handle(delta) {
	var animationInterval = 15; //lower is faster
  var scrollSpeed = 15; //lower is faster

	if (end == null) {
  	end = $(window).scrollTop();
  }
  end -= 50 * delta;
  goUp = delta > 2;

  if (interval == null) {
    interval = setInterval(function () {
      var scrollTop = $(window).scrollTop();
      var step = Math.round((end - scrollTop) / scrollSpeed);
      if (scrollTop <= 0 || 
          scrollTop >= $(window).prop("scrollHeight") - $(window).height() ||
          goUp && step > -1 || 
          !goUp && step < 1 ) {
        clearInterval(interval);
        interval = null;
        end = null;
      }
      $(window).scrollTop(scrollTop + step );
    }, animationInterval);
  }
}


/* Smooth Scroll on anchor*/
$(".sscroll").on("click", function(event){
    //check the value of this.hash
    if(this.hash !== ""){
        event.preventDefault();

        $("html, body").animate({scrollTop:$(this.hash).offset().top}, 300);

        //add hash to the current scroll position
        window.location.hash = this.hash;
		
    }

});


//News Photo LightBox ---------------------------------------------
$('.thumbnail').click(function(){
  	$('.modal-body').empty();
  	var title = $(this).parent('a').attr("title");
  	$('.modal-title').html(title);
  	$($(this).parents('div').html()).appendTo('.modal-body');
  	$('#myModal').modal({show:true});
});

/* blur on modal open, unblur on close */
$('#myModal').on('show.bs.modal', function () {
   $('.col-6,.row .thumbnail').addClass('blur');
})

$('#myModal').on('hide.bs.modal', function () {
   $('.col-6,.row .thumbnail').removeClass('blur');
})

    // prevent navigation
    document.addEventListener("DOMContentLoaded", function() {
      var links = document.getElementsByTagName("A");
      for(var i=0; i < links.length; i++) {
        links[i].addEventListener("click", function(e) {
          var href = this.getAttribute("href")

          if (!href) {
            return
          }

          if (href === '#') {
            // hash only ('#')
            console.debug('Internal nav allowed by Codeply');
            e.preventDefault()
          }
          else if (this.hash) {
            // hash with tag ('#foo')
            var element = null
            try {
              element = document.querySelector(this.hash)
            }
            catch(e) {
              console.debug('Codeply internal nav querySelector failed')
            }
            if (element) {
              // scroll to anchor
              e.preventDefault();
              const top = element.getBoundingClientRect().top + window.pageYOffset
              //window.scrollTo({top, behavior: 'smooth'})
              window.scrollTo(0,top)
              console.debug('Internal anchor controlled by Codeply to element:' + this.hash)
            }
            else {
              // allow javascript routing
              console.debug('Internal nav route allowed by Codeply');
            }
          }
          else if (href.indexOf("/p/")===0 || href.indexOf("/v/")===0) {
            // special multi-page routing
            console.debug('Special internal page route: ' + href)

            var l = href.replace('/p/','/v/')

            // reroute
            e.preventDefault()
            var newLoc = l + '?from=internal'
            console.debug('Internal view will reroute to ' + newLoc) 
            location.href = newLoc
          }
          else if (href.indexOf("./")===0) {
            // special multi-page routing
            console.debug('Special internal ./ route: ' + href)

            var u = parent.document.URL.split("/")
            var pn = href.split("/")[1]
            var plyId = u[u.length-1]

            if (plyId.indexOf('?from')>-1) {
              // already rerouted this
              console.debug('already rerouted')
              plyId = u[u.length-2]
            }

            var l = plyId + '/' + pn
            
            console.debug(u)
            console.debug(pn)
            console.debug('l',l)

            // reroute
            e.preventDefault()
            var newLoc = '/v/' + l + '?from=internal'
            console.debug('Internal page will reroute to ' + newLoc) 
            location.href = newLoc
          }
          else {
            // no external links
            e.preventDefault();
            console.debug('External nav prevented by Codeply');
          }
          //return false;
        })
      }
    }, null);
	
	
	

	
	