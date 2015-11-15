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


		/* This test loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		*/
		it('have a defined, non-empty URL', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBe('');
			});
		});


		/* This test loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		*/
		it('have a defined, non-empty name', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBe('');
			});
		});
	});


	/* The second test suite.  This one pertains to the menu.
	*/
	describe('The menu', function() {
		var body = $('body');

		/* This test ensures the menu element is hidden by default
		*/
		it('is hidden by default', function() {
			expect(body.hasClass('menu-hidden')).toBe(true);
		});

		 /* This test ensures the menu changes visibility when the menu icon 
			* is clicked.  Since the menu is hidden by default, the first click
			* should hide it.  And a second click should make it reappear.
			* Clicks are simulated via jQuery.
			*
			* Source/help:
			* http://api.jquery.com/trigger/
		*/
		it('changes visibility when the menu icon is clicked', function() {
			var menuIcon = $('.menu-icon-link');

			menuIcon.trigger('click');
			expect(body.hasClass('menu-hidden')).toBe(false);

			menuIcon.trigger('click');
			expect(body.hasClass('menu-hidden')).toBe(true);
		});
	});

	/* The third test suite.  This one pertains to the first loaded feed.
	*/
	describe('Initial Entries', function() {
		/* Since loadFeed() is asynchronous the following test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		*/
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});
		
		/* This test ensures that when the loadFeed function is called and 
		 * completes its work, there is at least a single .entry element within
		 * the .feed container.
		*/
		it('contains at least one entry upon loadFeed() finish', function(done) {
			expect($('.feed .entry').length).toBeGreaterThan(0);
			done();
		});
	});

	/* The fourth test suite.  This one pertains to newly selected feeds.
	*/
	describe('New Feed Selection', function() {
		var feed1;

		/* Since loadFeed() is asynchronous the following test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		*/
		beforeEach(function(done) {
			loadFeed(0, function() {
				feed1 = $('.feed').html();
				done();
			});
		});

		/* This test ensures that when a new feed is loaded, the entries
		 * have actually updated with different content
		*/
		it('actually changes the displayed content', function(done) {
			loadFeed(1, function() {
				var feed2 = $('.feed').html();
				expect(feed2).not.toEqual(feed1);
				done();
			});
		});

		//this just resets the main page back to the first feed in the index after this
		//test is done
		afterEach(function() {
			loadFeed(0);
		});
	});

	/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	 *
	 * The next suites are for FUTURE, POSSIBLE features.  Since none of
	 * these features actually exist, all of these tests fail at the moment.
	 *
	 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	*/

	/* This suite tests out the idea of a delete button that would remove a feed.
	 * Perhaps a delete button shows up next to each feed in the menu list that the
	 * user can click on.
	 * This particular suite runs tests against the user clicking the delete button
	 * next to the FIRST item on the list.
	*/
	describe('Delete Feed Button', function() {
		var originalFirstItem = allFeeds[0];
		var originalLength = allFeeds.length;

		/* First, simulate clicking the 'delete button' next to the first item
		 * in the menu list (which would call some function that does the actual
		 * deletion of the item from the array).
		*/
		$('.delete-button').eq(0).click();

		/* This test makes sure this feed was actually removed from the Model,
		 * which, in this case, is the allFeeds array.
		*/
		it('removes the selected feed from the allFeeds array', function() {
			expect(allFeeds.length).toBeLessThan(originalLength);
			expect(allFeeds.indexOf(originalFirstItem)).toEqual(-1);
		});

		/* This test makes sure this feed's name was also removed from the list
		 * of items that shows up in the menu bar.
		*/
		it('removes the selected feed from the menu list', function() {
			var menuItems = $('.feed-list li');
			expect(menuItems.length).toBeLessThan(originalLength);

			//The name of the feed should no longer be in the menu list:
			var arrayOfItemNames = $.map($('a', menuItems), function(link) { 
				return $(link).text();
			});
			expect(arrayOfItemNames.indexOf(originalFirstItem.name)).toEqual(-1);
		});

		/* If the user is deleting the currently active feed (that is, the feed currently 
		 * displayed on the main page that the user is reading), you might want to refresh
		 * the page with a new feed.  Since "New Feed Selection" has already been tested 
		 * earlier, you know that particular functionality already works.
		 *
		 * Thus, you might just check to make sure that loadFeed() is being called at
		 * some point. And that would look something like this:
		*/
		it('updates the page to a new feed if the active feed was deleted', function() {
			spyOn(window, 'loadFeed').and.callThrough();

			expect(window.loadFeed).toHaveBeenCalled();
		});
	});

	/* This suite tests out the idea of a add button that would add a new feed.
	 * Perhaps there's two text boxes at the base of the menu bar, one for the
	 * name of the feed and one for the URL.  And perhaps the button calls
	 * the function addNewFeed upon being clicked.
	*/
	describe('Add Feed Button', function() {
		var originalLength = allFeeds.length;

		/* This test makes sure that addNewFeed throws an error if the user does not
		 * enter a name or URL for the feed.
		*/
		//First fill the textbox fields with bad values:
		$('#textbox-name').val('');
		$('#textbox-url').val('');

		it('throws an error if user does not provide a feed name or URL', function() {
			expect(addNewFeed).throwError('Invalid name');
			expect(addNewFeed).throwError('Invalid URL');
			expect(allFeeds.length).toEqual(originalLength);
		});

		/* This test makes sure that addNewFeed throws an error if the user has entered
		 * the name of a feed that already exists in the Model.
		*/
		//First fill the textbox field with a duplicate value:
		$('#textbox-name').val(allFeeds[0].name);

		it('throws an error if user has entered a feed that already exists', function() {
			expect(addNewFeed).throwError('Duplicate entry');
			expect(allFeeds.length).toEqual(originalLength);
		});

		/* This test makes sure that the new feed gets added to the Model, which, in
		 * this case is the allFeeds array.
		*/
		//First fill the textbox fields with valid values:
		$('#textbox-name').val('NPR News Headlines');
		$('#textbox-url').val('http://www.npr.org/rss/rss.php?id=1001');
		it('adds the new feed to the allFeeds array', function() {
			expect(allFeeds.length).toBeGreaterThan(originalLength);
		});

		/* This test makes sure this feed's name was also added to the list
		 * of items that shows up in the menu bar.
		*/
		it('adds the new feed to the menu list', function() {
			var menuItems = $('.feed-list li');
			expect(menuItems.length).toBeGreaterThan(originalLength);
		}); 
	});
}());
