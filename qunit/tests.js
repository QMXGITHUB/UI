QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "first QUnit test", function( assert ) {
  var who = 'QMX';
  assert.equal(who, 'QMX', "The people who finished test is QMX" );
});

QUnit.test("Object is same in value", function(assert){
	var littleDuck = {legs: 2};
	assert.deepEqual(littleDuck, {legs: 2}, "The littleDuck does have 2 legs.")
});

QUnit.test("yeal it's a failed test", function(assert) {
	assert.ok(1 == '2', "how dare the test can Pass!");
});