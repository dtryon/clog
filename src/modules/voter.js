exports.recordVote = function (voteType, blog) {
	
	if (voteType === '+') {
		blog.meta.upvotes++;
	} else if (voteType === '-') {
		blog.meta.downvotes++;
	}
}

exports.countVotes = function (blog) {	
	return blog.meta.upvotes - blog.meta.downvotes;
}