


$(function(){
    $("form").submit(function(){
        
        //エラーの初期化
        $("p.error").remove();
        $("table tr td").removeClass("error");
        
        $(":text,textarea").filter(".validate").each(function(){
            
            //必須項目のチェック
            $(this).filter(".required").each(function(){
                if($(this).val()==""){
                    $(this).parent().prepend("<p class='error'>required</p>")
                }
                
            })
            
            //メールアドレスのチェック
            $(this).filter(".mail").each(function(){
                if($(this).val() && !$(this).val().match(/.+@.+\..+/g)){
                    $(this).parent().prepend("<p class='error'>please use correct format</p>")
                }
                
            })
            
            //メールアドレス確認のチェック
            $(this).filter(".mail_check").each(function(){
                if($(this).val() && $(this).val()!=$("input[name="+$(this).attr("name").replace(/^(.+)_check$/, "$1")+"]").val()){
                   $(this).parent().prepend("<p class='error'>This address does not match the one above</p>")
                   }
            })
        })
            
        //ラジオボタンのチェック
        $(":radio").filter(".validate").each(function(){
            $(this).filter(".required").each(function(){
                if($("input[name="+$(this).attr("name")+"]:checked").size() == 0){
                    $(this).parent().prepend("<p class='error'>Please select</p>")
                }
            })
        })
        
        //セレクトボックスのチェック
        $("#arrivaltime").each(function(){
                if($("#arrivaltime option:selected").val() == "0"){
                    $(this).parent().prepend("<p class='error'>Time is required</p>")
                }
        })
        $("#arrivaldate").each(function(){
                if($("#arrivaldate option:selected").val() == "0"){
                    $(this).parent().prepend("<p class='error'>Date is required</p>")
                }
        })
        
        $("#arrivalmonth").each(function(){
                if($("#arrivalmonth option:selected").val() == "0"){
                    $(this).parent().prepend("<p class='error'>Month is required</p>")
                }
        })
        
        $("#arrivalyear").each(function(){
                if($("#arrivalyear option:selected").val() == "0"){
                    $(this).parent().prepend("<p class='error'>Year is required</p>")
                }
        })
        
        $("#numberofnights").each(function(){
                if($("#numberofnights option:selected").val() == "0"){
                    $(this).parent().prepend("<p class='error'>required</p>")
                }
        })
        
        $("#roomtypeoption").each(function(){
                if($("#roomtypeoption option:selected").val() == "0"){
                    $(this).parent().prepend("<p class='error'>required</p>")
                }
        })
        
        $("#numberofguests").each(function(){
                if($("#numberofguests option:selected").val() == "0"){
                    $(this).parent().prepend("<p class='error'>required</p>")
                }
        })
        
        //エラーの際の処理
        if($("p.error").size() > 0){
            $('html,body').animate({ scrollTop: $("p.error:first").offset().top-49 }, 'slow');
            $("p.error").parent().addClass("error");
            return false;
        }
    })                                                                                                                                     
})


