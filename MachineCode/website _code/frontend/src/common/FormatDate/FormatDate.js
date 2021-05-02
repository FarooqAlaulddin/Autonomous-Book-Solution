export default function FormatDate(){
  var input = arguments[0];
  var from = arguments[1];
  var to = arguments[2];

  if(input == null || from == null || to == null) return "Error => FormatDate() - Need More Args"

  if(from === 'yyyy-mm-dd' && to === 'mm/dd/yyyy'){
  var date = new Date(input);
    if (!isNaN(date.getTime())) {
        // Months use 0 index.
        return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
      }
    }
};
