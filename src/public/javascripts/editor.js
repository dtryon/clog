function initEditor() {
	tinyMCE.init({
		// General options
		mode : "textareas",
		theme : "advanced",
		plugins : "syntaxhl,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

		extended_valid_elements : "pre[class]",

		// Theme options
		theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
		theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,syntaxhl,|,insertdate,inserttime,preview,|,forecolor,backcolor",
		theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
		theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,pagebreak",
		theme_advanced_toolbar_location : "top",
		theme_advanced_toolbar_align : "left",
		theme_advanced_statusbar_location : "bottom",
		theme_advanced_resizing : true,

		// Example content CSS (should be your site CSS)
		//content_css : "/stylesheets/style.css",

		// Drop lists for link/image/media/template dialogs
		template_external_list_url : "/javascripts/template_list.js",
		external_link_list_url : "/javascripts/link_list.js",
		external_image_list_url : "/javascripts/image_list.js",
		media_external_list_url : "/javascripts/media_list.js",

		remove_linebreaks : false
	});
}

function initDateSelector(currentDate) {
	var postDate = $('#post-date');
	if (postDate) {
		postDate.datepicker({
			showOn: 'button',
			buttonImage: '/images/calendar.gif',
			buttonImageOnly: true
		});
		postDate.datepicker('setDate', new Date(currentDate));
	}
}

function initTags(names) {
	$('#tags').focus(function() {
		$(this).val('');
	});

	function bindRemoveTag () {

		$('a[id^="remove_tag:"]').bind('click', function(event) {

			var tagName = event.target.id.split(':')[1];
			var hdnValue = $('#selectedTags').val();
				
			if (hdnValue) {
				var hdnValueArray = hdnValue.split(',');

				var newHdnValue = '';
				for(i=0;i<hdnValueArray.length;i++) {
					if (hdnValueArray[i] != tagName) {
						newHdnValue += hdnValueArray[i] + ',';
					}
				}

				newHdnValue = newHdnValue.substring(0, newHdnValue.length-1);

				$('#selectedTags').val(newHdnValue);
			} 

			$(this).closest('li').remove();
		});
	}

	bindRemoveTag();

	function addLi (name) {
		var newLi = '<li class="tag"><a id="remove_tag:' + name + '" class="remove-tag">x<a/>' + name + '</li>';
		$('ul.tags').append(newLi);

		bindRemoveTag();
	}

	var searchableTags = names;
	$('#tags').autocomplete({
		source: searchableTags,
		select: function(event, ui) {
			
			var hdnValue = $('#selectedTags').val();
			
			if (!hdnValue) {
				$('#selectedTags').val(ui.item.value);
				addLi(ui.item.value);
			} else {
				if (hdnValue.indexOf(ui.item.value) == -1) {
					$('#selectedTags').val(hdnValue + ',' + ui.item.value);
					addLi(ui.item.value);
				} 
			}

			return false;
		}
	});
}
