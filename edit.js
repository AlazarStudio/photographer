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
    let qwer = {};
    response.forEach((element) => {
      let date = element.date;
      let time = element.time;
      let meetingDescription = "Meeting at " + time;
      qwer[date] = {
        modifier: "bg-orange",
        html: meetingDescription,
      };
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
        // selection: {
        //   time: 24,
        //   controlTime: "all",
        // },
      },

      popups: qwer,

      actions: {
        clickDay(e, self) {
          chosenDate = self.selectedDates;
        },
      },
    });

    calendar.init();
  });
});
