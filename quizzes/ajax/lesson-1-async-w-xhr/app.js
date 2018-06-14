(function() {
	const form = document.querySelector('#search-form');
	const searchField = document.querySelector('#search-keyword');
	let searchedForText;
	const unsplashRequest = new XMLHttpRequest();
	const articleRequest = new XMLHttpRequest();


	const responseContainer = document.querySelector('#response-container');

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		responseContainer.innerHTML = '';
		searchedForText = searchField.value;

		// Image request
		unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
		unsplashRequest.onload = addImage;
		unsplashRequest.onerror = function(err) {
			requestError(err, 'image');
		}
		unsplashRequest.setRequestHeader('Authorization', 'Client-ID 2a4997c13b56aa20b8b4ab2102af44e494bf3b5b88d8e436412c3bdee3efd8f5');
		unsplashRequest.send();

		// Articles request
		articleRequest.onload = addArticles;
		articleRequest.onerror = function(err) {
			requestError(err, 'articles');
		}
		articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=a33977d7b8c442c9a1074689e4f7c90f`);
		articleRequest.send();
	});

	function addImage() {
		let htmlContent;
		const data = JSON.parse(this.responseText);
		const firstImage = data.results[0];
		if (data && data.results && data.results[0]) {
			htmlContent = `<figure>
        <img src="${firstImage.urls.regular}" alt="${searchedForText}">
        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
		} else {
			htmlContent = `<div class="error-no-image">No images available</div>`;
		}
		responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
	}

	function addArticles() {

		const artData = JSON.parse(this.responseText);
		const artResults = artData.response.docs;
		console.log(artResults);
		let htmlContent;
		if (artData && artResults && artResults[0]) {
			const ul = document.createElement('ul');

			let oldHeadline = '';
			for (let art of artResults) {
				if (art.headline.main !== oldHeadline) { // avoid repeating articles
					oldHeadline = art.headline.main;
					const content = document.createElement('li');
					content.classList.add('article');
					let innerContent =
						`<h2><a href="${art.web_url}">${art.headline.main}</a></h2>
					    <p>${art.snippet}</p>
              <p><small>Source: ${art.source}</small></p>
					`;
					content.insertAdjacentHTML('afterbegin', innerContent);
					ul.appendChild(content);
				}
			}
			responseContainer.appendChild(ul);
		} else {
			htmlContent = `<div class="error-no-articles">No articles available</div>`;
			responseContainer.insertAdjacentHTML('beforeend', htmlContent);
		}
	}

})();