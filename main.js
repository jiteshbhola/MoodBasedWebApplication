$('.welcome-screen button').on('click', function()
  {
      var name = $('#name-input').val();
        if (name.length > 2) {
           var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
$('.main').removeClass('hidden');
        } else {
           $('#name-input').addClass('error');
        }
 });


$('body').on('keypress',function(event) 
{
    if (event.keyCode == 13) //13 is keycode for ENTER
      {
        var name = $('#name-input').val();
          if (name.length > 2)
          {
              var message = "Welcome, " + name;
              $('.main .user-name').text(message);
              $('.welcome-screen').addClass('hidden');
              $('.main').removeClass('hidden');
          } 
           else
           {
             $('#name-input').addClass('error');
            }
       }
});