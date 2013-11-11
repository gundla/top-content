(function(){
	
	var YYY = window.YYY || {};
	var Templates = {};

	Templates.mainHandle = ['<div class="yyy-main-handle">Get Top Content</div>'];

	Templates.modal = [
		'<div class="yyy-modal-wrapper">',
		    '<div class="yyy-modal yyy-effect-3">',
		    	'<div class="yyy-content">',
		    		'<h3>Top Content</h3>',
		    		'<button class="yyy-close">X</button>',
		    		'<div class="yyy-stories">',
		    		'</div>',
		    	'</div>',
		    '</div>',
		'</div>'
	];

	Templates.overlay = ['<div class="yyy-overlay"></div>'];

	Templates.stories = [
		'<% _.each(stories, function(story){ %>',
			'<div class="yyy-row">',
				'<div class="yyy-cell yyy-title">',
					'<h4><%-story.story%></h4>',
					'<span class="yyy-uuid"><%-story.uuid%></span>',
				'</div>',
				'<div class="yyy-cell yyy-direction yyy-<%-story.direction%>"></div>',
				'<div class="yyy-cell yyy-trend">',
					'<span class="yyy-trend-line"><%-story.trends%></span>',
					'<div><%-story.ctr%></div>',
				'</div>',
			'</div>',
		'<% }); %>'
	];

	for (var tmpl in Templates) {
	    if (Templates.hasOwnProperty(tmpl)) {
	        Templates[tmpl] = _.template(Templates[tmpl].join('\n')); // Underscore example
	    }
	}

	YYY.Templates = Templates;
	window.YYY = YYY;
})();