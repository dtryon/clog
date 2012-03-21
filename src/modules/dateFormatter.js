exports.format = function (d) {

               var curr_date = d.getDate();
               var curr_month = d.getMonth();
               curr_month++;
               var curr_year = d.getFullYear();

               return curr_date + '/' + curr_month + '/' + curr_year;   
            };

            