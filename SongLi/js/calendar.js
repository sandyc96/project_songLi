$(document).ready(function () {
    var today = new Date();
    var year = today.getFullYear()
    var month = today.getMonth()
    $('.year').text(year)
    $('.month').text(month + 1)
    let dateList = `${$('.year').text()} / ${$('.month').text()} /`;
    let newDate


    $('.left').on('click', function () {
        if (month == 0) {
            month = 11
            year--
        } else {
            month--
        }
        $('.month').text(month + 1)
        $('.year').text(year)
        dateList = `${$('.year').text()} / ${$('.month').text()} /`;

        showTable()
        tdHover()
        // ShowStar()
    })
    $('.right').on('click', function () {
        if (month == 11) {
            month = 0
            year++
        } else {
            month++
        }
        $('.month').text(month + 1)
        $('.year').text(year)
        dateList = `${$('.year').text()} / ${$('.month').text()} /`;
        showTable()
        tdHover()
        // ShowStar()
    })
    function showTable() {
        calendarDate.tBodies[0].innerHTML = ""
        var nextfirstDay = new Date(year, month + 1, 1)
        var firstDay = new Date(nextfirstDay.getTime() - 1)
        var showMonthday = firstDay.getDate()
        firstDay.setDate(1)
        var showMonthweek = firstDay.getDay()

        var ceils = 7
        var rows = Math.ceil((showMonthday + showMonthweek) / ceils)

        for (let i = 0; i < rows; i++) {
            var tr = document.createElement('tr')
            for (let j = 0; j < ceils; j++) {
                var td = document.createElement('td')
                var div = document.createElement('div')
                td.className = 'clearfix'

                var v = i * ceils + j - (showMonthweek - 1)
                if (v > 0 && v <= showMonthday) {
                    div.innerHTML = v
                    div.classList.add('w-50', 'float-start')
                    if (today.getFullYear() == year && today.getMonth() == month && today.getDate() == v) {
                        div.classList.add('today')
                    }
                } else {
                    div.innerHTML = ""
                }
                tr.appendChild(td)
                td.appendChild(div)
            }
            calendarDate.tBodies[0].appendChild(tr)
        }
    }

    showTable()




    //添加行程的xx
    $('#xx').click(function () {
        $('#controls').hide()
    })


    // td為全域
    let td

    // 點擊任一日期跳出(可輸入)備註框
    $('#calendarDate').on('click', '.days>tr>td', function () {
        td = $(this)
        if (td.text() != "") {
            $('#controls').show()
        }
    })



    // 月曆上的hover樣式(有字的條件下才會有反應)
    function tdHover() {
        $('.days>tr>td').each((_, elem) => {
            if (elem.innerText != "") {
                $(elem).hover(function () {
                    $(elem).addClass('tdHover')
                }, function () {
                    $(elem).removeClass('tdHover')
                })
            }
        });
    }
    tdHover();


    // 按下備註框的加入按鈕後、備註框隱藏
    $('#addWhoBtn').on('click', function () {
        let eventName = whoInput.value.trim();
        if (eventName) {
            $('#controls').hide()
        }
    })


})

