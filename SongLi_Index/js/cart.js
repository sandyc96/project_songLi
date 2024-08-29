$(document).ready(function () {
  const $cartItems = $('#cartItems');
  const $totalAmountElement = $('#totalAmount');
  const $emptyCartMessage = $('#emptyCartMessage');
  const $cartContent = $('#cartContent');
  const $giftCardCheckbox = $('#giftCardCheckbox');
  const $giftCardDetails = $('#giftCardDetails');
  const $giftCardDesign = $('#giftCardDesign');
  const $orderInfoCard = $('.same_info'); // 訂購/收件資訊
  // const $paymentSection = $('.payment-section');
  const $cartImg = $('.cartImg'); // 大圖banner
  const $itemContainer = $('.list-group-item'); // 商品生成欄位
  const $buyCard = $('.buyCard'); // 加購卡片
  const $payMoney = $('.payMoney'); // 付款方式
  const $backbtn = $('.backbtn'); // 回上頁按鈕
  const $totalbtn = $('.totalbtn'); // 結帳按鈕

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let giftCardInCart = null;
  // 禮物卡的 陣列
  const giftCards = [
    { id: 'thankyou', name: '萬用卡', price: 30 },
    { id: 'birthday', name: '生日卡', price: 30 },
    { id: 'love', name: '情人節卡', price: 35 },
  ];

  // 購物車沒商品時，隱藏欄位
  function renderCart() {
    if (cart.length === 0) {
      cartCount.innerHTML = cart.reduce((acc, cur) => acc + cur.quantity, 0);

      $emptyCartMessage.removeClass('d-none');
      $cartContent.addClass('d-none');
      $orderInfoCard.addClass('d-none');
      // $paymentSection.addClass('d-none');
      $cartImg.addClass('d-none');
      $itemContainer.addClass('d-none');
      $buyCard.addClass('d-none');
      $payMoney.addClass('d-none');
      $backbtn.addClass('d-none');
      $totalbtn.addClass('d-none');
    } else {
      $emptyCartMessage.addClass('d-none');
      $cartContent.removeClass('d-none');
      $orderInfoCard.removeClass('d-none');
      // $paymentSection.removeClass('d-none');
      $cartImg.removeClass('d-none');
      $itemContainer.removeClass('d-none');
      $buyCard.removeClass('d-none');
      $payMoney.removeClass('d-none');
      $backbtn.removeClass('d-none');
      $totalbtn.removeClass('d-none');

      $('#cartItems').empty();
      let totalAmount = 0;

      // 購物車清單-生成商品
      cart.forEach((item) => {
        let itemHtml;
        if (item.isGiftCard) {
          // 生成卡片
          itemHtml = `
                    <li class="list-group-item">
                        <div class="d-flex justify-content-between align-items-center flex-wrap topBottom">
                            <div class="d-flex align-items-center mb-2 mb-md-0">
                                <div>
                                    <h6 class="my-0 text_title fs-5">${item.name}</h6>
                                    <small class="text-muted text_title fs-6">單價: $${item.price}</small>
                                </div>
                            </div>
                            <div class="d-flex align-items-center w-40 clearfix text_title fs-5">
                                <div class="quantity-control w-100">
                                    數量：<span class="quantity">${item.quantity}</span>
                                </div>
                                <div class="me-3 text-end w-100">
                                    小計： $<span class="item-subtotal">${item.price * item.quantity}</span>
                                    <button class="btn btn-danger remove-item" data-id="${item.id}">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                    `;
        } else {
          // 生成商品
          itemHtml = `
                    <li class="list-group-item">
                        <div class="d-flex justify-content-between align-items-center flex-wrap">
                            <div class="d-flex align-items-center mb-2 mb-md-0">
                                <img src="${item.image}" alt="${item.name}" class="me-3" style="width: 90px; height: 90px; object-fit: cover;">
                                <div>
                                    <h6 class="my-0 text_title fs-5">${item.name}</h6>
                                    <small class="text-muted text_title fs-6">單價: $${item.price}</small>
                                </div>
                            </div>
                            <div class="d-flex align-items-center w-40 clearfix text_title fs-5">
                                <div class="quantity-control w-100">
                                    數量：
                                    <button class="btn btn-sm btn-outline-secondary decrease-quantity text_title fs-5" data-id="${item.id}">-</button>
                                    <span class="quantity">${item.quantity}</span>
                                    <button class="btn btn-sm btn-outline-secondary increase-quantity text_title fs-5" data-id="${item.id}">+</button>
                                </div>
                                <div class="me-3 text-end w-100">
                                    小計： $<span class="item-subtotal">${item.price * item.quantity}</span>
                                    <button class="btn btn-danger remove-item" data-id="${item.id}">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                    `;
        }
        $('#cartItems').append(itemHtml);
        totalAmount += item.price * item.quantity;

        if (item.isGiftCard) {
          giftCardInCart = item;
        }
      });

      $totalAmountElement.text(`${totalAmount}`);

      // 禮物卡勾選框狀態
      $giftCardCheckbox.prop('checked', giftCardInCart !== null);
      $giftCardDetails.toggle(giftCardInCart !== null);
      if (giftCardInCart) {
        $giftCardDesign.val(giftCardInCart.id);
      }
      cartCount.innerHTML = cart.reduce((acc, cur) => acc + cur.quantity, 0);
    }
  }

  function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  // 同步收件人和訂購人資料
  $('#sameAsOrderer').on('change', function () {
    if (this.checked) {
      $('#receiverName').val($('#senderName').val());
      $('#receiverPhone').val($('#senderPhone').val());
      $('#receiverEmail').val($('#senderEmail').val());
      $('#receiverAddress1').val($('#senderCity option:selected').val());
      $('#receiverAddress2').val($('#senderCountry option:selected').val());
      $('#receiverAddress3').val($('#senderAddress').val());
    } else {
      $('#receiverName, #receiverPhone, #receiverEmail').val('');
      $('#receiverAddress3').val('');
      $('#receiverAddress1').val('請選擇縣市')
      $('#receiverAddress2').val('請選擇鄉鎮市區')
    }
  });

  // 禮物卡功能↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  $giftCardCheckbox.on('change', function () {
    if (this.checked) {
      if (!giftCardInCart) {
        addGiftCardToCart();
      }
    } else {
      removeGiftCardFromCart();
    }
    $giftCardDetails.toggle(this.checked);
  });

  $giftCardDesign.on('change', function () {
    if (giftCardInCart) {
      updateGiftCardInCart();
    }
  });

  function addGiftCardToCart() {
    if (!giftCardInCart) {
      const selectedCard = giftCards.find(
        (card) => card.id === $giftCardDesign.val()
      );
      giftCardInCart = {
        id: selectedCard.id,
        name: selectedCard.name,
        price: selectedCard.price,
        quantity: 1,
        isGiftCard: true,
      };
      cart.push(giftCardInCart);
      updateCart();
    }
  }

  function removeGiftCardFromCart() {
    if (giftCardInCart) {
      cart = cart.filter((item) => !item.isGiftCard);
      giftCardInCart = null;
      $giftCardCheckbox.prop('checked', false);
      updateCart();
    }
  }

  function updateGiftCardInCart() {
    if (giftCardInCart) {
      const selectedCard = giftCards.find(
        (card) => card.id === $giftCardDesign.val()
      );
      giftCardInCart.id = selectedCard.id;
      giftCardInCart.name = selectedCard.name;
      giftCardInCart.price = selectedCard.price;
      updateCart();
    }
  }

  // 禮物卡訊息字數限制
  $('#giftMessage').on('input', function () {
    const remaining = 30 - this.value.length;
    $('#charCount')
      .text(`${remaining} / 30`)
      .toggleClass('text-danger', remaining <= 5);
  });

  // 商品欄 禮物卡刪除按鈕(垃圾桶)
  function removeItemFromCart(itemId) {
    const removedItem = cart.find((item) => item.id === itemId);
    if (removedItem && removedItem.isGiftCard) {
      $giftCardCheckbox.prop('checked', false);
      $giftCardDetails.hide();
      giftCardInCart = null;
    }
    cart = cart.filter((i) => i.id !== itemId);
  }
  // 禮物卡功能↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  // 商品欄 刪除按鈕(垃圾桶)
  $('#cartItems').on('click', 'button', function () {
    const $target = $(this);
    const itemId = $target.data('id');
    const item = cart.find((item) => item.id === itemId);

    if ($target.hasClass('decrease-quantity')) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        removeItemFromCart(itemId);
      }
    } else if ($target.hasClass('increase-quantity')) {
      item.quantity++;
    } else if ($target.hasClass('remove-item')) {
      removeItemFromCart(itemId);
    }
    updateCart();
  });

  $('#backButton').on('click', function () {
    window.history.back();
  });

  renderCart();
  //住址導入
  function addAddress() {
    $.ajax({
      url: '../../JSON/location.JSON',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          $('#senderCity').append(`<option value="${data[i].location}">${data[i].location}</option>`)
          $('#receiverAddress1').append(`<option value="${data[i].location}">${data[i].location}</option>`)
        }
        $('#senderCity').on('change', function () {
          $('#senderCountry').empty()
          $('#receiverAddress2').empty()
          $('#senderCountry').append(`<option value="請選擇鄉鎮市區">請選擇鄉鎮市區</option>`)
          $('#receiverAddress2').append(`<option value="請選擇鄉鎮市區">請選擇鄉鎮市區</option>`)
          for (let i = 0; i < data.length; i++) {
            if ($(this).val() == data[i].location) {
              for (let j = 0; j < data[i].district.length; j++) {
                $('#senderCountry').append(`<option value="${data[i].district[j]}">${data[i].district[j]}</option>`)
                $('#receiverAddress2').append(`<option value="${data[i].district[j]}">${data[i].district[j]}</option>`)
              }
            }
          }
        })
        $('#receiverAddress1').on('change', function () {
          $('#receiverAddress2').empty()
          $('#receiverAddress2').append(`<option value="請選擇鄉鎮市區">請選擇鄉鎮市區</option>`)
          for (let i = 0; i < data.length; i++) {
            if ($(this).val() == data[i].location) {
              for (let j = 0; j < data[i].district.length; j++) {
                $('#receiverAddress2').append(`<option value="${data[i].district[j]}">${data[i].district[j]}</option>`)
              }
            }
          }
        })
      }
    })
  }
  addAddress()
  //會員資料導入
  function userInfo() {
    $.ajax({
      url: '../../php/cartInorder.php/userinfo',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify({
        uAccount: sessionStorage.getItem('User')
      }),
      success: function (data) {
        $('#senderName').val(data.uName)
        $('#senderPhone').val(data.uTel)
        $('#senderEmail').val(data.uEmail)
      }
    })
  }
  userInfo()
  //資料抓進資料庫
  function order() {
    let time = new Date()

    let orderData = {
      uAccount: sessionStorage.getItem('User'),
      oDate: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`,
      totalAmount: $('#totalAmount').text(),
      shipName: $('#receiverName').val(),
      shipTel: $('#receiverPhone').val(),
      shipEmail: $('#receiverEmail').val(),
      shippingAddress: `${$('#receiverAddress1').val()}${$('#receiverAddress2').val()}${$('#receiverAddress3').val()}`,
      billingAddress: `${$('#senderCity').val()}${$('#senderCountry').val()}${$('#senderAddress').val()}`,
      oStatus: '備貨中，預計3日內出貨'
    }
    let orderList = cart.map(item => {
      return {
        pId: item.id,
        quantity: item.quantity,
        unitPrice: item.price,
        TotalPrice: item.quantity * item.price,
        cardRecipient: (item.id == 'thankyou' || item.id == 'birthday' || item.id == 'love') ? $('#giftRecipientName').val() : 'x',
        cardSender: (item.id == 'thankyou' || item.id == 'birthday' || item.id == 'love') ? $('#giftSenderName').val() : 'x',
        cardContent: (item.id == 'thankyou' || item.id == 'birthday' || item.id == 'love') ? $('#giftMessage').val() : 'x'
      };
    });
    let orderL = {orderList:orderList}
    let order = Object.assign({}, orderData, orderL);
    console.log(order);
    
    $.ajax({
      url: '../../php/cartInorder.php/order',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(order)
    })

  }
  $('#checkoutBtn').on('click', function () {
    order()
    localStorage.removeItem('cart')
    cartCount.innerHTML = 0

  })

});
