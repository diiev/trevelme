const menu = () => {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    const close = document.querySelector('.menu__close');
    function showMenu () {
      
        burger.addEventListener('click', ()=> {
                burger.classList.add('burger__active');
                menu.classList.add('menu__active');
             
            
               
        });
    }
  
    function closeMenu () {
       close.addEventListener('click', ()=> {
        burger.classList.remove('burger__active');
        menu.classList.remove('menu__active');
        
       });
    }
   
    showMenu();
    closeMenu();
};

export default menu;