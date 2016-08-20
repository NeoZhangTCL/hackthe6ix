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

      function init(HTMLpage) {
        createTree(HTMLpage);
      }

      function createTree(HTMLpage) {
        var tree = new qx.ui.tree.Tree();
        tree.set({
          width: 150,
          height: 300
        });

        HTMLpage.add(tree, {left:30, top: 20});

        var treeRoot = new qx.ui.tree.TreeFolder('Project');
        tree.setRoot(treeRoot);

        var stocksDir = new qx.ui.tree.TreeFolder("Stocks");
        var graphsDir = new qx.ui.tree.TreeFolder("Charting");
        var analysisDir = new qx.ui.tree.TreeFolder("Analysis");

        treeRoot.add(stocksDir,graphsDir,analysisDir);
      }

    }
  }
});
