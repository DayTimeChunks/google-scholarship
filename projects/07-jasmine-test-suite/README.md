
# Project Overview

This project uses the concept of test-driven development to test a basic web application that reads RSS feeds. [Jasmine](http://jasmine.github.io/) is the testing framework used, with support from [jQuery]() and the [jasmine-jquery.js]() libraries.

# To run this application

  - Clone or download the git `google-scholarship` repository [here](https://github.com/DayTimeChunks/google-scholarship/archive/master.zip).

  - Go to the folder with the following path: `google-scholarship/projects/07-sublime-test-suite`.

  - Open the `index.html` file with your favourite internet browser.

## What to look for?

This is a one-page web app listing different feeds, for example, from the [Udacity Blog](http://blog.udacity.com/feed). At the bottom of the page you will see the test suite descriptors and whether each of them passed (or not).

Testing is an important part of the development process and many organisations practice a standard of development known as "test-driven development". This is when developers write tests first (which fail by design), before developing the application to pass those test. Future feature development also allows us to track whether things break in the process.

## What I learnt?

I learnt how to use Jasmine to write a number of tests against a pre-existing application, testing the underlying business logic of the application as well as the event handling and DOM manipulation.

# How will I complete this project?

Review the Feed Reader Testing [Project Rubric](https://review.udacity.com/#!/projects/3442558598/rubric)

1. Take the JavaScript Testing [course](https://www.udacity.com/course/ud549)
2. Download the [required project assets](http://github.com/udacity/frontend-nanodegree-feedreader).
3. Review the functionality of the application within your browser.
4. Explore the application's HTML (**./index.html**), CSS (**./css/style.css**) and JavaScript (**./js/app.js**) to gain an understanding of how it works.
5. Explore the Jasmine spec file in **./jasmine/spec/feedreader.js** and review the [Jasmine documentation](http://jasmine.github.io).
6. Edit the `allFeeds` variable in **./js/app.js** to make the provided test fail and see how Jasmine visualizes this failure in your application.
7. Return the `allFeeds` variable to a passing state.
8. Write a test that loops through each feed in the `allFeeds` object and ensures it has a URL defined and that the URL is not empty.
9. Write a test that loops through each feed in the `allFeeds` object and ensures it has a name defined and that the name is not empty.
10. Write a new test suite named `"The menu"`.
11. Write a test that ensures the menu element is hidden by default. You'll have to analyze the HTML and the CSS to determine how we're performing the hiding/showing of the menu element.
12. Write a test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when clicked and does it hide when clicked again.
13. Write a test suite named `"Initial Entries"`.
14. Write a test that ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.
15. Write a test suite named `"New Feed Selection"`.
16. Write a test that ensures when a new feed is loaded by the `loadFeed` function that the content actually changes.
17. No test should be dependent on the results of another.
18. Callbacks should be used to ensure that feeds are loaded before they are tested.
19. Implement error handling for undefined variables and out-of-bound array access.
20. When complete - all of your tests should pass.
21. Write a README file detailing all steps required to successfully run the application. If you have added additional tests (for Udacious Test Coverage),  provide documentation for what these future features are and what the tests are checking for.

## Other notes to self

- [Project Rubric](https://review.udacity.com/#!/rubrics/18/view)
- On the use of `done()`: https://discussions.udacity.com/t/async-tests-why-the-second-done-call/40751/6
