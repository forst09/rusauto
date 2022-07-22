'use strict';

$(document).ready(function () {

    // ОТКЛЮЧЕНИЕ ZOOM ЧЕРЕЗ СКРОЛЛ (В ТОМ ЧИСЛЕ ТРЕКАПАДАМИ В MACOS)
    document.addEventListener('mousewheel', function (e) {
        if (!e.ctrlKey && !e.metaKey) return;

        e.preventDefault();
        e.stopImmediatePropagation();
    }, { passive: false });

    // ОТКЛЮЧЕНИЕ ZOOM ПРИКОСНОВЕНИЯМИ (В ТОМ ЧИСЛЕ ТРЕКАПАДАМИ И Т.П.) В SAFARI И IOS
    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }, { passive: false });

    // ОТКЛЮЧЕНИЕ ZOOM ЧЕРЕЗ КЛАВИАТУРУ (CTRL + "+", CTRL + "-")
    // КНОПКИ БРАУЗЕРА ДЛЯ УПРАВЛЕНИЯ ZOOM ОТКЛЮЧЕНЫ НЕ БУДУТ
    document.addEventListener('keydown', function (e) {
        if (!e.ctrlKey && !e.metaKey) return;
        if (e.keyCode != 189 && e.keyCode != 187) return;

        e.preventDefault();
        e.stopImmediatePropagation();
    }, { passive: false });

    //ОТКРЫТИЕ МОБИЛЬНОГО МЕНЮ
    $(document).on('click', '.header-bottom__burger', function () {
        $('.mobile-menu').addClass('active');
        $('body').addClass('scroll-hide');
    });

    //ОТКРЫТИЕ МОДАЛЬНОГО КАТАЛОГА
    $(document).on('click', '.catalog-modal__btn', function () {
        $('.catalog-modal').addClass('active');
        $('body').addClass('scroll-hide');
    });

    //ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН
    $(document).on('click', '.close', function () {
        $(this).parents('.modal').removeClass('active');
        $('body').removeClass('scroll-hide');
    });

    //ОТКРЫТИЕ МОДАЛКИ С МОДЕЛЯМИ МАРОК НА МОБИЛКАХ
    if ($(window).width() < 668) {
        $(document).on('click', '.catalog-modal__spares .spares__item', function () {
            $('.catalog-groups').addClass('active');
        });

        //ЗАКРЫТИЕ МОДАЛКИ С МОДЕЛЯМИ МАРОК НА МОБИЛКАХ ПО КНОПКЕ НАЗАД
        $(document).on('click', '.catalog-groups .back', function () {
            $('.catalog-groups').removeClass('active');
        });
    }

    //ЗАКРЫТИЕ МОДАЛОК ПРИ ПЕРЕХОДЕ НА ЭЛЕМЕНТ ТАББАРА
    // $(document).on('click', '.tab-bar__item', function () {
    //     $('.modal').removeClass('active');
    // });

    // $(document).on('click', '.header-bottom__request-close', function () {
    //     $('.mobile-menu').removeClass('active');
    //     $('body').removeClass('scroll-hide');
    // });

    //ПОИСК НА 1024 В ШАПКЕ
    $(document).on('input', '.header-bottom__search-input', function () {
        $(this).parents('.header-bottom__search').find('.header-bottom__search-result').addClass('active');
        $(this).parents('.header-bottom__search').find('.header-bottom__search-close').addClass('active');
    });

    //ЗАКРЫТИЕ ПОИСКА НА 1024 В ШАПКЕ
    $(document).on('blur', '.header-bottom__search-input', function () {
        $(this).parents('.header-bottom__search').find('.header-bottom__search-result').removeClass('active');
        $(this).parents('.header-bottom__search').find('.header-bottom__search-close').removeClass('active');
        $(this).val('');
    });

    //ФИКСИРОВАННАЯ ШАПКА НА СКРОЛЛЕ 
    let header = document.querySelector('.header');
    let headerFix = document.querySelector('.header-fixed');
    let headerHeight = header.clientHeight + 200;
    document.onscroll = function () {
        let scroll = window.scrollY;

        if (scroll > headerHeight) {
            headerFix.classList.add('active');
        }
        else {
            headerFix.classList.remove('active');
        }
    };

    //ПОДКЛЮЧЕНИЕ СВАЙПЕРА ГЛАВНАЯ СТРАНИЦА ГЛАВНЫЙ ЭКРАН
    const swiperMain = new Swiper('.swiper-main', {
        speed: 700,
        slidesPerView: 1,
        autoHeight: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

    //ВОЗМОЖНОСТЬ КЛИКАТЬ ПО КНОПКЕ ГЛАВНОЙ СТРАНИЦЫ ГЛАВНОГО ЭКРАНА
    $('.btn-main').on('mousedown touchstart pointerdown', function (e) {
        e.stopPropagation();
    });

    // УБРАТЬ ОКОШКО С ПОДТВЕРЖДЕНИЕМ ГОРОДА ПО КНОПКЕ "ВЕРНО"
    $(document).on('click', '.choice-city .btn', function () {
        $('.choice-city').remove();
    });

    //ПОКАЗАТЬ КНОПКУ ПЕРЕЙТИ К... НА МОДАЛЬНОМ КАТАЛОГЕ
    // function showJumpBtn(maxHeight, sectionName) {

    // }
    // if ($(window).width() > 1499) {
    //     const heightParent = Math.floor(+$(".catalog-modal__groups-wrapper").css("max-height").split("px")[0]);
    //     const heightItems = [...$(".catalog-modal__groups-item")].reduce((acc, item) => acc + item.offsetHeight, 0);
    //     if (heightItems > heightParent) $(".catalog-modal__groups-container").addClass("width-100");
    //     console.log(heightItems, heightParent);
    //     if (heightItems > (heightParent * 2)) {
    //         $('.catalog-modal__groups-container .btn-jump__wrapper').addClass('active');
    //     }
    // }

    let container = $('.catalog-modal__groups-js');
    // console.log(container);
    let containerHeight = Math.floor(+$(container).css("max-height").split("px")[0]);
    let doubleContainerHeight = containerHeight * 2;
    // console.log(doubleContainerHeight);
    console.log(containerHeight);
    let containerElements = $(container).find('a');
    // console.log(containerElements);
    let heightAll = 0;
    containerElements.each(function () {
        let elementsHeight = $(this).outerHeight(true);
        // console.log(elementsHeight);
        heightAll = heightAll + elementsHeight;
    });
    // console.log(heightAll, containerHeight);
    if (heightAll > containerHeight) {
        $(".catalog-modal__groups-container").addClass("width-100");
    }
    if (heightAll > doubleContainerHeight) {
        console.log(heightAll, doubleContainerHeight);
        $('.catalog-modal__groups-container').find('.btn-jump__wrapper').addClass('active');
    }

    let containerSP = $('.catalog-modal .spares__container');
    // console.log(container);
    let containerSPHeight = Math.floor(+$(containerSP).css("max-height").split("px")[0]);
    let doublecontainerSPHeight = containerSPHeight * 2;
    // console.log(doubleContainerHeight);
    console.log(containerSPHeight);
    let containerSPElements = $(containerSP).find('.spares__item');
    // console.log(containerElements);
    let heightSPAll = 0;
    containerSPElements.each(function () {
        let elementsSPHeight = $(this).outerHeight(true);
        // console.log(elementsHeight);
        heightSPAll = heightSPAll + elementsSPHeight;
    });
    // console.log(heightAll, containerHeight);
    // if (heightSPAll > containerSPHeight) {
    //     $(".catalog-modal__groups-container").addClass("width-100");
    // }
    if (heightSPAll > doublecontainerSPHeight) {
        console.log(heightSPAll, doublecontainerSPHeight);
        $('.catalog-modal__spares').find('.btn-jump__wrapper').addClass('active');
    }

    //   ПОКАЗАТЬ КНОПКУ ПЕРЕЙТИ К... НА МОДАЛЬНОМ КАТАЛОГЕ
    // function showJumpBtn(divName, divNameElements, divParentName) {
    //     let container = $(`.${divName}`);
    //     console.log(container);
    //     let containerHeight = Math.floor(+$(container).css("max-height").split("px")[0]);
    //     let doubleContainerHeight = containerHeight * 2;
    //     // console.log(doubleContainerHeight);
    //     console.log(containerHeight);
    //     containerElements = $(container).find(`${divNameElements}`);
    //     // console.log(containerElements);
    //     let heightAll = 0;
    //     containerElements.each(function () {
    //         let elementsHeight = $(this).outerHeight(true);
    //         // console.log(elementsHeight);
    //         heightAll = heightAll + elementsHeight;
    //     });
    //     // console.log(heightAll, containerHeight);
    //     if (heightAll > containerHeight) {
    //         $(`.${divParentName}`).addClass("width-100");
    //     }
    //     if (heightAll > doubleContainerHeight) {
    //         console.log(heightAll, doubleContainerHeight);
    //         $(`.${divParentName}`).find('.btn-jump__wrapper').addClass('active');
    //     }
    // };

    // showJumpBtn('catalog-modal__groups-wrapper', 'a', 'catalog-modal__groups-container');



    // ПОДКЛЮЧЕНИЕ СВАЙПЕРА В СЕКЦИИ НА ЭКРАНАХ >= 1024
    if ($(window).width() >= 1024) {
        //ГЛАВНАЯ СТРАНИЦА СЕКЦИЯ "ТРАНСПОРТНЫЕ КОМПАНИИ, С КОТОРЫМИ МЫ РАБОТАЕМ"
        const swiperCompanies = new Swiper('.swiper-companies', {
            speed: 700,
            slidesPerView: 'auto',
            mousewheel: {
                invert: true,
            },
            breakpoints: {

                1024: {
                    spaceBetween: 72,
                },

                1500: {
                    spaceBetween: 120,
                },
            }
        });

        //ГЛАВНАЯ СТРАНИЦА СЕКЦИЯ "НАШИ ПАРТНЕРЫ"
        const swiperPartners = new Swiper('.swiper-partners', {
            speed: 700,
            slidesPerView: 'auto',
            mousewheel: {
                invert: true,
            },
            breakpoints: {

                1024: {
                    spaceBetween: 72,
                },

                1500: {
                    spaceBetween: 120,
                },
            }
        });



    }
    // map init
    const jsMap = document.querySelector("#map");
    const renderMap = function () {
        if ($("#map").length !== 0) {
            ymaps.ready(function () {
                let myMap = new ymaps.Map("map", {
                    center: [$(jsMap).attr("data-coords").split(",")[0],
                    $(jsMap).attr("data-coords").split(",")[1]],
                    zoom: $(window).width() > 667 ? 17 : 14,
                }),
                    // Создаём макет содержимого.
                    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<div class="icon-map">$[properties.iconContent]</div>'
                    ),
                    myPlacemarkWithContent = new ymaps.Placemark(
                        [$(jsMap).attr("data-coords").split(",")[0],
                        $(jsMap).attr("data-coords").split(",")[1]],
                        {},
                        {
                            // Опции.
                            // Необходимо указать данный тип макета.
                            iconLayout: "default#imageWithContent",
                            // Своё изображение иконки метки.
                            iconImageHref: "/upload/imgs_new/map-icon.png",
                            // Размеры метки.
                            iconImageSize: [150, 68],
                            // Смещение левого верхнего угла иконки относительно
                            // её "ножки" (точки привязки).
                            iconImageOffset: [-76, -68],

                            // Макет содержимого.
                            iconContentLayout: MyIconContentLayout,
                        }
                    );

                myMap.controls.remove("zoomControl");
                myMap.controls.remove("rulerControl");
                myMap.controls.remove("trafficControl");
                myMap.controls.remove("typeSelector");
                myMap.controls.remove("fullscreenControl");
                myMap.controls.remove("geolocationControl");
                myMap.controls.remove("searchControl");
                // jsMap.firstChild.remove();
                myMap.geoObjects
                    // .add(myPlacemark)
                    .add(myPlacemarkWithContent);
            });
        }
    };
    // renderMap();
    //check scroll to map block
    const creatMapsScript = function () {
        let scriptYMAPS = document.createElement("script");
        scriptYMAPS.src =
            "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=<ваш API-ключ>";
        scriptYMAPS.setAttribute("async", "");
        document
            .querySelector("body")
            .insertAdjacentElement("beforeend", scriptYMAPS);
        // let loader = `<div class="loader-catalog"><img src="/upload/imgs_new/loader.gif" alt="preloader"></div>`;
        // jsMap.insertAdjacentHTML("afterbegin", loader);
        scriptYMAPS.onload = function () {
            renderMap();
        };
    };

    const revealMapBlock = function (entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        creatMapsScript();
        observer.unobserve(entry.target);
    };

    const mapObserver = new IntersectionObserver(revealMapBlock, {
        root: null,
        threshold: 0.15,
    });
    if (jsMap) mapObserver.observe(jsMap);
});



