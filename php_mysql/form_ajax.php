
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script>
        var dataObj = {
            name: "Dude",
            username: "Dude33",
            id: "6",
            age: "33",
            date_added: "",
            loc_lat: "133.44",
            loc_lon: "144.334",
            num_logins: 6,
            user_agent: "chrome or something",
            fb_login: 0

        };
        function submitme(){
            console.log("inside submitMe");
            $.ajax({
                    url: 'index_insert.php',
                    method: 'POST',
                    dataType: 'jsonp',
                      data: dataObj,


//                    data: {
//                        name: $("#name").val(),
//                        user_name: $("#user_name").val(),
//                        age: $("#age").val(),
//                        loc_lat: $("#loc_lat").val(),
//                        loc_lon: $("#loc_lon").val()
//                    },
                    success: function(result){
                             console.log("success");
                             console.log(result);
                            $('#container').append('<h3>Your form is submitted!, thanks!</h3>');
                    }
                });//ajax
        }//click
    </script>

    <div id="container">
    Name: <input name="name" id="name" type="text"><br>
    User Name: <input name="user_name" id="user_name" type="text"><br>
    Age: <input name="age" id="age" type="number"><br>
    loc_lat: <input name="loc_lat" id="loc_lat" ><br>
    loc_lon: <input name="loc_lon" id="loc_lon" ><br>
    <button type="button" id="submit" onclick="submitme()">Submit</button>
    </div>


