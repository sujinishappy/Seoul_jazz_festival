// document.addEventListener('DOMContentLoaded', () => {   window.setTimeout(()
// => {     document.body.classList.remove('fade');   }); }); 마우스 커서 원 따라오는 스크립트
const $cursor = document.querySelector('.pointer');
document.addEventListener('mousemove', function (e) {
    $cursor.style.left = e.clientX + 'px';
    $cursor.style.top = e.clientY + 'px';
});

//로딩 페이지
$(document).ready(function () {
    const loader = $('.loader');
    const html = $('html');

    function hideLoader() {
        loader.addClass('hidden2');
        html.removeClass('no-scroll');
    }

    html.addClass('no-scroll');

    setTimeout(hideLoader, 3800);
});
//top button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    var topButton = document.getElementById("topButton");
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

// Scroll to the top of the page when the button is clicked
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//처음에 블라인드 부분 픽스되고 인터랙션 추가
$(function () {
    $(".quest").click(function () {
        var answer = $(this).next(".answer");
        $(".answer")
            .not(answer)
            .slideUp(); // 다른 답 닫기
        answer.slideToggle();
    });
});
//메인 택스트
$(document).ready(function () {
    var $start = $("#main-start .start-text");
    var $start2 = $("#main-start .start-text .text1");
    var $start21 = $("#main-start .start-text .text2");
    var $start22 = $("#main-start .flower");
    var $start3 = $("#main-start #blind");

    $(window).scroll(function () {
        var scrollPosition = $(window).scrollTop();
        var documentHeight = $(document).height();

        var threshold = 0.0;
        var threshold3 = 0.12;
        var threshold4 = 0.3;
        if (scrollPosition / documentHeight >= threshold) {
            $start.addClass("fixed");
            $start2.removeClass("animate__backOutUp");
            $start21.removeClass("animate__backOutUp2");
            $start22.removeClass("animate__backOutUp3");

            $start3.addClass("index");
        }
        if (threshold3 <= scrollPosition / documentHeight) {
            $start2.addClass("animate__backOutUp");
            $start21.addClass("animate__backOutUp2");
            $start22.addClass("animate__backOutUp3");
        }
        if (threshold4 <= scrollPosition / documentHeight) {
            $start.removeClass("fixed");
            $start3.removeClass("index");

        }
    });
});
//블라인드 오퍼시티 조절
document.addEventListener('scroll', function () {
    var blindBoxes = document.querySelectorAll('.blind_box');
    var scrollPosition = window.scrollY;

    blindBoxes.forEach(function (box, index) {
        // Calculate the height based on scroll position
        var height = Math.max(0, 10 - scrollPosition / (index + 1) / 20);
        var opacity = Math.max(0.6, 10 - scrollPosition / (index + 1) / 10);

        // Set the height and opacity of the box
        box.style.height = height + 'vh';
        box.style.opacity = opacity;

        // Set position to absolute to prevent affecting other elements
        box.style.position = 'absolute';

        // Calculate the top position based on the index
        var topPosition = index * 10 + 'vh';
        box.style.top = topPosition;
    });
});
//when where
setTimeout(() => {
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                $('.mid').addClass('animate__flipInX');
                $('.right').addClass('animate__flipInX');
            }
        });
    });

    let obs = document.querySelector('#content-set2 .mid');
    observer.observe(obs);
}, 4000); // 1초(1000밀리초) 후에 실행

setTimeout(() => {
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                $('.mid').removeClass('animate__flipInX');
                $('.right').removeClass('animate__flipInX');
            }
        });
    });

    let obs2 = document.querySelector('.card-frame');
    observer.observe(obs2);
}, 1000); // 1초(1000밀리초) 후에 실행

