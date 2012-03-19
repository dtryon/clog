function vote(voteType, id) {

	var url = 'http://localhost:3000/blog/vote/' + id;
	var blogId = $('#blog-id').val();

	$.ajax({
		url: url,
		type: 'POST',
		datatype: 'json',
		data: { blogId: blogId, voteType: voteType },
		cache: false,
		timeout: 5000,
		success: function(votes) {
			$('#votes').html(votes.count);
		}
	});
}

function bindVotingEvents(id) {
	$('.make-vote').submit(function() { 
		return false; 
	});
	
	$('.upvote').click(function() {
		vote('+', id);
		return false;
	});

	$('.downvote').click(function() {
		vote('-', id);
		return false;
	});
}

$(function() {
	bindVotingEvents();

	
});