$(document).ready(function(){
  doCalculate();
  $('.form-control').on('change, keyup', function () {
    $(this).val(addCommas($(this).val()));
    doCalculate();
  });
  
  $('.form-control').keypress(function (e) {
    if (e.which != 8 && e.which != 0 && (e.which === 47 || e.which < 46 || e.which > 57)) {         
      return false;
    }
  });
});

function addCommas(x) {
  return x.toString().split('.').length>1? x.toString().split('.')[0].replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + x.toString().split('.')[1]: x.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function removeCommas(x) {
  return x===''? 0:parseFloat(x.toString().replace(/,/g, ''));
}

function handleChange(e) {
  doCalculate();
}

function doCalculate() {
  $('#permonth-inbound_toll_free_mins-ivr').val(addCommas(( removeCommas($('#inbound_toll_free_mins-ivr').val()) * removeCommas($('#select-inbound_toll_free_mins-ivr').val()) ).toFixed(0)));
  $('#permonth-inbound_did_mins-ivr').val(addCommas((removeCommas($('#inbound_did_mins-ivr').val()) * removeCommas($('#select-inbound_did_mins-ivr').val())).toFixed(0)));
  $('#permonth-number_of_inbound_calls').val(addCommas((removeCommas($('#number_of_inbound_calls').val()) * removeCommas($('#select-number_of_inbound_calls').val())).toFixed(0)));

  $('#permonth-inbound_toll_free_mins-acd').val(addCommas((removeCommas($('#inbound_toll_free_mins-acd').val()) * removeCommas($('#select-inbound_toll_free_mins-acd').val())).toFixed(0)));
  $('#permonth-inbound_did_mins-acd').val(addCommas((removeCommas($('#inbound_did_mins-acd').val()) * removeCommas($('#select-inbound_did_mins-acd').val())).toFixed(0)));
  $('#permonth-outbound_mins').val(addCommas((removeCommas($('#outbound_mins').val()) * removeCommas($('#select-outbound_mins').val())).toFixed(0)));

  $('#permonth-avg_voice_utterances_per_call').val(addCommas(removeCommas($('#avg_voice_utterances_per_call').val()) * removeCommas($('#number_of_inbound_calls').val())));
  // charges
  $('#total_ivr_mins').val(addCommas(removeCommas($('#permonth-inbound_toll_free_mins-ivr').val()) + removeCommas($('#permonth-inbound_did_mins-ivr').val())));

  $('#total_acd_mins').val(addCommas(removeCommas($('#permonth-inbound_toll_free_mins-acd').val()) + removeCommas($('#permonth-inbound_did_mins-acd').val()) + removeCommas($('#permonth-outbound_mins').val())));

  $('#total_minutes').val(addCommas(removeCommas($('#total_ivr_mins').val()) + removeCommas($('#total_acd_mins').val())));

  $('#application').val(addCommas((removeCommas($('#total_minutes').val()) * removeCommas($('#application_per_minute').val())).toFixed(2)));

  $('#toll_free_numbers').val(addCommas((removeCommas($('#qty_toll_free_numbers').val()) * removeCommas($('#toll_free').val())).toFixed(2)));
  $('#did_numbers').val(addCommas((removeCommas($('#qty_did_numbers').val()) * removeCommas($('#did').val())).toFixed(2)));
  $('#toll_free_in-total').val(addCommas(((removeCommas($('#permonth-inbound_toll_free_mins-ivr').val()) + removeCommas($('#permonth-inbound_toll_free_mins-acd').val())) * removeCommas($('#toll_free_in').val())).toFixed(2)));
  $('#did_in-total').val(addCommas(((removeCommas($('#permonth-inbound_did_mins-ivr').val()) + removeCommas($('#permonth-inbound_did_mins-acd').val())) * removeCommas($('#did_in').val())).toFixed(2)));
  $('#did_out-total').val(addCommas((removeCommas($('#permonth-outbound_mins').val()) * removeCommas($('#did_out').val())).toFixed(2)));
  
  $('#recording_storage').val(addCommas(((((removeCommas($('#total_acd_mins').val()) * removeCommas($('#of_mins_recorded').val())) * removeCommas($('#recording_mb_per_min').val())) / 1024 / 100) * removeCommas($('#gb_month').val())).toFixed(2)));
  $('#lambda_functions').val(addCommas(((removeCommas($('#permonth-number_of_inbound_calls').val()) * removeCommas($('#lambda_invocations_per_call').val())) * removeCommas($('#per_request').val())).toFixed(2)));
  $('#lex_costs').val(addCommas(((removeCommas($('#permonth-avg_voice_utterances_per_call').val()) * removeCommas($('#per_speech_request').val())) + (0 * removeCommas($('#per_txt_request').val()))).toFixed(2)));

  $('#total_monthly').val(addCommas((removeCommas($('#application').val()) + removeCommas($('#toll_free_numbers').val()) + removeCommas($('#did_numbers').val()) + removeCommas($('#toll_free_in-total').val()) + removeCommas($('#did_in-total').val()) + removeCommas($('#did_out-total').val()) + removeCommas($('#recording_storage').val()) + removeCommas($('#lambda_functions').val()) + removeCommas($('#lex_costs').val())).toFixed(2)));
}