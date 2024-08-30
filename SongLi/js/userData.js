// 這裡是給後端定義的js

$(document).ready(function () {
    let userAccount = sessionStorage.getItem('User');
    // =============================================//
    // ===============印出會員資料的js===============//
    // =============================================//


    function userdata() {
        $.ajax({
            url: '../php/member.php',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                uAccount: userAccount
            }),
        }).done(function (memberdata) {
            // console.log(memberdata);
            var data = JSON.parse(memberdata)
            // JSON.parse()字串轉物件
            // JSON.stringify()物件轉字串
            // console.log(data[0]);
            mName.value = data[0].uName;
            mBirthday.innerText = data[0].uBirth;
            mGender.innerText = data[0].uGender;
            mAccount.innerText = data[0].uAccount;
            // mPwd.innerText = data[0].uPwd;
            mEmail.value = data[0].uEmail;
            mTel.value = data[0].uTel;

            if (data[0].uChoice === "是") {
                $('#mChoiceYes').prop("checked", true);
            } else if
                (data[0].uChoice === "否") {
                $('#mChoiceNo').prop("checked", true);
            }
        })
    }
    userdata();




    // =============================================//
    // ===============更新會員資料的js===============//
    // =============================================//

    // function setUserUpdata() {
    $('#mupdata').on('click', function (event) {
        event.preventDefault();

        var userUpdata = {
            uName: $('#mName').val(),
            uAccount: userAccount,
            uEmail: $('#mEmail').val(),
            uTel: $('#mTel').val(),
            uChoice: $('input[name="choice"]:checked').val()

        };

        $.ajax({
            url: '../php/updataInfo.php',
            method: 'POST',
            data: JSON.stringify(userUpdata),
            contentType: 'application/json',
            dataType: 'json',

        }).done(function (response) {
            if (response.success) {
                console.log('更新成功');
                alert('更新成功');
                // userUpdata();
            } else {
                console.log('更新失敗:', response.message);
                alert('更新失敗');

            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log('AJAX 請求失敗:', textStatus, errorThrown);
        });
    });
    // }

    // $(document).ready(function () {
    // setUserUpdata();
    // });

    // ======================================================= //
    // =============加入會員月曆備註進去資料庫的js============= //
    // ====================================================== //


    let td
    let newDate
    $('#calendarDate').on('click', '.days>tr>td', function () {
        td = $(this)
        newDate = `${$('.year').text()}-${$('.month').text()}-${td.text()}`;
    })
    $('#controls').on('submit', function (event) {
        event.preventDefault();

        var userCalendar = {
            uDate: newDate,
            uWho: $('#whoInput').val(),
            uAccount: userAccount
        }
        console.log(userCalendar);
        userdate(userCalendar);


    })
    function userdate(formCalendar) {
        $.ajax({
            url: '../php/calendar.php',
            method: 'POST',
            data: JSON.stringify(formCalendar),
            contentType: 'application/json'
        })
    }







    // =================================================//
    // ===============編輯會員月曆備註的js===============//
    // =================================================//
    function CalendarDataLR() {
        $.ajax({
            url: '../php/calendarList.php',
            method: 'POST',
            data: JSON.stringify({
                uAccount: userAccount
            })
        }).done(function (calendarData) {
            calendarData.forEach(entry => {
                let day = entry.uDate.split('-')[2];  // 取 "08"，用'-'區隔，將日期分為[2024,08,08]
                let month = parseInt(entry.uDate.split('-')[1], 10)
                let dayWithoutLeadingZero = parseInt(day, 10);  // 轉為整數，結果是 8
                // 選擇所有 <td> 元素並過濾
                let dateCell = $('td').filter(function () {
                    if (month == $('.month').text()) {
                        return $(this).text().trim() == dayWithoutLeadingZero;
                    }
                });
                dateCell.append('<span class="starList">★</span>');

            });

        })

    }
    $('.right,.left').on('click', function () {
        CalendarDataLR()
    })

    // 列出資料庫裡會員的日期和備註
    function fetchCalendarData() {
        $.ajax({
            url: '../php/calendarList.php',
            method: 'POST',
            data: JSON.stringify({
                uAccount: userAccount
            })
        }).done(function (calendarData) {
            // console.log(calendarData);
            displayCalendarData(calendarData);
        })
    }



    // 在備註旁加入編輯和刪除按鈕
    function displayCalendarData(data) {
        console.log(data);
        $('#FromDB').empty();
        data.forEach(entry => {
            $('#FromDB').append(`
                
                <li>${entry.formatted_date}</li>
                <span>
                    <span class="event-name">
                        <span>${entry.uWho}</span>
                        <button class="delete-btn float-end calendarbtn" data-uid="${entry.uid}">刪除</button>
                        <button class="edit-btn float-end calendarbtn" data-uid="${entry.uid}">修改</button>
                        <br><hr>
                    </span> 
                    <span class="event-name-2" style="display:none">
                        <input id="edit-input" type="text" value="${entry.uWho}">
                        <button class="save-btn float-end calendarbtn" data-uid="${entry.uid}">保存</button>
                        <br><hr>
                    </span>
                </span>
            `);
            // 處理編輯按鈕點擊

            $('#eventList').off('click', '#FromDB>span>.event-name>.edit-btn').on('click', '#FromDB>span>.event-name>.edit-btn', function () {
                // let parent = $(this).parent().parent().children('.event-name-2').children('.save-btn')
                // console.log(parent);

                $(this).parent().hide()
                $(this).parent().parent().children('.event-name-2').show()

            })

            // 按下保存按鈕後將修改後的資料送進資料庫
            $('#eventList').off('click', '#FromDB>span>.event-name-2>.save-btn').on('click', '#FromDB>span>.event-name-2>.save-btn', function () {
                let uid = $(this).data('uid');
                let newEventName = $(this).parent().children('#edit-input').val()
                // console.log(uid);
                $(this).parent().hide()
                $(this).parent().parent().children('.event-name').show()
                $(this).parent().parent().children('.event-name').children('span').text(newEventName)
                let data = { uid: uid, uWho: newEventName }
                console.log(data);

                $.ajax({
                    url: '../php/updateEvent.php',
                    method: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function () {
                        console.log('ok');
                    },
                    error: function (error, a, b) {
                        console.log(b);

                    }
                }).done(function (response) {
                    if (response.success) {
                        fetchCalendarData();
                    }
                });

            });


            // 這邊是加入星星
            // 假設 entry.uDate 是 "2024-08-08"
            let day = entry.uDate.split('-')[2];  // 取 "08"，用'-'區隔，將日期分為[2024,08,08]
            let month = parseInt(entry.uDate.split('-')[1], 10)
            let dayWithoutLeadingZero = parseInt(day, 10);  // 轉為整數，結果是 8
            // 選擇所有 <td> 元素並過濾
            let dateCell = $('td').filter(function () {
                if (month == $('.month').text()) {
                    return $(this).text().trim() == dayWithoutLeadingZero;
                }
            });
            // console.log(dateCell);
            dateCell.append('<span class="starList">★</span>');

            // 處理刪除按鈕點擊
            $('#eventList').on('click', '#FromDB>span>.event-name>.delete-btn', function () {
                let uid = $(this).data('uid');

                $.ajax({
                    url: '../php/deleteEvent.php',
                    method: 'POST',
                    data: JSON.stringify({ uid: uid }),
                    contentType: 'application/json'
                }).done(function (response) {
                    if (response.success) {
                        fetchCalendarData();
                        // 把月曆對應日期的星星刪掉
                        dateCell.find('.starList').remove();

                    }
                });

            });


        });
    }


    fetchCalendarData();



    // =============================================//
    // =================會員訂單的js=================//
    // =============================================//



    function userorder() {
        $.ajax({
            url: '../php/order.php',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                uAccount: userAccount,
            }),
            error: function (a, b, c) {
                console.log(a, b, c);
            }
        }).done(function (pika) {
            try {
                // var data = JSON.parse(pika);
                console.log(pika);

                var orderContainer = $('.order-container');
                orderContainer.empty();

                if (pika.length === 0) {
                    orderContainer.append('<div id="orderDiv" class="rounded"><div id= "userNoorder" class=" rounded "><h5 id="orderH5" class="font_T_Bold">目前沒有訂單</h5></div></div>');
                    return;
                }

                pika.forEach(function (order, index) {
                    var orderHtml = `
                        <table class="table-bordered table font_C_Light">
                            <tr class="ordertr">
                                <th colspan="2">訂單編號 <span id="orderId${index}"> #${order.oId}</span></th>
                            </tr>
                             <tr>
                                <th>訂單日期</th>
                                <td id="uOrderDate${index}">${order.oDate}</td>
                            </tr>
                            <tr>
                                <th>商品名稱/卡片類別</th>
                                <td id="uProduct${index}">${productNameShow(order.items)}</td>
                            </tr>
                            <tr>
                                <th>商品總數</th>
                                <td id="uAmount${index}">${totalProductAmount(order.items)}</td>
                            </tr>
                            <tr>
                                <th>訂單金額</th>
                                <td id="uTotal${index}">${order.totalAmount}</td>
                            </tr>
                            <tr>
                                <th>到貨日期</th>
                                <td id="uOrderComeDate${index}"></td>
                            </tr>
                            <tr>
                                <th>訂單狀態</th>
                                <td id="uState${index}">${order.oStatus}</td>
                            </tr>
                        </table>
                        <br><br><br>
                    `;
                    orderContainer.append(orderHtml);

                });
            } catch (e) {
                console.error("解析數據時出錯:", e);
            }
        })
    }

    userorder();
})
function productNameShow(items) {
    let productNames = [];
    for (let i = 0; i < items.length; i++) {
        productNames.push(items[i].productName);
    }
    let result = productNames.join('、');
    return result
}
function totalProductAmount(items) {
    let totalList =[]
    for (let i = 0; i < items.length; i++) {
        totalList.push(items[i].oQuantity);
    }
    let total = totalList.reduce((acc, cur) => acc + cur, 0)
    return total
}
{/* <tr>
<th>商品總數</th>
<td id="uAmount${index}">${order.uAmount}</td>
</tr> */
}
{/* <tr>
<th>商品名稱</th>
<td id="uProduct${index}">${elem.productName}</td>
</tr> */}
