function LunchSendMail() {
  
  // 本日の月を取得する。
  var date = new Date();
  var month = date.getMonth()+1;
  
  // スプレットシート、シート情報を取得する。
  var ssAdress = SpreadsheetApp.openById('1Wf2nEZEh4YfiKSfn2iNfBIs8hcxsFdYBBI8o6vwJYxY'); // スプレットシートを取得する。
  var sheetMonth = ssAdress.getSheetByName('69期${month}月'.replace('${month}', month));  // シートを取得する。
  var lastColumn = sheetMonth.getLastColumn(); // シートの最終列番号を取得する。
  var ssSheetAdress = SpreadsheetApp.openById('1HIP359dJRclqwRV-H1KUo9Qluddv4SdWttLsr02DU18');
  var sheetAdress = ssSheetAdress.getSheetByName('メールアドレス（昼休み当番）'); // シートを取得する。
  var lunchBreakStaffs = sheetMonth.getRange(2, 2, 1, lastColumn-1).getValues(); // 昼当番担当者の情報を取得する。
  var days = sheetMonth.getRange(6, 2, 1, lastColumn-1).getValues(); // 日付の情報を取得する。
  var staffs = sheetAdress.getRange('A2:B17').getValues(); // 担当者、メールアドレスの情報を取得する。
  // アンダースコアを使用して行と列を反転させる。
  var _ = Underscore.load();
  var staffsTrans = _.zip.apply(_, staffs);

  
  // 本日の日付を取得する。
  var date = new Date();
  var today = Utilities.formatDate( date, 'Asia/Tokyo', 'MM/dd');
  // 変数を定義する。
  var dayNumber = 0;
  var lunchBreakStaff = "";
  // 「日付の情報」と「本日の日付」が一致する番号を取得する。
  days.forEach(function(day){
    day.forEach(function(day2){
      var _day3 = day2
      var day3 = Utilities.formatDate( day2, 'Asia/Tokyo', 'MM/dd');
      if(today == day3) {
         dayNumber = day.indexOf(_day3); // 本日の日付のセル番号を取得する。       
      }
    });        
  });
  
  // 昼当番担当者のメールアドレスを取得する。 
  lunchBreakStaffs.forEach(function(lunchBreakStaff){
    staffsTrans[0].forEach(function(_staff){
      if(_staff == lunchBreakStaff[dayNumber]){
        var staffNumber = staffsTrans[0].indexOf(_staff);
        var staffAdress = staffsTrans[1][staffNumber];
        Logger.log(staffAdress); 
        
        // メールの送信先
        var to = staffAdress;
        // メールのタイトル
        var subject = '本日の昼当番お願いします。';
        // メールの本文
        var body = '\
  ${_staff}さん\n\n\
  お仕事お疲れ様です。\n\
  本日、昼休みの電話当番です。\n\n\n\
  よろしくお願いします。'.replace('${_staff}', _staff)

        var options = { name: 'ISOWA_support'};
  
        GmailApp.sendEmail(
        to,
        subject,
        body,
        options
        );
      }
    });
  });  
} 
  
  
