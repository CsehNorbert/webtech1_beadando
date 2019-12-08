$(document).ready(function (){
    $.each($(".menubuton"), function (index,value){
      $(value).click(function(event){
          let butonname=$(value).attr("title");
                if (butonname==="home"){
                 open("index.html", "_self");
                }
                else if (butonname==="manufacturers"){
                    manufacturerLoad();
                }
                else if (butonname==="cars"){
                    carsLoad();
                }
                else if (butonname==="addCar"){
                    addingCarPage();
                }
                else if (butonname==="addManufacturer"){
                    addingManufacturerPage();
                }
             })
            }
        );

    });

function manufacturerLoad() {
    $(".maincontent").empty();
    $.get("manufacturers", function (manufacturers) {
        let everymanufacturer = manufacturers;
        let table =  $("<table></table>");
        table.append("<tr>" + "<th>Name</th><th>Country</th><th>Founded</th>" + "</tr>");
        $(".maincontent").append(table);
            for (let manufacturer of everymanufacturer){

                let dateinmsec = Date.parse(manufacturer.founded);
                let date = new Date(dateinmsec).toString().slice(4,16);

                table.append(   "<tr>" +
                    "<td ><a>" + manufacturer.name + "</a></td>" +
                    "<td>" + manufacturer.country + "</td>" +
                    "<td>" + date + "</td>" +
                $(".maincontent").append(table));
            }
    });

}

function carsLoad() {
    $(".maincontent").empty();
    $.get("cars", function (cars) {
        let everycar = cars;
        let table =  $("<table></table>");
        table.append("<tr>" + "<th>Manufacturer</th><th> Name</th><th>Consumption</th><th>Horsepower</th><th>Year</th><th>Color</th><th>Available</th>" + "</tr>");
        $(".maincontent").append(table);

        for (let car of everycar) {
            table.append("<tr>" +
                "<td ><a>" + car.manufacturer + "</a></td>" +
                "<td>" + car.name + "</td>" +
                "<td>" + car.consumption + "</td>" +
                "<td>" + car.horsepower + " hp </td>" +
                "<td>" + car.year + "</td>" +
                "<td>" + car.color + "</td>" +
                "<td>" + car.available + "</td>" +
                "</tr>");

            let manufacturer = car.manufacturer;
            $("a:last").click(
                function () {
                    listingManufacturersCar(manufacturer)
                });
        }
    });
}

function listingManufacturersCar(manufacturer) {
    $(".maincontent").empty();
    document.cookie = "name=" + manufacturer;
    $.get("manufacturer", function (cars) {
        let everycar = cars;
        let table =  $("<table></table>");
        table.append("<tr>" + "<th>Manufacturer</th><th> Name</th><th>Consumption</th><th>Horsepower</th><th>Year</th><th>Color</th><th>Available</th>" + "</tr>");
        $(".maincontent").append(table);

        for (let car of everycar) {
            table.append(   "<tr>" +
                "<td ><a>" + car.manufacturer + "</a></td>" +
                "<td>" + car.name + "</td>" +
                "<td>" + car.consumption + "</td>" +
                "<td>" + car.horsepower + " hp </td>" +
                "<td>" + car.year + "</td>" +
                "<td>" + car.color + "</td>" +
                "<td>" + car.available + "</td>" +
                "</tr>");

        }
        $(".maincontent").append(table);
    })}

function addingCarPage(){
    $(".maincontent").empty();
    $.get("addCar.html", function (form) {
        let Form = $(form);
        Form.submit(function (event) {
            event.preventDefault();
            $.ajax({
                url: 'addCar',
                type: 'post',
                data: $('Form').serialize(),
                success: function () {
                    carsLoad()
                },
                error: function (jqXhr) {
                    if (jqXhr.status === 409) {
                        alert("There is already a car with this name in the database!");
                    } else {
                        alert("Something is not right, see log for more information");
                        console.log(jqXhr);
                    }
                }
            });
        });
        $(".maincontent").append(Form);
    },'html')
}

function addingManufacturerPage(){
    $(".maincontent").empty();
    $.get("addmanufacturer.html", function (form) {
        let Form = $(form);
        Form.submit(function (event) {
            event.preventDefault();
            $.ajax({
                url: 'addManufacturers',
                type: 'post',
                data: $('Form').serialize(),
                success: function () {
                    manufacturerLoad()
                },
                error: function (jqXhr) {
                    if (jqXhr.status === 409) {
                        alert("There is already a car with this name in the database!");
                    } else {
                        alert("Something is not right, see log for more information");
                        console.log(jqXhr);
                    }
                }
            });
        });
        $(".maincontent").append(Form);
    },'html')
}