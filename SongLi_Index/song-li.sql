-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-08-25 13:23:13
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `song-li`
--

-- --------------------------------------------------------

--
-- 資料表結構 `contactus`
--

CREATE TABLE `contactus` (
  `cid` int(50) NOT NULL,
  `uName` varchar(50) NOT NULL,
  `uGender` varchar(10) NOT NULL,
  `uTel` varchar(20) NOT NULL,
  `uEmail` varchar(50) NOT NULL,
  `msgClass` varchar(20) NOT NULL,
  `msg` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `contactus`
--

INSERT INTO `contactus` (`cid`, `uName`, `uGender`, `uTel`, `uEmail`, `msgClass`, `msg`) VALUES
(1, '王小明', '先生', '0912345678', '', '訂單相關問題', '請問有現貨嗎?'),
(2, '王小美', '小姐', '0912345678', '', '運送相關問題', '請問可以超取嗎?'),
(3, '王小美', '小姐', '0912334444', '', '付款相關問題', '請問可以貨到付款嗎?'),
(4, '王小美', '小姐', '0912334455', '', '付款相關問題', '請問可以貨到付款嗎?');

-- --------------------------------------------------------

--
-- 資料表結構 `member_calendar`
--

CREATE TABLE `member_calendar` (
  `uid` int(11) NOT NULL,
  `uAccount` varchar(50) NOT NULL,
  `uDate` date NOT NULL,
  `uWho` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `member_calendar`
--

INSERT INTO `member_calendar` (`uid`, `uAccount`, `uDate`, `uWho`) VALUES
(1, 'melody', '2024-08-08', '父親節');

-- --------------------------------------------------------

--
-- 資料表結構 `news`
--

CREATE TABLE `news` (
  `nid` int(20) NOT NULL,
  `nImage` varchar(100) NOT NULL,
  `nClass` varchar(5) NOT NULL,
  `nDate` date NOT NULL,
  `nTitle` varchar(30) NOT NULL,
  `nText` varchar(50) NOT NULL,
  `nContent` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='id、圖片、分類、日期、標題、內容';

--
-- 傾印資料表的資料 `news`
--

INSERT INTO `news` (`nid`, `nImage`, `nClass`, `nDate`, `nTitle`, `nText`, `nContent`) VALUES
(1, '../image/newsImg_1.png', '訊息通知', '2024-01-28', '❁❁2024年前配送特別說明❁❁', '❗因春節配送繁盛期間，黑貓配送公告可能無法於指定日期到貨。', '例如：選擇 1/18 到貨<br>\r\n實際到貨時間可能為 1/18~1/20 <br>\r\n*為確保所有包裹都能於春節前安全抵達<br>\r\n雙北/桃園以外縣市之宅配包裹<br>\r\n可能會提早 1~2 日出貨<br>'),
(2, '../image/newsImg_2.png', '優惠活動', '2024-04-29', '母親節 | 限定花束新上市！預定享優惠', '', ''),
(3, '../image/newsImg_3.png', '優惠活動', '2024-05-27', ' 畢業季 | 畢業花束搭配小物優惠活動開跑', '', ''),
(4, '../image/newsImg_4.png', '優惠活動', '2024-07-20', '父親節專屬感謝！', '這個父親節，讓我們一起用鮮花傳遞最溫暖的愛意！🌹👔', '全場父親節花束任選8折優惠，精緻花藝，讓爸爸感受到您的用心。<br>\r\n贈送小驚喜：凡購買父親節花束，均可獲得精美手工巧克力一份，為爸爸的節日增添甜蜜。<br>\r\n訂花滿額禮：消費滿1000元，即可免費獲得一張精美手寫賀卡，讓您把最真摯的祝福送給爸爸！<br>\r\n🌟即刻行動，讓爸爸感受您最深的感謝和愛意！快來選擇一束獨一無二的花，傳遞您的溫暖祝福吧！💖<br>\r\n父親節快樂！🌟');

-- --------------------------------------------------------

--
-- 資料表結構 `orderitems`
--

CREATE TABLE `orderitems` (
  `oItemId` int(11) NOT NULL,
  `oId` int(11) NOT NULL,
  `pId` varchar(11) NOT NULL,
  `oQuantity` int(11) NOT NULL,
  `cardRecipient` varchar(50) NOT NULL,
  `cardSender` varchar(50) NOT NULL,
  `cardContent` varchar(255) NOT NULL,
  `UnitPrice` int(11) NOT NULL,
  `TotalPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `orderitems`
--

INSERT INTO `orderitems` (`oItemId`, `oId`, `pId`, `oQuantity`, `cardRecipient`, `cardSender`, `cardContent`, `UnitPrice`, `TotalPrice`) VALUES
(1, 1, 'F1', 1, 'x', 'x', 'x', 1280, 1280),
(2, 1, 'F2', 1, 'x', 'x', 'x', 890, 890),
(3, 1, 'thankyou', 1, '爸爸', '我', '父親節快樂', 30, 30);

-- --------------------------------------------------------

--
-- 資料表結構 `orders`
--

CREATE TABLE `orders` (
  `oId` int(11) NOT NULL,
  `uAccount` varchar(50) NOT NULL,
  `oDate` date NOT NULL,
  `totalAmount` int(11) NOT NULL,
  `shipName` varchar(50) NOT NULL,
  `shipTel` varchar(10) NOT NULL,
  `shipEmail` varchar(50) NOT NULL,
  `shippingAddress` varchar(255) NOT NULL,
  `billingAddress` varchar(255) NOT NULL,
  `oStatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `orders`
--

INSERT INTO `orders` (`oId`, `uAccount`, `oDate`, `totalAmount`, `shipName`, `shipTel`, `shipEmail`, `shippingAddress`, `billingAddress`, `oStatus`) VALUES
(1, 'melody', '2024-08-25', 2200, '許乃云', '0966381829', 'melody321003@gmail.com', '臺北市北投區吉利街257巷3弄20號1樓', '臺北市北投區吉利街257巷3弄20號1樓', '備貨中，預計3日內出貨');

-- --------------------------------------------------------

--
-- 資料表結構 `product`
--

CREATE TABLE `product` (
  `productId` varchar(11) NOT NULL COMMENT '商品ID',
  `productName` varchar(50) NOT NULL COMMENT '商品名稱',
  `productPrice` int(10) NOT NULL COMMENT '商品價格',
  `productText` varchar(400) NOT NULL COMMENT '商品內容',
  `productImg1` varchar(100) NOT NULL COMMENT '商品圖1',
  `productImg2` varchar(100) DEFAULT NULL COMMENT '商品圖2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `product`
--

INSERT INTO `product` (`productId`, `productName`, `productPrice`, `productText`, `productImg1`, `productImg2`) VALUES
('F1', '紅玫瑰鮮花束', 1280, '紅玫瑰花語：代表熱戀、熱愛、真心，紅色的玫瑰也代表心的顏色、火焰的顏色，用以象徵真心、火熱的心。', '../../image/product_images/flowers.images/F1-1-rose.png', '../../image/product_images/flowers.images/F1-2-rose.png'),
('F2', '奶油向日葵鮮花束', 890, '向日葵花語：勇敢追逐自己的夢想', '../../image/product_images/flowers.images/F2-1-sun.png', '../../image/product_images/flowers.images/F2-2-sun.png'),
('F3', '藍色繡球花鮮花束', 820, '繡球花花語：繡球花是由一朵朵小花聚集而成，有著「家族」、「友愛」、「團聚」的花語。', '../../image/product_images/flowers.images/F3-1-blueball.png', '../../image/product_images/flowers.images/F3-2-blueball.png'),
('F4', '康乃馨鮮花束', 780, '康乃馨花語：母愛、親情、熱情、魅力、真情、溫馨的祝福、慈祥、寬容', '../../image/product_images/flowers.images/F4-1-mother.png', '../../image/product_images/flowers.images/F4-2-monther.png'),
('L1', '法式奶茶質感永生花束', 1080, '【花材】進口永生玫瑰、永生繡球、永生乾燥花材等', '../../image/product_images/life_images/L1-1-milktea.png', '../../image/product_images/life_images/L1-2-milktea.png'),
('L2', '暖暖的夕陽永生盆花', 1280, '【花材】進口永生玫瑰、永生百日菊、永生乾燥花材等', '../../image/product_images/life_images/L2-1-sun.png', '../../image/product_images/life_images/L2-2-sun.png'),
('L3', '永生花蛋糕花', 990, '【花材】進口永生玫瑰、永生繡球花、永生旱雪蓮花、永生乾燥花材等', '../../image/product_images/life_images/L3-1-birthday.png', '../../image/product_images/life_images/L3-2-birthday.png'),
('L4', '永生花聖誕樹', 780, '【花材】永生汗雪蓮、永生松果、永生繡球花、永生乾燥花材等', '../../image/product_images/life_images/L4-1-tree.png', '../../image/product_images/life_images/L4-2-tree.png'),
('S1', '訂閱制-每週1花束', 999, '【購買數量1 = 1期，每期7天，以此類推】\r\n花材種類：使用每週一於花市採購的新鮮花卉，依照季節變換更替花種。\r\n配送日期：每週二 10:00 - 16:00 配送。如需指定配送時間，會另外收取專車配送費，歡迎來訊洽詢。\r\n備註：此服務不提供個性化選擇花材。', '../../image/product_images/subscribe.images/S1-1-week.png', '../../image/product_images/subscribe.images/S1-2-week.png'),
('S2', '訂閱制-每月1花束', 999, '【購買數量1 = 1期，每期30天，以此類推】\r\n花材種類：使用每週一於花市採購的新鮮花卉，依照季節變換更替花種。\r\n配送日期：每月第二週 週二 10:00 - 16:00 配送。如需指定配送時間，會另外收取專車配送費，歡迎來訊洽詢。\r\n備註：此服務不提供個性化選擇花材。', '../../image/product_images/subscribe.images/S1-1-week.png', '../../image/product_images/subscribe.images/S1-2-week.png'),
('S3', '訂閱制-每週1盆花', 1299, '【購買數量1 = 1期，每期7天，以此類推】\r\n花材種類：使用每週一於花市採購的新鮮花卉，依照季節變換更替花種。\r\n配送日期：每週二 10:00 - 16:00 配送。如需指定配送時間，會另外收取專車配送費，歡迎來訊洽詢。\r\n備註：此服務不提供個性化選擇花材。', '../../image/product_images/subscribe.images/S2-1-pot.png', '../../image/product_images/subscribe.images/S2-1-pot.png'),
('S4', '訂閱制-每月1盆花', 1299, '【購買數量1 = 1期，每期30天，以此類推】\r\n花材種類：使用每週一於花市採購的新鮮花卉，依照季節變換更替花種。\r\n配送日期：每月第二週 週二 10:00 - 16:00 配送。如需指定配送時間，會另外收取專車配送費，歡迎來訊洽詢。\r\n備註：此服務不提供個性化選擇花材。', '../../image/product_images/subscribe.images/S2-1-pot.png', '../../image/product_images/subscribe.images/S2-2-pot.png'),
('T1', '手作花瓶/鑲嵌玻璃', 520, '焊錫會因接觸空氣氧化而產生變化，尤其染銅色變化最大，從亮銅>古銅>直至深褐色，所以不會跟照片完全相同呦。', '../../image/product_images/goods_images/G1-glass.png', '../../image/product_images/goods_images/G1-glass.png'),
('T2', '試管花器相框組', 480, '獨特的木架設計，將玻璃花瓶和木質相框完美組合，不管是乾燥花或水耕植物都可以直接放進試管玻璃中；木架表面上漆，除了能延長木架的使用期限，也能讓木紋更加清晰光亮，容易清潔。', '../../image/product_images/goods_images/G2-glass.png', '../../image/product_images/goods_images/G2-glass.png'),
('T3', '精美透明提袋', 65, '精美透明提袋', '../../image/product_images/goods_images/G3-bag.png', '../../image/product_images/goods_images/G3-bag.png'),
('T4', '櫥窗提袋', 80, '櫥窗提袋', '../../image/product_images/goods_images/G4-bag.png', '../../image/product_images/goods_images/G4-bag.png');

-- --------------------------------------------------------

--
-- 資料表結構 `qna`
--

CREATE TABLE `qna` (
  `qid` int(11) NOT NULL,
  `qClass` varchar(10) NOT NULL,
  `question` varchar(200) NOT NULL,
  `answer` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `qna`
--

INSERT INTO `qna` (`qid`, `qClass`, `question`, `answer`) VALUES
(1, '訂花須知', '請問可以客製化花束嗎？', '目前是以官網的設計樣式為主，未提供客製花束的服務。'),
(2, '訂花須知', '請問可以更換花束裡面的花材嗎？', '店內販售的花束與花禮都是依照官網樣式去設計製作，故無提供更換花材與客製化花束服務。'),
(3, '訂花須知', '請問我訂的花束會與官網的花束一模一樣嗎？', '花卉是屬於季節性，植物會隨著氣候與季節的不同而有所差異，我們的花藝師在設計花禮時，會重複確認花束的色彩與花材，會維持最接近花束照片的樣式設計，如遇花材短缺，會幫您配上同色系並等值的花材。'),
(4, '訂花須知', '請問卡片有字數限制嗎？', '因為字數越多字體會越小，故內容字數限制30字以內。'),
(5, '付款方式及運送方式', '請問付款方式有哪些？', '目前僅提供信用卡刷卡付款。'),
(6, '付款方式及運送方式', '請問離島可以配送嗎？', '目前僅配送台灣本島，尚未開放離島地區運送服務。'),
(7, '花禮照護', '鮮花怎麼照顧？', '．鮮花鑑賞期為3-5天\n．當花束插入裝水的花器，建議每日換水及修剪花莖，放置於通風陰涼的環境，可以延長花束的壽命。\n．花束底下有包水袋，水量約可維持1天，若想維持包裝，可以每日將適量清水注入水袋內。\n．盆花建議每日將適量清水注入海綿，保持濕潤。\n．澆水時盡量避開花瓣，如果有枯萎泛黃的花瓣葉子，將其摘除取出，以免影響其他植物的壽命。'),
(8, '花禮照護', '永生花怎麼照顧？', '．保存期限：1~3年。\r\n．照護建議：放在乾燥、陰涼處,避免潮濕、陽光直射。');

-- --------------------------------------------------------

--
-- 資料表結構 `userinfo`
--

CREATE TABLE `userinfo` (
  `uId` smallint(6) NOT NULL,
  `uName` varchar(50) NOT NULL,
  `uAccount` varchar(50) NOT NULL,
  `uPwd` varchar(256) NOT NULL,
  `uBirth` date NOT NULL,
  `uGender` varchar(10) NOT NULL,
  `uTel` varchar(10) NOT NULL,
  `uEmail` varchar(50) NOT NULL,
  `uActivate` varchar(3) NOT NULL,
  `uChoice` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `userinfo`
--

INSERT INTO `userinfo` (`uId`, `uName`, `uAccount`, `uPwd`, `uBirth`, `uGender`, `uTel`, `uEmail`, `uActivate`, `uChoice`) VALUES
(8, '許乃云', 'melody', '$2y$10$oYd.bTrHvtRq4DGdxRxgbOVW30fEI2RhR3gh9d/8W6mBr97YLKwu.', '2001-01-06', '女', '0966381829', 'melody321003@gmail.com', '1', '是'),
(15, '王小美', 'melody123', '$2y$10$Fw2S2ukGjh1TbhDXj5e/PeZukYccr31uTRbx9RcVyX9oRbmqhRbRW', '2001-01-06', '女', '0966381829', 'xunworking@gmail.com', '1', '是');

-- --------------------------------------------------------

--
-- 資料表結構 `verification`
--

CREATE TABLE `verification` (
  `hashToken` varchar(256) NOT NULL,
  `expiryTime` int(11) NOT NULL,
  `pwdToken` varchar(256) NOT NULL,
  `pwdExpirytime` int(11) NOT NULL,
  `uAccount` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `verification`
--

INSERT INTO `verification` (`hashToken`, `expiryTime`, `pwdToken`, `pwdExpirytime`, `uAccount`) VALUES
('59d8222097e411f555d6f6bd94b3a24447f879be9f498546164f96a4c27f55c1', 1724214463, '', 0, 'melody123'),
('bcac803c92e21c8a657d481578693227692ed4ebe35b5188419de063d6b203cf', 1723792064, 'aabc3c531f467ffef1f3bdc41e0a4c4c11ec63759da0b27495ac9b8dba64967b', 1724056521, 'melody');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`cid`);

--
-- 資料表索引 `member_calendar`
--
ALTER TABLE `member_calendar`
  ADD PRIMARY KEY (`uid`);

--
-- 資料表索引 `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`nid`);

--
-- 資料表索引 `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`oItemId`);

--
-- 資料表索引 `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`oId`);

--
-- 資料表索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productId`);

--
-- 資料表索引 `qna`
--
ALTER TABLE `qna`
  ADD PRIMARY KEY (`qid`);

--
-- 資料表索引 `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`uId`,`uAccount`) USING BTREE;

--
-- 資料表索引 `verification`
--
ALTER TABLE `verification`
  ADD PRIMARY KEY (`hashToken`),
  ADD KEY `uAccount` (`uAccount`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `contactus`
--
ALTER TABLE `contactus`
  MODIFY `cid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member_calendar`
--
ALTER TABLE `member_calendar`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `oItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orders`
--
ALTER TABLE `orders`
  MODIFY `oId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `qna`
--
ALTER TABLE `qna`
  MODIFY `qid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `uId` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
