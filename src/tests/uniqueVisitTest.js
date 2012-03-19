var target = require('../modules/uniqueVisit');

exports.should_return_empty_array_if_nil_array_and_no_ip_is_passed = function(test){
    // given
    var arr;

    // when
    var result = target.recordVisit(arr);

    // then
    test.equal(0, result.length);
    test.done();
};

exports.should_return_1_in_array_if_array_empty = function(test){
    // given
    var arr;

    // when
    var result = target.recordVisit(arr, "127.0.0.1");

    // then
    test.equal(1, result.length);
    test.done();
};

exports.should_return_2_in_array_if_array_contains_another_ip = function(test){
    // given
    var arr = [];
    arr.push("127.0.0.1");

    // when
    var result = target.recordVisit(arr, "127.0.0.2");

    // then
    test.equal(2, result.length);
    test.done();
};

exports.should_return_1_in_array_if_array_already_includes_ip = function(test){
    // given
    var arr = ["127.0.0.1"];

    // when
    var result = target.recordVisit(arr, "127.0.0.1");

    // then
    test.equal(1, result.length);
    test.done();
};