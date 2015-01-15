// Global Namespace
var View = (function(window, document, undefined) {
        // the attribute of all view elements
        var viewAttribute = "[data-url]",
            // reference to the hash, which is used to switch views
            url = window.location.hash;
        
         /*
          * by default hide all views.
          * Using Array.prototype.forEach.call we can use forEach on the
          * nodeList (views).
          */
        var views = document.querySelectorAll(viewAttribute);
        Array.prototype.forEach.call(views, function(view) {
           view.style.display = 'none';    
        });
        
        // return some function to be used with View like View.setActive()
        return {
          // simply get the hash
          getHash: function() {
            return url;
          },
          // set a new hash
          setHash: function(hash) {
              window.location.hash = hash;
          },   
          // set a view as active
          setActive: function(url) {
            // update the URL
            View.setHash(url);
            // hide all views
            Array.prototype.forEach.call(views, function(view) {
               view.style.display = 'none';    
            });
            // get the current view based on the data-url 
            var view = document.querySelector('[data-url="' + url + '"]');
            // if there is no view, display the 404 view.
            if(!view) {
              view = document.querySelector('[data-url="/404"]');
            }
            // make the view "active"
            view.style.display = 'block';
          }
        }
      }(window, document));

// When the page is loaded, make the /home "View" active.
View.setActive('/home');

// get the navigation
var nav = document.querySelector('#nav');
// add a generic click event listener,
// when a child of nav is clicked the event will go up to the navigation,
// then stop (event.preventDefault()), then the href Tag is used
// to open the view associated with it.
nav.addEventListener('click', function(event) {
  // prevent the reload/change of the page
  event.preventDefault();
  // get the URL and remove unneeded stuff
  var url = event.target.href.replace(window.location.origin, '');
  // set the new Tab as active
  View.setActive(url);  
});