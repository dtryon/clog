$(function() {
	function vote(voteType) {

		var url = 'http://localhost:3000/blog/vote';
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

	$('.make-vote').submit(function() { 
		return false; 
	});
	
	$('.upvote').click(function() {
		vote('+');
		return false;
	});

	$('.downvote').click(function() {
		vote('-');
		return false;
	});
});