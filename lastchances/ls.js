$(document).ready(function() {


  sigma.settings.defaultEdgeColor = "#f1c40f";
  // // sigma.settings.defaultNodeColor = "#e74c3c";
  // // sigma.settings.nodeColor = 'default';
  sigma.settings.edgeColor = 'default';
  // sigma.settings.defaultEdgeHoverColor = "#e74c3c";
  // sigma.settings.edgeHoverExtremities = 'true';
  // sigma.settings.enableEdgeHovering = 'true';
  // sigma.settings.defaultNodeHoverColor = '#2ecc71';
  // sigma.settings.nodeHoverColor = 'default';
  
  sigma.classes.graph.addMethod('neighbors', function(nodeId) {
    var k,
        neighbors = {},
        index = this.allNeighborsIndex[nodeId] || {};

    for (k in index)
      neighbors[k] = this.nodesIndex[k];

    return neighbors;
  });


  sigma.parsers.gexf(
    'ls.gexf',
    { // Here is the ID of the DOM element that
      // will contain the graph:
      container: 'sigma-container'
    },
    function(s) {
      // This function will be executed when the
      // graph is displayed, with "s" the related
      // sigma instance.
      s.graph.nodes().forEach(function(n) {
        n.originalColor = n.color;
      });
      s.graph.edges().forEach(function(e) {
        if (e.attributes[0]) {
          e.color = "#7873f5";
          e.originalColor = e.color;
        }
        else {
          e.originalColor = e.color;
        }
      });

      s.refresh();

      // When a node is clicked, we check for each node
      // if it is a neighbor of the clicked one. If not,
      // we set its color as grey, and else, it takes its
      // original color.
      // We do the same for the edges, and we only keep
      // edges that have both extremities colored.
      s.bind('clickNode', function(e) {
        var nodeId = e.data.node.id,
            toKeep = s.graph.neighbors(nodeId);
        toKeep[nodeId] = e.data.node;

        s.graph.nodes().forEach(function(n) {
          if (toKeep[n.id])
            n.color = n.originalColor;
          else
            n.color = '#eee';
        });

        s.graph.edges().forEach(function(e) {
          if (toKeep[e.source] && toKeep[e.target]) {
            // if match, purple
            if (e.attributes[0]) {
              e.color = "#7873f5"
            }
            // if incoming crush, red
            else if (e.target == nodeId) {
              e.color = "#e74c3c"
            }
            //if outgoing crush, blue
            else if (e.source == nodeId)
              e.color = "#2980b9";
          }
          else
            e.color = '#eee';
        });

        // Since the data has been modified, we need to
        // call the refresh method to make the colors
        // update effective.
        s.refresh();
      });

      // When the stage is clicked, we just color each
      // node and edge with its original color.
      s.bind('clickStage', function(e) {
        s.graph.nodes().forEach(function(n) {
          n.color = n.originalColor;
        });

        s.graph.edges().forEach(function(e) {
          e.color = e.originalColor;
        });

        // Same as in the previous event:
        s.refresh();
      });
    });
});