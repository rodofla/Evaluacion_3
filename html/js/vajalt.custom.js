/* vajalt custom script file */
$(function () {
    // PRELOADER
    $(window).preloader({ delay: 500 });
  
    // AUTO-CLOSE NAVBAR
    $('.navbar a.nav-link').on('click', () => {
      $('.navbar-toggler:visible').click();
    });
  
    // SHRINK HEADER
    $(document).on('scroll', () => {
      if ($(document).scrollTop() > 150) {
        $('.header-transparent').addClass('fixed-top');
      } else {
        $('.header-transparent').removeClass('fixed-top');
      }
    });
  
    // MAGNIFIC POPUP GALLERY
    $('.gallery-row').magnificPopup({ /* ...tu configuración... */ });
  
    // BACK TO TOP
    if ($('#back-to-top').length) {
      const backToTop = () => {
        $(window).scrollTop() > 100
          ? $('#back-to-top').addClass('show')
          : $('#back-to-top').removeClass('show');
      };
      backToTop();
      $(window).on('scroll', backToTop);
      $('#back-to-top').on('click', e => {
        e.preventDefault();
        $('html,body').animate({ scrollTop: 0 }, 700);
      });
    }
  
    // YOUTUBE POPUP, WOW, TOOLTIP, POPOVER, SMOOTH SCROLL...
    $('.modal-video').magnificPopup({ type: 'iframe' });
    new WOW({ boxClass: 'wow', animateClass: 'animated', offset: 0, mobile: true, live: true }).init();
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    smoothScroll.init({ selector: '[data-scroll]', speed: 1000, easing: 'easeInOutCubic', offset: 70 });
  
    // CAROUSELS
    $('.carousel-cards').owlCarousel({ loop: true, margin: 15, nav: false, responsive: { 0:{ items:1 }, 600:{ items:2 }, 1000:{ items:3 } } });
    $('.carousel-testimonials').owlCarousel({ loop: true, margin: 15, nav: false, responsive: { 0:{ items:1 }, 600:{ items:1 }, 1000:{ items:1 } } });

    $('.gallery-carousel').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        responsive: {
          0:   { items: 1 },
          600: { items: 2 },
          1000:{ items: 3 }
        }
      });
      
  
    // CARGA DINAMICA DE PRODUCTOS
    const cats = [
        { key: 'all',      selector: '#pc-all' },
        { key: 'Mixes',    selector: '#pc-mixes' },
        { key: 'Hierbas',  selector: '#pc-hierbas' },
        { key: 'Semillas', selector: '#pc-semillas' },
        { key: 'Frutas',   selector: '#pc-frutas' },
        { key: 'Marinos',  selector: '#pc-marinos' },
        { key: 'Base',     selector: '#pc-base' },
      ];
    
      // función auxiliar para pintar un array en un contenedor
      function renderProducts(list, $container) {
        list.forEach(prod => {
          $container.append(`
            <div class="col-md-4 mb20">
              <article class="media">
                <a class="g-width-100" href="#">
                  <img class="img-fluid rounded-circle mr-4 product-img"
                       src="${prod.img}" alt="${prod.title}">
                </a>
                <div class="media-body align-self-center g-pl-10">
                  <h3 class="text-white font400 h6 mb5">${prod.title}</h3>
                  <p class="mb-0 text-white-gray">${prod.desc}</p>
                </div>
              </article>
            </div>`);
        });
      }
    
      // renderizar cada categoría
      cats.forEach(cat => {
        const filtered = cat.key === 'all'
          ? window.productos
          : window.productos.filter(p => p.category === cat.key);
        renderProducts(filtered, $(cat.selector));
      });

      // free maps
      document.addEventListener('DOMContentLoaded', function(){
        var map = L.map('markermap').setView([-41.474, -72.938], 13); // Ajusta coords
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap',
          maxZoom: 19
        }).addTo(map);
    
        L.marker([-41.474, -72.938]).addTo(map)
          .bindPopup('Av. Principal 123, Puerto Montt')
          .openPopup();
      });
  });
  