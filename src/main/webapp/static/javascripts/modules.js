const app = angular.module('myApp', ['ui.bootstrap.modal', 'angularUtils.directives.dirPagination']); //eslint-disable-line

app.controller('mainCtrl', ($scope, $http, $filter) => {
    $scope.toggle = true;
$scope.isFormShow = false;
$scope.isPickerShow = false;
$scope.showForm = () => {
    if ($scope.isPickerShow === true) $scope.isPickerShow = false;
    $scope.isFormShow = !$scope.isFormShow;
};

$scope.showPicker = () => {
    $scope.isPickerShow = !$scope.isPickerShow;
};

$scope.sortDesc = () => {
    $scope.toggle = true;
};

$scope.sortAsc = () => {
    $scope.toggle = false;
};

$scope.openLoginModal = () => {
    $scope.showLoginForm = true;
};

$scope.closeLoginForm = () => {
    $scope.showLoginForm = false;
};

$scope.openContactModal = () => {
    $scope.showContactForm = true;
};

$scope.closeContactForm = () => {
    $scope.showContactForm = false;
};

$scope.login = () => {
    $http({
        method: 'POST',
        url: '/login',
        dataType: 'json',
        data: {
            password: $scope.password,
            email: $scope.email,
        },
    }).then(
        response => {
        console.log(response); //eslint-disable-line
    location.reload(); //eslint-disable-line
},
    response => {
        console.log(response.statusText); //eslint-disable-line
    }
);
};

$scope.logout = () => {
    $http({
        method: 'GET',
        url: '/logout',
    }).then(
        response => {
        location.reload(); //eslint-disable-line
    console.log(response); //eslint-disable-line
},
    response => {
        console.log(response.statusText); //eslint-disable-line
    }
);
};

$scope.fblogin = () => {
    $http({
        method: 'GET',
        url: '/auth/facebook',
    }).then(
        response => {
        // location.reload(); //eslint-disable-line
        console.dir(response); //eslint-disable-line
},
    response => {
        console.log(response.statusText); //eslint-disable-line
    }
);
};

$scope.signup = () => {
    $http({
        method: 'POST',
        url: '/signup',
        data: {
            email: $scope.email_reg,
            password: $scope.password_reg,
            name: $scope.name_reg,
        },
    }).then(
        response => {
        console.log(response.data); //eslint-disable-line
},
    response => {
        console.log(response.statusText);//eslint-disable-line
    }
);
};

$scope.remove = currentID => {
    $http({
        method: 'POST',
        url: '/delete',
        data: {
            id: currentID,
        },
    }).then(
        () => {
        $scope.notes = $scope.notes.filter(note => {
        return note.id !== currentID;
});
},
    () => {
        console.log('did not removed'); //eslint-disable-line
    }
);
};

$scope.create = () => {
    const date = new Date();
    let col = document.getElementsByName('color')[0].value; //eslint-disable-line
    let { content, title } = $scope;
    if (content === '') content = 'Empty content';
    if (title === '') title = 'Empty title';
    $http({
        method: 'POST',
        url: '/notes',
        dataType: 'json',
        data: {
            content,
            color: col,
            title,
            date: $filter('date')(date, 'HH:mm | dd.MM.yyyy'),
        },
    }).then(
        response => {
        console.dir(response);
    $scope.notes.push(response.data);
    $scope.content = '';
    $scope.title = '';
    col = null;
},
    response => {
        console.log(response.data);
    }
);
};

$scope.sendMail = () => {
    $http({
        method: 'POST',
        url: '/mail',
        data: {
            email: $scope.email_mail,
            name: $scope.name_mail,
            message: $scope.message_mail,
        },
    }).then(
        response => { //eslint-disable-line
        console.log('alallaalal send mail');
},
    response => {
        console.log(response.statusText);//eslint-disable-line
    }
);
};
});
