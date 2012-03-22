var target = require('../modules/pageLimiter');

exports.should_default_to_20 = function(test){
    // given
    var proposedLimit = "";

    // when
    var result = target.resolveLimit(proposedLimit);

    // then
    test.equal(20, result);
    test.done();
};

exports.if_valid_number_passed_in_should_set_limit_30 = function(test){
    // given
    var proposedLimit = "30";

    // when
    var result = target.resolveLimit(proposedLimit);

    // then
    test.equal(30, result);
    test.done();
};

exports.if_valid_number_passed_in_should_set_limit_40 = function(test){
    // given
    var proposedLimit = "40";

    // when
    var result = target.resolveLimit(proposedLimit);

    // then
    test.equal(40, result);
    test.done();
};

exports.if_invalid_number_passed_in_should_default_to_20 = function(test){
    // given
    var proposedLimit = "zz";

    // when
    var result = target.resolveLimit(proposedLimit);

    // then
    test.equal(20, result);
    test.done();
};