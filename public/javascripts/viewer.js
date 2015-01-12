(function() {

  var models = kendo.observable({
    home: {
      themes: new kendo.data.DataSource({
        transport: {
          read: 'themes'
        },
        schema: {
          data: function(data) {
            data.result.unshift({
              Name: 'None',
              CSSFile: ''
            });

            return data.result;
          }
        },
        change: function() {
          console.log(this.view());
        }
      }),
      changeTitle: function () {
        //  app.view().header.find('.km-navbar').data('kendoMobileNavBar').title('Themes');
      }
    },
    widgets: {
      showFor: 5,
      showLoader: function() {
        var that = this;
        window.app.showLoading();
        var showFor = that.get('showFor');
        var timer = setInterval(function() {
          if (showFor > 1) {
            that.set('showFor', --showFor);
            window.app.changeLoadingMessage(showFor);
          }
          else {
            clearInterval(timer);
            window.app.hideLoading();
            that.set('showFor', 5);
          }
        }, 1000)
      },
      closeModal: function() {
        $('#modal').data('kendoMobileModalView').close();
      }
    }
  });

  // remove the home view if this being viewed on the web
  if (kendo.support.mobileOS === false) {
    $('#home').remove();
    $('#homeTab').remove();
  }

  window.app = new kendo.mobile.Application(document.body, { skin: 'flat', modelScope: models, transition: 'slide', serverNavigation: 'true' });

}());