/*! Copyright (c) 2012 Mieszko Domagała (http://miecho.pl)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 1.0.0
 * 
 * Requires: 1.8.1+
 */
 
(function($){
	$.fn.extend({
		customSelectbox: function() {
			return this.each(function() {
				var $select = $(this);
				var $id = $(this).attr('id');
				var $new_id = $id+'_customSelectbox';
				var $name = $(this).attr('name');
				var $new_select = $('<div/>', {id: $new_id, 'class': 'customSelectbox'});
				var $selected_display = $('<div/>', {'class': 'customSelectbox_display_container'});
				var $selected_div = $('<div/>', {'class': 'customSelectbox_selected'});
				var $select_icon = $('<div/>', {'class': 'customSelectbox_icon'});
				var $select_iconbg = $('<div/>', {'class': 'customSelectbox_icon_bg'});
				var $list_container = $('<ul/>', {'class': 'customSelectbox_container'});
				$select.find('option').each(function(index){
					var $new_option = $('<li/>', {'data-option_id': index});
					$new_option.html($(this).text());
					$new_option.appendTo($list_container);
				});
				$selected_div.appendTo($selected_display);
				$select_icon.appendTo($selected_display);
				$select_iconbg.appendTo($selected_display);
				$selected_display.appendTo($new_select);
				$list_container.appendTo($new_select);
				$selected_display.click(function() {
					if ($new_select.hasClass('customSelectbox_opened')) {
						$list_container.slideUp();
						$new_select.removeClass('customSelectbox_opened');
					} else {
						$list_container.slideDown();
						$new_select.addClass('customSelectbox_opened');
					}
				});
				$select.after($new_select);
				$list_container.find('li').click(function() {
					var $selected_index = $(this).attr('data-option_id');
					var $selected_html = $(this).html();
					$select.prop('selectedIndex', $selected_index);
					$select.change();
					$selected_div.html($selected_html);
					$list_container.slideUp();
					$new_select.removeClass('customSelectbox_opened');
					$list_container.find('li').removeClass('customSelectbox_this_is_selected');
					$(this).addClass('customSelectbox_this_is_selected');
				});
				$list_container.hide();
				$select.hide();
				$new_select.width($new_select.find('ul').width()+30);
				$new_select.find('ul').width($new_select.width());
				var $selected_index = $select.prop('selectedIndex');
				$('li[data-option_id='+$selected_index+']').click();
				$(document).mousedown(function(e) {
					if($(e.target).parents('#'+$new_id).length==0 && !$(e.target).is('#'+$new_id)) {
						$list_container.slideUp();
						$new_select.removeClass('customSelectbox_opened');
					}
				});
			});
        }
    });
})(jQuery);