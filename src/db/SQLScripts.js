module.exports =  {
    scriptConsultaHoraCreacionTemporalPassword: "SELECT userTempPasswordChangeTimestamp FROM usertemppasswordchange WHERE userId= ? and usertemppasswordchangeValue=?;",
    scriptUpdatePassword: "UPDATE `users` SET `userPassword` = ? WHERE (`userId` = ?);",
    scriptGetUserIdFromUserEmail: "SELECT userId FROM users WHERE userEmail = ? limit 1;",
    scriptCreateTemporalPassword: "INSERT INTO usertemppasswordchange (userTempPasswordChangeTimestamp,userTempPasswordChangeValue,userId) VALUES (NOW(), ?,?);",
    scriptVerifyUserPassword: "SELECT userId FROM users WHERE userEmail = ? and userPassword = ? limit 1",
    scriptCreateUser: "INSERT INTO `users` (`userName`, `userEmail`, `userPassword`, `userPhoneNumber`, `userNationalId`, `userNationality`, `userPrefixNational`, `userDateOfBirth`, `userMoney`, `userDateOfRegister`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, NOW());",
    scriptCheckEmailRegistered: "SELECT count(userId) as cantidad FROM users where userEmail = ?;",
    scriptInsertJobOffer: "INSERT INTO `joboffers` (`userId`, `jobOfferDescription`, `jobOfferDateAtCreate`, `jobOfferDateAtWork`, `jobOfferEstimatePrice`, `jobOfferTittle`) VALUES (?, ?, NOW(), ?, ?, ?);",
    scriptGetLaborCategories: "SELECT laborCategoryId, laborCategoryName FROM easyfixy.laborcategories;",
    scriptModifyUserInfo: "UPDATE `users` SET `userPhoneNumber` = ?, `userNationality` = ?, `userPrefixNational` = ? WHERE (`userId` = ?);"
}