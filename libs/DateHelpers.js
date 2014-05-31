if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define([ './date_format_helpers.js' ], function() {
  
  var DateHelpers = function(app) {
    this.sunriseSunsetLogger = app.get('sunriseSunsetLogger');
    this.now = new Date();
  }

  DateHelpers.prototype.today = function() {
    return this.now;
  }

  DateHelpers.prototype.currentMonth = function() {
    return this.now.format("mm").toLowerCase();
  }

  DateHelpers.prototype.currentHumanMonth = function() {
    return this.now.format("mmm").toLowerCase();
  }

  DateHelpers.prototype.currentYear = function() {
    return this.now.format("yyyy");
  }

  DateHelpers.prototype.currentDay = function() {
    return this.now.format("dd");
  }

  DateHelpers.prototype.applyOffset = function(date, minutes) {
    return new Date(date.getTime() + parseInt(minutes) * 60000);
  }

  DateHelpers.prototype.is = function(date) {
    
    var dateComparison = new Date(date.getTime());
    dateComparison.setSeconds(0, 0);

    var now = new Date(this.now.getTime());
    now.setSeconds(0, 0);

    return dateComparison.getTime() == now.getTime();
  }  

  DateHelpers.prototype.sunrise = function(days){
    var sunrise = new Date(
      this.currentYear(),
      parseInt(this.currentMonth()) - 1,
      this.currentDay(),
      days[this.currentDay()].sunrise.substring(0, 2),
      days[this.currentDay()].sunrise.substring(2, 4)
    );
    
    if(sunrise.dst()){
      sunrise = this.applyOffset(sunrise, 60) 
    }
      
    return sunrise;
  }

  DateHelpers.prototype.sunset = function(days){
    var sunset = new Date(
      this.currentYear(),
      (parseInt(this.currentMonth()) - 1),
      this.currentDay(),
      days[this.currentDay()].sunset.substring(0, 2),
      days[this.currentDay()].sunset.substring(2, 4),
      0,
      0
    );

    if(sunset.dst()){
      sunset = this.applyOffset(sunset, 60) 
    }

    return sunset;
  }

  var exports = DateHelpers;

  return exports;
});