$(document).ready(function () {

    console.log('root');
    var token = readCookie('ticketingApp_token_user');
    //var pageName = window.location.pathname.split('/')[1].toLowerCase();

    $.ajax({
        url: '/viewProfile',
        dataType: 'json',
        type: 'GET',
        headers: { 'token': token },
        contentType: 'application/json',
        data: JSON.stringify({  }),
        beforeSend: function () {
               // $('.loader').show();--> belom ada htmlnya! jadi di disabled dulu
        }
    }).done(function(data){
        if (data!=null) {
            if(data.message!=""){
                alert(data.message);
            }
            if(data.data!=null){
                $('#namaLengkap').html(data.data.fullName);
                $('#fotoNamaLengkap').html(data.data.fullName);
                
                $('#email').html(data.data.email);
            }
        }
    })
        .fail(function(request, textStatus, errorThrown){
           
            alert('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
        })
        .always(function(){});
});