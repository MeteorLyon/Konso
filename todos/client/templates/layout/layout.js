Template.layout.helpers({
    username: function () {
        return Utils.getUsername(Meteor.user());
    },
    isAuthenticated: function () {
        return Meteor.user();
    },
    thisArray: function () {
        return [this];
    },
    menuOpen: function () {
        return Session.get(MENU_KEY) && 'menu-open';
    },
    cordova: function () {
        return Meteor.isCordova && 'cordova';
    },
    emailLocalPart: function () {
        var email = Meteor.user().emails[0].address;
        return email.substring(0, email.indexOf('@'));
    },
    userMenuOpen: function () {
        return Session.get(USER_MENU_KEY);
    },
    lists: function () {
        return Lists.find();
    },
    i18nChat: function () {
        return '聊天';
    }
});

Template.registerHelper("isEmbeddedChat", function () {
    return Session.get("embedded");
})

Template.layout.onRendered(function(){
    $(".button-collapse").sideNav({
        menuWidth: 280
    });
})