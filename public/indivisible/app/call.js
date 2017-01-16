validatePhone = function(num) {
  console.log("Validating '" + num + "' as phone number");
  num = num.replace(/[^0-9]/g, '')
  if (num.substring(0, 1) != '1') num = "1" + num;
  if (num.length == 11) return num;
  return false;
}


commanderData = function() {
  thisPhone = validatePhone($(phoneField).val());
  thisLocation = $(zipField).val();
  console.log("Phone is " + thisPhone);
  console.log("ZIP is " + thisLocation);

  if (thisPhone) {

    var data = {
      campaignId: '2',
      userPhone: thisPhone,
      userLocation: thisLocation,
      script: 'overlay',
    };
    console.log('Data looks good.');
    return data;

  } else {
    console.log('No phone number.');
    //No use notifying the user, because I haven't figured out how to stop the AN form submission.
    //alert('Please enter a valid US phone number.');

  }
}
handleScript = function(res) {
  console.log(res);
  $('#can_sidebar').slideUp();
  if(res.status == '200'){
    console.log('Got response 200 OK');
    targetHTML = res.responseJSON.script
  } else {
    console.log('Got response ' + res.status + ' ' + res.statusText);
    targetHTML = 'There was an error with your call.  Please <a href="http://www.advocacycommons.org/indivisible/">try again</a>.'
  }
  $('div.action_description').html(targetHTML);
}
makeTheCall = function() {
  data = commanderData();
  if (data) {
    $.ajax({
      method: 'get',
      data: data,
      url: 'https://advocacycommons.callpower.org/call/create',
      dataType: 'json',
      complete: function(res){
        handleScript(res);
      }
    });
  }
}
