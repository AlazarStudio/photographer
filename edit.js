function getData(tableName, id) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "admin/includes/CRUD/getDataFromDB.php",
      type: "POST",
      data: {
        id: id,
        tableName: tableName,
      },
      dataType: "json",
      success: function (data) {
        let dataArray = Object.values(data);
        resolve(dataArray);
      },
      error: function (xhr, status, error) {
        console.error("Error:", xhr, status, error);
        reject(error);
      },
    });
  });
}

function stringToImageArray(imageString) {
  return imageString.split(",").map((image) => image.trim());
}

function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

// ----------------------------------------------------------------

getData("galery").then((response) => {
  let block1 = $(".main_column__1").empty();
  let block2 = $(".main_column__2").empty();
  let block3 = $(".main_column__3").empty();

  let modal = $(".modal-content").empty();
  let img_index = 1;

  response.forEach((element, index) => {
    const blockIndex = index % 3;
    if (stringToImageArray(element.img).length > 1) {
      for (let i = 0; i < stringToImageArray(element.img).length; i++) {
        $(`.main_column__${(i % 3) + 1}`).append(
          `<div class="main_column__item" onclick="openModal(); currentSlide(${img_index})"><img src="admin/img/${
            stringToImageArray(element.img)[i]
          }" alt=""></div>`
        );

        modal.append(`
        <div class="mySlides">
            <img src="admin/img/${
              stringToImageArray(element.img)[i]
            }" alt="Фото 1">
        </div>
    `);
        img_index++;
      }
    } else {
      $(`.main_column__${blockIndex + 1}`).append(
        `<div class="main_column__item" onclick="openModal(); currentSlide(${img_index})"><img src="admin/img/${stringToImageArray(
          element.img
        )}" alt=""></div>`
      );

      modal.append(`
      <div class="mySlides">
          <img src="admin/img/${
            stringToImageArray(element.img)[i]
          }" alt="Фото 1">
      </div>
  `);
      img_index++;
    }
  });
});

// ----------------------------------------------------------------

// let popups = {};
// // let popups2 = {};

document.addEventListener("DOMContentLoaded", () => {
  getData("request").then((response) => {
    let popups = {};
    let popups2 = {};
    let bookedTimeSlots = {}; // Объект для хранения забронированных промежутков времени

    response.forEach((element) => {
      let date = element.date;
      let time = element.time;
      let hour = element.hour;
      hour = ("0" + hour).slice(-2);
      let endTime = new Date("1970-01-01T" + time + ":00");
      endTime.setHours(endTime.getHours() + parseInt(hour));
      let endTimeFormatted =
        ("0" + endTime.getHours()).slice(-2) +
        ":" +
        ("0" + endTime.getMinutes()).slice(-2);
      let meetingDescription = "";

      if (element.modered == "yes") {
        meetingDescription =
          "Забронировано с " + time + " до " + endTimeFormatted;
        // Записываем забронированные промежутки времени для данной даты
        if (!bookedTimeSlots[date]) {
          bookedTimeSlots[date] = [];
        }
        bookedTimeSlots[date].push({
          startTime: time,
          endTime: endTimeFormatted,
        });
      } else if (element.modered == "no") {
        meetingDescription =
          "Предварительная бронь с " + time + " до " + endTimeFormatted;
      }

      popups[date] = {
        modifier: "bg-orange",
        html: meetingDescription,
      };

      if (!popups2[date]) {
        popups2[date] = [];
      }

      popups2[date].push({
        modifier: "bg-orange",
        html: meetingDescription,
      });
    });

    let chosenDate;
    const calendar = new VanillaCalendar("#calendar", {
      settings: {
        lang: "ru",
        visibility: {
          theme: "light",
        },
        range: {
          disablePast: true,
        },
      },
      popups: popups,
      actions: {
        clickDay(e, self) {
          chosenDate = self.selectedDates;
          $("#date").val(chosenDate);
          $("#date_events").empty().hide();
          if (popups2[chosenDate]) {
            popups2[chosenDate].forEach((event) => {
              const eventDiv = $("<div class='event_item'>").html(event.html);
              $("#date_events").append(eventDiv);
            });
            $("#date_events").slideDown(600, function () {
              $(this).css("display", "flex");
            });
          }

          // Генерируем список временных слотов для выбранной даты
          generateTimeOptions(chosenDate, bookedTimeSlots);
        },
      },
    });

    calendar.init();
  });
});

function generateTimeOptions(chosenDate, bookedTimeSlots) {
  const timeSelect = document.getElementById("time_select");
  timeSelect.innerHTML = "";

  // Если для выбранной даты есть забронированные промежутки времени, отключаем выбор в этих интервалах
  if (bookedTimeSlots[chosenDate]) {
    const bookedSlots = bookedTimeSlots[chosenDate];
    for (let i = 10; i <= 18; i++) {
      const hour = i < 10 ? "0" + i : i;
      const timeSlot = hour + ":00";
      let isBooked = false;
      for (const slot of bookedSlots) {
        if (timeSlot >= slot.startTime && timeSlot < slot.endTime) {
          isBooked = true;
          break;
        }
      }
      if (!isBooked) {
        const option = document.createElement("option");
        option.value = timeSlot;
        option.textContent = timeSlot;
        timeSelect.appendChild(option);
      }
    }
  } else {
    // Если для выбранной даты нет забронированных промежутков времени, разрешаем выбор с 10:00 до 18:00
    for (let i = 10; i <= 18; i++) {
      const hour = i < 10 ? "0" + i : i;
      const option = document.createElement("option");
      option.value = hour + ":00";
      option.textContent = hour + ":00";
      timeSelect.appendChild(option);
    }
  }
}

// var targets = document.querySelectorAll(".swiper-slide");

// targets.forEach(function (target) {
//   var observer = new MutationObserver(function (mutations) {
//     mutations.forEach(function (mutation) {
//       if (
//         mutation.type === "attributes" &&
//         mutation.attributeName === "class"
//       ) {
//         var classList = target.classList;

//         if (classList.contains("swiper-slide-active")) {
//           $("#time").val($(".swiper-slide-active").html());
//         }
//       }
//     });
//   });
//   var config = { attributes: true, attributeFilter: ["class"] };
//   observer.observe(target, config);
// });
