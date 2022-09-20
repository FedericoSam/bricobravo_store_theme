import { useEffect } from 'react'



const LoginButtonCheck = () => {

    console.log('Abigo esto aki');

    function prepareInputs() {
        var allInputs = document.querySelectorAll('.vtex-login-2-x-inputContainer .vtex-styleguide-9-x-input');
        var loginButton = document.querySelector('.vtex-login-2-x-sendButton .vtex-button');
       
        // var emailInput = allInputs[1];
        // var passwordInput = allInputs[2];

        // if (!allInputs || allInputs.length === 0) {
        //     return prepareInputs()
        // }

        console.log(allInputs);
        console.log(loginButton);
        //console.log(allInputs[2]);

        allInputs[0].addEventListener("keydown", function() {
            console.log('emailInput-nivel1')
            if(allInputs[0].value) {
                console.log('emailInput-nivel2')
                if(allInputs[1].value) {
                    console.log('emailInput-nivel3')
                    loginButton.classList.add('vtex-button--buttonActive')
                    return
                }
            }
            console.log('emailInput-nivel4')
            loginButton.classList.remove('vtex-button--buttonActive')
        });

        allInputs[1].addEventListener("keydown", function() {
            console.log('passwordInput-nivel1')
            if(allInputs[1].value) {
                console.log('passwordInput-nivel2')
                if(allInputs[0].value) {
                    console.log('passwordInput-nivel3')
                    loginButton.classList.add('vtex-button--buttonActive')
                    return
                }
            }
            console.log('passwordInput-nivel4')
            loginButton.classList.remove('vtex-button--buttonActive')
        });
    }
    
    // function autoClick() {
    //     var observer = new IntersectionObserver(function(entries) {
    //         // isIntersecting is true when element and viewport are overlapping
    //         // isIntersecting is false when element and viewport don't overlap
    //         if(entries[0].isIntersecting === true) {
    //             clearInterval(timer1);
    //             entries[0].target.click();
    //             autoClick();
    //         }
    //     }, { rootMargin: '500px',threshold: [0] });

    //     var observed = document.querySelector('.vtex-search-result-3-x-buttonShowMore .vtex-button');
        
    //     if (observed) {
    //         observer.observe(observed);
    //     }
        
    // }

    // const timer1 = setInterval(() => autoClick , 4000);
    // clearInterval(timer1);

    useEffect(() => {

        setTimeout(() => {prepareInputs()}, 10000);
        // var teste2 = document.querySelectorAll('.vtex-login-2-x-inputContainer .vtex-styleguide-9-x-input');
        // console.log(teste2);
        // prepareInputs();
        
    },[]);    

    return null
}

export default LoginButtonCheck