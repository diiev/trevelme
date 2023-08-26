const menu = () => {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    const close = document.querySelector('.menu__close');
    function showMenu () {
      
        burger.addEventListener('click', ()=> {
                burger.classList.add('burger__active');
                menu.classList.add('menu__active');
                menu.classList.add('fade');
            
               
        });
    }
  
    function closeMenu () {
       close.addEventListener('click', ()=> {
        burger.classList.remove('burger__active');
        menu.classList.remove('menu__active');
        menu.classList.remove('fade');
        menu.classList.add('fadeOut');
       });
    }
   
    showMenu();
    closeMenu();
};

export default menu;