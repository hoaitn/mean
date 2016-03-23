(function() {
	'use strict';
	angular.module('users').config(['$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('members', {
					parent: 'admin',
					url: '/members',
					templateUrl: 'modules/users/client/views/member/list.client.view.html',
					controller: 'AdminMemberController',
					controllerAs: 'vm',
					resolve: {
						members: listMember
					},
					data: {
						roles: ['admin']
					},
					ncyBreadcrumb: {
						label: 'Quản lý thành viên'
					}
				})
				.state('members.view', {
					url: '/:memberId',
					templateUrl: 'modules/users/client/views/member/view.client.view.html',
					controller: 'AdminMemberInfoController',
					controllerAs: 'vm',
					resolve: {
						member: getMember
					},
					data: {
						roles: ['admin']
					},
					ncyBreadcrumb: {
						label: '{{vm.member.name}}'
					}
				});
		}
	]);

	listMember.$inject = ['MemberService'];

	function listMember(MemberService) {
		return MemberService.getList();
	}

	getMember.$inject = ['MemberService', '$stateParams'];

	function getMember(MemberService, $stateParams) {
		return MemberService.getById($stateParams.memberId);
	}
})();