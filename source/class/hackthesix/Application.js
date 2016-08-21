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

      var placeholderText = 'Type in stock tickers (can only take ticker in all caps at this moment) - Example: "Find most recent MSFT prices"';
      var demoRight = new qx.ui.form.TextArea("");
      demoRight.setPlaceholder(placeholderText);
      demoRight.setWidth(700);
      demoRight.setWrap(true);

      var tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns(["ID","Ticker","Price"]);
      var stockTable = new qx.ui.table.Table(tableModel).set({
          decorator: null,
          height: 500,
          width: 340
      });

      var tableData = new Array();
      var tableID = 0;
      var graphData = new Array();
      init(doc);



      /* View init as main function */
      function init(page) {
        //showProgressBar(page);
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
        var debugBtn = new qx.ui.toolbar.Button("Debug");
        var clearBtn = new qx.ui.toolbar.Button("Clear");

        runBtn.addListener("tap", function() {
          readTextForTicker();
        }, this);

        clearBtn.addListener("tap", function() {
          clearScreen();
        }, this);

        toolbar.add(fileBtn);
        toolbar.add(uploadBtn);
        toolbar.add(runBtn);
        toolbar.add(debugBtn);
        toolbar.add(clearBtn);
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

        var dirNameArr = ["Stocks","Models","Futures","Charting","Analysis","Code"];
        var dirArrMap = new Array();

        dirNameArr.forEach(createDir);

        function createDir(dirName) {
          var newDir = new qx.ui.tree.TreeFolder(dirName);
          dirArrMap.push(newDir);
          treeRoot.add(newDir);
        }

        showSplitScreen(page,tree,demoRight);
      }

      function showSplitScreen(page,left,right) {
        var pane = new qx.ui.splitpane.Pane("horizontal");
        pane.add(left, 0);
        pane.add(right,1);
        page.add(pane, {left:5,top:50});
      }

      function createStockTable(page) {
        page.add(stockTable, {left: 890, top: 50});
      }

      function updateStockTable(data, ticker) { 
        var price = data.dataset.data[0][4];
        var graphNum = data.dataset.data;
        alert(ticker + " price loaded.");
        tableID++;
        tableData.push([tableID,ticker,price]);
        graphData.push(graphNum);
        tableModel.setData(tableData);
      }

      function grabStockData(ticker) {
        var url = "https://www.quandl.com/api/v3/datasets/WIKI/" + ticker + ".json?api_key=mSjmVxD7fpFDXBjUsYtT";
        var request = new XMLHttpRequest();
        request.responseType = "json";
        request.onreadystatechange = function() {
          if (request.readyState === XMLHttpRequest.DONE && request.status == 200) {
            updateStockTable(request.response, ticker);
          } else if (request.status == 404) {
            alert("Unable to find " + ticker);
          }
        };
        request.open("GET", url, true);
        request.send();
      }

      function readTextForTicker() {
        var currText = demoRight.getValue();
        if (findKeywords(currText) === false) {
          var ticker = findAllCaps(currText);
          if (checkTicker(ticker) === false) {
            alert("Please print stock ticker in all caps!");
          } else { 
            grabStockData(ticker);
            clearScreen();
          }
        }
      }

      function findAllCaps(wholeText) {
        var textArr = wholeText.split(" ");
        var ticker = "";
        
        for (var i = 0; i < textArr.length; i++) {
          if ( textArr[i] === textArr[i].toUpperCase() ) {
            ticker = textArr[i];
            confirm("Are you searching for " + ticker + " stock info?");
            return ticker;
          }
        }

        return "";
      }

      function findKeywords(text) {
        var textArr = text.split(" ");
        for (var i = 0; i < textArr.length; i++) {
          if (textArr[i].toLowerCase() === "compare") {
            compareCurrStocks();
            return true;  
          }
        }
        return false;
      }

      function checkTicker(ticker) {
        return ticker != "";
      }

      function compareCurrStocks() {
        createCompareWin();
      }

      function clearScreen() {
        demoRight.setValue("");
      }

      function createCompareWin() {
        var win = new qx.ui.window.Window("Chart Comparison", "http://icdn.pro/images/en/s/m/small-pencil-icone-4351-48.png");
        win.setLayout(new qx.ui.layout.VBox(10));
        win.set({
          height: 600,
          width:500
        });

        win.open();
        this.getRoot.add(win, {left:350, top:120});


        var tabView = new qx.ui.tabview.TabView;
        win.add(tabView, {flex:1});

        for (var i = 0; i < tableData.count; i++) {
          var pageStr = "Page + " + i;
          var page = new qx.ui.tabview.Page(pageStr);
          page.add(new qx.ui.basic.Label("Stock"));
          tabView.add(page);
        }

        // Test for move listener
        win.addListener("move", function(e) {
          this.debug("Moved to: " + e.getData().left + "x" + e.getData().top);
        }, this);

        // Test for resize listener
        win.addListener("resize", function(e) {
          this.debug("Resized to: " + e.getData().width + "x" + e.getData().height);
        }, this);        
        
        clearScreen();
      }


      /*function addDirListeners(dirName,dir) {
        switch(dirName) {
          case "Stocks":
            dir.addListener("dblclick", function() {
             // createStockChart();
            });
            break;
          case "Models": 
            dir.addListener("dblclick", function() {

            });
            break;
          case "Charting":
            dir.addListener("dblclick", function() {
              // createChartWin();
            });
            break;
          case "Analysis":
            dir.addListener("dblclick", function() {

            });
            break;
          case "Code":
            dir.addListener("dblclick", function() {

            });
            break;    
        }
      }
         
      function placePopup(popupContent) {
        var popup = new qx.ui.popup.Popup(popupContent);
        popup.placeToMouse(pageCenter);
        popup.show();
      }
      function createStockChart() {
        var stockChart = new qx.ui.embed.Html();
        var HTMLContentStr = "<b>Test</b>";
        stockChart.setHtml(HTMLContentStr);
        placePopup(eventLocation,stockChart);
      }
      function createChartWin() { 
      }

      function errorMsg() {
        alert("ERROR!");  
      }
    */
    }
  }
});