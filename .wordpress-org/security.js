/*
 * JS Check Security All Websites.
 */
(function($){
	
	/* Check Spam Form */
	if( typeof wp_security != 'undefined' && typeof wp_security.anti_spam_form != 'undefined' && wp_security.anti_spam_form == 1 ) {
		
		$('form').each(function(){
			var f = this,
				types = ['button','submit','hidden'],
				inputs = [],
				values = [];

			for( i=0; i<f.length; i++ ){
				if( types.indexOf(f[i].type)>-1 ) {
					continue;
				}
				
				if( $(f[i]).prop('disabled') === true || $(f[i]).prop('readonly') === true ) {
					continue;
				}

				inputs.push(f[i]);
			}

			if( inputs.length == 0 ) {
				return;
			}

			$(f).on('submit',function(e){
				var data = [];
				
				$(inputs).each(function(i){
					if( this.value!='' ) {
						data.push( this.value );
					}
				});
				
				if( data.length == 0 ) {
					e.preventDefault();
		
					return false;
				}
				
				return true;
			});

			var btn = $('[type="submit"]', f).css('pointer-events','none');

			$(inputs).each(function(i){
				$(this).on('change',function(){
					if( this.value!='' ) {
						values.push(i);
					} else {
						i = values.indexOf(i);
						if (i > -1) {
							values.splice(i, 1);
						}
					}
					
					btn.css('pointer-events', values.length <= 0 ? 'none' : 'all' );
				});
			});
		});
	}

})(jQuery);