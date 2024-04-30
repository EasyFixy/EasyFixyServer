module.exports = {
    scriptConsultaHoraCreacionTemporalPassword: "SELECT userTempPasswordChangeTimestamp FROM usertemppasswordchange WHERE userId= ? and usertemppasswordchangeValue=?;",
    scriptUpdatePassword: "UPDATE `users` SET `userPassword` = ? WHERE (`userId` = ?);",
    scriptGetUserIdFromUserEmail: "SELECT userId FROM users WHERE userEmail = ? limit 1;",
    scriptCreateTemporalPassword: "INSERT INTO usertemppasswordchange (userTempPasswordChangeTimestamp,userTempPasswordChangeValue,userId) VALUES (NOW(), ?,?);",
    scriptVerifyUserPassword: "SELECT userId FROM users WHERE userEmail = ? and userPassword = ? limit 1",
    scriptCreateUser: "INSERT INTO `users` (`userName`, `userEmail`, `userPassword`, `userPhoneNumber`, `userNationalId`, `userNationality`, `userPrefixNational`, `userDateOfBirth`, `userMoney`, `userDateOfRegister`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, NOW());",
    scriptCheckEmailRegistered: "SELECT count(userId) as cantidad FROM users where userEmail = ?;",
    scriptInsertJobOffer: "INSERT INTO `joboffers` (`userId`, `jobOfferDescription`, `jobOfferDateAtCreate`, `jobOfferDateAtWork`, `jobOfferEstimatePrice`, `jobOfferTittle`, `jobOfferUbication`) VALUES (?, ?, NOW(), ?, ?, ?, ?);",
    scriptGetLaborCategories: "SELECT laborCategoryId, laborCategoryName,laborCategoryIcon FROM laborcategories;",
    scriptModifyUserInfo: "UPDATE `users` SET `userPhoneNumber` = ?, `userNationality` = ?, `userPrefixNational` = ? WHERE (`userId` = ?);",
    scriptInsertResume: "INSERT INTO `resumes` (`userId`, `resumeDescription`, `resumeTimeExperience`, `resumeTitleLabor`) VALUES (?, ?, ?, ?);",
    scriptInsertLaborResumeRelationship: "INSERT INTO `laborsresumes` (`resumeId`, `laborId`) VALUES (?, ?);",
    scriptInsertUserSkill: "INSERT INTO `skills` (`userId`, `skillName`) VALUES (?, ?);",
    scriptGetUserMainData: "SELECT userName, userPhoneNumber, userNationalId, userEmail, userNationality, userPrefixNational, TIMESTAMPDIFF(YEAR, userDateOfBirth, CURDATE()) AS edad, TIMESTAMPDIFF(YEAR, userDateOfRegister, CURDATE()) AS 'antiguedadYears', TIMESTAMPDIFF(MONTH, userDateOfRegister, CURDATE()) % 12 AS 'antiguedadMonths', userDateOfRegister FROM users where userId=?;",
    scriptGetUserSkills: "SELECT skillId, skillName FROM skills where userId = ?;",
    scriptGetUserResumes: "SELECT resumeId, resumeDescription, resumeTimeExperience, resumeTitleLabor FROM resumes where userId = ?;",
    scriptGetResumeLebors: "SELECT l.laborId, b.laborCategoryId, b.laborName FROM laborsresumes as l join resumes as r on r.resumeId = l.resumeId join labors as b on b.laborId = l.laborId where l.resumeId=?;",
    scriptUpdateUserTempDataActivate: "UPDATE `userstempdata` SET `userTempDataLatitude` = ?, `userTempDataLongitude` = ?, `userTempDataActive` = '1', `userTempDataDate` = NOW() WHERE (`userTempDataId` = ?);",
    scriptUpdateUserTempDataDeactivate: "UPDATE `userstempdata` SET `userTempDataActive` = '0', `userTempDataDate` = NOW() WHERE (`userTempDataId` = ?);",
    scriptGetBestWorkersForLabors: `select tableWithPonderatedValues.userId, max(tableWithPonderatedValues.calificacionDistancia*0.4 + tableWithPonderatedValues.calificacionMedia *0.6 ) as listingValue from(select firstData.userName, 
        firstData.userId, 
        firstData.userTempDataLatitude, 
        firstData.userTempDataLongitude, 
        firstData.distanceKm, 
        CASE
         WHEN firstData.distanceKm < 1 THEN 5
         WHEN firstData.distanceKm < 4 THEN 4
         WHEN firstData.distanceKm < 8 THEN 3
         WHEN firstData.distanceKm < 15 THEN 2
         ELSE 1
     END AS calificacionDistancia,
         firstData.calificacionMedia, 
         firstData.resumeTimeExperience, 
         firstData.laborId from (SELECT u.userName, u.userId, utd.userTempDataLatitude, utd.userTempDataLongitude, (
         6371 * 
         acos(
             cos(radians(utd.userTempDataLatitude)) * 
             cos(radians(?)) * /*lat 2*/
             cos(radians(utd.userTempDataLongitude) - radians(?)) + /*lon 2*/
             sin(radians(utd.userTempDataLatitude)) * 
             sin(radians(?)) /*lat 2*/
         )
     ) AS distanceKm, c.calificacionMedia, r.resumeTimeExperience, l.laborId FROM users as u join userstempdata as utd on utd.userId = u.userId join 
 (SELECT recipientId, avg(commentCalification) as calificacionMedia FROM comments where commentRol="worker" GROUP BY recipientId) as c on u.userId = c.recipientId join
 resumes as r on u.userId = r.userId join laborsresumes as l on l.resumeId = r.resumeId where l.laborId in (?) order by utd.userTempDataActive DESC) as firstData) as tableWithPonderatedValues GROUP BY tableWithPonderatedValues.userId
 ORDER BY listingValue DESC;`,
    scriptInsertUserSkills: "INSERT INTO `skills` (`userId`, `skillName`) VALUES ?;",
    scriptGetEmployerOfertedOffers: "SELECT f.jobOfferId,f.jobOfferDescription,f.jobOfferDateAtCreate,f.jobOfferDateAtWork,f.jobOfferEstimatePrice,f.jobOfferTittle FROM joboffers f left join jobs j on j.jobOfferId=f.jobOfferId WHERE j.jobId IS NULL and f.userId=?;",
    scriptGetEmployerPendingJobs: "SELECT f.jobOfferId,f.jobOfferDescription,f.jobOfferDateAtCreate,f.jobOfferDateAtWork,f.jobOfferEstimatePrice,f.jobOfferTittle FROM joboffers f left join jobs j on j.jobOfferId=f.jobOfferId WHERE j.jobStatus = 0 and f.userId=?;",
    scriptGetEmployerDoneJobs: "SELECT f.jobOfferId,f.jobOfferDescription,f.jobOfferDateAtCreate,f.jobOfferDateAtWork,f.jobOfferEstimatePrice,f.jobOfferTittle FROM joboffers f left join jobs j on j.jobOfferId=f.jobOfferId WHERE j.jobStatus = 1 and f.userId=?;",
    scriptGetCommentsByEmployee: "SELECT commentId, senderId, commentCalification, commentMessage, commentDate, calificador.userName as senderName FROM comments c join users calificador on calificador.userId = c.senderId where c.commentRol='worker' and c.recipientId = ? order by c.commentDate DESC;",
    scriptGetResumeComentsByEmployee: "SELECT COUNT(*) AS cantidadTotalComentariosEmployee, AVG(commentCalification) as mediaCalificaciones FROM comments c where c.commentRol='worker' and c.recipientId = ? group by recipientId;",
    scriptGetUserTempData: "SELECT userTempDataActive, userTempDataLatitude, userTempDataLongitude, userTempDataDate as userTempDataLastUpdate FROM userstempdata where userId = ?;",
    scrpitInsertStarterUserTempData: "INSERT INTO `userstempdata` (`userId`, `userTempDataLatitude`, `userTempDataLongitude`, `userTempDataActive`, `userTempDataDate`) VALUES (?, '0', '0', '0', NOW());",
    scriptInsertLaborsToJobOffer: "INSERT INTO `jobofferslabors` ( `jobOfferId`, `laborId`) VALUES ?;",
    scriptGetConversations: `SELECT 
    t.desiredUserId,
    t.messageText AS lastMessageText,
    t.messageDate AS lastMessageDate,
    us.userName,
    t.userId as lastMessageSenderId
   FROM 
    (SELECT 
        n.desiredUserId,
        MAX(n.messageDate) AS maxDate
    FROM 
        (SELECT 
    um.messageId,
    um.userId,
    um.userId2,
    CASE 
        WHEN userId = ? THEN userId2
        ELSE userId
    END AS desiredUserId, m.messageDate, m.messageText
   FROM 
    usersmessages um JOIN messages m ON m.messageId = um.messageId
   WHERE 
    userId = ? OR userId2 = ? ORDER BY m.messageDate DESC) n
    GROUP BY 
        desiredUserId) AS maxDates
   INNER JOIN 
    (SELECT 
    um.messageId,
    um.userId,
    um.userId2,
    CASE 
        WHEN userId = ? THEN userId2
        ELSE userId
    END AS desiredUserId, m.messageDate, m.messageText
   FROM 
    usersmessages um JOIN messages m ON m.messageId = um.messageId
   WHERE 
    userId = ? OR userId2 = ? ORDER BY m.messageDate DESC) AS t ON t.desiredUserId = maxDates.desiredUserId AND t.messageDate = maxDates.maxDate JOIN users as us on t.desiredUserId = us.userId;`,
    scriptGetMessagesByConversation: "SELECT um.messageId,um.userId,um.userId2,m.messageDate,m.messageText FROM usersmessages um JOIN messages m on m.messageId = um.messageId WHERE (um.userId = ? AND um.userId2 = ?) or (um.userId = ? AND um.userId2 = ?) order by m.messageDate ASC;",
    scriptInsertComment: "INSERT INTO `comments` (`senderId`, `recipientId`, `commentCalification`, `commentMessage`, `commentDate`, `commentRol`) VALUES (?, ?, ?, ?, NOW(), ?);",
    scriptInsertCommentRelation: "INSERT INTO `usersmessages` (`messageId`, `userId`, `userId2`) VALUES (?, ?, ?);",
    scriptConsultaJobTittle: "SELECT jobOfferTittle FROM joboffers WHERE userId=? and jobOfferId=?;",
    scriptConsultaInsertJob: "INSERT INTO `jobs` (`jobOfferId`, `userId`, `jobDate`, `jobStatus`, `jobPrice`) VALUES (?, ?, NOW(), '0', ?);",
    scrpitUpdateJobOrderId: "UPDATE `jobs` SET `jobOrderId` = ? WHERE (`jobId` = ?);",
    scriptGetJobPrice: "SELECT jobPrice FROM jobs WHERE jobId = ?;",
    scriptInsertInvoice: "INSERT INTO `invoices` (`jobId`, `invoiceAmount`, `invoiceStatus`, `mercadoPagoPaymentId`) VALUES (?, ?, ?, ?);",
    scriptPutJobToPaid: "UPDATE `jobs` SET `jobStatus` = '1' WHERE (`jobId` = ?);",
    scriptUpdateJobStatus: "UPDATE `jobs` SET `jobStatus` = ? WHERE (`jobId` = ?);",
    scriptIncrementUserMoneyFomJob: `UPDATE jobs j join users u on j.userId=u.userId
    SET u.userMoney = u.userMoney + j.jobPrice
    where j.jobId=?;`,
    scriptInsertMessage: "INSERT INTO `messages` (`messageDate`, `messageText`) VALUES (NOW(), ?);",
    scriptInsertUserMessageRelationship: "INSERT INTO `usersmessages` (`messageId`, `userId`, `userId2`) VALUES (?,?,?);",
    scriptCreateDispatch: "INSERT INTO `dispatches` (`userId`, `dispatchAmount`, `dispatchDate`, `dispatchStatus`) VALUES (?, ?, NOW(), '0')",
    scriptGetUserMoney: "SELECT userMoney FROM users where userId = ? LIMIT 1;",
    scriptGetUserSkills: "SELECT skillId,skillName FROM skills WHERE userId=?;",
    scriptDeleteSkill: "DELETE FROM `skills` WHERE (`skillId` = ? and userId = ?);",
    scriptGetUserProfit: "SELECT SUM(jobPrice) AS totalProfit FROM jobs WHERE userId=? and jobStatus=1 GROUP BY userId LIMIT 1;"
}