setTimeout(() => {
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                $('.mid').removeClass('animate__flipInX');
                $('.right').removeClass('animate__flipInX');
            }
        });
    });

    let obs3 = document.querySelector('#main-start');
    observer.observe(obs3);
}, 1000); // 1초(1000밀리초) 후에 실행
//악기 날라다니는 스크립트
class CardFlipOnScroll {
    constructor(wrapper, sticky) {
        this.wrapper = wrapper;
        this.sticky = sticky;
        this.cards = sticky.querySelectorAll('.card');
        this.length = this.cards.length;

        this.start = 0;
        this.end = 0;
        this.step = 0;
    }

    init() {
        this.start = this.wrapper.offsetTop - 100;
        this.end = this.wrapper.offsetTop + this.wrapper.offsetHeight - window.innerHeight * 1.2;
        this.step = (this.end - this.start) / (this.length * 2);
    }

    animate() {
        this
            .cards
            .forEach((card, i) => {
                const s = this.start + this.step * i;
                const e = s + this.step * (this.length + 1);

                if (window.scrollY <= s) {
                    card.style.transform = `
          perspective(100vw)
          translateX(100vw) 
          rotateZ(0deg)
        `;
                } else if (window.scrollY > s && window.scrollY <= e - this.step) {
                    card.style.transform = `
          perspective(100vw)
          translateX(${ 100 +
                            (window.scrollY - s) / (e - s) * -200}vw)
          rotateZ(${ 180 + -(
                        window.scrollY - (e - this.step)
                    ) / this.step * 90}deg)
        `;
                } else if (window.scrollY > e - this.step && window.scrollY <= e) {
                    card.style.transform = `
          perspective(100vw)
          translateX(${ 100 +
                            (window.scrollY - s) / (e - s) * -200}vw)
          rotateZ(${ 180 + -(
                        window.scrollY - (e - this.step)
                    ) / this.step * 90}deg)
        `;
                } else if (window.scrollY > e) {
                    card.style.transform = `
          perspective(100vw)
          translateX(100vw) 
          rotateZ(0deg)
        `;
                }
            });
    }
}

const mainContent1 = document.querySelector('.main-content-1');
const sticky = document.querySelector('.sticky');
const cardFlipOnScroll = new CardFlipOnScroll(mainContent1, sticky);
cardFlipOnScroll.init();

window.addEventListener('scroll', () => {
    cardFlipOnScroll.animate();
});

window.addEventListener('resize', () => {
    cardFlipOnScroll.init();
});

//세컨드 섹션 밖으로 나가면 블러
let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {} else {
            document
                .querySelector('#second')
                .classList
                .add('hidden');
            document
                .querySelector('#second')
                .classList
                .add('bgcolor');
        }
    });
});
let div3 = document.querySelector('#second');
observer.observe(div3);

//첫번째 텍스트 보이면 블러 해제
setTimeout(() => {
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                document
                    .querySelector('#second')
                    .classList
                    .remove('hidden');
            }
        });
    });

    let div = document.querySelector('.second_1');
    observer.observe(div);
}, 4000);
let bg = document.querySelector('#second');
observer.observe(bg);

//4번째 텍스트 백그라운드 제거
let observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            document
                .querySelector('#second')
                .classList
                .remove('bgcolor');
        } else {
            document
                .querySelector('.second_circle.sc3')
                .classList
                .remove('move4');
        }
    });
});
let bg2 = document.querySelector('.second_4');
observer2.observe(bg2);
//첫번째 텍스트
setTimeout(() => {
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                document
                    .querySelector('.second_circle.sc3')
                    .classList
                    .add('move0');
                document
                    .querySelector('.second_1')
                    .classList
                    .add('opacity1');
            } else {
                document
                    .querySelector('.second_circle.sc3')
                    .classList
                    .remove('move0');
                document
                    .querySelector('.second_1')
                    .classList
                    .remove('opacity1');
            }
        });
    });

    let div10 = document.querySelector('.second_1');
    observer.observe(div10);
}, 100);

