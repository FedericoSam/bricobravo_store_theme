/* eslint-disable func-names */
/* eslint-disable vtex/prefer-early-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
function checkBreadcrumb() {
  if (location.hash === '#/cart') {
    $('.checkout-breadcrumb-cart').addClass('active-bg')
    $('.checkout-breadcrumb-cart').next().addClass('active-text')
    $('.checkout-breadcrumb-profile').removeClass('active-bg')
    $('.checkout-breadcrumb-profile').next().removeClass('active-text')
    $('.checkout-breadcrumb-shipping').removeClass('active-bg')
    $('.checkout-breadcrumb-shipping').next().removeClass('active-text')
    $('.checkout-breadcrumb-payment').removeClass('active-bg')
    $('.checkout-breadcrumb-payment').next().removeClass('active-text')
  }

  if (location.hash === '#/email' || location.hash === '#/email') {
    $('.checkout-breadcrumb-profile').addClass('active-bg')
    $('.checkout-breadcrumb-profile').next().addClass('active-text')
    $('.checkout-breadcrumb-cart').removeClass('active-bg')
    $('.checkout-breadcrumb-cart').next().removeClass('active-text')
    $('.checkout-breadcrumb-shipping').removeClass('active-bg')
    $('.checkout-breadcrumb-shipping').next().removeClass('active-text')
    $('.checkout-breadcrumb-payment').removeClass('active-bg')
    $('.checkout-breadcrumb-payment').next().removeClass('active-text')
  }

  if (location.hash === '#/shipping') {
    $('.checkout-breadcrumb-shipping').addClass('active-bg')
    $('.checkout-breadcrumb-shipping').next().addClass('active-text')
    $('.checkout-breadcrumb-cart').removeClass('active-bg')
    $('.checkout-breadcrumb-cart').next().removeClass('active-text')
    $('.checkout-breadcrumb-profile').removeClass('active-bg')
    $('.checkout-breadcrumb-profile').next().removeClass('active-text')
    $('.checkout-breadcrumb-payment').removeClass('active-bg')
    $('.checkout-breadcrumb-payment').next().removeClass('active-text')
  }

  if (location.hash === '#/payment') {
    $('.checkout-breadcrumb-payment').addClass('active-bg')
    $('.checkout-breadcrumb-payment').next().addClass('active-text')
    $('.checkout-breadcrumb-cart').removeClass('active-bg')
    $('.checkout-breadcrumb-cart').next().removeClass('active-text')
    $('.checkout-breadcrumb-profile').removeClass('active-bg')
    $('.checkout-breadcrumb-profile').next().removeClass('active-text')
    $('.checkout-breadcrumb-shipping').removeClass('active-bg')
    $('.checkout-breadcrumb-shipping').next().removeClass('active-text')
  }

  if (location.hash === '#/payment') {
    $('#payment-group-instantPaymentPaymentGroup').click()
  }
}

async function insertShareButton() {
  await new Promise((resolve) => {
    const cartElementActive = document.querySelector('.link-choose-more-products-wrapper')

    cartElementActive.insertAdjacentHTML(
      'afterend',
      `
        <div id="bf-shared-cart-container">
          <button id="bf-shared-cart">Compartilhe este carrinho</button>
        </div>
      `
    )
    resolve(true)
  })
}

async function insertModal() {
  await new Promise((resolve) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `
        <div class="bf-shared-cart__overlay hidden">
          <div class="bf-shared-cart__modal">
          <span id="bf-shared-modal__close-button"></span>
            <p>Link para carrinho compartilhado:</p>
            <a href="#"></a>
            <br><button class="bf-shared-cart__button" id="bf-shared-cart__copy">Copiar link</button>
            <p class="bf-shared-cart__info-text" style="display:none">*Link copiado!</p>
          </div>
      </div>
      `
    )
    resolve(true)
  })
}

async function insertSellerCodeForm() {
  await new Promise((resolve) => {
    document.querySelector('.cart-template-holder .cart').insertAdjacentHTML(
      'afterend',
      `
        <div id="bf-custom-cart">
          <label for="bf-input-vendedor">Código do Vendedor</label>
          <div id="bf-vendedores__form">
            <input type="text" id="bf-input-vendedor" class="input-small" placeholder="Digite o Código">
            <input type="button" value="Adicionar" id="add-cod-vendedor" class="btn">
          </div>
          <p id="vendedor-inputed">Vendedor:</b></p>
        </div>
      `
    )
    resolve(true)
  })
}

function inputPlaceholderChanger() {
  $('.coupon-fieldset .coupon-fields #cart-coupon').attr('placeholder', 'Insira o código promocional')
  $('.orderform-template-holder .step .form-step fieldset p.client-first-name input').attr('placeholder', 'Nome*')
  $('.orderform-template-holder .step .form-step fieldset p.client-last-name input').attr('placeholder', 'Sobrenome*')
  $('.orderform-template-holder .step .form-step fieldset p.client-document input').attr('placeholder', 'CPF*')
  $('.orderform-template-holder .step .form-step fieldset p.client-phone input').attr('placeholder', 'Telefone*')
  $('.orderform-template-holder .step .form-step fieldset p.client-company-name input').attr(
    'placeholder',
    'Razão Social'
  )
  $('.orderform-template-holder .step .form-step fieldset p.client-company-nickname input').attr(
    'placeholder',
    'Nome Fantasia'
  )
  $('.orderform-template-holder .step .form-step fieldset p.client-company-ie input').attr(
    'placeholder',
    'Inscrição Estadual'
  )
  $('.vtex-omnishipping-1-x-address #ship-number').attr('placeholder', 'Ex: 134')
}

function decimalNumberFormat() {
  $('.product-item .quantity input').val(function (_index, value) {
    return value.padStart(2, '0')
  })
}

function newCouponPlaceholder() {
  $('.coupon-fieldset .coupon-fields #cart-coupon').attr('placeholder', 'Insira o código promocional')
}

function fixCheckoutItemImage() {
  $('.table.cart-items .product-item').each(function (_index, _item) {
    const productImage = $(this).find('.product-image img')
    const productImageSrc = productImage.attr('src')
    const productImageSrcSize = productImageSrc.match(/-[0-9]{2,}-[0-9]{2,}/gi)
    if (productImageSrcSize.length) {
      const productImageSrcNewSize = productImageSrc.replace(productImageSrcSize[0], '-150-150')
      productImage.attr('src', productImageSrcNewSize)
    }
  })
}

const insertScripts = setInterval(() => {
  inputPlaceholderChanger()
  // decimalNumberFormat()
  newCouponPlaceholder()
}, 500)

const checkBreadcrumbInterval = setInterval(() => {
  if ($('.checkout-breadcrumb span').length) {
    clearInterval(checkBreadcrumbInterval)

    checkBreadcrumb()
  }
}, 500)

const checkCartFixed = setInterval(() => {
  if ($('.cart-fixed').length) {
    clearInterval(checkCartFixed)

    $('.cart-fixed').prepend('<span class="cart-fixed-price"></span>')
    $('.cart-fixed').prepend('<button class="cart-fixed-toggle"></button>')

    setTimeout(() => {
      $('.cart-fixed-price').text($('.cart-fixed .table tbody.totalizers-list tr.Items td.monetary').text())
    }, 500)

    $('.cart-fixed-toggle').click(function () {
      $('.cart-fixed').toggleClass('hide-items')
      $('.cart-fixed-toggle').toggleClass('active')
    })
  }
}, 500)

$(window).on('load', async function () {
  await insertShareButton()
  await insertModal()
  await insertSellerCodeForm()

  const shareCartModal = document.querySelector('.bf-shared-cart__modal')
  const elementToCopy = document.querySelector('.bf-shared-cart__modal a')
  const shrCrtOverlay = document.querySelector('.bf-shared-cart__overlay')
  const shareCartButton = document.querySelector('#bf-shared-cart')
  const cartCopied = document.getElementById('bf-shared-cart__copy')
  const modalCloseButton = document.getElementById('bf-shared-modal__close-button')
  const btnAddVendedor = document.getElementById('add-cod-vendedor')

  shareCartButton.addEventListener('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
    const { orderFormId } = vtexjs.checkout.orderForm
    elementToCopy.innerHTML = `https://www.balaroti.com.br/checkout/?orderFormId=${orderFormId}#/cart`
    elementToCopy.href = `https://www.balaroti.com.br/checkout/?orderFormId=${orderFormId}#/cart`
    shrCrtOverlay.classList.remove('hidden')
    shareCartModal.classList.remove('hidden')
  })

  shrCrtOverlay.addEventListener('click', function (e) {
    e.stopPropagation()
    if (e.target.classList.contains('bf-shared-cart__overlay')) {
      shrCrtOverlay.classList.add('hidden')
      shareCartModal.classList.add('hidden')
    }
  })

  cartCopied.addEventListener('click', function (e) {
    const range = document.createRange()
    range.selectNode(elementToCopy)
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
    $('.bf-shared-cart__info-text').fadeIn()
    setTimeout(() => $('.bf-shared-cart__info-text').fadeOut(), 2500)
  })

  modalCloseButton.addEventListener('click', function () {
    shrCrtOverlay.classList.add('hidden')
    shareCartModal.classList.add('hidden')
  })
  // Seller code
  btnAddVendedor.addEventListener('click', function () {
    const codVendedor = document.getElementById('bf-input-vendedor').value
    if (!codVendedor) return

    $('#vendedor-inputed').html('<b>Atualizando...</b>')
    vtexjs.checkout.getOrderForm().then(() => {
      vtexjs.checkout.sendAttachment('openTextField', { value: codVendedor }).then((oF) => {
        $('#vendedor-inputed').html(`Vendedor: <b>${oF.openTextField.value}</b>`)
      })
    })
  })

  function getCodVend(orderForm) {
    if (orderForm.openTextField && orderForm.openTextField.value) {
      return vtexjs.checkout.orderForm.openTextField.value
    }
    return false
  }

  function setCodigoVendedor() {
    const { orderForm } = vtexjs.checkout
    if (!orderForm) {
      setTimeout(setCodigoVendedor, 200)
      return
    }
    const codVend = getCodVend(orderForm)
    if (codVend) {
      $('#vendedor-inputed').html(`Vendedor: <b>${codVend}</b>`)
    }
  }

  setCodigoVendedor()
})

$(window).load(function (_e) {
  checkBreadcrumb()
})
$(window).on('hashchange', function (_e) {
  checkBreadcrumb()
})

$(window).on('orderFormUpdated.vtex', function (_evt, _orderForm) {
  setTimeout(() => {
    $('.cart-fixed-price').text($('.cart-fixed .table tbody.totalizers-list tr.Items td.monetary').text())
    fixCheckoutItemImage()
  }, 500)
})
