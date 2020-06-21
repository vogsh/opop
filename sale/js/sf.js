'use strict';

;
(function (doc) {

	var app = {
		languages: {
			en: {
				lang: 'EN',
				content: {
					copyright: 'Copyright. All rights reserved.',
					links: ['<a href="terms.html" target="_blank"></a><span style="font-size:inherit;line-height:1.4;"></span>', '<a href="privacy.html" target="_blank">Privacy Policy</a><span style="font-size:inherit;line-height:1.4;"></span>', '<a class="footer__feedback-btn" href="feedback.html" target="_blank"></a>'],
					confirmMassage: 'By clicking the «order» button you confirm that you have read <a href="privacy.html" target="_blank">Privacy Policy</a> and give your consent to the procession of your personal data'
				}
			}
		},
		getLang: function getLang(urlParams) {
			// urlParams - это данные get параметров с бэкэнда, которые можно розпарсить и вернуть строку с языком
			if (!urlParams) {
				// если бэкэнд не прислал язык - значить дэфолтный 1-ый
				return this.languages.en.lang;
			} else {
				// здесь нужно распарсить url и вернуть строковое значение страны. Например 'es', 'it', etc...
				return urlParams;
			}
		},
		getStyle: function getStyle(elem) {
			return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
		},
		createElement: function createElement(element, classElement) {
			element = element || 'DIV';
			classElement = classElement || 'default-class';
			var el = doc.createElement(element);
			el.className = classElement;
			return el;
		},
		appendElement: function appendElement(what, where) {
			var parent = doc.querySelector(where);
			parent.appendChild(what);
		},
		showElement: function showElement(elem) {
			elem.style.display = 'block';
		},
		hideElement: function hideElement(elem) {
			elem.style.display = 'none';
		},
		init: function init() {
			var addElem = this.appendElement;
			var getCss = this.getStyle;
			var currentLang = this.getLang(); // в getLang можно передать переменную с url, где можно вытащить страну
			var footerContent = 0;
			var langs = this.languages;

			// создаем футер и наполняем его содержимым
			var footer = this.createElement('DIV', 'footer');
			var footerList = this.createElement('DIV', 'footer__list');
			var copy = this.createElement('DIV', 'footer__copyright');
			var confirmMassage = this.createElement('P', 'footer__cm');

			addElem(footer, 'BODY');
			footer.innerHTML = '<div class="footer__in"></div>';
			addElem(copy, '.footer__in');
			addElem(footerList, '.footer__in');
			addElem(confirmMassage, '.footer__in');

			for (var k in langs) {
				// здесь основная логика по созданию футеров под каждую страну
				if (langs[k].lang === currentLang /* && currentLang === 'en' */ ) {
					// текущая итерация === текущему языку и текущий язык === английский
					footerContent = langs[k].content;
				}
			}
			if (footerContent === 0) {
				footerContent = langs.en.content;
			}
			for (var key in footerContent) {
				if (key === 'copyright') {
					var copyTxt = footerContent[key];
					copy.innerHTML = new Date().getFullYear() + ' ' + copyTxt;
				}
				if (key === 'links') {
					var footerLi = footerContent[key].join('');
					footerList.innerHTML = footerLi;
				}
				if (key === 'confirmMassage') {
					var footerConfirmMassage = footerContent[key];
					confirmMassage.innerHTML = footerConfirmMassage;
				}
			}
			var lnk = doc.querySelectorAll('.footer a');
			var footerFeedbackButton = doc.querySelector('.footer__feedback-btn');
			footerList.style.cssText = 'padding:0px;margin:10px 0 0;line-height:1.4;';
			footer.style.cssText = 'text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1;color:#474747;padding:40px 0;background: #fff;'
			lnk.forEach(function (elem) {
				elem.style.cssText = 'display:inline-block;vertical-align:bottom;padding:0 5px;font-size:inherit;line-height:inherit;color:inherit;text-decoration:none;';
			});
			footerFeedbackButton.style.cssText = 'display:inline-block;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:inherit;line-height:inherit;color:inherit;text-decoration:none;padding-left:27px;cursor:pointer;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAMCAYAAAHzImYpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0NmFlN2NhOS0yMDM3LWJkNDYtOTlmMi0yMjI1ZjJjZDM4YmYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU0RUNENzAxRUUwMTFFOEIyODRFMEU4NzMyRTQ4NEQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU0RUNENkYxRUUwMTFFOEIyODRFMEU4NzMyRTQ4NEQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTA3NzI0NjctNmFmMy00MGFjLWIyNDktNjlkNmQ4NTcyZDhlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YTBhMTc2ZDgtNjRiNC04MTRhLWI5ZjctMTQxNjY3YjYzMTcyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+89GJJAAAAVpJREFUeNpibGqbPJuBgeEvEDOzAIkXQPwciCUBAogRKDMDyGAAiWaAGAABxAhVex6IpwFxLhDrAQQQXBkMgJQvA+JDUL4dE5CYgKRgAkAAgbTcBTIMgfgTAybgA9kB0rUfqqAOiOdDJRcAcQ1UfD/ILhcgZkNSIAvEtVA2SNwFIIBA1vUDGZwM2MF3kCkyQByKQ8EaJqjkJSySV4E4hAXK0QPiz0AsD+U/AmIeWKD4A7EyEPMCsQ4Q/4dKFgHxXZCCc1AM8sFHJN+sBjEAAgzki3tA2gbqd0EG4sE7IOYH4iNM0LhxA+KjQKwKxI+JwBpAfAKqbxnIEAloTOgD8WWooT04bAfF/XJostGF6pMAGcIEVSANxCuB+CcQVwNxKRDvBOJGIN4O5ZeBIgqIV0HVgwATKNDMgHgdNE04IdnaDcXoIAlKawHxZCBWAxlyHBpveQykgwdA/BYAbmlSeKHjCzAAAAAASUVORK5CYII=");background-position:2px 50%;background-repeat:no-repeat;';
			confirmMassage.style.cssText = 'margin: 20px 0 0;font-family:inherit;line-height:inherit;padding:0 5px';
			var hoverOnLinkHandler = function hoverOnLinkHandler(e) {
				var target = e.target;
				if (target.tagName === 'A') target.style.textDecoration = 'underline';
			};
			var outFromLinkHandler = function outFromLinkHandler(e) {
				var target = e.target;
				if (target.tagName === 'A') target.style.textDecoration = 'none';
			};
			footer.addEventListener('mouseover', hoverOnLinkHandler);
			footer.addEventListener('mouseout', outFromLinkHandler);
		}
	};
	app.init();
})(document);