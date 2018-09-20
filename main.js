$(document).ready(function() {
  $("#process").click(function() {

    var age_s = $("#age");
    var cpd_s = $("#cpd");
    var cost_s = $("#cost");

    // Integer Input
    var age = parseInt(age_s.val());
    var cpd = parseInt(cpd_s.val());
    var cost = parseFloat(cost_s.val());

    var cost_in = "£ ";

    // Validation
    if (!isFinite(age) || !isFinite(cpd) || !isFinite(cost)) {
        alert("Please fill out correctly");
        return false;
    }

    $("#panel").removeClass('hide');

    // Smoking DOM Selector

    var age_result = $("#age-result");
    var cpd_result  = $("#cpd-result");
    var cost_result  = $("#cost-result");
    var in_cost  = $("#in-cost");

    age_result.html(age);
    cpd_result.html(cpd);
    cost_result.html(cost.toFixed(2));
    in_cost.html(cost);

    // Smoking Calculator

    var saving_day = $("#saving-day");
    var saving_week  = $("#saving-week");
    var saving_month  = $("#saving-month");
    var saving_year  = $("#saving-year");
    var saving_life  = $("#saving-life");

    // Smoking Calculation

    var calc_cost_day = cpd * (cost / 20);
    var calc_cost_week = cpd * (cost / 20) * 7;
    var calc_cost_month = cpd * (cost / 20) * (365/12);
    var calc_cost_year = cpd * (cost / 20) * 365;
    var calc_cost_life = cpd * (cost / 20) * 365 * (81 - age );

    // Display Smoking DOM Result

    saving_day.html(cost_in + addCommas(calc_cost_day.toFixed(2)));
    saving_week.html(cost_in + addCommas(calc_cost_week.toFixed(2)));
    saving_month.html(cost_in + addCommas(calc_cost_month.toFixed(2)));
    saving_year.html(cost_in + addCommas(calc_cost_year.toFixed(2)));
    saving_life.html(cost_in + addCommas(calc_cost_life.toFixed(2)));

    // Vape DOM Selector

    var cigs_per_week_vape  = $("#cigs-per-week-vape");
    var bottles_week_vape  = $("#bottles-week-vape");
    var bottles_month_vape  = $("#bottles-month-vape");
    var bottles_year_vape  = $("#bottles-year-vape");
    var eliquid_cost_year_vape  = $("#eliquid-cost-year-vape");
    var saving_year_vape  = $("#saving-year-vape");
    var saving_life_vape  = $("#saving-life-vape");

    // Vape Calculation

    var calc_cigs_per_week_vape  = cpd * 7;
    var calc_bottles_year_vape  =  calc_cigs_per_week_vape * 0.026 * 52;
    var calc_bottles_week_vape  =  calc_bottles_year_vape / 52 ;
    var calc_bottles_month_vape  = calc_bottles_year_vape / 12;
    var calc_eliquid_cost_year_vape = calc_bottles_year_vape * 3.33;
    var calc_cost_year_vape = calc_cost_year - calc_eliquid_cost_year_vape;
    var calc_cost_life_vape = calc_cost_life - (82-age) * calc_eliquid_cost_year_vape;

    // Display Vaping DOM Result
    cigs_per_week_vape.html(addCommas(calc_cigs_per_week_vape.toFixed(0)));
    bottles_week_vape.html(addCommas(calc_bottles_week_vape.toFixed(1)));
    bottles_month_vape.html(addCommas(calc_bottles_month_vape.toFixed(1)));
    bottles_year_vape.html(addCommas(calc_bottles_year_vape.toFixed(0)));
    eliquid_cost_year_vape.html(cost_in + addCommas(calc_eliquid_cost_year_vape.toFixed(2)));
    saving_year_vape.html(cost_in + addCommas(calc_cost_year_vape.toFixed(2)));
    saving_life_vape.html(cost_in + addCommas(calc_cost_life_vape.toFixed(0)));
  });

  function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  function isNumber(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode == 46) {
        return true;
      }
      if (charCode > 31 && (charCode < 48 || charCode > 57 )) {
          return false;
      }
      return true;
  }

  $("#cost, #age, #cpd").keypress(function(e) {
    return isNumber(e)
  });

  $("#age").on('change keyup keypress', function() {
    if ($(this).val() >= 82) {
      $(this).val(82);
    }
  });

  $("#cost, #cpd").on('change keyup keypress', function() {
    if ($(this).val() >= 9999) {
      $(this).val(9999);
    }
  });

});
