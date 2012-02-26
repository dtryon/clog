$(function() {
   function formatDate(d) {

      var a_p = "";
      var curr_hour = d.getHours();
      if (curr_hour < 12)
         {
         a_p = "AM";
         }
      else
         {
         a_p = "PM";
         }
      if (curr_hour == 0)
         {
         curr_hour = 12;
         }
      if (curr_hour > 12)
         {
         curr_hour = curr_hour - 12;
         }

      var curr_min = d.getMinutes();

      curr_min = curr_min + "";

      if (curr_min.length == 1)
         {
         curr_min = "0" + curr_min;
         }

      return curr_hour + " : " + curr_min + " " + a_p;   
   }
});
