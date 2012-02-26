$(function() {
	function comment() {
		var url = 'http://localhost:3000/blog/comment';
		var blogId = $('#blog-id').val();
		var comment = $('#comment').val();

		$.ajax({
			url: url,
			type: 'POST',
			datatype: 'json',
			data: { blogId: blogId, comment: comment },
			cache: false,
			timeout: 5000,
			success: function(addedComment) {

				var commentDate = new Date(addedComment.date);
				var stringDate = commentDate.getDate() + '/' + commentDate.getMonth() + '/' + commentDate.getFullYear() + ' ' + commentDate.getHours() + ':' + commentDate.getMinutes();

				var theDate = $('<p />').text(stringDate);
				var theText = $('<p />').text(addedComment.text);

				$('#comments').append(theDate);
				$('#comments').append(theText);

				$('#comment').val('');
			}
		});
	}

	$('#make-comment').submit(function() {
		comment();
		return false;
	});
});