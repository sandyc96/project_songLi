
// 購買數量框===============================================
function plus() {
    if (acount.value == '10') {
        acount.value = `${(parseInt(acount.value) + 0)}`;
    }
    else if (acount.value == 'NaN') {
        acount.value = '0';
    }
    else {
        acount.value = `${(parseInt(acount.value) + 1)}`;
    }
}
function minus() {
    if (acount.value == '0') {
        acount.value = `${(parseInt(acount.value) - 0)}`;
    }
    else if (acount.value == 'NaN') {
        acount.value = '0';
    }
    else {
        acount.value = `${(parseInt(acount.value) - 1)}`;
    }
}



// 購物車=====================================================

function addToCartInfo() {
    const button = event.target.closest('.add-to-cart');
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'));
    const image = save.src;

    const existingItem = cart.find(item => item.id === id);
    if (parseInt(acount.value) > 0) {
        if (existingItem) {
            existingItem.quantity += parseInt(acount.value);
        } else {
            cart.push({ id, name, price, quantity: parseInt(acount.value), image });
        }
    }
    //parseInt(acount.value)>0才能運作=>parseInt(acount.value)有幾個quantity就加幾個
    localStorage.setItem('cart', JSON.stringify(cart));

    cartCount.innerHTML = cart.reduce((acc, cur) => acc + cur.quantity, 0,);

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('【商品已加入購物車】');

    // cartCount.innerHTML = cart.length
}

// document.querySelectorAll('.add-to-cart').forEach(button => {
//     button.addEventListener('click', addToCart);
// });
let userName = sessionStorage.getItem("User")
if (userName) {
    // 更新購物車數量顯示
    $(".add-to-cart").off('click')
    $(".add-to-cart").on('click', function () {
        addToCartInfo()
        cartCount.innerHTML = cart.reduce((acc, cur) => acc + cur.quantity, 0);
    })
} else {
    $(".add-to-cart").off('click')
    $(".add-to-cart").on('click', function () {
        alert('請先登入')
    })
}


// ===========================================================
// 補充說明區塊內容按鈕
$(document).ready(function () {
    $("#btnradio1").click(function () {
        $("#b1").show();
        $("#b2").hide();
    });
    $("#btnradio3").click(function () {
        $("#b1").hide();
        $("#b2").show();
    });
});



// ===========================================================
// 商品圖放大鏡
$("[bigimage]").mousemove(function (event) {
    var $this = $(this);
    var offset = $this.offset();
    var x = event.clientX - offset.left;
    var y = event.clientY - offset.top;
    var multiple = 2;
    var $right = $(".right");
    var mirrorWidth = $right.width();
    var mirrorHeight = $right.height();
    var address = $this.attr("src");

    $right.css({
        display: "block",
        left: (event.clientX - mirrorWidth / 2) + "px",
        top: (event.clientY - mirrorHeight / 2) + "px"
    });

    $("[mirror]").attr("src", address).css({
        width: $this.width() * multiple + "px",
        height: $this.height() * multiple + "px",
        marginLeft: -x * multiple + mirrorWidth / 2 + "px",
        marginTop: -y * multiple + mirrorHeight / 2 + "px"
    });
}).mouseout(function () {
    $(".right").hide();
});


// 點選切換圖片
$(document).ready(function () {
    const $bigImage = $("[bigimage]");
    const $smallImages = $("[smallimage]");
    let currentIndex = 0;

    // 切換大圖和小圖邊框
    function switchImage(index) {
        $bigImage.attr("src", $smallImages.eq(index).attr("src"));
        $smallImages.removeClass("active-thumbnail");
        $smallImages.eq(index).addClass("active-thumbnail");
        currentIndex = index;
    }

    // 點擊小圖切換大圖
    $smallImages.click(function () {
        switchImage($smallImages.index(this));
    });

    // 左右鍵切換大圖
    $("#prev").click(function () {
        currentIndex = (currentIndex - 1 + $smallImages.length) % $smallImages.length;
        switchImage(currentIndex);
    });

    $("#next").click(function () {
        currentIndex = (currentIndex + 1) % $smallImages.length;
        switchImage(currentIndex);
    });

    // 初始化：選中第一張圖片
    switchImage(0);
});

