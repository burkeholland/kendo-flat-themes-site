(function() {

  // Create the monitor instance
  var settings = _eqatec.createSettings('892e981f81aa4bd99f61ae1316beb79c');
  settings.version = '1.2.3';
  var monitor = _eqatec.createMonitor(settings);
   
  // Start the monitor when your application starts
  monitor.start();

  if (kendo.support.mobileOS) {
    monitor.trackFeature('Mobile View');
    window.location = 'viewer';
  }

  var iframe = $('#viewer').get(0),
      currentTheme = null,
      id = 0;


  var model = kendo.observable({
    
    themes: new kendo.data.DataSource({
      transport: {
        read: 'themes'
      },
      schema: {
        data: function(data) {
          data.result.unshift({
            Name: 'None',
            CSSFile: null,
            BaseColor: null
          });
          return data.result;
        }
      }
    }),
    
    change: function(e) {

      var dataItem = e.sender.dataItem(),
          src = 'viewer?id=';

      currentTheme = dataItem.CSSFileName;
      
      monitor.trackFeature('View Theme: ' + dataItem.Name);
      
      if (currentTheme === null) {
        this.set('downloadEnabled', false);
        src = 'viewer?css=';
      }
      else {
        this.set('downloadEnabled', true);
        src = 'viewer?css=' + currentTheme;
      }

      iframe.src = src;
    },

    download: function() {
      monitor.trackFeature('Download Theme');
      window.location ='/themes/download?css=' + currentTheme;
    },
    
    showArrow: function() {
      var that = this;
      this.set('arrowOpacity', '1');
      setTimeout(function() {
        that.set('arrowOpacity', '0');
      }, 5000);
    },
    
    downloadEnabled: false,
    arrowOpacity: '0'
  });

  kendo.bind(document.body, model);

}());