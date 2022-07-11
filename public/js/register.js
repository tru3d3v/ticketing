$(document).ready(function () {

    // Hide message box
    $('.message_box').hide();
    $('.close').click(function(){
        $('.message_box').hide();
    });
    
    
    // Validate Nama lengkap
    $("#namalengkapInvalid").hide();
    let namaLengkapError = true;
    $("#registerNamaLengkap").keyup(function () {
        validateUsername();
    });

    function validateUsername() {
        let namaLengkap = $("#registerNamaLengkap").val();
        if (namaLengkap.length == "") {
            $("#namalengkapInvalid").show();
            namaLengkapError = true;
        } else {
            $("#namalengkapInvalid").hide();
            namaLengkapError = false;
        }
    }

    // Validate Email
    const email = document.getElementById("registerEmail");
    email.addEventListener("blur", () => {
        validateEmail();
    });

    function validateEmail(){
        let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
        let s = email.value;
        if (regex.test(s)) {
            email.classList.remove("is-invalid");
            emailError = false;
        } else {
            email.classList.add("is-invalid");
            emailError = true;
        }
    }

    // Validate Password
    $("#pwdInvalid").hide();
    let passwordError = true;

    $("#registerPassword").keyup(function () {
        validatePassword();
    });
    function validatePassword() {

        let passwordValue = $("#registerPassword").val();
        if (passwordValue.length == "") {
            $("#pwdInvalid").show();
            passwordError = true;
        }
        if (passwordValue.length < 3 || passwordValue.length > 10) {
            $("#pwdInvalid").show();
            $("#pwdInvalid").html(
                "**length of your password must be between 3 and 10"
            );
            $("#pwdInvalid").css("color", "red");
            passwordError = true;
        } else {
            $("#pwdInvalid").hide();
            passwordError = false;
        }
    }

    // Validate Confirm Password
    $("#rePwdfInvalid").hide();
    let confirmPasswordError = true;
    $("#registerRepassword").keyup(function () {
        validateConfirmPassword();
    });
    function validateConfirmPassword() {
        let confirmPasswordValue = $("#registerRepassword").val();
        let passwordValue = $("#registerPassword").val();
        if (passwordValue != confirmPasswordValue) {
            $("#rePwdfInvalid").show();
            $("#rePwdfInvalid").html("**Password didn't Match");
            $("#rePwdfInvalid").css("color", "red");
            confirmPasswordError = true;
        } else {
            $("#rePwdfInvalid").hide();
            confirmPasswordError = false;
        }
    }

    $("#tombolDaftar").click(function () {


        validateUsername();
        validatePassword();
        validateConfirmPassword();
        validateEmail();
        console.log('test');
        if (
            namaLengkapError == true ||
            passwordError == true ||
            confirmPasswordError == true ||
            emailError == true
        ) {
            
              return true;

        } else {
            console.log('valid');
            var namaLengkap = $('#registerNamaLengkap');
            var email = $('#registerEmail');
            var password = $('#registerpassword');

            $.ajax({
                url: '/register',
                dataType: 'json',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({ "fullname": namaLengkap.val(), "email": email.val(),"password":password.val() }),
                beforeSend: function () {
                       // $('.loader').show(); --> belom ada htmlnya! jadi di disabled dulu
                }
            }).done(successFunction)
                .fail(errorFunction)
                .always(alwaysFunction);
        }


    });

    function successFunction(data){
        if (data.length > 0) {

            var email = $('#registerEmail').val();
            $('.message_box').show('active');
            $('.m-message').css("color", "red");
            var responBackend = data[1][0].ret_value;
                // Maping balikan dari backend
                if(responBackend=='register sukses'){
                    $('.m-message').show().text('registration success, please check your email '+email+', and please klik link activation before login ! ');
                }else if(responBackend=='user already register'){
                 
                    $('.m-message').show().text('you cannot use this email '+email+', email has been registered! ');
                }

                // untuk kepentingan debug
                console.log(data);

          } else {
            $('.m-message').show().text('No data received from your respose!');
          }
    }

    function errorFunction(request, textStatus, errorThrown){
        $('.message_box').show('active');
        $('.m-message').css("color", "red");
        $('.m-message').show().text('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
    }

    function alwaysFunction() {
      //  $('.loader').hide();
       // $('.modal').addClass('active');
    }



});