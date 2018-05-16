// Script to help fellow student
// Not part of project
describe('The menu', function() {
	// Add a spyOnEvent
	let spyEvent, menu;

	beforeEach(function() {
		// I assumed your menu icon has a unique ID of 'menuIconID'
		// so I passed onto a spy listener.
		spyEvent = spyOnEvent('#menuIconID', 'click');
	});
	it('the menu changes visibility when the menu icon is clicked', function() {

		// Click once
		$("#menuIconID").trigger("click");
		expect('click').toHaveBeenTriggeredOn('#menuIconID');
		expect(spyEvent).toHaveBeenTriggered();
		menu = $('body').attr('class'); // assign the new class
		expect(menu).toBe('');

		// Click again
		$("#menuIconID").trigger("click");
		expect('click').toHaveBeenTriggeredOn('#menuIconID');
		expect(spyEvent).toHaveBeenTriggered();
		menu = $('body').attr('class'); // update the new class
		expect(menu).toBe('menu-hidden');
	});
});