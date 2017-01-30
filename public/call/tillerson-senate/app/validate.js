$(document).ready(function(){
	window.Parsley.addValidator('zipcode', {
		requirementType: 'string',
		validateString: function(value) {
		  console.log('received value ' + value + ' to validate as ZIP');
			return value.length == 5  && parseInt(value);
		},
		messages: {
			en: 'Please enter a valid ZIP code.'
		}
	});
	window.Parsley.addValidator('phone', {
	  requirementType: 'string',
	  validateString: function(value) {
		  console.log('received value ' + value + ' to validate as phone');
	    value = value.replace(/[^0-9]/g, '')
			if (value.substring(0, 1) != '1') value = '1' + value;
			if (value.length == 11) return value;
			return false;
	  },
	  messages: {
	    en: 'Please enter a valid phone number.'
	  }
	});
	form = $('form#caller_data');
	$(form).on('submit', function(e) {
		e.preventDefault();
	});
	var parsley_instance = $(form).parsley();

	parsley_instance
	.on('form:success',function() {
	  console.log('Form validated.');
	  query_string = new URLSearchParams(window.location.search);
	  OSDIBody = {
	    'person' : {
	      'given_name' : $('input#given_name').val(),
				'family_name' : $('input#family_name').val(),
	      'email_addresses' : [ 
	        {
	          'address' : $('input#email_address').val(),
	          'status' : 'subscribed'
	        }
	      ],
				'phone_number' : $('input#phone_number').val(),
				'postal_addresses' : [
					{ 'postal_code' : $('input#postal_code').val() }
				]
			},
	    "triggers": {
				"autoresponse": {
					"enabled": true
				}
			},
			'action_network:referrer_data' : {
	      'source' : query_string.get('source'),
	      'referrer' : query_string.get('referrer'),
	      'website' : 'http://www.advocacycommons.org'
	    },
	    'custom_fields' : {
				'sms_opt_in' : $('input#sms_opt_in_checkbox').prop('checked')
	    }
	  };

	  console.log(OSDIBody);
		$(form)
		.osdi({
			endpoint: 'https://actionnetwork.org/api/v2/forms/773c08ec-e3b6-4596-878d-3653b39a3d3c/submissions',
			body: OSDIBody,
			immediate: true,
			done: function(data, status) {
				console.log('Submitted data to AN.');
				$('div#form_teaser, div#form_full_desc').slideUp();
				$('div.after-submit-reveal').slideDown();
				$('div#form_container').fadeTo(500,0.2);
				$('input').attr('disabled','true');
			},
			fail : function(jqXHR, textStatus, errorThrown) {
				console.log('Error ' + errorThrown + ' ' + textStatus);
				console.log(jqXHR);
				alert('Uh oh, there was an error submitting your info.  Try reloading the page and filling out the form again.');
			}
		});
	})
	.on('form:error',function(){
	  console.log('Validation errors: form not submitted.');
	});
});
