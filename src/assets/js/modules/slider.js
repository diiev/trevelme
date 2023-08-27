import { tns } from "tiny-slider";


const slider = () => { 
   
    const sliderFeed = tns({
        container: '.feedback__slider',
        items: 1,
        nav: true,
        navPosition: 'bottom',
        controls: true,
        controlsContainer: ".feedback__slider-btns",
        autoplay: true,
        autoplayButtonOutput: false,
        "autoplayHoverPause": true,
        "autoplayTimeout": 3500,
        
    
    });
    const sliderBlog = tns({
        container: '.blog__slider',
        items: 2,
        nav: false,
        controls: true,
        "fixedWidth": 256.896,
        gutter: 30,
        controlsContainer: ".blog__slider-btns",
        autoplay: true,
        autoplayButtonOutput: false,
        "autoplayHoverPause": true,
        "autoplayTimeout": 3500,
        responsive: {
            1440: {
                "fixedWidth": 326.997,
                gutter: 44,
                edgePadding: 1,
            }
        }
    
    });
    
};
export default slider;