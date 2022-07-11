$(document).ready(function () {


    document.getElementById("loginEmail").addEventListener("blur", () => {
        validateEmailLogin();
    });

    var loginEmailError = true;
    function validateEmailLogin(){
        var email = document.getElementById('loginEmail');
        let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
        let s = email.value;
        if (regex.test(s)) {
            email.classList.remove("is-invalid");
            loginEmailError = false;
        } else {
            email.classList.add("is-invalid");
            loginEmailError = true;
        }
    }

    document.getElementById("loginPassword").addEventListener("blur", () => {
        validateLoginPassword();
    });

    var loginPasswordError = true;
    function validateLoginPassword(){
       var pwd = $('#loginPassword').val();
       if(pwd.length==0){
        document.getElementById('loginPassword').classList.add("is-invalid");
        loginPasswordError = true;
       }else{
        document.getElementById('loginPassword').classList.remove("is-invalid");
        loginPasswordError = false;
       }
    }

    $('#btn-login').click(function(){
        var emailLogin = $('#loginEmail');
        var pwdLogin = $('#loginPassword');
    
        $.ajax({
            url: '/login',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({ "email": emailLogin.val(), "password":pwdLogin.val() }),
            beforeSend: function () {
                   // $('.loader').show();--> belom ada htmlnya! jadi di disabled dulu
            }
        }).done(successLoginFunction)
            .fail(errorLoginFunction)
            .always(alwaysLoginFunction);
    
    
    });

    function successLoginFunction(data){
        if (data.length > 0) {

            var email = $('#registerEmail').val();
            $('.message_box').show('active');
            $('.m-message').css("color", "red");
            var responBackend = data[1][0].ret_value;
                // Maping balikan dari backend
                if(responBackend!='login fail'){
                    var token = responBackend;
                    createCookie("ticketingApp_token_user", token,1);
                    location.href = 'profile.html';
                }else{
                    eraseCookie("ticketingApp_token_user");
                    $('.m-message').show().text('wrong user name and password ! or please check your email activation');
                }

                // untuk kepentingan debug
                console.log(data);

          } else {
            $('.m-message').show().text('No data received from your respose!');
          }
    }

    function errorLoginFunction(request, textStatus, errorThrown){
        $('.message_box').show('active');
        $('.m-message').css("color", "red");
        $('.m-message').show().text('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
    }

    function alwaysLoginFunction(){
        console.log('alwaysLoginFunction');
    }


    


});