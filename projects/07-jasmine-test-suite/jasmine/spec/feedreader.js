/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
	let feed;
	let feedIndex = 0;
	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* TODO: Write a test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */

		it('have an URL and the URL is not empty', function() {
			// Testing a for Loop
			for (let i = 0; i < allFeeds.length; i++) {
				let feed = allFeeds[i];
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBe('');
			}
		});
		/* TODO: Write a test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('have a name defined and the name is not empty', function() {
			// Testing a forEach iterator
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBe('');
			});
		});
	});

	/* TODO: Write a new test suite named "The menu" */
	describe('The menu', function() {
		let spyEvent;
		let menuHidden;
		beforeEach(function() {
			spyEvent = spyOnEvent('#burger-icon', 'click');
		});

		/* TODO: Write a test that ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 */
		it('is hidden by default', function() {
			menuHidden = $('body').attr('class');
			expect(menuHidden).toEqual('menu-hidden');
		});

		/* TODO: Write a test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
		it('should invoke the burger-icon click event and remove .menu-hidden from body', function() {
			$('#burger-icon').trigger("click");
			expect('click').toHaveBeenTriggeredOn('#burger-icon');
			expect(spyEvent).toHaveBeenTriggered();
			menuHidden = $('body').attr('class');
			expect(menuHidden).toBe('');
		});

		it('should invoke the burger-icon click event (again) and add .menu-hidden to body', function() {
			$('#burger-icon').trigger("click");
			expect('click').toHaveBeenTriggeredOn('#burger-icon');
			expect(spyEvent).toHaveBeenTriggered();
			menuHidden = $('body').attr('class');
			expect(menuHidden).toEqual('menu-hidden');
		});
	});

	/* TODO: Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {

		beforeEach(function(done) {
			loadFeed(feedIndex);
			setTimeout(function() {
				done();
			}, 2000);
		});
		/* TODO: Write a test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		it('have at least one entry', function(done) {
			feed = document.getElementsByClassName('feed')[0];
			// console.log($('.feed').find('a'));
			expect(feed.children.length >= 1).toBe(true);
			done();
		});
	});

	/* TODO: Write a new test suite named "New Feed Selection" */
	describe('New feed selection', function() {
		/* TODO: Write a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * Remember, loadFeed() is asynchronous.
		 */
		let feedContent = [];
		let newFeedContent = [];

		function pushContent(htmlCollection, arrayToCreate) {
			Array.from(htmlCollection).forEach(function(child) {
				arrayToCreate.push(child.href);
			});
		}

		beforeEach(function(done) {
			loadFeed(feedIndex);
			setTimeout(function() {
				done();
			}, 2000);
		});

		it('loads first selection', function(done) {
			feed = document.getElementsByClassName('feed')[0]; // first feed
			feedIndex++;

			pushContent(feed.children, feedContent);
			expect(feedContent.length > 0).toBe(true);
			done();
		});

		it('loads the second selection, which is different to the first', function(done) {
			expect(feedIndex > 0).toBe(true);
			expect(feedContent.length > 0).toBe(true);
			feed = document.getElementsByClassName('feed')[0]; // new feed

			pushContent(feed.children, newFeedContent);
			expect(newFeedContent.length > 0).toBe(true);
			expect(newFeedContent[0] === feedContent[0]).toBe(false);
			done();
		});
	});


}());