export default {
    data() {
      return {
        showModal: false,
      }
    },
    methods: {       
      getDatetimeFormat: function(date, length) {

        if(date == null) {
          return date;
        }
        if(date.length != 6 && date.length != 8 && date.length != 14) {
          return date;
        }
        if(length == 6) {
          return (date.substring(0,4) + "-" + date.substring(4,6));
        }
        if(length == 8) {
          return (date.substring(0,4) + "-" + date.substring(4,6) + "-" + date.substring(6,8));
        }
        else if(length == 14) {
          return (date.substring(0,4) + "-" + date.substring(4,6) + "-" + date.substring(6,8) + " " + date.substring(8,10) + ":" + date.substring(10,12) + ":" + date.substring(12,14));
        }
        return date;
      },
      getDateFormat: function (dates) {
        if (dates == null || dates == ''){
          return null
        }
        let date = new Date(dates)

        let result = date.getFullYear()+(date.getMonth() + 1).toString().padStart(2,'0')+date.getDate().toString().padStart(2,'0');
        return result
      },
      getCodeTtile: function (code){
        if (code == 'CC'){
          return 'Cabinet Closed'
        } else if (code == 'CO') {
          return 'Cabinet Opened'
        } else if (code == 'AP') {
          return 'AED Present'
        } else if (code == 'AR') {
          return 'AED Removed'
        } else if (code == 'CS') {
          return 'Connection Success'
        } else if (code == 'CL') {
          return 'Connection Lost'
        }
        return code;        
      },
      dates: function (date) {
        let result = date.getFullYear()+(date.getMonth() + 1).toString().padStart(2,'0')+date.getDate().toString().padStart(2,'0');
        return result
      },
      getBeforeDateFormat: function (dates) {
        let date = new Date(dates)

        if ((date.getMonth() + 1).toString().padStart(2,'0') == '01') {
          return 'JANUARY ' + date.getFullYear().toString()
        } else if ((date.getMonth() + 1).toString().padStart(2,'0') == '02') {
          return 'FEBRUARY ' + date.getFullYear()
        } else if ((date.getMonth() + 1).toString().padStart(2,'0') == '03') {
          return 'MARCH ' + date.getFullYear()
        } else if ((date.getMonth() + 1).toString().padStart(2,'0') == '04') {
          return 'APRIL ' + date.getFullYear()
        } else if ((date.getMonth() + 1).toString().padStart(2,'0') == '05') {
          return 'MAY ' + date.getFullYear()
        } else if ((date.getMonth() + 1).toString().padStart(2,'0') == '06') {
          return 'JUNE ' + date.getFullYear()
        } else if ((date.getMonth() + 1).toString().padStart(2,'0') == '07') {
          return 'JULY ' + date.getFullYear()
        } else if ((date.getMonth() + 1).toString().padStart(2,'0') == '08') {
          return 'AUGUST ' + date.getFullYear()
        } else if ((date.getMonth() + 1).toString().padStart(2,'0') == '09') {
          return 'SEPTEMBER ' + date.getFullYear()
        } else if ((date.getMonth() + 1).toString().padStart(2,'0') == '10') {
          return 'OCTOBER ' + date.getFullYear()
        } else if ((date.getMonth() + 1).toString().padStart(2,'0') == '11') {
          return 'NOVEMBER ' + date.getFullYear()
        } else if ((date.getMonth() + 1).toString().padStart(2,'0') == '12') {
          return 'DECEMBER ' + date.getFullYear()
        }
      }
    },
}

