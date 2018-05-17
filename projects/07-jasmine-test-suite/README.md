
# Project Overview

This project uses the concept of test-driven development to test a basic web application that reads RSS feeds. [Jasmine](http://jasmine.github.io/) is the testing framework used, with support from [jQuery]() and the [jasmine-jquery.js]() libraries.

# To run this application

  - Clone or download the git `google-scholarship` repository [here](https://github.com/DayTimeChunks/google-scholarship/archive/master.zip).

  - Go to the folder with the following path: `google-scholarship/projects/07-jasmine-test-suite`.

  - Open the `index.html` file with your favourite internet browser.

## What to look for?

This is a one-page web app listing different feeds, for example, from the [Udacity Blog](http://blog.udacity.com/feed). At the bottom of the page you will see the test suite descriptors and whether each of them passed (or not).

Testing is an important part of the development process and many organisations practice a standard of development known as "test-driven development". This is when developers write tests first (which fail by design), before developing the application to pass those test. Future feature development also allows us to track whether things break in the process.

## What I learnt?

I learnt how to use Jasmine to write a number of tests against a pre-existing application, testing the underlying business logic of the application as well as the event handling and DOM manipulation.

# How will I complete this project?

Review the Feed Reader Testing [Project Rubric](https://review.udacity.com/#!/projects/3442558598/rubric)

[Jasmine documentation](http://jasmine.github.io).

## Other notes to self

- [Project Rubric](https://review.udacity.com/#!/rubrics/18/view)
- Implement error handling for undefined variables and out-of-bound array access.
- On the use of `done()`: https://discussions.udacity.com/t/async-tests-why-the-second-done-call/40751/6
