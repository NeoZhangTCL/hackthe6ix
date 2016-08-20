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

      // Create a button
     // var button1 = new qx.ui.form.Button("First Button", "hackthesix/test.png");

      // Document is the application root
      var doc = this.getRoot();
      init(doc);

      // Add button to document at fixed coordinates
      //doc.add(button1, {left: 100, top: 50});

      // Add an event listener
      /*button1.addListener("execute", function(e) {
        alert("Hello World!");
      });*/

      function init(page) {
        showProgressBar(page);
        createToolbar(page);
        createTree(page);
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
        toolbar.add(fileBtn);
      }

      function createTree(page) {
        var tree = new qx.ui.tree.Tree();
        tree.set({
          width: 160,
          height: 500
        });

        //tree.applyRootOpenClose();
        tree.setRootOpenClose(true);

        page.add(tree, {left:5, top: 50});

        var treeRoot = new qx.ui.tree.TreeFolder('Project');
        tree.setRoot(treeRoot);

        var stocksDir = new qx.ui.tree.TreeFolder("Stocks");
        var graphsDir = new qx.ui.tree.TreeFolder("Charting");
        var analysisDir = new qx.ui.tree.TreeFolder("Analysis");

        treeRoot.add(stocksDir,graphsDir,analysisDir);
        var demoRight = new qx.ui.form.TextArea("");
        demoRight.setWidth(700);
        showSplitScreen(page,tree,demoRight);
      }

      function showSplitScreen(page,left,right) {
        var pane = new qx.ui.splitpane.Pane("horizontal");
        pane.add(left, 0);
        pane.add(right,1);
        page.add(pane, {left:5,top:50});
      }

      function renameFile(file) {

      }

    }
  }
});
