
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script>
        function submitme(){
            console.log("inside submitme");
            $.ajax({
                    url: 'index_select.php',
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        name: $("#name").val(),
                        user_name: $("#user_name").val(),
                        age: $("#age").val(),
                        loc_lat: $("#loc_lat").val(),
                        loc_lon: $("#loc_lon").val()
                    },
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


