qx.Class.define('mobiletweets.page.Tweets', {
    extend: qx.ui.mobile.page.NavigationPage,
    construct: function() {
        this.base(arguments);
        this.set({
            title: '',
            showBackButton: true,
            backButtonText: 'back'
        });
    },
    properties: {
        tweets: {
            check: 'qx.data.Array',
            nullable: true,
            init: null,
            event: 'changeTweets'
        }
    },
    members: {
        __list: null,
        _initialize: function() {
            this.base(arguments);

            var list = this.__list = new qx.ui.mobile.list.List();
            var dateFormat = new qx.util.format.DateFormat();
            list.setDelegate({
                configureItem: function(item, value, row) {
                    item.setTitle(value.getText());
                    item.setSubtitle(value.getUser().getName() + ', '
                        + dateFormat.format(new Date(value.getCreated_at())));
                    item.setImage(value.getUser().getProfile_image_url());
                    item.setShowArrow(true);
                }
            });
            this.bind('tweets', list, 'model');
            this.getContent().add(list);
        }
    }
});
