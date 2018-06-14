(function() {
	const form = document.querySelector('#search-form');
	const searchField = document.querySelector('#search-keyword');
	let searchedForText;
	const responseContainer = document.querySelector('#response-container');

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		responseContainer.innerHTML = '';
		searchedForText = searchField.value;

		// Fetch images
		let urlI = `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`;
		// Different forms of the init object are acceptable
		// 1)
		// let init = {
		//  method: 'GET',
		// 	headers: 'Authorization': 'Client-ID ...'
		// };
		// 2)
		let myHeadersImg = new Headers();
		myHeadersImg.append('Authorization', 'Client-ID 2a4997c13b56aa20b8b4ab2102af44e494bf3b5b88d8e436412c3bdee3efd8f5');
		let initI = {
			method: 'GET',
			headers: myHeadersImg
		}
		fetch(urlI, initI).then(function(response) {
				return response.json();
			})
			.then(addImage)
			.catch(e => requestError(e, 'image'));

		// Fetch articles
		let initArt = {
			method: 'GET'
			// no headers needed for NyTimes
		}
		let urlArt = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=a33977d7b8c442c9a1074689e4f7c90f`;
		fetch(urlArt)
			.then(response => response.json())
			.then(addArticles)
			.catch(e => requestError(e, 'articles'));
	});

	// Functions to pass to the .done() method.
	function addImage(data) {
		let htmlContent;
		// const data = JSON.parse(this.responseText); <- jQuery returns already json
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

	function addArticles(artData) {
		// const artData = JSON.parse(this.responseText);
		const artResults = artData.response.docs;
		// console.log(artResults);
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

	function requestError(error, part) {
		console.log(error);
		let htmlContent = `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`;
		responseContainer.insertAdjacentHTML('beforeend', htmlContent);
	}

})();