//두번째 텍스트 보이면 원 움직
setTimeout(() => {
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                document
                    .querySelector('.second_circle.sc3')
                    .classList
                    .add('move');
                document
                    .querySelector('.second_2')
                    .classList
                    .add('opacity1');
            } else {
                document
                    .querySelector('.second_circle.sc3')
                    .classList
                    .remove('move');
                document
                    .querySelector('.second_2')
                    .classList
                    .remove('opacity1');
            }
        });
    });

    let div = document.querySelector('.second_2');
    observer.observe(div);
}, 100);

//세번째 텍스트 보이면 원 움직
setTimeout(() => {
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                document
                    .querySelector('.second_circle.sc3')
                    .classList
                    .add('move2');
                document
                    .querySelector('.second_3')
                    .classList
                    .add('opacity2');
            } else {
                document
                    .querySelector('.second_circle.sc3')
                    .classList
                    .remove('move2');
                document
                    .querySelector('.second_3')
                    .classList
                    .remove('opacity2');
            }
        });
    });

    let div5 = document.querySelector('.second_3');
    observer.observe(div5);
}, 100);
//ball
let observerball = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            document
                .querySelector('.ball')
                .classList
                .add('ballan');
        }else{
            document
                .querySelector('.ball')
                .classList
                .remove('ballan');
        }
    });
});
let div3b = document.querySelector('.second_5');
observerball.observe(div3b);

//돌아가는 카드에 도달하면 검정색 화면으로 전환
setTimeout(() => {
    let robserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                document
                    .querySelector('.third-box')
                    .classList
                    .add('transforms');
            }
        });
    });

    let rdiv = document.querySelector('.third-box');
    robserver.observe(rdiv);
}, 300);

setTimeout(() => {
    let robserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                document
                    .querySelector('.third-box')
                    .classList
                    .remove('transforms');
            }
        });
    });

    let rdiv = document.querySelector('.second_5');
    robserver.observe(rdiv);
}, 300);
//카드 슬라이드
let slides = document.querySelectorAll('.list-item');
let list = document.querySelector('.list');
let animatedSlides = [...slides];
let positions = [];
let timeline;
let circleLength;
let time = 0;

const RADIUS = 100;
const START_ANGLE = Math.PI / 2;
const MIN_SLIDES = 8;

// Slider Data
let currentIndex = 0;

const tweenObject = {
    angle: START_ANGLE
}

function setup() {
    if (slides.length < MIN_SLIDES) {
        cloneSlides();
    }

    setupPosition();
    setupTween();
}

function cloneSlides() {
    while (animatedSlides.length < MIN_SLIDES) {
        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];
            const clone = slide.cloneNode(true);
            list.appendChild(clone);
            animatedSlides.push(clone);
        }
    }
}

function setupPosition() {
    const width = animatedSlides[0]
        .getBoundingClientRect()
        .width;
    const padding = 250;
    circleLength = (width + padding) * animatedSlides.length;
    const radius = circleLength / (Math.PI * 2);

    for (let i = 0; i < animatedSlides.length; i++) {
        const slide = animatedSlides[i];

        const value = i / animatedSlides.length;
        const angle = value * Math.PI * 2;

        const x = Math.cos(angle - tweenObject.angle) * radius * 8/ 8;
        const y = Math.sin(angle - tweenObject.angle) * radius + radius;
        gsap.set(slide, {x, y});
    }
}

function setupTween() {
    document
        .getElementById('moveButton')
        .addEventListener('click', clickHandler);
}

function clickHandler() {
    currentIndex += 1;

    gsap.to(tweenObject, 1, {
        angle: START_ANGLE + (currentIndex / animatedSlides.length) * (Math.PI * 2),
        onUpdate: () => {
            setupPosition();
        }
    });

    console.log('current index: ' + currentIndex);
    console.log('active slide: ', slides[currentIndex]);
}
setup();

//모달창 JavaScript를 사용하여 모달을 제어
const modal = document.getElementById('openModal');
const modalImage = document.getElementById('modalImage');
const modalP = document.getElementById('modalP');
const modalP2 = document.getElementById('modalP2');

const closeModalButton = document.getElementById('closeModal');

