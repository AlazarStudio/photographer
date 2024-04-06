const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "vertical",
  slidesPerView: 5,
  loop: true,
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});



// $(document).ready(function () {
//   $(".formBlock input").on("input", function () {
//     if ($(this).val().trim() !== "") {
//       $(this).addClass("filled").removeClass("error");
//     } else {
//       $(this).removeClass("filled");
//     }
//   });

//   $("#myForm").submit(function (event) {
//     let errorMassForm = [];
//     $(".formBlock input").each(function () {
//       if ($(this).val().trim() === "") {
//         $(this).addClass("error");
//         errorMassForm.push(this);
//       } else {
//         $(this).removeClass("error");
//       }
//     });

//     var emailInput = $("input[name='email']");
//     var emailValue = emailInput.val().trim();
//     var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(emailValue)) {
//       emailInput.addClass("error");
//     } else {
//       emailInput.removeClass("error");
//     }

//     // Добавим проверку наличия значения для класса filled
//     $(".formBlock input").each(function () {
//       if ($(this).val().trim() !== "") {
//         $(this).addClass("filled");
//       } else {
//         $(this).removeClass("filled");
//       }
//     });

//     if (errorMassForm.length == 0) {
//       $(".calendar_button").attr("disabled", "false");
//       $.ajax({
//         url: $(this).attr("action"),
//         method: "POST",
//         data: $(this).serialize(),
//         success: function (response) {
//           if (response != "false") {
//             console.log("success");
//             // $(".successMessage").show();
//           } else {
//             console.log("error");
//             // $(".successMessage").show();
//           }
//         },
//       });
//     } else {
//       $(".calendar_button").attr("disabled", "true");
//     }
//   });
// });


// $(document).ready(function () {
//   $("#myForm").submit(function (event) {
//     event.preventDefault();

//     $.ajax({
//       url: $(this).attr("action"),
//       method: "POST",
//       data: $(this).serialize(),
//       success: function (response) {
//         // $(".formBlock").hide();
//         $(".successMessage").show();
//       },
//       error: function () {
//         alert("Ошибка при отправке формы.");
//       },
//     });
//   });
// });


// ------------------------------------------------------------------------------------------------


// var modal = document.getElementById("myModal");

// var span = document.getElementsByClassName("close")[0];

// function openModal() {
//   modal.style.display = "block";
// }

// span.onclick = function() {
//   modal.style.display = "none";
// }

// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

