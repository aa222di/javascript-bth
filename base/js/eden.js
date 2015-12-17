/**
 * Helpers and tools to ease your JavaScript day.
 */
window.Eden = (function(window, document, undefined ) {
  var Eden = {};

  /**
   * Generate a random number.
   * @param min the smallest possible number
   * @param max the largest possible number
   * @returns a random number where min >= number <= max
   */
  Eden.random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  /**
   * Set height to width create a square box
   * @param min the smallest possible number
   * @param max the largest possible number
   * @returns a random number where min >= number <= max
   */
  Eden.createSquare = function (element) {
    return $(element).height($(element).width());
  };



  // Expose public methods
  return Eden;
  
})(window, window.document); 