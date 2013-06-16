qx.Class.define('mobiletweets.page.Input', {
    extend: qx.ui.mobile.page.NavigationPage,
    construct: function() {
        this.base(arguments);
        this.setTitle('Identica Client');
    },
    members: {
        _initialize: function() {
            this.base(arguments);

            var title = new qx.ui.mobile.form.Title('Please enter an identi.ca username');
            this.getContent().add(title);

            var form = this.__form = new qx.ui.mobile.form.Form();

            var input = this.__input = new qx.ui.mobile.form.TextField();
            input.setPlaceholder('Username');
            input.setRequired(true);
            form.add(input, 'Username');

            this.getContent().add(new qx.ui.mobile.form.renderer.SinglePlaceholder(form));

            var button = new qx.ui.mobile.form.Button('show');
            button.addListener('tap', this._onTap, this);
            this.getContent().add(button);
        },
        _onTap: function(evt) {
            var username = this.__input.getValue();
            this.fireDataEvent('requestTweet', username);
        }
    },
    events: {
        'requestTweet': 'qx.event.type.Data'
    }
});

