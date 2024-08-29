$(document).ready(function () {
    var sum = -1
    let Tscore = 0
    let scoreList = []
    

    function createBTN(score, Answer, buttonCol) {
        let numberLT = ["A","B","C","D"]
        for (let i = 0; i < score.length; i++) {
            $('.answerSP').append(`
                <button class="btnA" data-score = ${score[i]}>
                <span class="float-start number">${numberLT[i]}&nbsp&nbsp&nbsp</span>
                <span class="float-start">${Answer[i]}</span>
                </button>
                `)
        }
    }

    function ajax() {
        $.ajax({
            url: "../JSON/Test.JSON"
        }).done(function (data) {
            //1.可不可以用解構：可以=>要用data[sum]
            //2.可不可以用迴圈撈資料：可以=>另外拉一個
            let { Question, Answer, score, BGimageSrc, AnswerSP } = data[sum]
            $('#buttonSP').html(`<button id="next"><img class="w-100" src="../image/test/next_1.png"></button>`)
            $('#result').append(`
                <div class="title">${Question}</div>
                <div class="answerSP row"></div>
            `)
            createBTN(score, Answer)
            $('body').css('background-image', `url(${BGimageSrc})`)
            $('.answerSP').width(AnswerSP[0])
            $('.answerSP').css('top',AnswerSP[1])
            $('.answerSP').css('left',AnswerSP[2])
            $('.title').css('left',`calc(50% - ${$('.title').outerWidth()/2}px)`)

            Tscore = 0
        })
    }
    $('#start').on('click', function () {
        sum++
        ajax()
    })
    //綁定綁到父級
    $('#result').on('click', '.btnA', function () {
        Tscore = Number($(this).attr('data-score'))

        console.log(Tscore);
    })

    $('#buttonSP').on('click', '#next', function () {
        if (Tscore == 0) {
            alert("請選擇答案")
        } else {
            sum++
            result.innerHTML = ''
            $('#buttonSP').html("")
            if (sum == 5) {
                scoreList.push(Tscore)

                let totalScore = scoreList.reduce((acc, cur) => acc + cur, 0)
                $('#result').html(`
                    <a class="result btn"></a>
                `)
                resultCheck(totalScore)
                console.log(scoreList);

                console.log(sum);

            } else {
                ajax()
                scoreList.push(Tscore)
                console.log(scoreList);
            }
        }
    })
    //統計分數
    function resultCheck(totalScore) {
        if(totalScore<=8){
            $('body').css('background-image', `url(../image/test/結果-1.png`)
            //加a的href $('.result').attr('href')=""
            //加a裡面的字(title)
            $('.result').text("前往連結")
            $('.result').attr('href',"./product/product_info.html?id=F1")
        }else if(totalScore>8 && totalScore<=12){
            $('body').css('background-image', `url(../image/test/結果-2.png`)
            $('.result').text("前往連結")
            $('.result').attr('href',"./product/product_info.html?id=F3")
        }else if(totalScore>12 && totalScore<=16){
            $('body').css('background-image', `url(../image/test/結果-3.png`)
            $('.result').text("前往連結")
            $('.result').attr('href',"./product/product_info.html?id=F2")
        }else if(totalScore>16){
            //2,3,4,3,1
            $('body').css('background-image', `url(../image/test/結果-4.png`)
            $('.result').text("前往連結")
            $('.result').attr('href',"./product/product_info.html?id=L1")
        }
    }
    //data[0].Question=>第一題題目
    //data[0].Answer[0].A1=>第一題答案


})