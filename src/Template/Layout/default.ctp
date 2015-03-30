<!DOCTYPE html>
<html ng-app="tarefas" ng-app lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="css/bootstrap.css" rel="stylesheet">
        <style type="text/css">
            ul > li, a {
                cursor: pointer;
            }
        </style>
        <title>Gerenciador de Tarefas</title>
    </head>
    <body>
        <div>
            <div class="container">
                <div ng-view="" id="ng-view"></div>
            </div>
        </div>
        <script src="js/jquery/jquery.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
        <script src="js/angular.min.js"></script>
        <script src="js/angular-route.min.js"></script>
        <script src="app/app.js"></script>
    </body>
</html>