$(document).ready(function() {
    // Toggle main menu visibility
    $("#humburger_icon").click(function() {
        $("#menu").slideToggle(); // Slide open/close
        $("#background").toggleClass('no-scroll'); // Toggle no-scroll class
        return false;
    });

    // Function to toggle submenus
    function toggleSubMenu(triggerId, submenuId) {
        $(triggerId).click(function() {
            var $targetMenu = $(submenuId);
            if ($targetMenu.is(":visible")) {
                $targetMenu.slideUp(); // Slide up if visible
            } else {
                closeAllSubMenus(); // Close other submenus
                $targetMenu.slideDown(); // Slide down to show submenu
            }
            return false;
        });
    }

    // Initialize submenus
    toggleSubMenu("#open_whereweare_secondlevel_small", "#whereweare_secondlevel_small");
    toggleSubMenu("#open_contact_secondlevel_small", "#contact_secondlevel_small");
    toggleSubMenu("#open_booking_secondlevel_small", "#booking_secondlevel_small");

    // Close all menus and submenus when clicking outside
    $(document).click(function(event) {
        if (!$(event.target).closest('#menu, #humburger_icon').length) {
            closeAllMenus(); // Slide up all open submenus and hide main menu
        }
    });

    // Prevent closing the menu when clicking inside
    $('#menu').click(function(event) {
        event.stopPropagation(); // Prevent event bubbling
    });

    // Close all submenus
    function closeAllSubMenus() {
        $("#whereweare_secondlevel_small, #contact_secondlevel_small, #booking_secondlevel_small").slideUp(); // Slide up all submenus
    }

    // Close the main menu and hide submenus when an <li> is clicked
    $('#menu li').click(function(event) {
        $('#menu').hide(); // Hide the entire menu
        event.stopPropagation(); // Prevent event bubbling
    });

    // Function to close all menus
    function closeAllMenus() {
        $('#menu').slideUp(); // Slide up the main menu
        closeAllSubMenus(); // Close all submenus
        $("#background").removeClass('no-scroll'); // Remove no-scroll class
    }
});


$(function(){
    $("#open_where_we_are_mobile").click(function(){
        $("#where_we_are_mobile").slideToggle();
        $("#contact_mobile").hide();
        $("#booking_mobile").hide();
        $(window).scrollTop();
          return false;
    });
})

$(function(){
    $("#open_contact_mobile").click(function(){
        $("#contact_mobile").slideToggle();
        $("#where_we_are_mobile").hide();
        $("#booking_mobile").hide();
          return false;
    });
})

$(function(){
    $("#open_booking_mobile").click(function(){
        $("#booking_mobile").slideToggle();
        $("#where_we_are_mobile").hide();
        $("#contact_mobile").hide();
          return false;
    });
})




//ROOM TYPE



//FACILITIES AND SERVICES

$(function(){
    $(".open_detail_1").click(function(){
        $("#detail_1").slideToggle();
        $("#detail_2").hide();
        $("#detail_3").hide();
        $("#detail_4").hide();
        $("#detail_5").hide();
        $("#detail_6").hide();
          return false;
    });
})

$(function(){
    $(".open_detail_2").click(function(){
        $("#detail_2").slideToggle();
        $("#detail_1").hide();
        $("#detail_3").hide();
        $("#detail_4").hide();
        $("#detail_5").hide();
        $("#detail_6").hide();
          return false;
    });
})

$(function(){
    $(".open_detail_3").click(function(){
        $("#detail_3").slideToggle();
        $("#detail_1").hide();
        $("#detail_2").hide();
        $("#detail_4").hide();
        $("#detail_5").hide();
        $("#detail_6").hide();
          return false;
    });
})

$(function(){
    $(".open_detail_4").click(function(){
        $("#detail_4").slideToggle();
        $("#detail_1").hide();
        $("#detail_2").hide();
        $("#detail_3").hide();
        $("#detail_5").hide();
        $("#detail_6").hide();
          return false;
    });
})

$(function(){
    $(".open_detail_5").click(function(){
        $("#detail_5").slideToggle();
        $("#detail_1").hide();
        $("#detail_2").hide();
        $("#detail_3").hide();
        $("#detail_4").hide();
        $("#detail_6").hide();
          return false;
    });
})

$(function(){
    $(".open_detail_6").click(function(){
        $("#detail_6").slideToggle();
        $("#detail_1").hide();
        $("#detail_2").hide();
        $("#detail_3").hide();
        $("#detail_4").hide();
        $("#detail_5").hide();
          return false;
    });
})

$(window).on('scroll', function() {
    var scrollTop = $(window).scrollTop(); // Get current scroll position
    var zoomFactor = 1 + scrollTop / 1000; // Adjust zoom factor based on scroll
    
    $('.zoom-on-scroll').css('transform', 'scale(' + zoomFactor + ')');
});