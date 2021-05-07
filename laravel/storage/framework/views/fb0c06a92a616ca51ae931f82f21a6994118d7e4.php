<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet">
    <title>main</title>
    <style>
        @media  screen and (max-width: 699px){ /* 화면크기 699px이하 일때 */
            select {
                border-radius: 24px;
                border: 3px solid dimgrey;
            }
            #select_place{
                height: 50%;
            }
            .material-icons.md-menu { font-size: 50px; } /* 메뉴바 크기 조절 */
        }
        @media  screen and (min-width: 700px) { /* 화면크기 700이상 일때 */
            #select_place {
                height: 70%;
                font-size: 150%;
            }
            select {
                border-radius: 42px;
                border: 6px solid dimgrey;
            }
            .material-icons.md-menu { font-size: 80px; } /* 메뉴바 크기 조절 */
            .device_inner {
                font-size: 200%;
            }
        }
        @media  screen and (min-width: 1000px) { /* 화면크기 1000이상 일때 */
            #select_place {
                font-size: 150%;
            }
            select {
                border-radius: 60px;
                border: 7px solid dimgrey;
            }
            .device_inner {
                font-size: 300%;
            }
        }
        * {
            margin: 0;
            padding: 0;
        }
        html, body {
            width: 100%;
            height: 100%;
        }
        ul, li {


        }
        a {

        }
        select {
            -webkit-appearance: none; /* Chrom, Safari 브라우저에서 화살표 제거 */
            -moz-appearance: none; /* Firefox 브라우저에서 화살표 제거 */
            appearance: none; /* 화살표 제거 기본 코드 */
            background: transparent;
            width: 80%;
            height: 60%;
            font-size: 150%;
        }
        .styling select::-ms-expand { /* Explorer 브라우저에서 화살표 제  */
            display: none;
        }
        .header {
            width: 100%;
            height: 20%;
            background: antiquewhite;
        }
        .head {
            display: inline-block;
        }
        .article {
            width: 100%;
            height: 80%;
            background: antiquewhite;
        }
        .article_main {
            width: 90%;
            height: 90%;
            background: burlywood;
            margin-left: 5%;
            border-radius: 5px;
            overflow: auto;
        }
        .article_function {
            width: 90%;
            height: 30%;
            background: burlywood;
            margin-left: 5%;
            border-radius: 5px;
            margin-top: 8%;
        }
        .device {
            display: inline-block;
            margin-top: 6.5%;
            margin-left: 6%;
        }
        .device_inner {
            float: left;
        }
        .new_device_inner {
            display: block;
        }

        .device_text {
            width: 90%;
            height: 25%;
            margin-left: 10%;
            position: relative;
            top: 25%;
            font-size: 110%;
            text-align: left;
            border: none;
            background: transparent;
        }

        #select_place {
            width: 60%;
            position: relative;
            top: 15%;
            text-align-last: center;
        }
        #menu {
            width: 15%;
            height: 35%;
            position: relative;
            top: 20%;
            left: 20%;
        }

        #device1 {
            width: 40%;
            height: 18%;
            background: white;
            border: 2px solid;
            border-radius: 20px;
        }
        #device2 {
            width: 40%;
            height: 18%;
            background: white;
            border: 2px solid;
            border-radius: 20px;
        }
        #device3 {
            width: 40%;
            height: 18%;
            background: white;
            border: 2px solid;
            border-radius: 20px;
        }
        #device4 {
            width: 40%;
            height: 18%;
            background: white;
            border: 2px solid;
            border-radius: 20px;
        }
        #device5 {
            width: 40%;
            height: 18%;
            background: white;
            border: 2px solid;
            border-radius: 20px;
        }
        #device6 {
            width: 40%;
            height: 18%;
            background: white;
            border: 2px solid;
            border-radius: 20px;
        }
        #new_device {
            width: 40%;
            height: 18%;
            background: white;
            border: 2px solid;
            border-radius: 20px;
        }

        #device_img1 {
            width: 30%;
            height: 47%;
            position: relative;
            top: 12%;
            margin-left: 5%;
            background: none;
            border: 2px solid black;
            border-radius: 50%;
        }
        #device_img2 {
            width: 30%;
            height: 47%;
            position: relative;
            top: 12%;
            margin-left: 5%;
            background: none;
            border: 2px solid black;
            border-radius: 50%;
        }
        #device_img3 {
            width: 30%;
            height: 47%;
            position: relative;
            top: 12%;
            margin-left: 5%;
            background: none;
            border: 2px solid black;
            border-radius: 50%;
        }
        #device_img4 {
            width: 30%;
            height: 47%;
            position: relative;
            top: 12%;
            margin-left: 5%;
            background: none;
            border: 2px solid black;
            border-radius: 50%;
        }
        #new_device_circle {
            width: 40%;
            height: 67%;
            position: relative;
            left: 25%;
            background: none;
            border: 2px solid dimgrey;
            border-radius: 50%;
        }
        #new_device_cross {
            background: dimgrey;
            width: 5%;
            height: 65%;
            top: 20%;
            left: 48.5%;
            position: relative;
            border-radius: 5px;
        }
        #new_device_cross:after {
            background: dimgrey;
            content: '';
            width: 1400%;
            height: 8%;
            top: 40%;
            left: -650%;
            position: absolute;
            border-radius: 5px;
        }

        #device_txt1 {
            width: 60%;
            height: 73%;
        }
        #device_txt2 {
            width: 60%;
            height: 73%;
        }
        #device_txt3 {
            width: 60%;
            height: 73%;
        }
        #device_txt4 {
            width: 60%;
            height: 73%;
        }

    </style>

</head>
<body>
<div class="header">
    <div class="head" id="select_place">
        <select>
            <option value="">장소 선택</option>
            <option value="">우리 집</option>
            <option value="">+</option>
        </select>
    </div>
    <div class="head" id="menu">
        <span class="material-icons md-menu">menu</span>
    </div>

</div>

<div class="article">
    <div class="article_main">
        <button class="device" id="device1">
            <div class="device_inner" id="device_img1"></div>
            <div class="device_inner" id="device_txt1">
                <input type="text" class="device_text" id="device_where1" value="거실" readonly/>
                <input type="text" class="device_text" id="device_what1" value="스위치" readonly/>
            </div>
        </button>
        <button class="device" id="device2">
            <div class="device_inner" id="device_img2"></div>
            <div class="device_inner" id="device_txt2">
                <input type="text" class="device_text" id="device_where2" value="안방" readonly/>
                <input type="text" class="device_text" id="device_what2" value="스위치" readonly/>
            </div>
        </button>
        <button class="device" id="device3">
            <div class="device_inner" id="device_img3"></div>
            <div class="device_inner" id="device_txt3">
                <input type="text" class="device_text" id="device_where3" value="주방" readonly/>
                <input type="text" class="device_text" id="device_what3" value="가스 밸브" readonly/>
            </div>
        </button>
        <button class="device" id="device4">
            <div class="device_inner" id="device_img4"></div>
            <div class="device_inner" id="device_txt4">
                <input type="text" class="device_text" id="device_where4" value="주방" readonly/>
                <input type="text" class="device_text" id="device_what4" value="가스 밸브" readonly/>
            </div>
        </button>
        <button class="device" id="new_device">
            <div class="new_device_inner" id="new_device_circle">
                <div id="new_device_cross"></div>
            </div>
        </button>
    </div>
</div>
</body>
</html><?php /**PATH /var/www/html/laravel/resources/views/main.blade.php ENDPATH**/ ?>