const modalOpenButtons = document.querySelectorAll('.modal_open_btn');
modalOpenButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        modal.style.display = 'flex';

        modalImage.src = this.querySelector('img').src;

        const imageSrc = modalImage.src;
        const artistName = imageSrc.split('/').pop().replace('.jpg', '');

        const artistDescriptions = {
            'card1': '[ SERGIO MENDES ]',
            'card2': '[ MIKA ]',
            'card3': '[ damien rice ]',
            'card4': '[ Chris Botti ]',
            'card5': '[ Christian McBrides New Jawn ]',
            'card6': '[ Gregory Porter ]',
            'card7': '[ Justin Hurwitz Jazz ]',
            'card8': '[ AJR ]'
        };

        modalP.textContent = artistDescriptions[artistName] || '해당 아티스트에 대한 설명이 없습니다.';

        //
        const artistName2 = imageSrc.split('/').pop().replace('.jpg', '');

        const artistDescriptions2 = {
            'card1': 'Mas Que Nada / The Look of Love / Magalenha',
            'card2': 'Grace Kelly / Relax, Take It Easy / Happy Ending',
            'card3': 'The Blowers Daughte / Cannonbal / 9 Crimes',
            'card4': 'When I Fall in Love / The Look of Love / Embraceable You',
            'card5': 'Brother Mister / Technicolor Nightmare / The Shade of the Cedar Tree',
            'card6': 'Liquid Spirit / Hey Laura / Take Me to the Alley',
            'card7': 'La La Land / Whiplash / First Man',
            'card8': 'Bang! / Weak / Im Ready'
        };

        modalP2.textContent = artistDescriptions2[artistName2] || '해당 아티스트에 대한 설명이 없습니다.';

    });
});


closeModalButton.addEventListener('click', function () {
    modal.classList.add('rfadeIn2');
    modal.classList.remove('fadeIn2');
    setTimeout(function () {
        modal.style.display = 'none';
    }, 1000);
});


// 배경 클릭 시 모달 닫기
modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        modal.classList.add('rfadeIn2');
        modal.classList.remove('fadeIn2');
    setTimeout(function () {
        modal.classList
        .add('rfadeIn2');;
    }, 1000);
    }
});

$(function () {
    $('.modal_open_btn').click(function () {
        $('.modal').removeClass('rfadeIn2')
        $('.modal').addClass('fadeIn2')
        $('.modal-content').addClass('fadeIn22')
    });

});

let md3 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            document
                .querySelector('#openModal').classList.add('rfadeIn2');
        }
    });
});

let md2 = document.querySelector('#card_ro2');
md3.observe(md2);

// let md32 = new IntersectionObserver((entries) => {
// entries.forEach((entry) => {         const openModal =
// document.querySelector('#openModal');         if (!entry.isIntersecting) {
// 푸터가 보일 때의 동작             openModal.style.display = 'none';         }     });
// }); let md22 = document.querySelector('#footer'); md32.observe(md22);

setTimeout(() => {
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                document
                    .querySelector('#openModal').classList.add('rfadeIn2');
            }
        });
    });

    let div10 = document.querySelector('#forth');
    observer.observe(div10);
}, 100);

function addLastanClass() {
    const laContents = document.querySelectorAll('.la_content');
    let delay = 2600; // 딜레이 시간 (1초)

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lspElement = entry
                    .target
                    .querySelector('.lsp');
                setTimeout(() => {
                    lspElement
                        .classList
                        .add('lastan');
                }, 800);
            }
        });
    });

    laContents.forEach(laContent => {
        observer.observe(laContent);
    });
}

// DOM 로드 후 실행
document.addEventListener('DOMContentLoaded', () => {
    addLastanClass();
});

let last = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            document.querySelectorAll('.la_content .lsp').forEach(lspElement => {
                lspElement.classList.remove('lastan');
            });
        
        }
    });
});

let olast = document.querySelector('.circle');
last.observe(olast);