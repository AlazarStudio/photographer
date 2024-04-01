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

  response.forEach((element, index) => {
    const blockIndex = index % 3;
    if (stringToImageArray(element.img).length > 1) {
      for (let i = 0; i < stringToImageArray(element.img).length; i++) {
        $(`.main_column__${(i % 3) + 1}`).append(
          `<div class="main_column__item"><img src="admin/img/${
            stringToImageArray(element.img)[i]
          }" alt=""></div>`
        );
      }
    } else {
      $(`.main_column__${blockIndex + 1}`).append(
        `<div class="main_column__item"><img src="admin/img/${stringToImageArray(
          element.img
        )}" alt=""></div>`
      );
    }
  });
});

// ----------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  getData("request").then((response) => {
    let popups = {};
    let popups2 = {};

    response.forEach((element) => {
      if (element.modered == "yes") {
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

        let meetingDescription =
          "Забронировано с " + time + " до " + endTimeFormatted;

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
      }
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

          // $("#date_events").empty().append(popups2[chosenDate]);

          $("#date_events").empty();

          popups2[chosenDate].forEach((event) => {
            
            const eventDiv = $("<div>")
              .addClass(event.modifier)
              .html(event.html);

            // Добавляем созданный элемент в контейнер $("#date_events")
            $("#date_events").append(eventDiv);
          });

          console.log(popups2[chosenDate]);
        },
      },
    });

    calendar.init();
  });
});

var targets = document.querySelectorAll(".swiper-slide");

targets.forEach(function (target) {
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        var classList = target.classList;

        if (classList.contains("swiper-slide-active")) {
          $("#time").val($(".swiper-slide-active").html());
        }
      }
    });
  });

  var config = { attributes: true, attributeFilter: ["class"] };
  observer.observe(target, config);
});
