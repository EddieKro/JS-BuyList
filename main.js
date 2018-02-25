$(document).ready(function () {
    var itemname;

    function formList() {
        itemname = $('input:text').val();
        if (itemname != "") {
            addItem(itemname, 1, false);
        }
    }

    function addItem(name, qty, status) {
        var template_left = $("<div class='outer-block'>").append(
            $("<div class='item-name'>").append(name),
            $("<div class='qty-block-b'>").append(
                $("<button class='buttonm' data-tooltip='Tooltip'>").append("-"),
                $("<span class='quantity'>").append(qty),
                $("<button class='buttonp' data-tooltip='Tooltip'>").append("+")
            ),
            $("<div class='button-wrapper'>").append(
                $("<button class='buttonx' data-tooltip='Tooltip'>").append("x"),
                $("<button class='button-bought' data-tooltip='Tooltip'>").append("Куплено")
            )
        );
        var template_right = $("<span class='label'>").append(
            $("<span class='title'>").append(name), ($("<span class='value'>").append(qty)));

        $(".left").append(template_left);
        $(".right .segment:nth-of-type(2)").append(template_right);
        $('input:text').val("").focus();//set text field to default

        $(".buttonm").prop('disabled', true);
    }

    addItem("Помідори", 1, false);
    addItem("Сир", 1, false);
    addItem("Печиво", 1, false);

    $('#textfield').keydown(function (e) {//"key-listener" -add
        if (e.keyCode == 13) {
            formList();
        }
    });

    $(".button1").click(function () {//"button-listener" -add
        formList();
    });

    $(".outer-container").on("click", ".buttonx", function () {//-delete
        var name = $(this).parent().parent().find(".item-name").text();
        console.log(name);
        $(this).parent().parent().remove();//simplest way possible
        $(".title:contains('" + name + "')").parent().remove();

    });

    $(".outer-container").on("click", ".button-not-bought", function () {// not_bought->bought
        var name = $(this).parent().parent().find(".item-name-n").text();
        var qty = $(this).parent().parent().find(".quantity").text();

        $(this).parent().parent().find(".qty-block-b").remove();
        $(this).parent().parent().find(".button-wrapper").remove();
        var p = $(".title:contains('" + name + "')").parent().remove();

        var sub = $("<div class='outer-block'>").append(
            $("<div class='item-name'>").append(name),
            $("<div class='qty-block-b'>").append(
                $("<button class='buttonm' data-tooltip='Tooltip'>").append("-"),
                $("<span class='quantity'>").append(qty),
                $("<button class='buttonp' data-tooltip='Tooltip'>").append("+")
            ),
            $("<div class='button-wrapper'>").append(
                $("<button class='buttonx' data-tooltip='Tooltip'>").append("x"),
                $("<button class='button-bought' data-tooltip='Tooltip'>").append("Куплено")
            )
        );

        $(".item-name-n:contains('" + name + "')").parent().replaceWith(sub);
        $(".right .segment:nth-of-type(2)").append(p);

    });

    $(".outer-container").on("click", ".button-bought", function () {// bought->not_bought
        var name = $(this).parent().parent().find(".item-name").text();

        $(this).parent().parent().find(".buttonm").remove();
        $(this).parent().parent().find(".buttonp").remove();
        $(this).parent().parent().find(".button-wrapper").remove();

        var p = $(".title:contains('" + name + "')").parent().remove();
        var sub = $("<div class='button-wrapper'>").append(
            $("<button class='button-not-bought' data-tooltip='Tooltip'>").append("Не куплено")
        );

        $(".item-name:contains('" + name + "')").attr('class', 'item-name-n');
        $(".item-name-n:contains('" + name + "')").parent().append(sub);

        $(".right .segment:nth-of-type(4)").append(p);

    });

    $(".outer-container").on("click", ".buttonp", function () {//++
        var name = $(this).parent().parent().find(".item-name").text();
        var qty = $(this).parent().find(".quantity").text();
        var q = parseInt(qty) + 1;
        var res = $("<div class='qty-block-b'>").append(
            $("<button class='buttonm' data-tooltip='Tooltip'>").append("-"),
            $("<span class='quantity'>").append(q),
            $("<button class='buttonp' data-tooltip='Tooltip'>").append("+")
        );
        $(this).parent().replaceWith(res);
        $(".right").find(".title:contains('" + name + "')").parent().children(".value").text(q);
    });

    $(".outer-container").on("click", ".buttonm", function () {//--
        var name = $(this).parent().parent().find(".item-name").text();
        var qty = $(this).parent().find(".quantity").text();
        var q = parseInt(qty) - 1;
        if (q !== 0) {
            var res = $("<div class='qty-block-b'>").append(
                $("<button class='buttonm' data-tooltip='Tooltip'>").append("-"),
                $("<span class='quantity'>").append(q),
                $("<button class='buttonp' data-tooltip='Tooltip'>").append("+")
            );
            $(this).parent().replaceWith(res);
            $(".right").find(".title:contains('" + name + "')").parent().children(".value").text(q);
        }

    });

    $(".item-name").click(function () {
        var current = $(this).text();
        console.log(current);
        var inputbox = $("<input type='text' class='inputbox' value ='" + current + "'/>");
        $(this).html(inputbox);
        $(".inputbox").focus().blur(function () {
            var val = $(this).val();

                $(this).parent().text(val);
                $(".inputbox").remove();
                $(".right").find(".title:contains('" + current + "')").text(val);

        });
    });

});