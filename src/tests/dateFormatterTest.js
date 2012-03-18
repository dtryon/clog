var target = require('../modules/dateFormatter');

exports.dateShouldPrintCorrectly = function(test){
    // given
    var date = new Date('25 Dec, 1995 23:15:00');

    // when
    var result = target.format(date);

    // then
    test.equal('25/12/1995 11:15 PM', result);
    test.done();
};