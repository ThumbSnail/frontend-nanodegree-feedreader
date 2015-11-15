## Frontend Nanodegree Feedreader Testing

A.  How to Run/Download

	1.  Download the project's .zip file

    https://github.com/ThumbSnail/frontend-nanodegree-feedreader/archive/master.zip
    Then open index.html in your browser.

	2.  Or clone the repository

    git clone https://github.com/ThumbSnail/frontend-nanodegree-feedreader.git
    Then open index.html in your browser.

B.  Future Features and Their Tests

	1.  Delete Feed Button

	Perhaps a delete button shows up next to each feed in the menu list.  If the user
	clicks on it, it removes that respective feed from both the menu and the underlying
	model's data.

	Tests:
	-Make sure that the feed is actually removed from the model (the allFeeds array)
	-Make sure that the feed is removed from the menu list
	-If the deleted feed was the active one, make sure the page refreshes with a new feed

	2.  Add Feed Button

	Perhaps there's an add button in the menu along with two text boxes.  In the text
	boxes, the user inputs a feed name and a feed URL.  Once the button is clicked (and
	if the text fields are valid), the new feed is added to the menu and the underlying
	model's data.

	Tests:
	-Make sure it throws an error if the user tries to add a feed with an invalid name/URL
	-Make sure it throws an error if the user tries to add a feed of an already existing name
	-Make sure the feed is actually added to the model (the allFeeds array)
	-Make sure the feed is added to the menu list
