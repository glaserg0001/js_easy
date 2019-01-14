// TASK 1
let TextCounter = function () {
    this.maxChar = 140,
    this.textArea = null,
    this.textAreaTotal = null,
    this.textAreaLeft = null,
    this.init = () => {
        this.textArea = document.querySelector('#js-message');
        this.textAreaTotal = document.querySelector('#js-message-left-total');
        this.textAreaLeft = document.querySelector('#js-message-left-symbols');

        this.events();
    },

    this.events = () => {
        this.putCounter();
        this.textArea.addEventListener('keyup', this.putCounter.bind(this));
        this.textArea.addEventListener('keydown', this.validateCount.bind(this));
    },

    this.listener = () => {
        let countChar = this.textArea.value.length;
        let countCharLeft = this.maxChar - countChar;
        return {
            countChar: countChar,
            countCharLeft: countCharLeft
        };
    },

    this.putCounter = () => {
        let total = this.listener();

        this.textAreaTotal.innerHTML = total.countChar;
        this.textAreaLeft.innerHTML = total.countCharLeft;
    },

    this.validateCount = (e) => {
        let k = e.keyCode;
        let total = this.listener();

        if (total.countCharLeft <= 0 ) {
            if (k == 8 || (k >= 35 && k <= 40) || k == 45 || k == 46) {
                return;
            };
            // this.textArea.value = this.textArea.value.substring(0, this.maxChar - 1);
            event.preventDefault();
        }
    };
};

let textCounter = new TextCounter();
textCounter.init();

// TASK 2

var Loader = (function() {
    'use strict';
    return {
        init: function() {
            this.loader = document.getElementById('loader');
            this.preogressBar = document.getElementById('loaderProgressBar');
            this.loaderPercent = document.getElementById('loaderPercent');
            this.images = document.getElementsByTagName('img');
            this.loaderHide = " loader-hide";

            this.events();
        },

        events: function() {
            this.loadImage(this.loadedCallback.bind(this));
        },

        loadImage: function(callback) {
            let self = this;
            let numbImages = self.images.length;

            let listImages = self.images;

            let counter = 0;

            // [...arrImages]
            let arrImages = [].slice.call(listImages);
            arrImages.forEach(item => {
                item.onload = item.onerror = function () {
                    counter++;
                    if (counter == numbImages) {
                        callback();
                    }
                    self.increaseProgressBar(numbImages, counter);
                };
            });

            // for(var i = 0; i < numb; i++) {

            //     self.images[i].onload = self.images[i].onerror = function () {
            //         counter++;
            //         if (counter == self.images.length) callback();
            //         self.increaseProgressBar(numb, counter);
            //     };
            // };
        },

        increaseProgressBar: function(numb, count) {
            let percent = count / numb * 100;
            this.preogressBar.style.width = percent + '%';
            this.loaderPercent.innerHTML = percent.toFixed(0) + '%';
        },

        loadedCallback: function() {
            this.loader.className += this.loaderHide;
        }
    };
})();

Loader.init();