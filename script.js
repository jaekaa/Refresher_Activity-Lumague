document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.navigation a');

    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove 'active' class from all navigation links
            navLinks.forEach(navLink => navLink.classList.remove('active'));

            // Add 'active' class to the clicked navigation link
            link.classList.add('active');
        });
    });
});

// JavaScript to handle smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const sectionId = this.getAttribute('href').substring(1);
        
        // Special case for "projects" section
        if (sectionId === "projects") {
            // Scroll to the top of the section
            document.getElementById(sectionId + "-section").scrollIntoView({
                behavior: 'smooth'
            });
        } else {
            // Scroll to the section as usual
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Clicking image on projects
document.addEventListener('DOMContentLoaded', function() {
    const links = [
        "https://github.com/jaekaa/CRUDIFY-APP",
        "https://github.com/jaekaa/DungeonCodeApp",   
        "https://github.com/jaekaa/Invitation-Page"   
    ];

    // Selecting all images in the carousel
    const images = document.querySelectorAll("#projects .carousel img");

    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            window.open(links[index], "_blank");
        });
    });
});



// PROJECT JS:
document.addEventListener('DOMContentLoaded', function() {

    function HoverCarousel( elm, settings ){
        this.DOM = {
        scope: elm,
        wrap: elm.querySelector('ul').parentNode
        }
        
        this.containerWidth = 0;
        this.scrollWidth = 0;
        this.posFromLeft = 0;    // Stripe position from the left of the screen
        this.stripePos = 0;    // When relative mouse position inside the thumbs stripe
        this.animated = null;
        this.callbacks = {}
        
        this.init()
    }
    
    HoverCarousel.prototype = {
        init(){
        this.bind()
        },
        
        destroy(){
        this.DOM.scope.removeEventListener('mouseenter', this.callbacks.onMouseEnter)
        this.DOM.scope.removeEventListener('mousemove', this.callbacks.onMouseMove)
        },
    
        bind(){
        this.callbacks.onMouseEnter = this.onMouseEnter.bind(this)
        this.callbacks.onMouseMove = e => {
            if( this.mouseMoveRAF ) 
            cancelAnimationFrame(this.mouseMoveRAF)
    
            this.mouseMoveRAF = requestAnimationFrame(this.onMouseMove.bind(this, e))
        }
        
        this.DOM.scope.addEventListener('mouseenter', this.callbacks.onMouseEnter)
        this.DOM.scope.addEventListener('mousemove', this.callbacks.onMouseMove)
        },
        
        // calculate the thumbs container width
        onMouseEnter(e){
        this.nextMore = this.prevMore = false // reset
    
        this.containerWidth       = this.DOM.wrap.clientWidth;
        this.scrollWidth          = this.DOM.wrap.scrollWidth; 
        // padding in percentage of the area which the mouse movement affects
        this.padding              = 0.2 * this.containerWidth; 
        this.posFromLeft          = this.DOM.wrap.getBoundingClientRect().left;
        var stripePos             = e.pageX - this.padding - this.posFromLeft;
        this.pos                  = stripePos / (this.containerWidth - this.padding*2);
        this.scrollPos            = (this.scrollWidth - this.containerWidth ) * this.pos;
    
        // temporary add smoothness to the scroll 
        this.DOM.wrap.style.scrollBehavior = 'smooth';
        
        if( this.scrollPos < 0 )
            this.scrollPos = 0;
        
        if( this.scrollPos > (this.scrollWidth - this.containerWidth) )
            this.scrollPos = this.scrollWidth - this.containerWidth
    
        this.DOM.wrap.scrollLeft = this.scrollPos
        this.DOM.scope.style.setProperty('--scrollWidth',  (this.containerWidth / this.scrollWidth) * 100 + '%');
        this.DOM.scope.style.setProperty('--scrollLleft',  (this.scrollPos / this.scrollWidth ) * 100 + '%');
    
        // lock UI until mouse-enter scroll is finihsed, after aprox 200ms
        clearTimeout(this.animated)
        this.animated = setTimeout(() => {
            this.animated = null
            this.DOM.wrap.style.scrollBehavior = 'auto';
        }, 200)
    
        return this
        },
    
        // move the stripe left or right according to mouse position
        onMouseMove(e){
        // don't move anything until inital movement on 'mouseenter' has finished
        if( this.animated ) return
    
        this.ratio = this.scrollWidth / this.containerWidth
        
        // the mouse X position, "normalized" to the carousel position
        var stripePos = e.pageX - this.padding - this.posFromLeft 
        
        if( stripePos < 0 )
            stripePos = 0
    
        // calculated position between 0 to 1
        this.pos = stripePos / (this.containerWidth - this.padding*2) 
        
        // calculate the percentage of the mouse position within the carousel
        this.scrollPos = (this.scrollWidth - this.containerWidth ) * this.pos 
    
        this.DOM.wrap.scrollLeft = this.scrollPos
        
        // update scrollbar
        if( this.scrollPos < (this.scrollWidth - this.containerWidth) )
            this.DOM.scope.style.setProperty('--scrollLleft',  (this.scrollPos / this.scrollWidth ) * 100 + '%');
    
        // check if element has reached an edge
        this.prevMore = this.DOM.wrap.scrollLeft > 0
        this.nextMore = this.scrollWidth - this.containerWidth - this.DOM.wrap.scrollLeft > 5
        
        this.DOM.scope.setAttribute('data-at',
            (this.prevMore  ? 'left ' : ' ')
            + (this.nextMore ? 'right' : '')
        )
        }
    }
                
    var carouselElm = document.querySelector('.carousel')
    new HoverCarousel(carouselElm)                          
});
