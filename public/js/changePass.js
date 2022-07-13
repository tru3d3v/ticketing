$(document).ready(function () {

    console.log('root');
    var token = readCookie('ticketingApp_token_user');
    //var pageName = window.location.pathname.split('/')[1].toLowerCase();


    $('#btnSave').click(function () {

        var oldPwd = $('#oldPassword').val();
        var pwdNew = $('#newPassword').val();
        var reTypePwd = $('#reTypePassword').val();

        if (pwdNew.length == "") {
           alert('please enter new password');
           return;
        }
        if (pwdNew.length < 3 || pwdNew.length > 10) {
            alert("**length of your password must be between 3 and 10");
            return;
        } 
        if(reTypePwd!=pwdNew){
            alert("retype password incorrect");
            return;
        }

        $.ajax({
            url: '/updateProfile',
            dataType: 'json',
            type: 'POST',
            headers: { 'token': token },
            contentType: 'application/json',
            data: JSON.stringify({  "fullname":"",
            "old_email":"",
            "new_email":"","current_pwd":oldPwd,
            "new_pwd":reTypePwd}),
            beforeSend: function () {
                // $('.loader').show();--> belom ada htmlnya! jadi di disabled dulu
            }
        }).done(function (data) {
            if (data != null) {
                if (data.message != "") {
                    alert(data.message);
                }
                if (data.data != null) {
                  console.log(data);
                  if(data.data.affectedRows==1){
                      alert('password successfully update!');
                      $('#oldPassword').val('');
                     $('#newPassword').val('');
                      $('#reTypePassword').val('');
                  }
                }
            }
        })
            .fail(function (request, textStatus, errorThrown) {

                alert('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
            })
            .always(function () { });

    });
});