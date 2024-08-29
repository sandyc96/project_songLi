$(document).ready(function () {
    function toIndex() {
        $('.modal-content').removeClass('active');
        $('.modal-content').eq(0).addClass('active');
        $('.modal-title').removeClass('active');
        $('.modal-title').eq(0).addClass('active');
        $('.modal-body').removeClass('active');
        $('.modal-body').eq(0).addClass('active');
        $('.modal-footer').removeClass('active');
        $('.modal-footer').eq(0).addClass('active');
    }
    $("#loginRegBtn").on('click', function () {
        toIndex()
    })
    $('.modal-title').on('click', function () {
        var loginRegindex = $(this).index();
        $('.modal-title').removeClass('active');
        $('.modal-title').eq(loginRegindex).addClass('active');
        $('.modal-body').removeClass('active');
        $('.modal-body').eq(loginRegindex).addClass('active');
        $('.modal-footer').removeClass('active');
        $('.modal-footer').eq(loginRegindex).addClass('active');
    })
    let loginBtn
    let logState
    logState = sessionStorage.getItem("User")
    console.log(logState);
    if (logState) {
        $('.navbtnSP').append(`<button id="logOut" class="navbtn font_T_Bolder mx-2">登出</button>`)
        loginBtn = $('#loginRegBtn').detach()
        $('.userName').text(logState)
        $('a.btn.font_T_Bolder').attr('href', (window.location.pathname == '/SongLi_Index/html/product/product.html' || window.location.pathname == '/SongLi_Index/html/product/product_info.html' || window.location.pathname == '/SongLi_Index/html/cart/cart.html') ? "../cart/cart.html" : "./cart/cart.html")
        if ($("li.nav-item a[href='javascript:void(0)']").text()) {
            $("li.nav-item a[href='javascript:void(0)']").attr('href', (window.location.pathname == '/SongLi_Index/html/product/product.html' || window.location.pathname == '/SongLi_Index/html/product/product_info.html' || window.location.pathname == '/SongLi_Index/html/cart/cart.html') ? "../member.html" : "./member.html")
        }
        $("a.btn.font_T_Bolder,li.nav-item a[href='./member.html'],li.nav-item a[href='../member.html']").off('click')
    } else {
        $('a.btn.font_T_Bolder').attr('href', 'javascript:void(0)')
        $('#logOut').remove()
        $('.userName').text("")
        // $('a.btn.font_T_Bolder').attr('href', 'javascript:void(0)')
        if ($("li.nav-item a[href='./member.html']").text() || $("li.nav-item a[href='../member.html']").text()) {
            $("li.nav-item a[href='./member.html']").attr('href', 'javascript:void(0)')
            $("li.nav-item a[href='../member.html']").attr('href', 'javascript:void(0)')
        }
        $("a[href='javascript:void(0)']").on('click', function () {
            alert("請先登入")
        })
    }
    $('#loginForm').on('submit', function (event) {
        event.preventDefault()
        $("a[href='javascript:void(0)']").off('click')
        login()

    })
    //綁定過的是給後來生成的登出
    $('.navbtnSP').on('click', '#logOut', function () {
        sessionStorage.removeItem("User");
        localStorage.removeItem('cart')
        cartCount.innerHTML = 0
        loginBtn.appendTo(".navbtnSP")
        loginBtn = null
        $('#logOut').remove()
        $('.userName').text("")
        $('a.btn.font_T_Bolder').attr('href', 'javascript:void(0)')
        if ($("li.nav-item a[href='./member.html']").text() || $("li.nav-item a[href='../member.html']").text()) {
            $("li.nav-item a[href='./member.html']").attr('href', 'javascript:void(0)')
            $("li.nav-item a[href='../member.html']").attr('href', 'javascript:void(0)')
        }
        if (window.location.pathname == '/SongLi_Index/html/member.html') {
            window.location.replace("https://localhost/SongLi_Index/html/index.html")
            return false;
        } else if (window.location.pathname == '/SongLi_Index/html/about.html') {
            addForm()
        } else if (window.location.pathname == '/SongLi_Index/html/product/product.html') {
            $("#productList").off('click', 'div>div>.add-to-cart')
            $("#productList").on('click', 'div>div>.add-to-cart', function () {
                alert('請先登入')
            })
        } else if (window.location.pathname == '/SongLi_Index/html/product/product_info.html') {
            $(".add-to-cart").off('click')
            $(".add-to-cart").on('click', function () {
                alert('請先登入')
            })
        } else if (window.location.pathname == '/SongLi_Index/html/cart/cart.html') {
            window.location.replace("https://localhost/SongLi_Index/html/index.html")
            return false;
        }
        $("a[href='javascript:void(0)']").on('click', function () {
            alert("請先登入")
        })

    })

    //重新輸入密碼的驗證
    uPwdCorrect.onkeyup = () => {
        if ($('#uPwd').val().length >= 8) {
            if ($('#uPwd').val() === $('#uPwdCorrect').val()) {
                uPwdCorrectText.innerText = '密碼一致'
                uPwdCorrectText.style.color = 'green'
                uPwdCorrectText.style.display = 'block'
            } else {
                uPwdCorrectText.innerText = '密碼不一致'
                uPwdCorrectText.style.color = 'red'
                uPwdCorrectText.style.display = 'block'
            }
        }
    }
    uPwd.onkeyup = () => {
        if ($('#uPwd').val().length < 8) {
            uPwdText.style.display = 'block'
            uPwdText.innerText = '密碼需大於8碼'
        } else {
            uPwdText.style.display = 'none'
            uPwdText.innerText = ''
        }
    }
    //性別欄位的驗證=>在跳過radio，點其他的input的時候
    $('#uAccount,#uEmail,#uTel,#uPwd,#uPwdCorrect').on('focus', function () {
        if (!$("input[name='uGender']:checked").val()) {
            genderCheck.style.display = 'block'
            genderCheck.innerText = "請填寫此欄位"
            genderCheck.style.color = 'red'
        }
    })
    $("input[name='uGender']").change(function () {
        genderCheck.style.display = 'none'
        genderCheck.innerText = ""
    });
    $("input[name='uChoice']").change(function () {
        if ($("input[name='uChoice']:checked").val() == '是') {
            alert("開啟提醒，將會在預約日期的前一週寄送郵件至註冊信箱通知")
        }
    });
    //帳號跟信箱的重複提示
    let timeout = null;
    $('#uAccount,#uEmail').on('keyup', function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            check();
        }, 250); // 延遲250毫秒後才進行檢查
    });
    //忘記密碼
    // 用戶請求重設密碼、生成密碼重設連結、用戶收到電子郵件並重設密碼、更新密碼
    $('#forgotPwd').on('click', function () {
        var loginRegindex = $(this).parent().parent().parent().parent().index();
        // console.log(loginRegindex);
        $('.modal-content').removeClass('active');
        $('.modal-content').eq(loginRegindex + 2).addClass('active');
        $('.modal-body').removeClass('active');
        $('.modal-body').eq(loginRegindex + 2).addClass('active');
        $('.modal-footer').removeClass('active');
        $('.modal-footer').eq(loginRegindex + 2).addClass('active');
    })
    $('#backTologin').on('click', function () {
        toIndex()
    })
    $("input[name='choiceWay']").change(function () {
        if ($("input[name='choiceWay']:checked").val() == '信箱') {
            $("#mailF").show()
            $("#mailF").val("")
            $("#accountF").hide()
            $("#accountF").val("")
            // $('#forgotPwdtext').hide()
        } else if ($("input[name='choiceWay']:checked").val() == '帳號') {
            $("#accountF").show()
            $("#mailF").val("")
            $("#mailF").hide()
            $("#accountF").val("")
            // $('#forgotPwdtext').hide()
        }
    })
    let search
    $('#forgotPwdform').on('submit', function (event) {
        event.preventDefault()
        if ($("input[name='choiceWay']:checked").val() == '信箱') {
            search = { email: $("#mailF").val(), account: null }
        } else if ($("input[name='choiceWay']:checked").val() == '帳號') {
            search = { email: null, account: $("#accountF").val() }
        }
        // ajax要帶的資料
        forgetPwdCheck(search)
    })
    //點擊註冊後，出現信箱驗證畫面
    //用jQuery抓資料=>之後全部打包變成物件    
    $('#registerForm').on('submit', function (event) {
        event.preventDefault()
        if ($("input[name='uGender']:checked").val()) {
            var formData = {
                uName: $('#uName').val(),
                uAccount: $('#uAccount').val(),
                uGender: $("input[name='uGender']:checked").val(),
                uEmail: $('#uEmail').val(),
                uChoice: $("input[name='uChoice']:checked").val(),
                uTel: $('#uTel').val(),
                uPwd: $('#uPwd').val(),
                uBirth: $('#uBirth').val()
            };
            if (accountCheck.innerText == '' && emailCheck.innerText == '' && genderCheck.innerText == '' && uPwdCorrectText.innerText == '密碼一致' && $("input[name='uChoice']:checked").val()) {
                Register(formData)
                mail(formData)

                var loginRegindex = $('#register').parent().parent().parent().index();
                $('.modal-content').removeClass('active');
                $('.modal-content').eq(loginRegindex + 1).addClass('active');
                $('#mailText').empty()
                $('#mailText').append(`<p>親愛的 ${$('#uName').val()} 會員，請至註冊信箱收取驗證信</p>`)
            }
        }
    })
    function mail(formData) {
        $.ajax({
            url: (window.location.pathname == '/SongLi_Index/html/product/product.html' || window.location.pathname == '/SongLi_Index/html/product/product_info.html') ? "../../php/phpmailer.php/register" : "../php/phpmailer.php/register",
            method: "POST",
            data: JSON.stringify(formData),
            contentType: 'application/json',
        })
    }
    function Register(formData) {
        $.ajax({
            url: (window.location.pathname == '/SongLi_Index/html/product/product.html' || window.location.pathname == '/SongLi_Index/html/product/product_info.html') ? "../../php/restful_userInfo.php/insert" : "../php/restful_userInfo.php/insert",
            method: "POST",
            data: JSON.stringify(formData),
            contentType: 'application/json',

        })
    }
    function check() {
        $.ajax({
            url: (window.location.pathname == '/SongLi_Index/html/product/product.html' || window.location.pathname == '/SongLi_Index/html/product/product_info.html') ? "../../php/restful_userInfo.php/check" : "../php/restful_userInfo.php/check",
            method: "POST",
            contentType: 'application/json',
            data: JSON.stringify({
                uAccount: $('#uAccount').val(),
                uEmail: $('#uEmail').val()
            }),
            success: function (data) {
                // console.log(data.status);
                if (data.status == 'account&emailError') {
                    accountCheck.innerText = '已有您的帳號'
                    accountCheck.style.display = 'block'
                    emailCheck.innerText = '已有您的信箱，請確認信箱驗證'
                    emailCheck.style.display = 'block'
                } else if (data.status == 'emailError') {
                    emailCheck.innerText = '已有您的信箱，請確認信箱驗證'
                    emailCheck.style.display = 'block'
                    accountCheck.style.display = 'none'
                } else if (data.status == 'accountError') {
                    accountCheck.innerText = '已有您的帳號'
                    accountCheck.style.display = 'block'
                    emailCheck.style.display = 'none'
                } else if (data.status == 'OK') {
                    accountCheck.style.display = 'none'
                    accountCheck.innerText = ''
                    emailCheck.style.display = 'none'
                    emailCheck.innerText = ''
                }
            },
            error: function (error, a, b) {
                console.log(error, a, b);
            }
        })
    }
    function login() {
        $.ajax({
            url: (window.location.pathname == '/SongLi_Index/html/product/product.html' || window.location.pathname == '/SongLi_Index/html/product/product_info.html') ? "../../php/restful_userInfo.php/login" : "../php/restful_userInfo.php/login",
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                uAccount: $('#account').val(),
                uPwd: $('#pwd').val()
            }),
            success: function (data) {
                // console.log(data.status)
                if (data.status == 'OK') {
                    sessionStorage.setItem("User", $('#account').val());
                    logState = sessionStorage.getItem("User")
                    console.log(logState);
                    $('.userName').text(logState)
                    if (logState) {
                        $('.navbtnSP').append(`<button id="logOut" class="navbtn font_T_Bolder mx-2">登出</button>`)
                        loginBtn = $('#loginRegBtn').detach()
                        $('a.btn.font_T_Bolder').attr('href', (window.location.pathname == '/SongLi_Index/html/product/product.html' || window.location.pathname == '/SongLi_Index/html/product/product_info.html' || window.location.pathname == '/SongLi_Index/html/cart/cart.html') ? "../cart/cart.html" : "./cart/cart.html")
                        if (window.location.pathname == '/SongLi_Index/html/about.html') {
                            addForm()
                            hi(logState)
                        } else if (window.location.pathname == '/SongLi_Index/html/product/product.html') {
                            $("#productList").off('click', 'div>div>.add-to-cart')
                            $("#productList").on('click', 'div>div>.add-to-cart', function () {
                                addToCart()
                                cartCount.innerHTML = cart.reduce((acc, cur) => acc + cur.quantity, 0);
                            })

                        } else if (window.location.pathname == '/SongLi_Index/html/product/product_info.html') {
                            $(".add-to-cart").off('click')
                            $(".add-to-cart").on('click', function () {
                                addToCartInfo()
                                cartCount.innerHTML = cart.reduce((acc, cur) => acc + cur.quantity, 0);
                            })
                        }
                        if ($("li.nav-item a[href='javascript:void(0)']").text()) {
                            $("li.nav-item a[href='javascript:void(0)']").attr('href', (window.location.pathname == '/SongLi_Index/html/product/product.html' || window.location.pathname == '/SongLi_Index/html/product/product_info.html' || window.location.pathname == '/SongLi_Index/html/cart/cart.html') ? "../member.html" : "./member.html")
                        }
                        $("a.btn.font_T_Bolder,li.nav-item a[href='./member.html'],li.nav-item a[href='../member.html']").off('click')
                    }
                }
            },
            error: function (error, a, b) {
                console.log(error, a, b)
            }
        })
    }
    function forgetPwdCheck(search) {
        $.ajax({
            url: (window.location.pathname == '/SongLi_Index/html/product/product.html' || window.location.pathname == '/SongLi_Index/html/product/product_info.html') ? "../../php/phpmailer.php/PWDforgot" : "../php/phpmailer.php/PWDforgot",
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify(search),
            success: function (data) {
                console.log(data);

                if (data.status == "sentEmail") {
                    $('#forgotPwdtext').show()
                    $('#forgotPwdtext').text("驗證信已寄出")
                } else if (data.status == "noneEmail") {
                    $('#forgotPwdtext').show()
                    $('#forgotPwdtext').text("查無此信箱")
                } else if (data.status == "noneAccount") {
                    $('#forgotPwdtext').show()
                    $('#forgotPwdtext').text("查無此帳號")
                }
            },
            error: function (a, b, c) {
                console.log(a, b, c);
            }
        })
    }
})

