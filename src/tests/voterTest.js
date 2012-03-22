var target = require('../modules/voter');

exports.should_increment_upvotes_if_votetype_is_plus = function(test){
    // given
    var voteType = '+';
    var blog = {
    	meta				: {
							  upvotes	: Number
							, downvotes	: Number
		}
    }

    blog.meta.upvotes = 5;
    blog.meta.downvotes = 5;

    // when
    target.recordVote(voteType, blog);

    // then
    test.equal(6, blog.meta.upvotes);
    test.done();
};

exports.should_increment_downvotes_if_votetype_is_minus = function(test){
    // given
    var voteType = '-';
    var blog = {
    	meta				: {
							  upvotes	: Number
							, downvotes	: Number
		}
    }

    blog.meta.upvotes = 5;
    blog.meta.downvotes = 5;

    // when
    target.recordVote(voteType, blog);

    // then
    test.equal(6, blog.meta.downvotes);
    test.done();
};

exports.should_not_increment_if_votetype_not_recognized = function(test){
    // given
    var voteType = '*';
    var blog = {
    	meta				: {
							  upvotes	: Number
							, downvotes	: Number
		}
    }

    blog.meta.upvotes = 5;
    blog.meta.downvotes = 5;

    // when
    target.recordVote(voteType, blog);

    // then
    test.equal(5, blog.meta.downvotes);
    test.done();
};

exports.should_count_votes = function(test){
    // given
    var blog = {
    	meta				: {
							  upvotes	: Number
							, downvotes	: Number
		}
    }

    blog.meta.upvotes = 7;
    blog.meta.downvotes = 5;

    // when
    var result = target.countVotes(blog);

    // then
    test.equal(2, result);
    test.done();
};