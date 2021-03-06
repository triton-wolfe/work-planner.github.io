angular.module('work-planner')
    .directive('projectRow', function () {
        return {
            restrict: "A",
            scope: {
                project: '=',
                show: '='
            },
            controller: ['$scope', '$state', function($scope, $state) {
                $scope.show = false;
                var vm = {
                    viewState: 'normal'
                }
                $scope.vm = vm;

                vm.edit = function () {
                    vm.viewState = 'editing';
                    vm.editable = angular.copy($scope.project);
                }

                vm.completeEdit = function () {
                    $scope.project = vm.editable
                    vm.viewState = 'normal';
                }

                vm.abandonEdit = function () {
                    vm.viewState = 'normal';
                }

                vm.delete = function () {
                    vm.viewState = 'deleting';
                }

                vm.completeDelete = function () {
                    $scope.$emit('deleteProject', $scope.project.$id);
                    vm.viewState = 'normal';
                }

                vm.abandonDelete = function () {
                    vm.viewState = 'normal';
                }

                vm.open = function () {
                    $state.go('WorkItemBoard', { ProjectId: $scope.project.$id });
                }
            }],
            templateUrl: '/work-planner/sources/views/ProjectRow.html'
        }
    });
