qx.Class.define('mobiletweets.page.Tweet', {
    extend: qx.ui.mobile.page.NavigationPage,
    construct: function() {
        this.base(arguments);
        this.set({
            title: 'Details',
            showBackButton: true,
            backButtonText: '戻る'
        });
    },
    properties: {
        tweet: {
            check: 'Object',
            nullable: true,
            init: null,
            event: 'changeTweet'
        }
    },
    members: {
        _initialize: function() {
            this.base(arguments);
            var label = new qx.ui.mobile.basic.Label();
            this.getContent().add(label);
            this.bind('tweet.text', label, 'value');
        }
    }
});
