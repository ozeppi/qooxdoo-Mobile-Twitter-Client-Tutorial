/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(mobiletweets/*)
#asset(qx/mobile/icon/${qx.mobile.platform}/*)
#asset(qx/mobile/icon/common/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "mobiletweets"
 */
qx.Class.define("mobiletweets.Application",
{
  extend : qx.application.Mobile,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
        Remove or edit the following code to create your application.
      -------------------------------------------------------------------------
      */

        var manager = new qx.ui.mobile.page.Manager(false);

        var inputPage = new mobiletweets.page.Input();
        manager.addDetail(inputPage);

        inputPage.show({reverse: true});

        var tweetsPage = new mobiletweets.page.Tweets();
        manager.addDetail(tweetsPage);
        inputPage.addListener('requestTweet', function(evt) {
            this.setUsername(evt.getData());
            //addListenerで遅延させる & setUsernameの後でないとtitleに
            //nullがsetされるというエラーが出るのがハマりポイント
            this.bind('tweets', tweetsPage, 'tweets');
            this.bind('username', tweetsPage, 'title');
            tweetsPage.show();
        }, this);

        tweetsPage.addListener('back', function(evt){
            inputPage.show({reverse:true});
        }, this);

        var tweetPage = new mobiletweets.page.Tweet();
        manager.addDetail(tweetPage);

        tweetPage.addListener('back', function(evt){
            tweetsPage.show({reverse:true});
        }, this);

        tweetsPage.addListener('showTweet', function(evt){
            var index = evt.getData();
            tweetPage.setTweet(this.getTweets().getItem(index));
            tweetPage.show();
        }, this);
    },
    __loadTweets: function() {
      var url = "http://identi.ca/api/statuses/user_timeline/" + this.getUsername() + ".json";
      var store = new qx.data.store.Jsonp(url);
      store.bind('model', this, 'tweets');
      store.addListener('error', function(evt) {
          alert('failed get tweets');
      }, this);
    },
    _applyUsername: function(value, old) {
      this.__loadTweets();
    },
    _applyTweets: function(value, old) {
      this.debug('Tweets: ', qx.lang.Json.stringify(value));
    }
  },
  properties: {
    tweets: {
      check: 'qx.data.Array',
      nullable: true,
      init: null,
      event: 'changeTweets',
      apply: '_applyTweets'
    },
    username: {
      check: 'String',
      nullable: false,
      init: null,
      event: 'changeUsername',
      apply: '_applyUsername'
    }
  }
});
