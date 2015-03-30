var app = angular.module('tarefas', ['ngRoute']);

app.factory("services", ['$http', '$location', function($http, $location) {
	var serviceBase = '/';
	var obj = {};
	
	obj.getList = function() {
		return $http.get(serviceBase + 'tarefas.json');
	};
	
	obj.getItem = function(id) {
		return $http.get(serviceBase + 'tarefas/' + id + '.json');
	};

	obj.insertItem = function(tarefa) {
		return $http.post(serviceBase + 'tarefas.json', tarefa).then(function(results) {
			if(results.data.message == "Error"){
				alert('Ocorreu um erro ao gravar informações. Verifique os dados e tente novamente.');
			}
			else{
				$location.path('/');
				return results;
			}			
		});
	};

	obj.updateItem = function(id, tarefa) {
		return $http.put(serviceBase + 'tarefas/' + id + '.json', tarefa)
		.then(function(results) {
			if(results.data.message == "Error"){
				alert('Ocorreu um erro ao gravar informações. Verifique os dados e tente novamente.');
			}
			else{
				$location.path('/');
				return results;
			}	
		});
	};

	obj.deleteItem = function(id) {
		return $http.delete(serviceBase + 'tarefas/' + id + '.json').then(function(status) {
			$location.path('/');
			return status.data;
		});
	};

	return obj;
}]);

app.controller('listCtrl', function($scope, services) {
	services.getList().then(function(data) {
		$scope.tarefas = data.data.tarefas;
		$("#tasks-table tbody").sortable({
	    	cursor: "move",
		    start:function(event, ui){
		      startPosition = ui.item.prevAll().length + 1;
		    },
		    update: function(event, ui) {
		      endPosition = ui.item.prevAll().length + 1;
		      //alert('Start Position: ' + startPosition + ' End Position: ' + endPosition);
					/*var szUUIDList = "";
			    $('#myQueryList input[name=uuidWhatever]').each(function(i){
			        szUUIDList = szUUIDList + ',' + $(this).val();
			    });
			    $.getJSON('/path/to/handler.cfc', {
			        method:'YourMethod',
			        returnFormat:'JSON',
			        listUUIDs:szUUIDList
			    },
			    function(data){
			        if(data.intSuccess == 1){
			            alert('Display order updated');
			        } else {
			            alert('Sorry, there was a problem updating the display order.');
			        }
			    });*/
		     }
		});
	});
});

app.controller('editCtrl', function($scope, $rootScope, $location, $routeParams, services, tarefa) {
	var tarefaID = ($routeParams.ID) ? parseInt($routeParams.ID) : 0;
	$rootScope.title = (tarefaID > 0) ? 'Editar Tarefa' : 'Adicionar Tarefa';
	$scope.buttonText = (tarefaID > 0) ? 'Atualizar Tarefa' : 'Adicionar Nova Tarefa';
	var original = tarefa.data.tarefa;
	original._id = tarefaID;
	$scope.tarefa = angular.copy(original);
	$scope.tarefa._id = tarefaID;

	$scope.isClean = function() {
		return angular.equals(original, $scope.customer);
	};

	$scope.deleteItem = function(tarefa) {
		if (confirm("Deseja remover a tarefa de numero: " + $scope.tarefa._id) == true)
			services.deleteItem(tarefa.id);
	};

	$scope.saveItem = function(tarefa) {
		if (tarefaID <= 0) {
			services.insertItem(tarefa);
		} else {
			services.updateItem(tarefaID, tarefa);
		}
	};
	
});

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		title : 'Tarefas',
		templateUrl : 'partials/tasks.html',
		controller : 'listCtrl'
	})
	.when('/editar-tarefa/:ID', {
		title : 'Editar Tarefas',
		templateUrl : 'partials/edit-task.html',
		controller : 'editCtrl',
		resolve : {
			tarefa : function(services, $route) {
				var id = $route.current.params.ID;
				if(id == 0){
					return {
						data: {
							tarefa: {
								id: 0,
								titulo: '',
								descricao: '',
								prioridade: 1
							}
						}
					};
				}
				else return services.getItem(id);
			}
		}
	})
	.otherwise({
		redirectTo : '/'
	});
}]);

app.run(['$location', '$rootScope', function($location, $rootScope) {
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
		$rootScope.title = current.$$route.title;
	});
}]); 