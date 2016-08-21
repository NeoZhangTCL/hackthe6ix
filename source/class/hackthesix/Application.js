/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "hackthesix"
 *
 * @asset(hackthesix/*)
 */
qx.Class.define("hackthesix.Application",
{
  extend : qx.application.Standalone,



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
     * 
     * @lint ignoreDeprecated(alert)
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
      -------------------------------------------------------------------------
      */

      // Document is the application root
      var doc = this.getRoot();

      init(doc);

      function init(page) {
        showProgressBar(page);
        createToolbar(page);
        createTree(page);
        createStockTable(page);
      }

      function showProgressBar(page) {
        var pBar = new qx.ui.indicator.ProgressBar();
        pBar.setMaximum(100);
        page.add(pBar, {left: 550,top:250});
        for (var i = 0; i <= 100; i+=20) {
          setTimeout(pBar.setValue(i),100000);
          if (i == 100) {
            page.remove(pBar);
          }
        }
      }

      function createToolbar(page) {
        var toolbar = new qx.ui.toolbar.ToolBar();

        page.add(toolbar, {left:0, top:0});

        var fileBtn = new qx.ui.toolbar.MenuButton("File");  
        var uploadBtn = new qx.ui.toolbar.Button("Upload");
        var runBtn = new qx.ui.toolbar.Button("Run");
        toolbar.add(fileBtn);
        toolbar.add(uploadBtn);
        toolbar.add(runBtn);
      }

      function createTree(page) {
        var tree = new qx.ui.tree.Tree();
        tree.set({
          width: 160,
          height: 500
        });

        tree.setRootOpenClose(true);

        page.add(tree, {left:5, top: 50});

        var treeRoot = new qx.ui.tree.TreeFolder('Project');
        tree.setRoot(treeRoot);
        treeRoot.setOpen(true);

        var dirNameArr = ["Stocks","Models","Charting","Analysis","Code"];
        var dirArrMap = new Array();

        dirNameArr.forEach(createDir);

        function createDir(dirName) {
          var newDir = new qx.ui.tree.TreeFolder(dirName);
          dirArrMap.push(newDir);
          addDirListeners(dirName,newDir);
          treeRoot.add(newDir);
        }

        var demoRight = new qx.ui.form.TextArea("");
        demoRight.setWidth(700);
        demoRight.setWrap(false);
        showSplitScreen(page,tree,demoRight);
      }

      function showSplitScreen(page,left,right) {
        var pane = new qx.ui.splitpane.Pane("horizontal");
        pane.add(left, 0);
        pane.add(right,1);
        page.add(pane, {left:5,top:50});
      }

      function createStockTable(page) {

        var tableModel = new qx.ui.table.model.Simple();
        tableModel.setColumns(["ID","Ticker","Company name", "Price"]);
        tableModel.setData(grabStockData(5000));

        var stockTable = new qx.ui.table.Table(tableModel).set({
          decorator: null,
          height: 500,
          width: 400
        });

        page.add(stockTable, {left: 880, top: 50});
      }

      function addTVStockWindow(page) {
        var htmlContent = '<script type="text/javascript" src="https://d33t3vvu2t2yu5.cloudfront.net/tv.js"></script><script type="text/javascript">new TradingView.widget({"width": 980,"height": 610,"symbol": "NASDAQ:MSFT","interval": "D","timezone": "Etc/UTC","theme": "White","style": "1","locale": "en","toolbar_bg": "#f1f3f6","enable_publishing": false,"allow_symbol_change": true,"save_image": false,"news": ["headlines"],"hideideas": true});</script>'
        var embed = new qx.ui.embed.Html(htmlContent);
        embed.set({
          decorator: null,
          height: 250,
          width: 400
        });

        page.add(embed, {left:880,top:300});
      }

      function grabStockData(rowCount) {
        /* Using fake data right now */
        var rowData = [];
        var randomTicker = "ticker";
        var randomName = "microsoft";

        var id = 0;
        for (var row = 0; row < rowCount; row++) {
          rowData.push([id++,randomTicker, randomName, Math.random() * 100 ]);
        }
        return rowData;
      }

      function addDirListeners(dirName,dir) {
        switch(dirName) {
          case "Stocks":
            dir.addListener("click", function(e) {
              createStockChart();
            });
            break;
          case "Models": 
            dir.addListener("click", function(e) {

            });
            break;
          case "Charting":
            dir.addListener("click", function(e) {
              createChartWin();
            });
            break;
          case "Analysis":
            dir.addListener("click", function(e) {

            });
            break;
          case "Code":
            dir.addListener("click", function(e) {

            });
            break;    
        }
      }

      function createStockChart() {
        
      }

      function createChartWin() {

      }

    }
  }
});
