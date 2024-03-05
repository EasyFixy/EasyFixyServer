module.exports =  {
    scriptConsultaHoraCreacionTemporalPassword: "SELECT userTempPasswordChangeTimestamp FROM prueva_easyfixy.usertemppasswordchange WHERE userId= ? and usertemppasswordchangeValue=?;",
    scriptUpdatePassword: "UPDATE `prueva_easyfixy`.`users` SET `userPassword` = ? WHERE (`userId` = ?);",
    scriptGetUserIdFromUserEmail: "SELECT userId FROM prueva_easyfixy.users WHERE userEmail = ? limit 1;",
    scriptCreateTemporalPassword: "INSERT INTO prueva_easyfixy.usertemppasswordchange (userTempPasswordChangeTimestamp,userTempPasswordChangeValue,userId) VALUES (NOW(), ?,?);",
    scriptVerifyUserPassword: "SELECT userId FROM users WHERE userEmail = ? and userPassword = ? limit 1",
    scriptCreateUser: "INSERT INTO `prueva_easyfixy`.`users` (`userName`, `userEmail`, `userPassword`, `userPhoneNumber`, `userNationalId`, `userNationality`, `userPrefixNational`, `userDateOfBirth`, `userMoney`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0);",
    scriptCheckEmailRegistered: "SELECT count(userId) as cantidad FROM prueva_easyfixy.users where userEmail = ?;"
}